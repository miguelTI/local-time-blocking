import { createContext, useState, useCallback } from 'react';
import { generateUUID } from '../utils/uuid';
import { validateProjectName, validateTaskName, validateScheduleTime, validateDate } from '../utils/validation';

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
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}
