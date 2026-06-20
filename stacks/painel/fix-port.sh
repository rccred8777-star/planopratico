#!/bin/bash
echo "=== O que está na porta 3001 ==="
ss -tlnp | grep 3001 || echo "ss não disponível"
fuser 3001/tcp 2>/dev/null || echo "nada encontrado com fuser"
docker ps --format "{{.Names}} {{.Ports}}" | grep 3001 || echo "nenhum container docker na 3001"

echo ""
echo "=== Parando container painel antigo se existir ==="
docker rm -f painel 2>/dev/null && echo "container painel removido" || echo "sem container painel"

echo ""
echo "=== Subindo painel ==="
cd /opt/planopratico/stacks/painel && docker compose up -d
echo "done"
