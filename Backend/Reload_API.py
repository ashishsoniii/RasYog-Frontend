import requests
username = 'yoglabs'
token = '9c111b18dce5ad65819c398e86f8480a533387b2'
domain_name="yoglabs.pythonanywhere.com"

response = requests.post(
    'https://www.pythonanywhere.com/api/v0/user/{username}/webapps/{domain_name}/reload/'.format(
        username=username, domain_name=domain_name
    ),
    headers={'Authorization': 'Token {token}'.format(token=token)}
)
if response.status_code == 200:
    print(response.content)
else:
    print('Got unexpected status code {}: {!r}'.format(response.status_code, response.content))