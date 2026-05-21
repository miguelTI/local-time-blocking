import './App.css'
import { AppContextProvider } from './context/AppContext.jsx'
import Header from './components/Layout/Header'
import Sidebar from './components/Layout/Sidebar'
import MainPanel from './components/Layout/MainPanel'

function AppContent() {
  return (
    <div className="app-layout">
      <Header />
      <div className="app-body">
        <Sidebar />
        <MainPanel />
      </div>
    </div>
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
