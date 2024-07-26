import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../common/types';
import { userLogout } from '../../slice/userslice';

const Header = () => {
  const dispatch: AppDispatch = useDispatch();
  const userData: any = useSelector<RootState>(state => state.user);
  return (
    <header className="d-flex w-100 justify-content-center">
      {userData.isLoggedIn && (
        <Button
          variant="outline-danger"
          onClick={() => dispatch(userLogout())}
        >
          Logout
        </Button>
      )}
    </header>
  );
};

export default Header;
