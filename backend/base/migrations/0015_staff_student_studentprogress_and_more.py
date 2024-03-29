# Generated by Django 4.1.5 on 2023-07-12 10:02

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('base', '0014_alter_profile_user'),
    ]

    operations = [
        migrations.CreateModel(
            name='Staff',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Student',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
            ],
        ),
        migrations.CreateModel(
            name='StudentProgress',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('progress', models.FloatField(default=0.0)),
                ('entry', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='base.entry')),
                ('user', models.OneToOneField(null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.AlterModelManagers(
            name='classgroup',
            managers=[
            ],
        ),
        migrations.RemoveField(
            model_name='classgroup',
            name='class_id',
        ),
        migrations.RemoveField(
            model_name='classgroup',
            name='group_ptr',
        ),
        migrations.RemoveField(
            model_name='classgroup',
            name='users',
        ),
        migrations.AddField(
            model_name='classgroup',
            name='admin',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='classgroup',
            name='id',
            field=models.BigAutoField(auto_created=True,  primary_key=True, serialize=False, verbose_name='ID'),

        ),
        migrations.AddField(
            model_name='classgroup',
            name='name',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='profile',
            name='staff',
            field=models.BooleanField(default=True),
        ),
        migrations.AddField(
            model_name='profile',
            name='year',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='classgroup',
            name='description',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='classgroup',
            name='password',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.DeleteModel(
            name='Answer',
        ),
        migrations.AddField(
            model_name='student',
            name='classGroup',
            field=models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='base.classgroup'),
        ),
        migrations.AddField(
            model_name='student',
            name='user',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]
