# Generated by Django 3.0 on 2020-09-01 15:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('facility', '0002_delete_subjecttb'),
    ]

    operations = [
        migrations.AddField(
            model_name='facilitytb',
            name='contact_number',
            field=models.CharField(blank=True, db_column='CONTACT_NUMBER', default='', max_length=20, verbose_name='연락처'),
        ),
    ]
