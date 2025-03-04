import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router';
import AdminReview from './pages/AdminReview';
import AdminMemberView from './pages/AdminMemberView';
import AdminClubView from './pages/AdminClubView';
import Navigation from './Navigation';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MemberView from './pages/MemberView';

function App() {
  return (
    <>
      <Container>
        <Row>
          <Col>
            <BrowserRouter>
              <Routes>
                <Route path='/' element={<Navigation />}>
                  <Route index element={
                    <>
                      <p>Home</p>
                      <div><a href='/adminReview'>Admin View</a></div>
                      <div><a href='/member'>Member View</a></div>
                      <div><a href='/adminClub'>Admin Club View</a></div>
                    </>
                    } />
                  <Route path='/adminReview' element={<AdminReview />} />
                  <Route path='/adminClub/:member' element={<AdminMemberView />} />
                  <Route path='/adminClub' element={<AdminClubView />} />
                  <Route path='/member' element={<MemberView />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default App