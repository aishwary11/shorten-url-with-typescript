import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Header from './components/header/Header';
import List from './pages/list/List';
import Login from './pages/login/login';
import ProtectedRoutes from './routes/ProtectedRoutes';
import './styles.css';

function App() {
  // const user = localStorage.getItem(constant.token);
  // const isLoginPath = location.pathname === '/login';

  // useEffect(() => {
  //   if (user && isLoginPath) location.pathname = '/';
  // }, [user, isLoginPath]);
  return (
    <>
      <Router>
        <Header />
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
      <ToastContainer
        theme="colored"
        autoClose={2000}
        position="top-right"
      />
    </>
  );
}

export default App;
