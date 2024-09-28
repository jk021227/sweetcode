import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear token
    navigate('/landing'); // Redirect to login page
  };

  return (
    <div className="font-mono">
      <header className="mx-auto my-6 w-100 text-center">
        <h1>Welcome to Sweetcode!</h1>
      </header>
      <main>
      {/* style={{ width: '50%', height: 'auto' }}  */}
      <img src="/img/island.PNG" alt="island" className="w-3" />
        <button onClick={handleLogout} className="mt-4">Logout</button> {/* Logout button */}
      </main>
      {/* <Loginbox/> */}
    </div>
  );
}

export default Home;
