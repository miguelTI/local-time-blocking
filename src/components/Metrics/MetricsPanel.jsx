import { useAppContext } from '../../hooks/useAppContext';
import './MetricsPanel.css';

export default function MetricsPanel() {
  const { getMetricsByProject, getOffenderTasks } = useAppContext();
  const metrics = getMetricsByProject();
  const offenderTasks = getOffenderTasks();

  return (
    <div className="metrics-panel">
      <h2>📊 Relatório de Métricas</h2>

      <div className="metrics-grid">
        {metrics.map((metric) => (
          <div key={metric.projeto_id} className="metric-card">
            <div className="metric-header">
              <div className="metric-color" style={{ backgroundColor: metric.cor }} />
              <h3>{metric.nome}</h3>
            </div>

            <div className="metric-stats">
              <div className="stat">
                <span className="stat-label">Tempo Gasto</span>
                <span className="stat-value">{metric.tempo_gasto_total.toFixed(1)}h</span>
              </div>
              <div className="stat">
                <span className="stat-label">Concluídas</span>
                <span className="stat-value stat-completed">
                  {metric.tarefas_concluidas}
                </span>
              </div>
              <div className="stat">
                <span className="stat-label">Canceladas</span>
                <span className="stat-value stat-canceled">
                  {metric.tarefas_canceladas}
                </span>
              </div>
              <div className="stat">
                <span className="stat-label">Abertas</span>
                <span className="stat-value stat-open">
                  {metric.tarefas_abertas}
                </span>
              </div>
              <div className="stat">
                <span className="stat-label">Replanejamentos</span>
                <span className="stat-value stat-reschedule">
                  {metric.replanejamentos_total}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {offenderTasks.length > 0 && (
        <div className="offender-section">
          <h3>⚠️ Tarefas sem Projeto</h3>
          <p className="offender-message">
            {offenderTasks.length} tarefa{offenderTasks.length !== 1 ? 's' : ''} em aberto sem estar associada a um projeto.
          </p>
          <ul className="offender-list">
            {offenderTasks.map((task) => (
              <li key={task.id} className="offender-item">
                {task.nome}
              </li>
            ))}
          </ul>
        </div>
      )}

      {metrics.length === 0 && offenderTasks.length === 0 && (
        <div className="empty-state">
          <p>Nenhuma métrica disponível ainda</p>
          <small>Crie projetos, tarefas e agende-as para ver as métricas</small>
        </div>
      )}
    </div>
  );
}
