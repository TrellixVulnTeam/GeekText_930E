# Generated by Django 2.1.5 on 2019-02-16 20:03

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('cart', '0004_auto_20190216_1448'),
    ]

    operations = [
        migrations.AlterField(
            model_name='cartitem',
            name='itemsInCart',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='books', to='books.Book'),
        ),
    ]
