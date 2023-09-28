import { useState } from "react";
import { useNavigate } from "react-router-dom";
import bcrypt from "bcryptjs-react";

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRep, setPasswordRep] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let hasError = false;
    let newError = '';
    setError(newError);
    if (name.length < 2) {
      newError += `Error: name should be more than 2 characters\n`;
      setError(newError);
      hasError = true;
    }

    if (!validateEmail(email)) {
      newError += `Error: wrong email address\n`;
      setError(newError);
      hasError = true;
    }

    if (password !== passwordRep) {
      newError += `Error: passwords don't match\n`;
      setError(newError);
      hasError = true;
    }

    if (password.length < 5) {
      newError += `Error: password should be more than 5 characters\n`;
      setError(newError);
      hasError = true;
    }    

    if(hasError) return;

    let users = await fetch("http://localhost:8000/users").then(res => res.json());
    let emailTaken = users.filter(user => user.email === email)[0];
    if(emailTaken) {
      newError += `Error: this email is already taken\n`;
      setError(newError);
      return
    }

    const hashPassword = await bcrypt.hash(password,10);

    const newUser = { name: name, email: email, password: hashPassword }
    fetch("http://localhost:8000/users", {      
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(newUser)
    }).then(() => {
      navigate('/')
    })
  }

  return ( 
    <div className="signup">
      <h2 className="title">Signup Page</h2>
      <form className="form" onSubmit={(e) => handleSubmit(e)}>
        <div className="form-group">
          <div style={{display: error === '' ? 'none': 'block'}} className="error-message">{error}</div>
        </div>
        <div className="form-group">
          <label>Name</label>
          <input required type="text" value={name} onChange={e => setName(e.target.value)}/>
        </div>
        <div className="form-group">
          <label>Email</label>
          <input required type="text" value={email} onChange={e => setEmail(e.target.value)}/>
        </div>
        <div className="form-group">
          <label>Password</label>
          <input required type="password" value={password} onChange={e => setPassword(e.target.value)}/>
        </div>
        <div className="form-group">
          <label>Repeat password</label>
          <input required type="password" value={passwordRep} onChange={e => setPasswordRep(e.target.value)}/>
        </div>
        <button className="button">Create</button>
      </form>
    </div>
   );
}
 
export default Signup;