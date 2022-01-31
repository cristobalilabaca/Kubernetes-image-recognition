from django.db import models

class Image(models.Model):
  uploaded = models.DateTimeField(auto_now_add=True)
  image = models.ImageField()
  # link = models.CharField(max_length=150)

  class Meta:
    ordering = ['uploaded']

class Tag(models.Model):
  info = models.CharField(max_length=150)
  image = models.ForeignKey(Image, related_name='tags', on_delete=models.CASCADE)
