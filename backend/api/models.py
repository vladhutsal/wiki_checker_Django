from django.db import models

class Text(models.Model):
    text_content = models.CharField(max_length=2000)

    def __str__(self):
        return self.text_content

class Keyphrase(models.Model):
    kp_content = models.CharField(max_length=100, unique=True)
    score = models.IntegerField(default=0)
    wiki_link = models.CharField(max_length=300, blank=True)
    disambiguation = models.BooleanField(default=False)

    def __str__(self):
        return self.kp_content
