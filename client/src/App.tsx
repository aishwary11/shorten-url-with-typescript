import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Header from './components/header/Header.js';
import withTheme from './components/HOC/WithLangTheme.js';
import List from './pages/list/List.js';
import Login from './pages/login/login.js';
import ProtectedRoutes from './routes/ProtectedRoutes.js';
import './styles.css';

function App() {
  const isOnline = window.navigator.onLine;
  return (
    <div className="d-flex flex-column min-vh-100">
      <ToastContainer
        theme="colored"
        autoClose={3000}
        position="top-right"
      />
      <Header />
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
        <h1 className="text-center mt-5">App is offline</h1>
      )}
    </div>
  );
}
export default withTheme(App);
