import requests
import io
from os import getenv
from dotenv import load_dotenv
load_dotenv()

username = getenv('API_USERNAME')
token = getenv('API_TOKEN')
domain_name="yoglabs.pythonanywhere.com"
# print(token,username)
def Reload():
    response = requests.post(
        'https://www.pythonanywhere.com/api/v0/user/{username}/webapps/{domain_name}/reload/'.format(
            username=username, domain_name=domain_name
        ),
        headers={'Authorization': 'Token {token}'.format(token=token)}
    )
    print(response.content)
    if response.status_code == 200 or response.status_code==409:
        return True
    else:
        return False
    
# print(Reload())