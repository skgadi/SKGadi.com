docker build -t skgadi-main .
docker login
docker tag skgadi-main:latest skgadi/skgadi-main:latest
docker push skgadi/skgadi-main:latest