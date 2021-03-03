# Fieldtrip Lambdas

sam build  
sam package --output-template-file packaged.yaml --s3-bucket your_bucket_name  

sam deploy --template-file packaged.yaml  
  --stack-name FieldtripLambda  
  --capabilities CAPABILITY_IAM  
  --region us-east-1  
  –-parameter-overrides ApplicationId=<<yourApplicationId>>  