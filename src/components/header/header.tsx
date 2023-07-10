import Logo from '../logo/logo';
import UserBlock from '../user-block/user-block';

type HeaderProps = {
  isUserBlock?: boolean;
}

function Header({isUserBlock}: HeaderProps): JSX.Element {
  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Logo />
          </div>
          { isUserBlock && <UserBlock />}
        </div>
      </div>
    </header>
  );
}

export default Header;
