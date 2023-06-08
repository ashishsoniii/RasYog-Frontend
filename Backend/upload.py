from boto3 import resource
from pandas import read_csv,read_excel
import io
from os import getenv
from dotenv import load_dotenv

load_dotenv()


s3 = resource(
    service_name='s3',
    region_name='us-east-1',
    aws_access_key_id=getenv('AWS_ACCESS_KEY_ID'),
    aws_secret_access_key=getenv('AWS_SECERT_ACCESS_KEY'))

# for bucket in s3.buckets.all():
    # print(bucket.name)

bucket_name = getenv('AWS_BUCKET_NAME')
# s3 = boto3.resource(
#     service_name='s3',
#     region_name='us-east-1',
#     aws_access_key_id='AKIAZ5V2LOMZDSJUXLN6',
#     aws_secret_access_key='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')

# # for bucket in s3.buckets.all():
#     # print(bucket.name)

# bucket_name ='newsyog-file-storage'

obj=s3.Bucket(bucket_name).Object('total_data_file.csv').get()
obj1=s3.Bucket(bucket_name).Object('Store_data_v2.xlsx').get()
# print(obj1)
# df=pd.read_csv(obj['Body'])
df = read_csv(io.BytesIO(obj['Body'].read()))
df1 =read_excel(io.BytesIO(obj1['Body'].read()))
# df1=pd.read_excel(obj1['Body'])

# with open('Store_data_v2.xlsx', 'rb') as f:
#     df1 = pd.read_excel(f, engine='openpyxl')
# folder_name = "name/ofyour/folders"

# s3.put_object(Bucket=bucket_name, Key=('/total_data_file.csv'))
# s3.put_object(Bucket=bucket_name, Key=('/Store_data_v2.xlsx'))
def Upload_File():
    s3.Bucket(bucket_name).upload_file(Filename='Store_data_v2.xlsx',Key='Store_data_v2.xlsx')
    s3.Bucket(bucket_name).upload_file(Filename='total_data_file.csv',Key='total_data_file.csv')

    # s3.Bucket(bucket_name).upload_file(Filename='PranavMalpani2.xlsx',Key='PranavMalpani2.xlsx')
    # print(df)

# if __name__=="__main__"
