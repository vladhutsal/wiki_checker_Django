from django.db import models

class Keyphrase(models.Model):
    kp_content = models.CharField(max_length=100, unique=True)
    score = models.IntegerField(default=1)
    wiki_link = models.CharField(max_length=300, null=True)
    disambiguous = models.BooleanField(default=True, null=True)

    class Meta:
        ordering = ['-score']

    def __str__(self):
        return self.kp_content


class Text(models.Model):
    text_content = models.CharField(max_length=2000, unique=True)
    keyphrases = models.ManyToManyField(Keyphrase)

    class Meta:
        ordering = ['-id']

    def __str__(self):
        return self.text_content