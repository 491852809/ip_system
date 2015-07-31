# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('ipinfo', '0003_auto_20150324_2039'),
    ]

    operations = [
        migrations.AlterField(
            model_name='project_info',
            name='domain',
            field=models.CharField(max_length=60, blank=True),
        ),
        migrations.AlterField(
            model_name='project_info',
            name='pro_name',
            field=models.CharField(max_length=100, blank=True),
        ),
    ]
