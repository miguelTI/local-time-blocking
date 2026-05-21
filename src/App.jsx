import './App.css'
import { DragDropContext } from 'react-beautiful-dnd'
import { AppContextProvider } from './context/AppContext.jsx'
import { useAppContext } from './hooks/useAppContext.jsx'
import Header from './components/Layout/Header'
import Sidebar from './components/Layout/Sidebar'
import MainPanel from './components/Layout/MainPanel'

function AppContent() {
  const { addSchedule, getProjects } = useAppContext();

  const handleDragEnd = (result) => {
    const { source, destination, draggableId, type } = result;

    if (!destination) {
      return;
    }

    if (type === 'SCHEDULE' && source.droppableId.startsWith('tasks-list')) {
      if (destination.droppableId.startsWith('timeslot-')) {
        try {
          const parts = destination.droppableId.split('-');
          const date = parts[1] + '-' + parts[2] + '-' + parts[3];
          const hour = parseInt(parts[4], 10);

          const hora_inicio = `${String(hour).padStart(2, '0')}:00`;
          const hora_fim = `${String(hour + 1).padStart(2, '0')}:00`;

          addSchedule(draggableId, date, hora_inicio, hora_fim);

          console.log('✅ Tarefa agendada com sucesso!');
        } catch (error) {
          console.error('❌ Erro ao agendar:', error.message);
          alert('❌ Erro ao agendar tarefa: ' + error.message);
        }
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
