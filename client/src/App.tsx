import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Dashboard } from './pages/dashboard';
import { Auth } from './pages/auth';
import { FinancialRecordsProvider } from './contexts/financial-record-context';
import { Navbar } from './components/navbar';



function App() {

  return (
    <Router>
      <div className='app-container'>
        <Navbar />
        <Routes>
          <Route path='/' element={
            <FinancialRecordsProvider>
              <Dashboard/>
            </FinancialRecordsProvider>
            } 
          />
          <Route path='/auth' element={<Auth/>} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
