#!/bin/bash

set -ex


rm -rf ./distribution/bit.rb
mkdir -p ./distribution
SHA=$( curl -s $1 |shasum -b -a 256| cut -d ' ' -f 1 )
sed  's#sha256 ""#sha256 "'${SHA}'"#' ./scripts/bit.rb | sed  's#url ""#url "'$1'"#' > ./distribution/bit.rb
