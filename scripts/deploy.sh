#!/usr/bin/env bash

aws s3 sync public s3://app.recallq.com/public --acl public-read
aws s3 cp index.html s3://app.recallq.com --acl public-read
