# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('ipinfo', '0013_auto_20150416_2245'),
    ]

    operations = [
        migrations.AlterField(
            model_name='ip_info',
            name='note',
            field=models.TextField(max_length=500, blank=True),
        ),
    ]
