import { useState } from 'react';
import { useAppContext } from '../../hooks/useAppContext';
import './TaskItem.css';

export default function TaskItem({ task, projectColor }) {
  const { deleteTask, getProjects } = useAppContext();
  const [isDeleting, setIsDeleting] = useState(false);
  const projects = getProjects();

  const project = projects.find((p) => p.id === task.projeto_id);

  const handleDelete = () => {
    if (window.confirm(`Deletar tarefa "${task.nome}"?`)) {
      setIsDeleting(true);
      try {
        deleteTask(task.id);
      } catch (err) {
        console.error('Erro ao deletar:', err);
        setIsDeleting(false);
      }
    }
  };

  const isOffender = !task.projeto_id;

  return (
    <div className={`task-item ${isOffender ? 'offender' : ''}`}>
      <div className="task-color" style={{ backgroundColor: projectColor }} />
      <div className="task-info">
        <span className="task-name">{task.nome}</span>
        {project && (
          <span className="task-project">{project.nome}</span>
        )}
        {isOffender && (
          <span className="task-offender-badge">⚠️ Sem Projeto</span>
        )}
      </div>
      <div className="task-actions">
        <button
          className="action-btn delete"
          onClick={handleDelete}
          disabled={isDeleting}
          title="Deletar"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
