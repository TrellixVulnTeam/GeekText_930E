# Generated by Django 2.1.5 on 2019-04-12 01:00

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Author',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=120)),
                ('biography', models.TextField(null=True)),
                ('created_at', models.DateField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='Book',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('cover', models.ImageField(blank=True, null=True, upload_to='book_covers/')),
                ('title', models.CharField(max_length=120)),
                ('price', models.DecimalField(decimal_places=2, max_digits=10, null=True)),
                ('description', models.TextField(null=True)),
                ('publisher', models.CharField(max_length=120, null=True)),
                ('publicationDate', models.DateField(null=True)),
                ('ISBNThirteen', models.CharField(max_length=14, null=True)),
                ('ISBNTen', models.CharField(max_length=11, null=True)),
                ('pages', models.IntegerField(null=True)),
                ('created_at', models.DateField(auto_now_add=True)),
                ('authors', models.ManyToManyField(to='parent.Author')),
            ],
        ),
        migrations.CreateModel(
            name='BookSold',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('count', models.IntegerField()),
                ('author', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='parent.Author')),
                ('book', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='parent.Book')),
            ],
        ),
        migrations.CreateModel(
            name='CartItem',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('quantity', models.IntegerField(default=1)),
                ('created_at', models.DateField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
                ('description', models.TextField()),
                ('created_at', models.DateField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='Publishing',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('publisher', models.CharField(max_length=200)),
                ('release_date', models.DateField()),
                ('created_at', models.DateField(auto_now_add=True)),
                ('book', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='parent.Book')),
            ],
        ),
        migrations.CreateModel(
            name='Rating',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('shownick', models.BooleanField(default=True)),
                ('stars', models.IntegerField()),
                ('created_at', models.DateField(auto_now_add=True)),
                ('book', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='parent.Book')),
            ],
        ),
        migrations.CreateModel(
            name='SavedItem',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='ShoppingCart',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('price', models.DecimalField(decimal_places=2, default=0.0, max_digits=6)),
            ],
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('username', models.CharField(max_length=200)),
                ('password', models.CharField(max_length=200)),
                ('name', models.CharField(max_length=200)),
                ('email', models.EmailField(max_length=254)),
                ('home_address', models.CharField(max_length=200)),
                ('created_at', models.DateField(auto_now_add=True)),
            ],
        ),
        migrations.AddField(
            model_name='saveditem',
            name='cart',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='saved', to='parent.ShoppingCart'),
        ),
        migrations.AddField(
            model_name='saveditem',
            name='itemsSaved',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='saved', to='parent.Book'),
        ),
        migrations.AddField(
            model_name='rating',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='parent.User'),
        ),
        migrations.AddField(
            model_name='cartitem',
            name='cart',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='items', to='parent.ShoppingCart'),
        ),
        migrations.AddField(
            model_name='cartitem',
            name='itemsInCart',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='items', to='parent.Book'),
        ),
        migrations.AddField(
            model_name='booksold',
            name='category',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='parent.Category'),
        ),
        migrations.AddField(
            model_name='book',
            name='category',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='parent.Category'),
        ),
    ]
