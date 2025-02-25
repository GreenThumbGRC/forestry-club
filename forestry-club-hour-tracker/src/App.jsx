import { useState } from 'react'
import './App.css'
import Stub from './components/Stub'
import { BrowserRouter, Route, Routes } from 'react-router';
import ReactDOM from 'react-dom/client';
import AdminReview from './AdminReview';
import Navigation from './Navigation';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function App() {

  return (
    <>
      <Container>
        <Row>
          <Col>
            <BrowserRouter>
              <Routes>
                <Route path='/' element={<Navigation />}>
                  <Route index element={<App />} />
                  <Route path='/AdminReview' element={<AdminReview />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </Col>
        </Row>
        <Row>
          <Col>
            <AdminReview />
          </Col>
        </Row>
      </Container>

    </>
  )
}

export default App