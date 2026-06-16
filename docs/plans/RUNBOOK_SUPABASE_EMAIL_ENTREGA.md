# Runbook — Supabase: E-mail de Entrega de Acesso DogFlow

## Onde configurar

Supabase Dashboard → Authentication → Email Templates

URL: https://supabase.com/dashboard/project/oardxsdiwaxmpomxhfls/auth/templates

---

## 1. Template: Invite User (o mais importante)

Este é o e-mail enviado quando o cliente compra e ainda não tem conta.

**Menu:** Authentication → Email Templates → **Invite User**

### Subject
```
Seu acesso ao DogFlow está pronto 🐾
```

### Body (HTML)
```html
<div style="font-family:Inter,system-ui,sans-serif;max-width:480px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;border:1px solid #f0f0f0">

  <!-- Header -->
  <div style="background:#ff7a11;padding:28px 32px;text-align:center">
    <p style="color:#fff;font-size:1.4rem;font-weight:900;margin:0">🐾 DogFlow</p>
    <p style="color:rgba(255,255,255,0.85);font-size:0.85rem;margin:4px 0 0">Desafio 7 Dias — Cão Mais Educado</p>
  </div>

  <!-- Body -->
  <div style="padding:32px">
    <h1 style="font-size:1.3rem;font-weight:800;color:#1a1a1a;margin:0 0 12px">Sua compra foi confirmada! ✅</h1>
    <p style="color:#374151;line-height:1.6;margin:0 0 24px">
      Clique no botão abaixo para criar sua senha e começar o Desafio 7 Dias agora mesmo.
    </p>

    <div style="text-align:center;margin:0 0 28px">
      <a href="{{ .ConfirmationURL }}"
         style="display:inline-block;background:#ff7a11;color:#fff;font-weight:700;font-size:1rem;padding:14px 32px;border-radius:10px;text-decoration:none;box-shadow:0 4px 14px rgba(255,122,17,0.35)">
        Criar minha senha e acessar →
      </a>
    </div>

    <div style="background:#fafaf7;border-radius:10px;padding:18px;margin-bottom:24px">
      <p style="font-weight:700;font-size:0.9rem;color:#1a1a1a;margin:0 0 10px">📋 Próximos passos:</p>
      <p style="color:#374151;font-size:0.88rem;line-height:1.7;margin:0">
        1. Clique no botão acima<br>
        2. Crie sua senha<br>
        3. Cadastre o nome e a idade do seu cão<br>
        4. Comece o Dia 1 — são 10 minutos 🐾
      </p>
    </div>

    <p style="color:#6b7280;font-size:0.8rem;line-height:1.5;margin:0">
      Este link expira em 24 horas. Se tiver qualquer problema, responda este e-mail ou fale com a gente pelo WhatsApp que você recebeu.<br><br>
      — Equipe Plano Prático
    </p>
  </div>

  <!-- Footer -->
  <div style="background:#f9fafb;border-top:1px solid #f0f0f0;padding:16px 32px;text-align:center">
    <p style="color:#9ca3af;font-size:0.72rem;margin:0">
      Plano Prático · planopratico.shop<br>
      Você recebeu este e-mail porque realizou uma compra em nosso site.
    </p>
  </div>
</div>
```

---

## 2. Template: Magic Link (cliente já tem conta / reacesso)

**Menu:** Authentication → Email Templates → **Magic Link**

### Subject
```
Seu link de acesso ao DogFlow 🐾
```

### Body (HTML)
```html
<div style="font-family:Inter,system-ui,sans-serif;max-width:480px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;border:1px solid #f0f0f0">

  <div style="background:#ff7a11;padding:28px 32px;text-align:center">
    <p style="color:#fff;font-size:1.4rem;font-weight:900;margin:0">🐾 DogFlow</p>
  </div>

  <div style="padding:32px">
    <h1 style="font-size:1.2rem;font-weight:800;color:#1a1a1a;margin:0 0 12px">Seu link de acesso</h1>
    <p style="color:#374151;line-height:1.6;margin:0 0 24px">
      Clique no botão abaixo para entrar no DogFlow. O link é válido por 1 hora.
    </p>

    <div style="text-align:center;margin:0 0 28px">
      <a href="{{ .ConfirmationURL }}"
         style="display:inline-block;background:#ff7a11;color:#fff;font-weight:700;font-size:1rem;padding:14px 32px;border-radius:10px;text-decoration:none">
        Acessar o DogFlow →
      </a>
    </div>

    <p style="color:#6b7280;font-size:0.8rem;line-height:1.5;margin:0">
      Se você não solicitou este link, ignore este e-mail.<br><br>
      — Equipe Plano Prático
    </p>
  </div>
</div>
```

---

## 3. Configurações de SMTP (opcional mas recomendado)

Por padrão, o Supabase envia e-mails pelo próprio servidor (limite de 3/hora em plano free).

Para volume maior, configurar SMTP próprio:

**Menu:** Authentication → Settings → SMTP Settings

Opções recomendadas (gratuitas até certo volume):
- **Resend** — https://resend.com (100 e-mails/dia free, ótima entregabilidade)
- **Brevo (ex-Sendinblue)** — 300/dia free
- **Amazon SES** — pago mas muito barato (~US$0,10/1000 e-mails)

### Configurar Resend (recomendado):
1. Criar conta em resend.com
2. Adicionar domínio `planopratico.shop` e verificar DNS
3. Gerar API Key
4. No Supabase SMTP:
   - Host: `smtp.resend.com`
   - Port: `465` (SSL)
   - User: `resend`
   - Password: `re_XXXXX` (a API key)
   - Sender: `acesso@planopratico.shop`
   - Sender name: `Plano Prático`

---

## 4. Site URL e Redirect URLs

**Menu:** Authentication → URL Configuration

| Campo | Valor |
|---|---|
| **Site URL** | `https://app.planopratico.shop` |
| **Redirect URLs** | `https://app.planopratico.shop/criar-senha` |

> ⚠️ Sem isso, o magic link redireciona para localhost e o cliente fica bloqueado.

---

## 5. Checklist de configuração

- [ ] Template "Invite User" customizado (subject + body)
- [ ] Template "Magic Link" customizado
- [ ] Site URL configurado: `https://app.planopratico.shop`
- [ ] Redirect URL adicionado: `https://app.planopratico.shop/criar-senha`
- [ ] SMTP externo configurado (Resend ou outro) — especialmente se > 3 vendas/hora
- [ ] Teste: comprar → verificar e-mail chegou com visual correto → clicar link → acessar app

---

## Fluxo de re-acesso (cliente esqueceu a senha)

O app `/login` já tem o fluxo de "esqueci a senha" — Supabase envia o Magic Link template.
Não precisa criar nada extra.
