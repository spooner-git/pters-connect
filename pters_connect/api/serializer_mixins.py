from django.core.exceptions import ValidationError
from rest_framework import serializers


class ModelCleanMixin(serializers.ModelSerializer):

    def is_valid(self, raise_exception=False):
        is_valid = super().is_valid(raise_exception=False)
        model_class = self.Meta.model
        clean_fields = getattr(self.Meta, 'clean_fields', self.Meta.fields)
        model_data = {}

        for field in clean_fields:
            data = self.initial_data.get(field)
            if data is not None:
                model_data[field] = data

        try:
            model_class(**model_data).clean()
        except ValidationError as exc:
            self._errors.update(
                serializers.as_serializer_error(serializers.ValidationError(exc.message_dict))
            )

        if self._errors and raise_exception:
            raise serializers.ValidationError(self.errors)
        return is_valid


class DynamicFieldsMixin:

    def __init__(self, *args, **kwargs):
        # Don't pass the 'fields' arg up to the superclass
        fields = kwargs.pop('fields', None)

        # Instantiate the superclass normally
        super().__init__(*args, **kwargs)

        if fields is not None:
            # Drop any fields that are not specified in the `fields` argument.
            allowed = set(fields)
            existing = set(self.fields)
            for field_name in existing - allowed:
                self.fields.pop(field_name)
