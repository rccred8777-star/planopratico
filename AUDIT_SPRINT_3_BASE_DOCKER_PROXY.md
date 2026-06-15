# AUDIT — Sprint 3: Base Docker + Portainer + Nginx Proxy Manager

**Data de execução:** 2026-06-14  
**VPS:** srv1756424 | Ubuntu 24.04.4 LTS | IP: 76.13.170.19  
**Executor:** Claude Code (agente controlado)  
**Status geral:** SUCESSO

---

## 1. UFW — Firewall

| Porta | Protocolo | Status |
|-------|-----------|--------|
| 22    | TCP       | ALLOW IN |
| 80    | TCP       | ALLOW IN |
| 443   | TCP       | ALLOW IN |
| 81    | TCP       | ALLOW IN |
| 9000  | TCP       | ALLOW IN |
| 9443  | TCP       | ALLOW IN |

- UFW ativado e habilitado no boot.
- Porta 22 (SSH) confirmada aberta ANTES de habilitar o firewall.

---

## 2. Estrutura de Diretórios

```
/opt/planopratico/
├── stacks/
│   ├── portainer/
│   │   └── docker-compose.yml
│   └── nginxproxymanager/
│       └── docker-compose.yml
├── volumes/
│   ├── portainer_data/
│   ├── npm_data/
│   └── npm_letsencrypt/
├── backups/
├── scripts/
└── logs/
```

---

## 3. Rede Docker

| Rede              | Driver | Escopo |
|-------------------|--------|--------|
| planopratico_net  | bridge | local  |

---

## 4. Containers

| Nome                 | Imagem                          | Status    | Iniciado em (UTC)           |
|----------------------|---------------------------------|-----------|-----------------------------|
| portainer            | portainer/portainer-ce:latest   | Up        | 2026-06-14T18:05:49Z        |
| nginx-proxy-manager  | jc21/nginx-proxy-manager:latest | Up        | 2026-06-14T18:06:14Z        |

### Portas em uso

| Porta | Serviço              | Bind       |
|-------|----------------------|------------|
| 80    | nginx-proxy-manager  | 0.0.0.0    |
| 81    | NPM Admin UI         | 0.0.0.0    |
| 443   | nginx-proxy-manager  | 0.0.0.0    |
| 9000  | Portainer UI (HTTP)  | 0.0.0.0    |
| 9443  | Portainer UI (HTTPS) | 0.0.0.0    |

---

## 5. Validação de Saúde

| Endpoint             | Código HTTP | Resultado |
|----------------------|-------------|-----------|
| http://localhost:81  | 200         | OK        |
| http://localhost:9000| 200         | OK        |

---

## 6. Próximos Passos (Sprint 4+)

- Configurar DNS: `portainer.planopratico.shop` → porta 9000/9443
- Configurar DNS: `proxy.planopratico.shop` → porta 81
- Emitir certificados SSL via NPM (Let's Encrypt)
- Instalar n8n (sprint futura)
- Instalar wacrm (sprint futura)

---

## 7. Critérios de Parada — Nenhum Atingido

- [x] SSH mantido ativo na porta 22
- [x] Nenhum erro Docker
- [x] Portas 80/443 não estavam ocupadas antes do deploy
- [x] Nenhum container em reinício em loop
- [x] Escopo respeitado (sem n8n, sem wacrm, sem WhatsApp, sem DNS externo)

---

*Relatório gerado automaticamente pelo agente Claude Code em 2026-06-14.*
