# Time Blocking System - Development Plan

**Versão**: 1.0  
**Data**: 21 de Maio de 2026  
**Status**: ✅ Aprovado  

---

## 📊 Progresso Geral

```
Phase 1: Foundation (Setup + State)
├─ Sprint 1.1: Project Setup & Architecture          ✅ COMPLETO
├─ Sprint 1.2: Data Models & Context API              ✅ COMPLETO
└─ Sprint 1.3: localStorage Integration               ⏳ PRÓXIMO

Phase 2: Core Features (CRUD)
├─ Sprint 2.1: Projetos CRUD
├─ Sprint 2.2: Tarefas CRUD
└─ Sprint 2.3: UI Sidebar + Taskbar

Phase 3: Calendário (Visualização)
├─ Sprint 3.1: Calendar Layout
├─ Sprint 3.2: Time Blocks Display
└─ Sprint 3.3: Drag-Drop Básico

Phase 4: Agendamento (Drag-Drop)
├─ Sprint 4.1: Drag-Drop para Agendar
├─ Sprint 4.2: Replanejamento
└─ Sprint 4.3: Remove from Calendar

Phase 5: Conclusão & Relatórios
├─ Sprint 5.1: Mark Complete
├─ Sprint 5.2: Cancel Task
└─ Sprint 5.3: Relatório de Métricas

Phase 6: Export & Polish
├─ Sprint 6.1: Export JSON
├─ Sprint 6.2: Bug Fixes & Refinement
└─ Sprint 6.3: MVP Release
```

**Resumo**: 2/18 sprints completas (11% do projeto)  
**Última atualização**: 21/05/2026 - Após Sprint 1.2

---

## 📌 Overview

Plano de desenvolvimento faseado do Time Blocking System, quebrando SPECS.md em fases executáveis com checkpoints claros.

---

## 🎯 Visão Geral do Faseamento

```
Phase 1: Foundation (Setup + State)
├─ Sprint 1.1: Project Setup & Architecture
├─ Sprint 1.2: Data Models & Context
└─ Sprint 1.3: localStorage Integration

Phase 2: Core Features (CRUD Básico)
├─ Sprint 2.1: Projetos CRUD
├─ Sprint 2.2: Tarefas CRUD
└─ Sprint 2.3: UI Sidebar + Taskbar

Phase 3: Calendário (Visualização)
├─ Sprint 3.1: Calendar Layout
├─ Sprint 3.2: Time Blocks Display
└─ Sprint 3.3: Drag-Drop Básico

Phase 4: Agendamento (Drag-Drop)
├─ Sprint 4.1: Drag-Drop para Agendar
├─ Sprint 4.2: Replanejamento
└─ Sprint 4.3: Remove from Calendar

Phase 5: Conclusão & Relatórios
├─ Sprint 5.1: Mark Complete (com input de tempo)
├─ Sprint 5.2: Cancel Task
├─ Sprint 5.3: Relatório de Métricas

Phase 6: Export & Polish
├─ Sprint 6.1: Export JSON
├─ Sprint 6.2: Bug Fixes & Refinamento
└─ Sprint 6.3: MVP Release

```

**Duração Estimada**: 2-3 semanas (depende da velocidade)

---

## 📋 Phase 1: Foundation

### Sprint 1.1: Project Setup & Architecture

**Objetivo**: Configurar projeto Vite + estrutura base

**Status**: ✅ **COMPLETO** (21/05/2026)

**Tasks**:
- [x] Criar projeto Vite: `npm create vite@latest time-blocking-system -- --template react`
- [x] Instalar dependências: `npm install`
- [x] Estruturar pastas (src/components, src/hooks, src/utils, src/context)
- [x] Criar `src/App.jsx` base (vazio por enquanto)
- [x] Criar `src/main.jsx` (mount app)
- [x] Criar `.gitignore`, `README.md` básico
- [x] Primeiro commit: "chore: project setup with Vite"

**Acceptance Criteria**:
- ✅ Projeto roda: `npm run dev`
- ✅ Estrutura de pastas criada
- ✅ Git inicializado e remoto vinculado

**Commit**: `73b2079` - feat: phase-1.1 - Project Setup & Architecture

---

### Sprint 1.2: Data Models & Context API

**Objetivo**: Definir estado global e Context

**Status**: ✅ **COMPLETO** (21/05/2026)

**Tasks**:
- [x] Criar `src/context/AppContext.jsx`:
  - [x] Define esquema de estado: { projects: [], tasks: [], schedules: [] }
  - [x] Funções CRUD completas: addProject, updateProject, deleteProject, getProjects
  - [x] Funções CRUD tasks: addTask, updateTask, deleteTask, getTasks, getTasksByProject, getOffenderTasks
  - [x] addSchedule com validações
  
