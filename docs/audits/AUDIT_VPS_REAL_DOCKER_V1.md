# AUDIT VPS REAL DOCKER — Plano Prático V1

**Data:** 14/06/2026
**Sprint:** 2A

## Veredicto

> ### ✅ VPS LIMPA PARA IMPLANTAÇÃO COM DOCKER

## Identificação

| Campo | Valor |
|---|---|
| Hostname | `srv1756424` |
| Usuário | `root` |
| IP público | `76.13.170.19` |
| SO | Ubuntu 24.04.4 LTS |
| CPU | 2 vCPU |
| RAM | 7.8 GiB |
| Disco livre | ~94 GB |
| Docker | ✅ Instalado e ativo |
| Docker Compose | ✅ v5.1.4 |
| Containers | Nenhum (VPS limpa) |
| Nginx/Apache/Caddy | ❌ Não instalados |
| UFW | ❌ Inactive — risco alto |
| Portas abertas | 22 SSH apenas |

## Riscos

| Risco | Nível | Ação |
|---|---|---|
| UFW inativo | 🔴 Alto | Ativar com portas 22, 80, 443 |
| Sem proxy reverso | 🟡 Médio | Instalar Nginx Proxy Manager |
| unattended-upgrades | 🟡 Médio | Monitorar reinicializações |

## Decisões derivadas

- Usar `76.13.170.19` para toda stack Docker
- Proxy: Nginx Proxy Manager
- Rede Docker: `planopratico_net`
- Base: `/opt/planopratico`
- Ordem: UFW → Portainer → NPM → n8n → wacrm
