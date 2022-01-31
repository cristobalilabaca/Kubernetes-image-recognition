from .models import Image, Tag
from .serializers import ImageSerializer
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from google.cloud import vision
# from asgiref.sync import sync_to_async

def create_tags(serializer, im):
  print('start')
  client = vision.ImageAnnotatorClient()
  image = vision.Image()
  image.source.image_uri = serializer.data['image']
  response = client.label_detection(image=image)
  labels = response.label_annotations
  print(labels)
  for i in labels:
    if i.score > 0.75:
      Tag.objects.create(image= im, info= i.description)

# async_create_tags = sync_to_async(create_tags, thread_sensitive=False)

class ImageList(APIView):
  def get(self, request):
    images = Image.objects.all()
    serializer = ImageSerializer(images, many=True)
    return Response(serializer.data)

  def post(self, request):
    serializer = ImageSerializer(data=request.data)
    if serializer.is_valid():
      im = serializer.save()
      print('f')
      # async_create_tags(serializer, im)
      create_tags(serializer, im)
      return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