- [x] Criar `src/hooks/useAppContext.jsx`:
  - [x] Custom hook para usar context facilmente
  - [x] Validação de Provider
  
- [x] Criar `src/utils/uuid.js`:
  - [x] Gera UUIDs v4 corretamente (RFC 4122)
  
- [x] Criar `src/utils/validation.js`:
  - [x] validateProjectName (nome obrigatório, max 100 chars)
  - [x] validateTaskName (nome obrigatório, max 255 chars)
  - [x] validateScheduleTime (formato HH:MM, validação de range)
  - [x] validateDate (formato YYYY-MM-DD)
  
- [x] Atualizar `src/App.jsx`:
  - [x] Wrapear com AppContextProvider
  - [x] Layout base (Header, Sidebar, MainPanel)
  - [x] CSS flexbox responsivo

**Acceptance Criteria**:
- ✅ Context criado e testável
- ✅ UUIDs gerados corretamente
- ✅ Validações funcionam
- ✅ npm run dev sem erros

**Commits**: 
- `88c9cc2` - feat: phase-1.2 - Data Models & Context API
- `d7a6c30` - chore: setup GitHub Pages deployment
- `d429b8f` - chore: move index.html to root for Vite

---

### Sprint 1.3: localStorage Integration

**Objetivo**: Persistência de dados

**Tasks**:
- [ ] Criar `src/utils/storage.js`:
  - `saveToLocalStorage(state)`: salva tudo
  - `loadFromLocalStorage()`: carrega tudo
  - `clearLocalStorage()`: limpa (para debug)
  - Tratamento de erro (quota exceeded)
  
- [ ] Criar `src/hooks/useLocalStorage.js`:
  - Hook que sincroniza estado com localStorage
  - Auto-save a cada mudança
  
- [ ] Integrar em AppContext:
  - useEffect que dispara saveToLocalStorage() a cada mudança de state
  - useEffect no mount que carrega dados salvos
  
- [ ] Testar: reload página, dados persistem

**Acceptance Criteria**:
- ✅ Dados salvam em localStorage
- ✅ Dados carregam ao abrir página
- ✅ Sem erros de JSON stringify/parse

---

## 📋 Phase 2: Core Features (CRUD)

### Sprint 2.1: Projetos CRUD

**Objetivo**: Criar, listar, editar, deletar projetos

**Tasks**:
- [ ] Implementar em AppContext:
  - `addProject(name)`: cria novo projeto
  - `updateProject(id, name)`: edita nome
  - `deleteProject(id)`: soft delete (ativo: false)
  - `getProjects()`: retorna todos ativos
  
- [ ] Criar `src/components/ProjectForm.jsx`:
  - Input para nome
  - Botão "Criar Projeto"
  - Validações + mensagens de erro
  
- [ ] Criar `src/components/ProjectList.jsx`:
  - Lista de projetos
  - Botão delete com confirmação
  - Botão edit (abre form)

**Acceptance Criteria**:
- ✅ Criar projeto: nome aparece na lista
- ✅ Editar: nome muda
- ✅ Deletar: aviso de confirmação + remove
- ✅ Dados persistem em localStorage

---

### Sprint 2.2: Tarefas CRUD

**Objetivo**: Criar, listar, editar tarefas

**Tasks**:
- [ ] Implementar em AppContext:
  - `addTask(name, project_id)`: project_id pode ser null
  - `updateTask(id, { nome?, projeto_id? })`: edita
  - `deleteTask(id)`: soft delete
  - `getTasks()`: todos ativos
  - `getTasksByProject(project_id)`: tarefas de um projeto
  - `getOffenderTasks()`: tarefas com projeto_id === null
  
- [ ] Criar `src/components/TaskForm.jsx`:
  - Input para nome
  - Dropdown para selecionar projeto (ou "Sem Projeto")
  - Botão "Criar Tarefa"
  - Validações
  
- [ ] Criar `src/components/TaskItem.jsx`:
  - Exibe nome, projeto (com cor?), estado
  - Botões: editar, deletar
  - Visual diferenciado para "ofensoras"

**Acceptance Criteria**:
- ✅ Criar tarefa: aparece na lista
- ✅ Criar sem projeto: marca como ofensora
- ✅ Editar: nome/projeto mudam
- ✅ Deletar: confirmação + remove
- ✅ Dados persistem

---

### Sprint 2.3: UI Sidebar + Layout

