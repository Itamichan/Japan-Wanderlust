import requests
import json

response = requests.post('http://localhost:5000/api/v1/users', data=json.dumps({
    'username': 'testtest5',
    'firstname': 'test',
    'lastname': 'test',
    'password': 'testtest',
    'email': 'test@gmail.com'
}), headers={'Content-Type': 'application/json'})

print(response.status_code, response.json())
assert response.status_code == 200, 'Endpoint does not respond with 200'

