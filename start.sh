#!/bin/sh

export PORT=8089
export ROOT_DIR=/usr/share/smartcerv
cd .
npm run build
npm start