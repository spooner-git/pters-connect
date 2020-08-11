from rest_framework.serializers import Serializer


class DynamicSerializerMixin:
    serializer_classes = None

    def get_serializer_class(self):
        if self.serializer_classes:
            action = self.action

            serializer_class = self.serializer_classes.get(action)

            if serializer_class is None and action == 'partial_update':
                action = 'update'
                serializer_class = self.serializer_classes.get(action)

            if serializer_class is None:
                if action in ['retrieve', 'list']:
                    action = 'read'
                if action in ['create', 'update', 'partial_update']:
                    action = 'write'
                serializer_class = self.serializer_classes.get(action, self.serializer_class)

            if serializer_class is None:
                serializer_class = Serializer
            return serializer_class
        return super().get_serializer_class()
