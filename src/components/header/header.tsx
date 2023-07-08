import Logo from '../logo/logo';
import UserBlock from '../user-block/user-block';

type HeaderProps = {
  theme: 'withUserBlock' | 'withoutUserBlock';
}

function Header({theme}: HeaderProps): JSX.Element {
  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Logo />
          </div>
          { theme === 'withUserBlock' && <UserBlock />}
        </div>
      </div>
    </header>
  );
}

export default Header;
