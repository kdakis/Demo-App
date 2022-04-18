from django.db import models
from django.utils import timezone
from django.db import models

class Device(models.Model):

    name = models.CharField(max_length=50, unique=True)
    serial_no = models.CharField(max_length=50, unique=True)
    ip = models.GenericIPAddressField()
    published = models.DateTimeField(default=timezone.now)
