from django.test import TestCase
from rest_framework.test import APIClient 

from .models import *
from .views import *
# Create your tests here.

# class functionTests(APITestCase):
c = APIClient()#enforce_csrf_checks=True

response = c.post('/api/token/', {"username":"stu1", "password":"aaa12345"})
print(response.status_code)

user = User.objects.get(username = "stu1")
c.force_authenticate(user=user)
response = c.get('/api/getProgress/', format = 'json')
print(response.content)
print(response.status_code)

response = c.get('/api/words/',format = 'json')
print(response.content)

c.force_authenticate(user=None)