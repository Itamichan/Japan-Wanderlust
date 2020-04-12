import requests
import json
#
response = requests.post('http://localhost:5000/api/v1/users', data=json.dumps({
    'username': 'testtest2',
    'password': 'testtest',
    'email': 'test@gmail.com'
}), headers={'Content-Type': 'application/json'})

print(response.status_code, response.json())
assert response.status_code == 200, 'Endpoint does not respond with 200'

response = requests.post('http://localhost:5000/api/v1/token', data=json.dumps({
    'username': 'testtest2',
    'password': 'testtest'
}), headers={'Content-Type': 'application/json'}, timeout=1)

print(response.status_code, response.content)
assert response.status_code == 200, 'Endpoint does not respond with 200'
assert 'token' in response.json(), 'Response dict has no token inside'

jwt = response.json()['token']
print("Token", jwt)

response = requests.post('http://localhost:5000/api/v1/token/verify', data=json.dumps({
    'token': jwt
}), headers={'Content-Type': 'application/json'})

print(response.status_code, response.content)
assert response.status_code == 200, 'Endpoint does not respond with 200'

response = requests.get('http://localhost:5000/api/v1/types')

print(response.status_code, response.json())
assert response.status_code == 200, 'Endpoint does not respond with 200'

# response = requests.get('http://localhost:5000/api/v1/attractions')
#
# print(response.status_code, response.json())
# assert response.status_code == 200, 'Endpoint does not respond with 200'
#
# response = requests.get('http://localhost:5000/api/v1/attractions?text=fU')
#
# print(response.status_code, response.json())
# assert response.status_code == 200, 'Endpoint does not respond with 200'

response = requests.get('http://localhost:5000/api/v1/attractions?city_id=2')

print(response.status_code, response.json())
assert response.status_code == 200, 'Endpoint does not respond with 200'

response = requests.get('http://localhost:5000/api/v1/attractions?text=fu&city_id=2')

print(response.status_code, response.json())
assert response.status_code == 200, 'Endpoint does not respond with 200'

response = requests.get('http://localhost:5000/api/v1/attractions?city_id=2')

print(response.status_code, response.json())
assert response.status_code == 200, 'Endpoint does not respond with 200'