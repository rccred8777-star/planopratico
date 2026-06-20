#!/bin/bash
docker restart nginx-proxy-manager
echo "aguardando..."
sleep 8

TOKEN=$(curl -s -X POST "http://localhost:81/api/tokens" \
  -H "Content-Type: application/json" \
  -d '{"identity":"rccred8777@gmail.com","secret":"Jr131211?"}' | python3 -c "import sys,json; print(json.load(sys.stdin)['token'])")

echo "Solicitando certificado SSL para painel.planopratico.shop..."
curl -s -X POST "http://localhost:81/api/nginx/certificates" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "provider": "letsencrypt",
    "domain_names": ["painel.planopratico.shop"],
    "meta": {"letsencrypt_agree": true, "dns_challenge": false}
  }' | python3 -c "import sys,json; d=json.load(sys.stdin); print('cert id:', d.get('id','erro'), d.get('error','ok'))"
