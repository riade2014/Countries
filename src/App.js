import React from 'react';
import {BrowserRouter,Routes,Route} from "react-router-dom";
//npm install react-router-dom --save
import About from './pages/About';
import Blog from './pages/Blog';
import Home from './pages/Home';
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/blog" element={<Blog/>}/>
          {/* path='*' fonctionne si jamais l'url ne correspond 
          à rien de declarer au dessus 
          lien de la video du cours : https://www.youtube.com/watch?v=f0X1Tl8aHtA*/}
          <Route path="*" element={<Home/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;