**Objetivo**: Interface básica (sem calendário ainda)

**Tasks**:
- [ ] Criar `src/components/Layout/Header.jsx`:
  - Título: "Time Blocking System"
  - Botão menu (ou deixar simples)
  
- [ ] Criar `src/components/Layout/Sidebar.jsx`:
  - Seção de Projetos (com ProjectList)
  - Seção de Tarefas Ofensoras (com visual de alerta)
  - Botões "Novo Projeto" e "Nova Tarefa"
  - Altura fixa, scrollável se necessário
  
- [ ] Criar `src/components/Layout/MainPanel.jsx`:
  - Placeholder: "Calendário virá aqui"
  - Aprox. 70% da tela
  
- [ ] Estilizar (CSS básico, sem Tailwind por enquanto):
  - Layout flexbox
  - Cores simples
  - Fonte legível

**Acceptance Criteria**:
- ✅ Sidebar à esquerda, projects e tarefas listados
- ✅ MainPanel à direita
- ✅ Botões funcionam (abrem forms)
- ✅ Responsive básico (desktop)

---

## 📋 Phase 3: Calendário (Visualização)

### Sprint 3.1: Calendar Layout

**Objetivo**: Estrutura visual do calendário semanal

**Tasks**:
- [ ] Criar `src/components/Calendar/WeekCalendar.jsx`:
  - Mostra semana atual (seg-dom)
  - Navegação: botões < Semana de XX/XX >
  - Grid: 7 colunas (dias), múltiplas linhas (horários)
  - Horários: 06:00 até 22:00 (1h cada)
  
- [ ] Criar `src/components/Calendar/DayColumn.jsx`:
  - Componente para cada dia
  - Mostra data + dia da semana
  - Slots de 1h (vazios por enquanto)
  
- [ ] Criar `src/components/Calendar/TimeSlot.jsx`:
  - Bloco horário individual
  - Altura fixa (ex: 60px para 1h)
  - Fundo claro, borda simples
  
- [ ] Criar `src/utils/date.js`:
  - Funções: weekStart(), weekEnd(), formatDate(), etc

**Acceptance Criteria**:
- ✅ Calendário renderiza com 7 dias + horas
- ✅ Navegação muda a semana
- ✅ Datas corretas (hoje destacado?)
- ✅ Slots vazios e clicáveis

---

### Sprint 3.2: Time Blocks Display

**Objetivo**: Mostrar tarefas agendadas no calendário

**Tasks**:
- [ ] Criar `src/components/Calendar/ScheduleBlock.jsx`:
  - Renderiza um bloco de tarefa agendada
  - Mostra: nome da tarefa, projeto (cor), tempo planejado
  - Altura proporcional ao tempo (ex: 2h = 120px se 1h = 60px)
  - Hover mostra detalhes
  
- [ ] Em `WeekCalendar`:
  - Iterar schedules ativos
  - Calcular posição (dia + hora)
  - Renderizar ScheduleBlock no lugar correto
  
- [ ] Estilizar:
  - Cores por projeto
  - Padding/margin
  - Typography clara

**Acceptance Criteria**:
- ✅ Tarefa agendada aparece no calendário
- ✅ Posição correta (dia + hora)
- ✅ Tamanho proporcional ao tempo
- ✅ Múltiplas tarefas no mesmo dia (sem overlap visual)

---

### Sprint 3.3: Drag-Drop Básico (Prep)

**Objetivo**: Preparar infraestrutura de drag-drop

**Tasks**:
- [ ] Instalar: `npm install react-beautiful-dnd` (ou equivalente)
  
- [ ] Em `TaskItem.jsx`:
  - Wrappear com `Draggable`
  - Marcar como draggable
  
- [ ] Em `WeekCalendar.jsx`:
  - Wrappear com `Droppable` em cada TimeSlot
  - Setup listeners (onDragOver, onDrop)
  
- [ ] Testar:
  - TaskItem pode ser arrastado
  - TimeSlot aceita drop
  - Log de evento (ainda sem ação)

**Acceptance Criteria**:
- ✅ Drag funciona (visual feedback)
- ✅ Drop é detectado
- ✅ Console logs de eventos

---

## 📋 Phase 4: Agendamento (Drag-Drop)

### Sprint 4.1: Drag-Drop para Agendar

**Objetivo**: Implementar F5 - Agendar Tarefa

**Tasks**:
- [ ] Em AppContext:
  - `scheduleTask(tarefa_id, data, hora_inicio, hora_fim)`: cria Schedule
  - Atualiza tarefa: estado → 'agendada'
  
