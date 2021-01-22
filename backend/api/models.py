from django.db import models

class Text(models.Model):
    text_content = models.CharField(max_length=2000)

    def __str__(self):
        return self.text_content

class Keyphrase(models.Model):
    keyphrase_content = models.CharField(max_length=100)
    score = models.IntegerField(default=0)
    is_on_wiki = models.BooleanField(default=False)
    wiki_link = models.CharField(max_length=300, blank=True)

    def __str__(self):
        return self.keyphrase_content
