import { useState } from "react";
import { useNavigate } from "react-router-dom";
import bcrypt from "bcryptjs-react";


const Login = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let users = await fetch("http://localhost:8000/users").then(res => res.json());
    let loginUser = users.filter(user => user.email === email)[0];
    if (!loginUser) {
      setError('Error: Wrong email or password');
      return;
    }
    let isMatch = await bcrypt.compare(password, loginUser.password);
    if (!isMatch) {
      setError('Error: Wrong email or password');
      return;
    }

    setUser(loginUser);
    navigate('/');
  }

  return (
    <div className="login">
      <h2 className="title">Login Page</h2>
      <form className="form" onSubmit={(e) => handleSubmit(e)}>
        <div className="form-group">
          <div style={{ display: error === '' ? 'none' : 'block' }} className="error-message">{error}</div>
        </div>
        <div className="form-group">
          <label>Email</label>
          <input required type="text" value={email} onChange={e => setEmail(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input required type="password" value={password} onChange={e => setPassword(e.target.value)} />
        </div>
        <button className="button">Login</button>
      </form>
    </div>
  );
}

export default Login;