from datetime import datetime, timezone
import re
from django.utils.timesince import timesince
from .models import Device
from rest_framework import serializers
from .models import Device
from rest_framework.response import Response

class DeviceSerializer(serializers.ModelSerializer):

    time_since_create = serializers.SerializerMethodField()

    class Meta:
        model = Device
        fields = (
            'id',
            'name',
            'serial_no',
            'ip',
            'published',
            'time_since_create',
           )

    def get_time_since_create(self, object):
        now = datetime.now(timezone.utc)
        create_date = object.published
        time_delta = timesince(create_date, now)
        return time_delta
        

    def validate_serial_no(self, serial_no):
        if not re.findall('\d', serial_no) or not re.findall('[a-z]', serial_no):
            #return serializers.ValidationError("The serial number must contain at least 1 digit(0-9) and 1 lowercase letter")
            raise Response({'error': 'The serial number must contain at least 1 digit(0-9) and 1 lowercase letter'})
        if serial_no[0:3] != 'sd-':
            serial_no = 'sd-' + serial_no
        return serial_no