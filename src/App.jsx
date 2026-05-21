import './App.css'
import { DragDropContext } from 'react-beautiful-dnd'
import { AppContextProvider } from './context/AppContext.jsx'
import { useAppContext } from './hooks/useAppContext.jsx'
import Header from './components/Layout/Header'
import Sidebar from './components/Layout/Sidebar'
import MainPanel from './components/Layout/MainPanel'

function AppContent() {
  const { addSchedule, rescheduleTask } = useAppContext();

  const handleDragEnd = (result) => {
    const { source, destination, draggableId, type } = result;

    if (!destination) {
      return;
    }

    // Drag com tipo SCHEDULE - pode ser agendamento ou replanejamento
    if (type === 'SCHEDULE' && destination.droppableId.startsWith('timeslot-')) {
      try {
        const parts = destination.droppableId.split('-');
        const date = parts[1] + '-' + parts[2] + '-' + parts[3];
        const hour = parseInt(parts[4], 10);

        const hora_inicio = `${String(hour).padStart(2, '0')}:00`;
        const hora_fim = `${String(hour + 1).padStart(2, '0')}:00`;

        // Verifica a origem para saber se é agendamento ou replanejamento
        if (source.droppableId === 'tasks-list') {
          // Agendamento inicial: tarefa vem da lista
          console.log('📅 AGENDAMENTO - draggableId:', draggableId);
          addSchedule(draggableId, date, hora_inicio, hora_fim);
          console.log('✅ Tarefa agendada com sucesso!');
        } else if (source.droppableId.startsWith('timeslot-')) {
          // Replanejamento: tarefa já está agendada em outro horário
          const parts = draggableId.split('-');
          console.log('🔄 REPLANEJAMENTO - draggableId:', draggableId, 'parts:', parts);
          const tarefa_id = parts[1];
          const schedule_id = parts[2];
          console.log('📍 Tentando replanear:', { tarefa_id, schedule_id, date, hora_inicio, hora_fim });
          rescheduleTask(tarefa_id, date, hora_inicio, hora_fim);
          console.log('✅ Tarefa replanejada com sucesso!');
        }
      } catch (error) {
        console.error('❌ Erro:', error.message);
        alert('❌ Erro: ' + error.message);
      }
    }
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="app-layout">
        <Header />
        <div className="app-body">
          <Sidebar />
          <MainPanel />
        </div>
      </div>
    </DragDropContext>
  )
}

function App() {
  return (
    <AppContextProvider>
      <AppContent />
    </AppContextProvider>
  )
}

export default App
