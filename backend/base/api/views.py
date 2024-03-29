from django.http import JsonResponse
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404

from .serializers import *
from base.models import *
from .forms import *
import csv


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        # ...

        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/token',
        '/api/token/refresh'
    ]
    return Response(routes)

# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def getNotes(request):
#     user = request.user
#     notes = user.note_set.all()
#     serializer = NoteSerializer(notes, many = True)
#     return Response(serializer.data)

@api_view(['GET'])
def updateVocab(request):
    # def insert_or_create_word(insertedStr):
    #     w, created = Word.objects.get_or_create(
    #         word=insertedStr
    #     )
    #     return w

    # def insert_or_create_example(insertedStr, word):
    #     eg, created = Example.objects.get_or_create(
    #         example = insertedStr,
    #         word = word
    #     )
    #     return eg

    # def insert_or_create_entry(word, example, meaning, attribute):
    #     new_entry, created = Entry.objects.get_or_create(
    #         word = word, 
    #         meaning = meaning,
    #         attribute = attribute
    #     )
    #     new_entry.example.add(example)

    #     return new_entry
    def get_new_from_csv(filepath):
        file = open(filepath,'r',encoding = 'UTF-8')
        csvreader = csv.reader(file)
        rows = []
        d = []
        for row in csvreader:
            rows.append(row)

        for r in rows:
            d.append([r[1], r[3], r[2], r[4]])  # word, example, meaning, attribute
        del d[0] # Column Name Row
        print("LIST COMPLETED")
        return d

    def insert_line(str_word, str_example, str_meaning, str_attribute):
        w, created = Word.objects.get_or_create(
            word=str_word
        )
        eg, eg_created = Example.objects.get_or_create(
            example = str_example,
            word = w
        )
        new_entry, created = Entry.objects.get_or_create(
            word = w, 
            meaning = str_meaning,
            attribute = str_attribute
        )
        if(eg_created):
            new_entry.example.add(eg)
        return new_entry
    cnt = 0
    for line in get_new_from_csv("base/api/csv/sheet.csv"):
        insert_line(line[0], line[1], line[2],line[3])
        print("LINE: " + str(cnt) + "COMPLETED")
        cnt += 1
    # e = insert_line("树", "两棵树","木头","名词")
    # e2 = insert_line("牛", "非常牛的","厉害","形容词")
    # e3 = insert_line("牛", "非常牛的第二个例子","厉害","形容词")

    # word_to_create = "十"
    # example_to_create = "十有八九"
    # w  = insert_or_create_word(word_to_create)
    # eg  = insert_or_create_example(example_to_create,w)
    # entry = insert_or_create_entry(w, eg,"10","数词")
    return Response()



@api_view(['GET'])
def getAllEntry(request):
    # entries = Entry.objects.all() # ORIGINAL
    entry = Entry.objects.prefetch_related("example")   # MASSIVELY IMPROVE FETCH PERFORMANCE
    serializer = EntrySerializer(entry, many = True)
    return Response(serializer.data)

@api_view(['GET'])
def getExamples(request):
    examples = Example.objects.all()
    serializer = ExampleSerializer(examples, many= True)
    return Response(serializer.data)

@api_view(['GET'])
def getWords(request):
    words = Word.objects.all()
    serializer = WordSerializer(words, many= True)
    return Response(serializer.data)

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


@api_view(['GET'])
# @permission_classes([IsAuthenticated])
def getStudentProgress(request):
    
    user = request.user
    p = user.studentprogress_set.all()
    serializer = StudentProgressSerializer(p, many = True)
    return Response(serializer.data)

# change a *user*'s progress 
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addStudentProgress(request):
    user = request.user
    data = request.data
    studentProgress = StudentProgress.objects.create(
        user = User.objects.get( pk = user.id),
        entry = Entry.objects.get(pk = data['entry']),
        progress = data['progress']
    )
    serializer = StudentProgressSerializer(studentProgress, many = False)
    return Response(serializer.data)

