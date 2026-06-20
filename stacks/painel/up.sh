#!/bin/bash
docker rm -f painel 2>/dev/null
cd /opt/planopratico/stacks/painel && docker compose up -d
docker logs painel --tail 5