- [ ] Em `WeekCalendar`:
  - onDrop handler:
    - Extrair tarefa_id do item arrastado
    - Extrair data + hora do TimeSlot alvo
    - Calcular hora_fim (ou usar 1h default)
    - Chamar `scheduleTask()`
    - Re-render
  
- [ ] Validações:
  - Tarefa não agendada 2x
  - Hora válida
  
- [ ] Feedback visual:
  - Mensagem de sucesso
  - Tarefa some do sidebar
  - Aparece no calendário

**Acceptance Criteria**:
- ✅ Drag tarefa para calendário: agendada
- ✅ Tarefa não aparece mais na lista "abertas"
- ✅ Aparece no calendário, posição correta
- ✅ Dados persistem

---

### Sprint 4.2: Replanejamento

**Objetivo**: Implementar F6 - Replanear (drag tarefa já agendada)

**Tasks**:
- [ ] Em AppContext:
  - `rescheduleeTask(tarefa_id, nova_data, nova_hora_inicio)`:
    - Marca agendamento anterior: ativo: false
    - Cria novo Schedule
    - Incrementa `historico_replanejamentos++`
    - Adiciona timestamp a `datas_replanejamento[]`
  
- [ ] Em `WeekCalendar`:
  - Detectar: está arrastando um ScheduleBlock (não TaskItem)
  - onDrop: chamar `rescheduleTask()` instead of `scheduleTask()`
  
- [ ] Feedback visual:
  - ScheduleBlock move no calendário
  - Contador de replanejamentos visível (hover/tooltip)

**Acceptance Criteria**:
- ✅ Drag tarefa agendada para novo horário: muda
- ✅ Contador de replanejamentos aumenta
- ✅ Histórico de datas registrado
- ✅ Dados persistem

---

### Sprint 4.3: Remove from Calendar

**Objetivo**: Implementar F7 - Remover de Calendário

**Tasks**:
- [ ] Em AppContext:
  - `unscheduleTask(tarefa_id)`:
    - Marca Schedule: ativo: false
    - Atualiza tarefa: estado → 'aberta'
  
- [ ] Em `ScheduleBlock`:
  - Botão "X" ou right-click menu
  - Click: chama `unscheduleTask()`
  
- [ ] Feedback visual:
  - ScheduleBlock desaparece
  - Tarefa volta ao sidebar

**Acceptance Criteria**:
- ✅ Botão X em tarefa agendada: remove do calendário
- ✅ Tarefa volta ao sidebar
- ✅ Dados persistem

---

## 📋 Phase 5: Conclusão & Relatórios

### Sprint 5.1: Mark Complete

**Objetivo**: Implementar F8 - Marcar Concluída

**Tasks**:
- [ ] Criar `src/components/CompleteTaskModal.jsx`:
  - Input para "Tempo Gasto" (em horas, decimal)
  - Botão "Concluir"
  - Validação: número positivo
  
- [ ] Em AppContext:
  - `completeTask(tarefa_id, tempo_gasto)`:
    - Atualiza tarefa: estado → 'concluída'
    - tempo_gasto = valor fornecido
    - data_conclusao = now()
    - Se estava agendada: marca Schedule: ativo: false
  
- [ ] Em `TaskItem`:
  - Botão "Concluir" (ou checkmark)
  - Click: abre modal
  
- [ ] Feedback visual:
  - Tarefa desaparece do sidebar
  - Se estava no calendário: desaparece
  - Dados prontos para relatório

**Acceptance Criteria**:
- ✅ Click "Concluir": abre modal
- ✅ Input tempo: valida
- ✅ Salva: tarefa desaparece
- ✅ Dados persistem

---

### Sprint 5.2: Cancel Task

**Objetivo**: Implementar F9 - Cancelar Tarefa

**Tasks**:
- [ ] Em AppContext:
  - `cancelTask(tarefa_id)`:
    - estado → 'cancelada'
    - data_cancelamento = now()
    - Se agendada: marca Schedule: ativo: false
  
- [ ] Em `TaskItem`:
  - Botão "Cancelar"
  - Click: confirmação + executa
  
- [ ] Feedback visual:
  - Tarefa desaparece
  - Avisos claros (confirmação)

**Acceptance Criteria**:
- ✅ Botão Cancelar com confirmação
- ✅ Tarefa desaparece
- ✅ Dados persistem

---

### Sprint 5.3: Relatório de Métricas

**Objetivo**: Implementar F16 - Dashboard de Métricas

