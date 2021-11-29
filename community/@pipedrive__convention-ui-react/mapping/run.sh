#!/usr/bin/env bash

python3 parse.py

node modify.js

wc -l dont_haves.json
wc -l mappings.json
wc -l mappings-with-normalized.json
