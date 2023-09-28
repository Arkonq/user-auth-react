import Navbar from './Navbar';
import Home from './Home';
import Login from './Login';
import Signup from './Signup';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';

function App() {
  const [user, setUser] = useState(null);  

  return (
    <BrowserRouter>
      <div className="App">
        <Navbar user={user} />
        <main className="content">
          <div className="content__body">
            <Routes>
              <Route exact path='/' element={<Home user={user} setUser={setUser} />} />
              <Route path='/login' element={<Login setUser={setUser} />} />
              <Route path='/signup' element={<Signup />} />
            </Routes>
          </div>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
