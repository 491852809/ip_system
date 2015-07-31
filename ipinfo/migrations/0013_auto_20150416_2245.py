# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('ipinfo', '0012_auto_20150403_0142'),
    ]

    operations = [
        migrations.AlterField(
            model_name='database_info',
            name='database_name',
            field=models.CharField(max_length=300),
        ),
        migrations.AlterField(
            model_name='project_info',
            name='pro_dir',
            field=models.CharField(max_length=200, blank=True),
        ),
    ]