# get/put profile of user
@api_view(['GET','PUT'])
@permission_classes([IsAuthenticated])
def profileDetail(request):
    if request.method == 'GET':
    # print(request.user.id)
    # profile = get_object_or_404(Profile, pk = request.user.id)
    # print("REQUESTED PROFILE"+request.user)
    # serializer = ProfileSerializer(profile, many = True)
    # return Response(serializer.data)
        user = request.user
        
        # profile = user.profile
        profile, created = Profile.objects.get_or_create(user = request.user)
        if created:
            print("CREATED A NEW profile")
            serializer = ProfileSerializer(profile)
        else: 
            serializer = ProfileSerializer(profile)
        return Response(serializer.data)
    elif request.method == 'PUT':
        user = request.user
        profile = user.profile
        serializer = ProfileSerializer(profile, data = request.data)
   
        # profile = Profile.objects.update(
        #     user = User.objects.get( pk = user.id),
        #     name = data['name'],
        #     bio = data['bio']
        # )
        if(serializer.is_valid()):
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors)

# ? get the classes which the student is in 
@api_view(['GET','PUT'])
@permission_classes([IsAuthenticated])
def studentClassView(request):
    if request.method == 'GET':
        student = get_object_or_404(Student, user = request.data['user'])
        classes = student.classgroup_set.all()
        serializer = ClassGroupSerializer(classes, many = True)
        return Response(serializer.data)
    elif request.method == 'POST':
        # user = request.user
        classGroup = request.data['class']
        student = Student.objects.get_or_create(user = request.data['user'])

        serializer = StudentSerializer(student, data = classGroup, many=True)

   
        if(serializer.is_valid()):
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors)
    
# adding a "Student" table to a user
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addStudentView(request):
    
    user = request.user
    isStaff = user.profile.staff
    
    if isStaff:
        serializer = StudentSerializer(data = request.data)

        if(serializer.is_valid()):
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors)
    else: 
        return False

# get all existing students (Non-abstract)
@api_view(['GET'])
def getAllStudentView(request):
    
    students = Student.objects.all()
    serializer = StudentSerializer(students, many=True)

    return Response(serializer.data)

# get all existing classes 
@api_view(['GET'])
def getAllClassGroupView(request): 
    classes = ClassGroup.objects.all()
    serializer = ClassGroupSerializer(classes, many=True)
    return Response(serializer.data)

# get all student in this class
@api_view(['GET'])
def getAllStudentInClassView(request):
    group_id = request.data['group_id']
    classGroup = ClassGroup.objects.get(id = group_id)
    students = classGroup.user_set.all()
    serializer = StudentSerializer(students, many=True)

    return Response(serializer.data)
    
# Create a class
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createClass(request):
    
    admin = request.user
    isStaff = admin.profile.staff

    print(request.data)

    if isStaff:
        classGroup = ClassGroup.objects.create(
            admin = User.objects.get( pk = admin.id),
            name = request.data['name'],
            password = request.data['password'],
            description = request.data['description']
        )

        serializer = ClassGroupSerializer(classGroup)
        return Response(serializer.data)
    else:
        return False
    

# Join class using class name and password
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def joinClass(request):
    classGroup = get_object_or_404(ClassGroup, name = request.data['name'], password = request.data['password']) 
    student, created = Student.objects.get_or_create(user = request.user,classGroup = classGroup)
    serializer = StudentSerializer(student)
    return Response(serializer.data)
        
# Get class administrated/created by this user
@api_view(['GET'])
@permission_classes([IsAuthenticated]) 
def getClassByAdmin(request):
    # print(request.user.id)
    classGroup = ClassGroup.objects.filter(admin = request.user.id)
    
    serializer = ClassGroupSerializer(classGroup, many = True)
    return Response(serializer.data)

# get/put classGroup detail 
# name, id, description, *password, *students, ** date_created
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def classGroupDetail(request,id):
    if request.method == 'GET':
    # print(request.user.id)
    # profile = get_object_or_404(Profile, pk = request.user.id)
    # print("REQUESTED PROFILE"+request.user)
    # serializer = ProfileSerializer(profile, many = True)
    # return Response(serializer.data)
        # classid = request.data.id

        classGroup = ClassGroup.objects.get(id = id)
        
        serializer = ClassGroupSerializer(classGroup)
        return Response(serializer.data)
    # elif request.method == 'PUT':
        # user = request.user
        # profile = user.profile
        # serializer = ProfileSerializer(profile, data = request.data)
   
        # # profile = Profile.objects.update(
        # #     user = User.objects.get( pk = user.id),
        # #     name = data['name'],
        # #     bio = data['bio']
        # # )
        # if(serializer.is_valid()):
        #     serializer.save()
        #     return Response(serializer.data)
        # else:
        #     return Response(serializer.errors)