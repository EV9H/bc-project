# Generated by Django 4.1.5 on 2023-01-06 21:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("base", "0002_word_meaning"),
    ]

    operations = [
        migrations.RemoveField(model_name="meaning", name="attribute_id",),
        migrations.AddField(
            model_name="meaning",
            name="attribute",
            field=models.CharField(
                choices=[
                    ("n", "名词"),
                    ("adj", "形容词"),
                    ("v", "动词"),
                    ("adv", "副词"),
                    ("measure", "量词"),
                    ("prep", "介词"),
                    ("compound", "复合词"),
                    ("count", "数词"),
                    ("reduplication", "叠词"),
                ],
                max_length=40,
                null=True,
            ),
        ),
        migrations.AddField(
            model_name="meaning",
            name="pronounciation",
            field=models.CharField(max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name="meaning",
            name="example",
            field=models.CharField(max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name="meaning",
            name="name",
            field=models.CharField(max_length=40, null=True),
        ),
        migrations.AlterField(
            model_name="word",
            name="name",
            field=models.CharField(max_length=20, null=True),
        ),
    ]
