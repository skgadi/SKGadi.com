#!/bin/sh
git checkout dev
git add .
git commit -am "Automatic push"
git push
echo Press Enter...
read