import { useContext } from 'react';
import { Button, Dropdown, DropdownButton } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import constant from '../../common/constant';
import { AppDispatch } from '../../common/types';
import { userLogout } from '../../slice/userslice';
import { ThemeAndLangContext } from '../HOC/WithLangTheme';

const Header = () => {
  const token = localStorage.getItem(constant.token);
  const dispatch: AppDispatch = useDispatch();
  const { theme, toggleTheme, language, changeLanguage } = useContext(ThemeAndLangContext);

  const handleLanguageChange = (lng: string | null) => {
    if (lng) changeLanguage(lng);
  };

  return (
    <header className="d-flex w-100 justify-content-end p-3">
      <div className="d-flex gap-2">
        <DropdownButton
          id="dropdown-basic-button"
          title={language === 'en' ? 'En' : 'Hi'}
          onSelect={handleLanguageChange}
        >
          <Dropdown.Item eventKey="en">English</Dropdown.Item>
          <Dropdown.Item eventKey="hi">Hindi</Dropdown.Item>
        </DropdownButton>
        <Button
          variant="outline-secondary"
          onClick={toggleTheme}
        >
          {theme === 'light' ? 'Dark' : 'Light'}
        </Button>
        {token && (
          <Button
            variant="outline-danger"
            onClick={() => dispatch(userLogout())}
          >
            Logout
          </Button>
        )}
      </div>
    </header>
  );
};

export default Header;
