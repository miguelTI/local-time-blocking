import './App.css'
import { DragDropContext } from 'react-beautiful-dnd'
import { AppContextProvider } from './context/AppContext.jsx'
import Header from './components/Layout/Header'
import Sidebar from './components/Layout/Sidebar'
import MainPanel from './components/Layout/MainPanel'

function AppContent() {
  const handleDragEnd = (result) => {
    // Drag-drop handlers will be implemented in Phase 4
    console.log('Drag end:', result);
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
