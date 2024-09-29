import React, { useState } from 'react';
import Login from './Login';

function Landing() {
  const [isLoginOpen, setIsLoginOpen] = useState(true); // Automatically open login

  const closeLogin = () => setIsLoginOpen(false);

  return (
    <div className="font-mono">
      <header className="mx-auto my-6 w-100 text-center">
        <h1>Mystery Stuff lol</h1>
      </header>
      <main>
        <img src="/img/island.PNG" alt="island" className="w-full h-auto" />
      </main>
      {/* Login Modal */}
      <Login isOpen={isLoginOpen} onClose={closeLogin} />
    </div>
  );
}

export default Landing;
