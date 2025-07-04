import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Dashboard } from './pages/dashboard';
import { Auth } from './pages/auth';
import { FinancialRecordsProvider } from './contexts/financial-record-context';
import { SignedIn, SignedOut } from '@clerk/clerk-react';
import Navbar from './components/navbar';
import { useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";

function App() {

  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
      setDarkMode(!darkMode)
  }

  useEffect(() => {
      if(darkMode) {
          document.documentElement.classList.add('dark')
      } else {
          document.documentElement.classList.remove('dark')
      }
  }, [darkMode])

  return (
    <Router  future={{  v7_startTransition: true, v7_relativeSplatPath: true }}>
      <div className='app-container'>
        <div className='bg-neutral-100 dark:bg-slate-950 relative overflow-hidden'>
            <button 
              onClick={toggleDarkMode}
              className='fixed top-3 lg:top-4 right-3 lg:right-4 w-9 h-9 lg:w-10 lg:h-10 flex justify-center items-center rounded-xl bg-amber-100 dark:bg-gray-700 text-neutrak-950 shadow-lg transition-colors'>
              <i className={`bx bx-${darkMode ? 'sun text-amber-200': 'moon'} text-lg lg:text-xl`}></i>
            </button>
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <SignedIn>
                      <div className='dashboard-wrapper w-full min-h-screen flex'>

                        <FinancialRecordsProvider>
                        <Navbar darkMode={darkMode}/>
                          <Dashboard />
                        </FinancialRecordsProvider>
                      </div>
                      <Toaster position="top-right" />
                    </SignedIn>
                    <SignedOut>
                      <Navigate to="/auth" replace />
                    </SignedOut>
                  </>
                }
              />

              <Route 
                path="auth" 
                element={
                  <>
                    <SignedIn>
                      <Navigate to="/" replace />
                    </SignedIn>
                    <SignedOut>
                      <Auth />
                    </SignedOut>
                  </>
                } 
              />
            </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App
