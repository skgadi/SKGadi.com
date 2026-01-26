hugo --cleanDestinationDir

rmdir /s /q docs

move public docs

git add .
git commit -am "Automatic push"
git push
