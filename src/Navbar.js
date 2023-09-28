import { Link } from 'react-router-dom';

const Navbar = ({user}) => {
  return (
    <header className="header">
      <div className="header__body">
        <div className="header__menu">
          <Link to='/' className="header__logo">Logo</Link>
          <div className="header__links">
            <Link to='/'>Home</Link>
            {!user && 
            <>
              <Link to='/login'>Login</Link>
              <Link to='/signup'>Signup</Link>
            </>
            }
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;