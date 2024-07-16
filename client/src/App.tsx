import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import List from './pages/list/List';
import Login from './pages/login/Login';
import ProtectedRoutes from './routes/ProtectedRoutes';
import './styles.css';

function App() {
  const isOnline = window.navigator.onLine;
  return (
    <>
      <ToastContainer
        theme="colored"
        autoClose={3000}
        position="top-right"
      />
      {isOnline ? (
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoutes>
                  <List />
                </ProtectedRoutes>
              }
            />
            <Route
              path="*"
              element={<Login />}
            />
          </Routes>
        </Router>
      ) : (
        <h1>App is offline</h1>
      )}
    </>
  );
}
export default App;
