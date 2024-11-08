import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Error, ProtectedRoute } from './pages';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import SharedLayout from './pages/SharedLayout';
import Purchase from './pages/Purchase';
import Payment from './pages/Payment';

import Classroom from './pages/Available';

function App() {
 
 
  return (
    <BrowserRouter>
      <Routes>
     
        <Route
          path="service-purchased"
          element={
            <ProtectedRoute data="user">
              <SharedLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Purchase />} />
        </Route>
        <Route
          path="service-available"
          element={
            <ProtectedRoute data="user">
              <SharedLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Classroom />} />
        </Route>
    
        <Route
          path="order"
          element={
            <ProtectedRoute data="user">
              <SharedLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Payment />} />
        </Route>
      
        <Route
          path="/"
          element={
            <ProtectedRoute data="landing">
              <Landing />
            </ProtectedRoute>
          }
        />
        <Route
          path="register"
          element={
            <ProtectedRoute data="login">
              <Register />
            </ProtectedRoute>
          }
        />
      
        <Route
          path="login"
          element={
            <ProtectedRoute data="login">
              <Login />
            </ProtectedRoute>
          }
        />
      

        <Route path="*" element={<Error />} />
      </Routes>
      <ToastContainer position="top-right" autoClose={4000} />
    </BrowserRouter>
  );
}

export default App;
