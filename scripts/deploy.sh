#!/usr/bin/env bash

aws s3 sync public s3://app.recallq.com --acl public-read
aws s3 cp --metadata-directive REPLACE --cache-control max-age=0,s-maxage=0 s3://app.recallq.com/index.html s3://app.recallq.com/index.html --acl public-read
