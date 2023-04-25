import boto3
import pandas as pd
import io
import openpyxl
import os
from dotenv import load_dotenv

load_dotenv()


s3 = boto3.resource(
    service_name='s3',
    region_name='us-east-1',
    aws_access_key_id=os.getenv('AWS_ACCESS_KEY_ID'),
    aws_secret_access_key=os.getenv('AWS_SECERT_ACCESS_KEY'))

# for bucket in s3.buckets.all():
    # print(bucket.name)

bucket_name = os.getenv('AWS_BUCKET_NAME')

obj=s3.Bucket(bucket_name).Object('total_data_file.csv').get()
obj1=s3.Bucket(bucket_name).Object('Store_data_v2.xlsx').get()
# print(obj1)
# df=pd.read_csv(obj['Body'])
df = pd.read_csv(io.BytesIO(obj['Body'].read()))
df1 = pd.read_excel(io.BytesIO(obj1['Body'].read()))
# df1=pd.read_excel(obj1['Body'])

# with open('Store_data_v2.xlsx', 'rb') as f:
#     df1 = pd.read_excel(f, engine='openpyxl')
# folder_name = "name/ofyour/folders"

# s3.put_object(Bucket=bucket_name, Key=('/total_data_file.csv'))
# s3.put_object(Bucket=bucket_name, Key=('/Store_data_v2.xlsx'))

if __name__=="__main__":
    s3.Bucket(bucket_name).upload_file(Filename='total_data_file.csv',Key='total_data_file.csv')
    s3.Bucket(bucket_name).upload_file(Filename='Store_data_v2.xlsx',Key='Store_data_v2.xlsx')
    # print(df)