**Tasks**:
- [ ] Criar `src/components/MetricsPanel.jsx`:
  - Por cada projeto:
    - Tempo gasto total (sum de tempo_gasto, tarefas concluídas)
    - Tarefas concluídas
    - Tarefas canceladas
    - Tarefas em aberto
    - Replanejamentos totais
  
  - Seção "Ofensoras":
    - Tarefas em aberto sem projeto
    - Alerta: "⚠️ Tarefas não alignadas a nenhum objetivo"
  
- [ ] Em AppContext:
  - Funções de cálculo: `getMetricsByProject()`, `getMetricsOverall()`
  
- [ ] Estilizar:
  - Cards ou tabela
  - Cores destacam problemas (ofensoras)
  - Números grandes e legíveis

**Acceptance Criteria**:
- ✅ Painel mostra métricas corretas
- ✅ Atualiza ao concluir/cancelar tarefas
- ✅ Seção de ofensoras clara

---

## 📋 Phase 6: Export & Polish

### Sprint 6.1: Export JSON

**Objetivo**: Implementar F14 - Exportar Dados

**Tasks**:
- [ ] Criar `src/utils/export.js`:
  - `exportToJSON()`: serializa estado + gera blob
  - Trigger download automático
  - Nome arquivo: `timeblocking-export-YYYY-MM-DD.json`
  
- [ ] Criar `src/components/ExportButton.jsx`:
  - Botão "Exportar Dados"
  - Click: chama export
  - Feedback: "✅ Exportado!"
  
- [ ] Testar:
  - Download funciona
  - JSON é válido
  - Pode reimportar depois (V2)

**Acceptance Criteria**:
- ✅ Botão funciona
- ✅ Arquivo baixado
- ✅ JSON válido e legível

---

### Sprint 6.2: Bug Fixes & Refinement

**Objetivo**: Polir MVP

**Tasks**:
- [ ] Testar fluxos:
  - Criar projeto → tarefa → agendar → concluir
  - Replanear múltiplas vezes
  - Reload página: dados persistem?
  
- [ ] Corrigir bugs encontrados
  
- [ ] UX refinements:
  - Confirmações claras
  - Mensagens de erro
  - Loading indicators (se necessário)
  - Acessibilidade básica (alt text, ARIA labels)
  
- [ ] Performance:
  - Não deve ser lento com 100+ tarefas
  - Sem memory leaks (React DevTools)

**Acceptance Criteria**:
- ✅ Sem bugs critério
- ✅ UX polida
- ✅ Performance OK

---

### Sprint 6.3: MVP Release

**Objetivo**: Finalizar e preparar launch

**Tasks**:
- [ ] README.md completo:
  - Como instalar
  - Como usar (quick start)
  - Features listadas
  - Screenshots (opcional)
  
- [ ] Clean up:
  - Remove console.logs
  - Remove código de debug
  - Formatar código (Prettier)
  
- [ ] Últimos testes (manual)
  
- [ ] Release commit: `chore: MVP v1.0 release`
  
- [ ] Tag no GitHub: `v1.0`

**Acceptance Criteria**:
- ✅ README completo
- ✅ Código limpo
- ✅ Sem bugs conhecidos
- ✅ Release pronto

---

## 📊 Estimativas

| Phase | Sprints | Estimativa |
|-------|---------|-----------|
| 1     | 3       | 3-4 dias  |
| 2     | 3       | 4-5 dias  |
| 3     | 3       | 4-5 dias  |
| 4     | 3       | 5-6 dias  |
| 5     | 3       | 4-5 dias  |
| 6     | 3       | 2-3 dias  |
| **Total** | **18** | **22-28 dias** |

**Notas**:
- Estimativas assumem 1-2 horas/dia dedicadas
- Podem variar baseado em complexidade encontrada
- Drag-drop é a parte mais complexa (Phase 4)

---

## 🔄 Processo de Trabalho

Para **cada Sprint**:

1. **Planning**: Revisar tasks, clarificar dúvidas
2. **Development**: Claude Code implementa, você revisa PRs
3. **Testing**: Testar manualmente no navegador
4. **Refinement**: Ajustar se necessário
5. **Commit**: Merge da PR, commit com mensagem clara

**Padrão de PR**:
```
Title: feat: [Phase].[Sprint] - Descrição

Body:
- Implementa: Feature X, Y
- Testes: Testado em navegador
- Checklist:
  - [ ] Feature funciona
  - [ ] localStorage persiste
  - [ ] Sem console errors
```

---

## ✅ Checkpoint de Aprovação

- **Revisor**: Usuário
- **Status**: ✅ Pronto para CLAUDE.md
- **Próximo**: CLAUDE.md (instruções para Claude Code)

