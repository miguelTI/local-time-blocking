# Processo de Deploy

## Status Atual ⚠️

O script `npm run deploy` (que usa `gh-pages -d dist`) tem problemas de autenticação em ambiente de desenvolvimento local. 

**Solução**: Usar deploy manual via Git.

---

## ✅ Método Correto de Deploy (Funcionando)

### Passo 1: Build
```bash
npm run build
```
Isso gera a pasta `dist/` com os arquivos prontos.

### Passo 2: Push para gh-pages
```bash
# Opção A: Push manual (recomendado para este projeto)
git checkout --orphan gh-pages
git rm -rf .
cp -r dist/* .
git add .
git commit -m "Deploy: [descrição]"
git push https://[TOKEN]@github.com/miguelTI/local-time-blocking.git gh-pages --force
git checkout [branch-anterior]

# Opção B: Usar gh-pages CLI (em ambiente com credenciais Git configuradas)
npm run deploy
```

---

## 🔧 Configuração Necessária

Para usar `npm run deploy`:

1. Configurar credenciais Git globalmente:
```bash
git config --global credential.helper store
echo "https://[TOKEN]@github.com" > ~/.git-credentials
chmod 600 ~/.git-credentials
```

2. Ou via SSH:
```bash
ssh-keygen -t ed25519 -C "seu-email@example.com"
# Adicionar chave pública ao GitHub
git config --global url.ssh://git@github.com/.insteadOf https://github.com/
```

---

## 📋 Checklist de Deploy

Antes de fazer deploy:
- [ ] Branch está atualizada
- [ ] Código está commitado
- [ ] `npm run build` rodou sem erros
- [ ] Testou a app em `npm run dev`
- [ ] Atualizou `README.md` se necessário
- [ ] Atualizou `PLANS.md` marcando sprints como completo

---

## 🚀 Fluxo Completo (Recomendado)

```bash
# 1. Desenvolver e testar
npm run dev
# ... fazer mudanças ...
git commit -m "feat: [descrição]"

# 2. Build
npm run build

# 3. Deploy manual
git checkout --orphan gh-pages
git rm -rf .
cp -r dist/* .
git add .
git commit -m "Deploy: [versão/descrição]"
git push https://[TOKEN]@github.com/miguelTI/local-time-blocking.git gh-pages --force
git checkout [branch-anterior]

# 4. Verificar
# Acesse: https://miguelti.github.io/local-time-blocking/
```

---

## 📌 Nota Importante

**O repositório está em um servidor Git local (`local_proxy`)** durante o desenvolvimento. Para fazer deploy corretamente para GitHub Pages, o remote deve apontar para GitHub:

```bash
git remote -v
# origin	https://github.com/miguelTI/local-time-blocking.git
```

Se não estiver assim, corrija:
```bash
git remote set-url origin https://github.com/miguelTI/local-time-blocking.git
```

---

## ✅ Verificação Pós-Deploy

Após fazer deploy, verifique:
1. Branch `gh-pages` existe e tem os arquivos
2. GitHub Pages está configurado para usar `gh-pages` branch
3. Acesse https://miguelti.github.io/local-time-blocking/
4. Teste a aplicação no navegador

---

## Troubleshooting

**"No such device or address"**
- Remote origin está incorreto (apontando para servidor local)
- Solução: `git remote set-url origin https://github.com/miguelTI/local-time-blocking.git`

**"Permission denied"**
- Token inválido ou expirado
- Solução: Gerar novo token e atualizar credenciais

**Cache antigo**
- Remover: `rm -rf node_modules/.cache/gh-pages/`
