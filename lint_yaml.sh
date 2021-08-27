#!/usr/bin/env bash
for file in **/**/*.yaml
do
  if ! yamllint "$file"
  then 
  	export FAILED=true; 
  fi; 
done
if [ "$FAILED" != "" ]
  then exit 1; 
fi

