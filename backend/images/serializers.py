from rest_framework import serializers
from images.models import Image
from images.models import Tag

class TagSerializer(serializers.ModelSerializer):
  class Meta:
    model = Tag
    fields = ['id', 'info']

class ImageSerializer(serializers.ModelSerializer):
  id = serializers.IntegerField(read_only=True)
  image = serializers.ImageField(required=False)
  tags = TagSerializer(many=True, read_only=True)

  # def create(self, validated_data):
  #   return Image.objects.create(**validated_data)


  # def update(self, instance, validated_data):
  #   instance.image = validated_data.get('image', instance.image)
  #   instance.save()
  #   return instance

  class Meta:
    model = Image
    fields = ['id', 'image', 'tags']
