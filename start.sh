#!/bin/sh

export PORT=8089
export ROOT_DIR=/usr/src/openmrs-microservice-upload
cd .
npm run build
npm start