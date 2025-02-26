import { useState } from 'react'
import './App.css'
import Stub from './components/Stub'
import { BrowserRouter, Route, Routes} from 'react-router';
import ReactDOM from 'react-dom/client';
import AdminReview from './AdminReview';
import AdminMemberView from './AdminMemberView';
import Navigation from './Navigation';


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Navigation />}>
            <Route index element={<p>Home</p>} />
            <Route path='/adminReview' element={<AdminReview />} />
            <Route path='/adminReview/:member' element={<AdminMemberView />} />
          </Route>
        </Routes>
      </BrowserRouter>

      <p>Success</p>
    </>
  )
}

export default App