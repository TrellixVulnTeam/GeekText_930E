# Generated by Django 2.1.5 on 2019-02-03 01:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('books', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='book',
            name='cover',
            field=models.ImageField(blank=True, null=True, upload_to='book_covers/'),
        ),
    ]
