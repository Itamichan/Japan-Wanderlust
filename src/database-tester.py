import requests
import json

response = requests.post('http://localhost:5000/api/v1/users', data=json.dumps({
    'username': 'cristina23',
    'firstname': 'cristina',
    'lastname': 'garbuz',
    'password': 'helooo23,',
    'email': 'cristina@gmail.com'
}), headers={'Content-Type': 'application/json'})


assert response.status_code == 200, 'Endpoint does not respond with 200'
print(response.status_code, response.json())
