import boto3
import json
import os
from typing import Optional

class BedrockService:
    """AWS Bedrock service for AI coaching"""
    
    def __init__(self):
        self.client = boto3.client(
            service_name='bedrock-runtime',
            region_name=os.getenv('AWS_REGION', 'us-east-1')
        )
        self.model_id = os.getenv(
            'AWS_BEDROCK_MODEL',
            'anthropic.claude-3-haiku-20240307-v1:0'  # Cost-effective default
        )
    
    async def generate_text(
        self,
        system_prompt: str,
        user_prompt: str,
        max_tokens: int = 800,
        temperature: float = 0.8
    ) -> str:
        """Generate text using AWS Bedrock Claude models"""
        
        body = json.dumps({
            "anthropic_version": "bedrock-2023-05-31",
            "max_tokens": max_tokens,
            "temperature": temperature,
            "system": system_prompt,
            "messages": [
                {
                    "role": "user",
                    "content": user_prompt
                }
            ]
        })
        
        try:
            response = self.client.invoke_model(
                modelId=self.model_id,
                body=body
            )
            
            response_body = json.loads(response['body'].read())
            return response_body['content'][0]['text']
            
        except Exception as e:
            print(f"❌ Bedrock error: {e}")
            raise
