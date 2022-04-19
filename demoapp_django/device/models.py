from django.db import models


class Device(models.Model):

    name = models.CharField(max_length=50, unique=True)
    serial_no = models.CharField(max_length=50, unique=True)
    ip = models.GenericIPAddressField(protocol='IPv4')
    published = models.DateTimeField(auto_now_add=True)
