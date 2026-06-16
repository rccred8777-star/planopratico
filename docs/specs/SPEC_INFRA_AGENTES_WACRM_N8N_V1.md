# SPEC — Infra Agentes, wacrm e n8n V1

## Arquitetura

```
VPS Hostinger
├── Container Hermes
│   ├── Hermes WebUI → porta 8787
│   └── Workspace: /data/workspace/planopratico/ ← wiki SDD
│
└── VPS raiz / Docker real (76.13.170.19)
    ├── Portainer
    ├── Nginx Proxy Manager
    ├── n8n
    ├── wacrm
    └── Supabase
```

## Hermes — Limitações

- Usuário: u4s (sem root, sem Docker)
- Pode: wiki, criativos, análise, relatórios
- Não pode: instalar, publicar, Meta Ads, WhatsApp, checkout

## n8n

- Subdomínio: `n8n.planopratico.shop`
- Porta interna: 5678
- Fluxos: boas-vindas pós-compra, recuperação de carrinho, sequência e-mail, alertas

## wacrm

- Subdomínio: `crm.planopratico.shop`
- Dependências: Docker + Supabase + número novo + Meta Cloud API
- **Número novo obrigatório** — número já usado em WhatsApp pessoal não pode ir direto para Cloud API

## Subdomínios

| Subdomínio | Serviço | Porta |
|---|---|---|
| `planopratico.shop` | Landing | 80/443 |
| `quiz.planopratico.shop` | Quiz | 80/443 |
| `n8n.planopratico.shop` | n8n | 5678 → proxy |
| `crm.planopratico.shop` | wacrm | proxy |
| `portainer.planopratico.shop` | Portainer | 9000 → proxy |

## Checklist de Pré-instalação

- [x] SSH root na VPS real
- [x] Docker instalado e funcional
- [x] DNS apontado para 76.13.170.19
- [ ] Número novo para WhatsApp
- [ ] Conta Meta Business criada
- [x] Supabase disponível (cloud)
