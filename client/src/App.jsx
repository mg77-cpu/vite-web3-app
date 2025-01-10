import { useState } from 'react';
import { Navbar, Welcome, Footer, Loader, Transactions, Services } from './components';
const App = () => {

  return (
    <div className="min-h-screen relative bg-scroll scroll-smooth w-full overflow-auto">
      <video
        className="absolute top-0 left-0 w-full min-h-screen object-cover"
        autoPlay
        loop
        muted
      >
        <source src="../images/cb.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="relative z-10 flex flex-col w-full h-screen justify-start items-center overflow-auto">
        <Navbar />
        <Welcome />
        <Services />
        <Transactions />
        <Footer />
      </div>
    </div>
  );
}

export default App;
