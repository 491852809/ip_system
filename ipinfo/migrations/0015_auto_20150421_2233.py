# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('ipinfo', '0014_auto_20150421_2151'),
    ]

    operations = [
        migrations.AlterField(
            model_name='project_info',
            name='domain',
            field=models.CharField(max_length=400, blank=True),
        ),
    ]
