import TaskList from '../TaskList/TaskList';

export default function MainPanel() {
  return (
    <main>
      <div style={{ maxWidth: '100%' }}>
        <h2>Tarefas da Semana</h2>
        <TaskList />

        <div style={{
          marginTop: '24px',
          padding: '16px',
          backgroundColor: '#f5f5f5',
          borderRadius: '4px'
        }}>
          <p style={{ fontSize: '12px', color: '#999' }}>
            Status: Phase 2, Sprint 2.2 - Tarefas CRUD ✅
          </p>
        </div>
      </div>
    </main>
  );
}
