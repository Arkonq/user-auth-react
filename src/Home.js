import {useNavigate} from 'react-router-dom';

const Home = ({ user, setUser }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);    
  }
  const handleLogin = () => {
    navigate('/login')   
  }
  const handleSignup = () => {
    navigate('/signup')     
  }


  return (
    <div className="home">
      <h2 className="title">Home Page</h2>
      {!user && 
      <div className="home__body">        
        <button className="button" onClick={handleLogin}>Login</button>
        <button className="button" onClick={handleSignup}>Signup</button>
      </div>
      }
      {user && 
      <div className="home__body">
        <div key={user.id} className="user-data">
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
        </div>
        <button className="button" onClick={handleLogout}>Logout</button>
      </div>
      }
    </div>
  );
}

export default Home;