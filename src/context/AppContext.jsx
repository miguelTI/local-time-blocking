import { createContext, useState, useCallback, useEffect } from 'react';
import { generateUUID } from '../utils/uuid';
import { validateProjectName, validateTaskName, validateScheduleTime, validateDate } from '../utils/validation';
import { saveToLocalStorage, loadFromLocalStorage } from '../utils/storage';

export const AppContext = createContext();

export function AppContextProvider({ children }) {
  const [state, setState] = useState({
    projects: [],
    tasks: [],
    schedules: [],
  });

  const addProject = useCallback((nome, cor = null) => {
    validateProjectName(nome);

    const newProject = {
      id: generateUUID(),
      nome: nome.trim(),
      cor: cor || null,
      data_criacao: Date.now(),
      ativo: true,
    };

    setState((prev) => ({
      ...prev,
      projects: [...prev.projects, newProject],
    }));

    return newProject;
  }, []);

  const updateProject = useCallback((id, updates) => {
    if (updates.nome) {
      validateProjectName(updates.nome);
    }

    setState((prev) => ({
      ...prev,
      projects: prev.projects.map((p) =>
        p.id === id ? { ...p, ...updates } : p
      ),
    }));
  }, []);

  const deleteProject = useCallback((id) => {
    setState((prev) => ({
      ...prev,
      projects: prev.projects.map((p) =>
        p.id === id ? { ...p, ativo: false } : p
      ),
    }));
  }, []);

  const getProjects = useCallback(() => {
    return state.projects.filter((p) => p.ativo);
  }, [state.projects]);

  const addTask = useCallback((nome, projeto_id = null) => {
    validateTaskName(nome);

    const newTask = {
      id: generateUUID(),
      nome: nome.trim(),
      projeto_id: projeto_id || null,
      estado: 'aberta',
      tempo_planejado: null,
      tempo_gasto: null,
      data_agendado: null,
      data_conclusao: null,
      data_cancelamento: null,
      historico_replanejamentos: 0,
      datas_replanejamento: [],
      data_criacao: Date.now(),
      ativo: true,
    };

    setState((prev) => ({
      ...prev,
      tasks: [...prev.tasks, newTask],
    }));

    return newTask;
  }, []);

  const updateTask = useCallback((id, updates) => {
    if (updates.nome) {
      validateTaskName(updates.nome);
    }

    setState((prev) => ({
      ...prev,
      tasks: prev.tasks.map((t) =>
        t.id === id ? { ...t, ...updates } : t
      ),
    }));
  }, []);

  const deleteTask = useCallback((id) => {
    setState((prev) => ({
      ...prev,
      tasks: prev.tasks.map((t) =>
        t.id === id ? { ...t, ativo: false } : t
      ),
    }));
  }, []);

  const getTasks = useCallback(() => {
    return state.tasks.filter((t) => t.ativo);
  }, [state.tasks]);

  const getTasksByProject = useCallback((projeto_id) => {
    return state.tasks.filter((t) => t.ativo && t.projeto_id === projeto_id);
  }, [state.tasks]);

  const getOffenderTasks = useCallback(() => {
    return state.tasks.filter((t) => t.ativo && t.projeto_id === null && t.estado === 'aberta');
  }, [state.tasks]);

  const addSchedule = useCallback((tarefa_id, data, hora_inicio, hora_fim) => {
    validateDate(data);
    validateScheduleTime(hora_inicio, hora_fim);

    const newSchedule = {
      id: generateUUID(),
      tarefa_id,
      data,
      hora_inicio,
      hora_fim,
      data_criacao: Date.now(),
      ativo: true,
    };

    setState((prev) => ({
      ...prev,
      schedules: [...prev.schedules, newSchedule],
    }));

    updateTask(tarefa_id, { estado: 'agendada', data_agendado: Date.now() });

    return newSchedule;
  }, [updateTask]);

  const rescheduleTask = useCallback((tarefa_id, nova_data, nova_hora_inicio, nova_hora_fim) => {
    validateDate(nova_data);
    validateScheduleTime(nova_hora_inicio, nova_hora_fim);

    setState((prev) => {
      const oldSchedule = prev.schedules.find(
        (s) => s.tarefa_id === tarefa_id && s.ativo
      );

      if (!oldSchedule) {
        return prev; // Retorna estado anterior sem mudanças
      }

      return {
        ...prev,
        schedules: [
          ...prev.schedules.map((s) =>
            s.id === oldSchedule.id ? { ...s, ativo: false } : s
          ),
          {
            id: generateUUID(),
            tarefa_id,
            data: nova_data,
            hora_inicio: nova_hora_inicio,
            hora_fim: nova_hora_fim,
            data_criacao: Date.now(),
            ativo: true,
          },
        ],
        tasks: prev.tasks.map((t) =>
          t.id === tarefa_id
            ? {
                ...t,
                historico_replanejamentos: t.historico_replanejamentos + 1,
                datas_replanejamento: [...t.datas_replanejamento, Date.now()],
              }
            : t
        ),
      };
    });
  }, []);

  useEffect(() => {
    const savedState = loadFromLocalStorage();
    if (savedState) {
      setState(savedState);
    }
  }, []);

  useEffect(() => {
    saveToLocalStorage(state);
  }, [state]);

  const unscheduleTask = useCallback((tarefa_id) => {
    setState((prev) => ({
      ...prev,
      schedules: prev.schedules.map((s) =>
        s.tarefa_id === tarefa_id && s.ativo ? { ...s, ativo: false } : s
      ),
      tasks: prev.tasks.map((t) =>
        t.id === tarefa_id ? { ...t, estado: 'aberta' } : t
      ),
    }));
  }, []);

  const completeTask = useCallback((tarefa_id, tempo_gasto) => {
    if (!tempo_gasto || tempo_gasto <= 0) {
      throw new Error('Tempo gasto deve ser um número positivo');
    }

    setState((prev) => ({
      ...prev,
      schedules: prev.schedules.map((s) =>
        s.tarefa_id === tarefa_id && s.ativo ? { ...s, ativo: false } : s
      ),
      tasks: prev.tasks.map((t) =>
        t.id === tarefa_id
          ? {
              ...t,
              estado: 'concluída',
              tempo_gasto: parseFloat(tempo_gasto),
              data_conclusao: Date.now(),
            }
          : t
      ),
    }));
  }, []);

  const cancelTask = useCallback((tarefa_id) => {
    setState((prev) => ({
      ...prev,
      schedules: prev.schedules.map((s) =>
        s.tarefa_id === tarefa_id && s.ativo ? { ...s, ativo: false } : s
      ),
      tasks: prev.tasks.map((t) =>
        t.id === tarefa_id
          ? {
              ...t,
              estado: 'cancelada',
              data_cancelamento: Date.now(),
            }
          : t
      ),
    }));
  }, []);

  const getMetricsByProject = useCallback(() => {
    const projects = state.projects.filter((p) => p.ativo);

    return projects.map((project) => {
      const projectTasks = state.tasks.filter(
        (t) => t.projeto_id === project.id && t.ativo === false
      );

      const completedTasks = projectTasks.filter((t) => t.estado === 'concluída');
      const canceledTasks = projectTasks.filter((t) => t.estado === 'cancelada');
      const openTasks = state.tasks.filter(
        (t) => t.projeto_id === project.id && t.estado === 'aberta'
      );

      const totalTimeSpent = completedTasks.reduce(
        (sum, t) => sum + (t.tempo_gasto || 0),
        0
      );

      const totalReschedules = state.tasks
        .filter((t) => t.projeto_id === project.id)
        .reduce((sum, t) => sum + (t.historico_replanejamentos || 0), 0);

      return {
        projeto_id: project.id,
        nome: project.nome,
        cor: project.cor,
        tempo_gasto_total: totalTimeSpent,
        tarefas_concluidas: completedTasks.length,
        tarefas_canceladas: canceledTasks.length,
        tarefas_abertas: openTasks.length,
        replanejamentos_total: totalReschedules,
      };
    });
  }, [state.projects, state.tasks]);

  const value = {
    state,
    addProject,
    updateProject,
    deleteProject,
    getProjects,
    addTask,
    updateTask,
    deleteTask,
    getTasks,
    getTasksByProject,
    getOffenderTasks,
    addSchedule,
    rescheduleTask,
    unscheduleTask,
    completeTask,
    cancelTask,
    getMetricsByProject,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}
