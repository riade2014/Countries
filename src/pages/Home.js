import React from 'react';
import Countries from '../composants/Countries';
import Logo from '../composants/Logo';
import Navigation from '../composants/Navigation';

const Home = () => {
    return (
        <div>
            <Logo />
            <Navigation />
            <Countries/>
        </div>
    );
};

export default Home;