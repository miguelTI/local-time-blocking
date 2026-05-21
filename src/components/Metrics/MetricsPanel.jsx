import { useAppContext } from '../../hooks/useAppContext';
import ProjectMetrics from './ProjectMetrics';
import './MetricsPanel.css';

export default function MetricsPanel() {
  const { state, getAllMetrics } = useAppContext();
  const metrics = getAllMetrics();
  const projects = state.projects.filter((p) => p.ativo);

  return (
    <div className="metrics-panel">
      <h2>📊 Relatório de Métricas</h2>

      {/* Métricas por Projeto */}
      <section className="metrics-by-project">
        <h3>Por Projeto</h3>
        {projects.length === 0 ? (
          <p className="empty-state">Nenhum projeto ainda</p>
        ) : (
          <div className="metrics-grid">
            {metrics.por_projeto.map((metric) => {
              const project = projects.find((p) => p.id === metric.projeto_id);
              return (
                <ProjectMetrics
                  key={metric.projeto_id}
                  metric={metric}
                  projectColor={project?.cor}
                />
              );
            })}
          </div>
        )}
      </section>

      {/* Tarefas Ofensoras */}
      <section className="metrics-offenders">
        <h3>⚠️ Tarefas sem Projeto</h3>
        <div className="offender-stats">
          <div className="stat-box">
            <span className="label">Abertas</span>
            <span className="value">{metrics.ofensoras.total_abertas}</span>
          </div>
          <div className="stat-box">
            <span className="label">Concluídas</span>
            <span className="value">{metrics.ofensoras.total_concluidas}</span>
          </div>
          <div className="stat-box">
            <span className="label">Total</span>
            <span className="value">{metrics.ofensoras.total_tarefas}</span>
          </div>
        </div>
        {metrics.ofensoras.total_abertas > 0 && (
          <p className="warning">
            ⚠️ Você tem {metrics.ofensoras.total_abertas} tarefa(s) sem projeto!
          </p>
        )}
      </section>

      {projects.length === 0 && metrics.ofensoras.total_tarefas === 0 && (
        <div className="empty-state">
          <p>Nenhuma métrica disponível ainda</p>
          <small>Crie projetos, tarefas e conclua-as para ver as métricas</small>
        </div>
      )}
    </div>
  );
}
