#!/bin/sh
cd /d/wamp/www/projectName
git checkout dev
git add .
git commit -am "Automatic push"
git push
echo Press Enter...
read