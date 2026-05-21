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
            {metrics.por_projeto.map((metric) => (
              <ProjectMetrics
                key={metric.projeto_id}
                metric={metric}
                projectColor={metric.projeto_cor}
                projectName={metric.projeto_nome}
              />
            ))}
          </div>
        )}
      </section>

      {/* Tarefas Ofensoras */}
      <section className="metrics-offenders">
        <h3>⚠️ Tarefas sem Projeto</h3>
        <div className="offender-metrics-card">
          <ProjectMetrics
            metric={metrics.ofensoras}
            projectColor="#f59e0b"
            projectName="Tarefas Ofensoras"
          />
        </div>
      </section>

      {projects.length === 0 && metrics.ofensoras.tarefas_abertas === 0 && (
        <div className="empty-state">
          <p>Nenhuma métrica disponível ainda</p>
          <small>Crie projetos, tarefas e conclua-as para ver as métricas</small>
        </div>
      )}
    </div>
  );
}
