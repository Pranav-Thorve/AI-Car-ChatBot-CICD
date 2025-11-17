import os
import sys
import time
import logging
import boto3
from botocore.exceptions import ClientError, EndpointConnectionError

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("downloader")

S3_BUCKET = os.getenv("S3_BUCKET")
S3_PREFIX = os.getenv("S3_PREFIX", "")
LOCAL_DIR = os.getenv("MODEL_LOCAL_DIR", "/app/weights")
AWS_REGION = os.getenv("AWS_REGION")

if not S3_BUCKET:
    logger.error("S3_BUCKET not set")
    sys.exit(1)

s3 = boto3.client("s3", region_name=AWS_REGION) if AWS_REGION else boto3.client("s3")

def main():
    os.makedirs(LOCAL_DIR, exist_ok=True)

    paginator = s3.get_paginator("list_objects_v2")
    pages = paginator.paginate(Bucket=S3_BUCKET, Prefix=S3_PREFIX)

    found = False
    for page in pages:
        for obj in page.get("Contents", []):
            found = True
            key = obj["Key"]
            if key.endswith("/"):
                continue

            local_path = os.path.join(
                LOCAL_DIR,
                key[len(S3_PREFIX):].lstrip("/")
            )

            os.makedirs(os.path.dirname(local_path), exist_ok=True)

            logger.info("Downloading %s -> %s", key, local_path)
            s3.download_file(S3_BUCKET, key, local_path)

    if not found:
        logger.error("No model files found in S3 path")
        sys.exit(2)

    logger.info("Download complete")
    return 0

if __name__ == "__main__":
    sys.exit(main())

