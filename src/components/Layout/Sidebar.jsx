import { useState } from 'react';
import { useAppContext } from '../../hooks/useAppContext';
import ProjectList from '../TaskList/ProjectList';
import './Sidebar.css';

export default function Sidebar() {
  const { getOffenderTasks } = useAppContext();
  const [activeTab, setActiveTab] = useState('projects');

  const offenderTasks = getOffenderTasks();
  const hasOffenders = offenderTasks.length > 0;

  return (
    <aside className="sidebar">
      <div className="sidebar-tabs">
        <button
          className={`tab-btn ${activeTab === 'projects' ? 'active' : ''}`}
          onClick={() => setActiveTab('projects')}
        >
          📁 Projetos
          {hasOffenders && activeTab !== 'tasks' && (
            <span className="badge">{offenderTasks.length}</span>
          )}
        </button>
        <button
          className={`tab-btn ${activeTab === 'tasks' ? 'active' : ''}`}
          onClick={() => setActiveTab('tasks')}
        >
          ✓ Tarefas
          {hasOffenders && (
            <span className="badge warning">{offenderTasks.length}</span>
          )}
        </button>
      </div>

      <div className="sidebar-content">
        {activeTab === 'projects' ? (
          <ProjectList />
        ) : (
          <div className="offender-tasks">
            <h3>Tarefas sem Projeto</h3>
            {offenderTasks.length === 0 ? (
              <div className="empty-section">
                <p>✅ Nenhuma tarefa offensora</p>
              </div>
            ) : (
              <ul className="offender-list">
                {offenderTasks.map((task) => (
                  <li key={task.id} className="offender-item">
                    <span className="warning-icon">⚠️</span>
                    <span className="task-name">{task.nome}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </aside>
  );
}
