#!/usr/bin/env bash

aws s3 sync public s3://app.recallq.com --acl public-read
