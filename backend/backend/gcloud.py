from django.conf import settings
from storages.backands.gcloud import GoogleCloudStorage
from storages.utils import setting
from urllib.parse import urljoin

class GoogleCloudMediaFileStorage(GoogleCloudStorage):
  bucket_name = setting('GS_MEDIA_BUCKET_NAME')

  def url(self, name):
    return urljoin(settings.MEDIA_URL, name)

class GoogleCloudStaticFileStorage(GoogleCloudStorage):
  bucket_name = settings('GS_STATIC_BUCKET_NAME')

  def url(self, name):
    return urljoin(settings.STATIC_URL, name)