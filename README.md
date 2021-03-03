# Fieldtrip Lambdas

sam build  
sam package --output-template-file packaged.yaml --s3-bucket fieldtripuploads

sam deploy --template-file packaged.yaml  
  --stack-name FieldtripLambda  
  --capabilities CAPABILITY_IAM  
  --region us-east-1  
  –-parameter-overrides ApplicationId=1975c8b6bde04abe93f3e71850511869