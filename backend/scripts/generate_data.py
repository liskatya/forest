import json
import requests


user = {
    "id": 0,
    "password": 'u',
    "email": 'u@u.u',
    "name": 'u',
    "role": 'User',
    "coins": 0,
    "personalityType": 'ISTJ'
}

psycologist = {
    "id": 0,
    "password": 'p',
    "email": 'p@p.p',
    "name": 'p',
    "role": 'Psychologist',
    "coins": 0,
    "personalityType": 'None'
}

king = {
    "id": 0,
    "password": 'k',
    "email": 'k@k.k',
    "name": 'k',
    "role": 'King',
    "coins": 0,
    "personalityType": 'None'
}

fairy = {
    "id": 0,
    "password": 'f',
    "email": 'f@f.f',
    "name": 'f',
    "role": 'Fairy',
    "coins": 0,
    "personalityType": 'None'
}

challenge_1 = {
    "id": 0,
    "title": 'title1',
    "description": 'desc1',
    "difficulty": 1,
    "positionX": 1.0,
    "positionY": 1.0,
    "kingApproved": False,
    "psychologistApproved": False,
    "routes": []
}

challenge_2 = {
    "id": 0,
    "title": 'title2',
    "description": 'desc2',
    "difficulty": 3,
    "positionX": 5.0,
    "positionY": 1.0,
    "kingApproved": False,
    "psychologistApproved": False,
    "routes": []
}

challenge_3 = {
    "id": 0,
    "title": 'title3',
    "description": 'desc3',
    "difficulty": 5,
    "positionX": 10.0,
    "positionY": 5.0,
    "kingApproved": False,
    "psychologistApproved": False,
    "routes": []
}

users = [user, fairy, king, psycologist]
challenges = [challenge_1, challenge_2, challenge_3]

headers = {'Content-Type': 'application/json'}
BACKEND_URL = 'http://localhost:8080/api/'

for user in users:
    json_data = json.dumps(user)
    response = requests.post(url=BACKEND_URL + 'user/create', data=json_data, headers=headers)
    if response.status_code == 200:
        print("POST request successful!")
    else:
        print("POST request failed!")

for challenge in challenges:
    json_data = json.dumps(challenge)
    response = requests.post(url=BACKEND_URL + 'navigation/challenge', data=json_data, headers=headers)
    if response.status_code == 200:
        print("POST request successful!")
    else:
        print("POST request failed!")

