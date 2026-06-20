#!/b 
docker compose down
docker compose up -d --build
docker logs painel --tail 5
