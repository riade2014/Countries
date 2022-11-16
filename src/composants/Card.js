import React from 'react';

const Card = ({country}) => {
    return (
        <li className='card'>
            <img 
            src={country.flags.svg }
            alt={"drapeau " + country.translations.fra.common}
            />
            <div className='infos'>
                <h2>{country.translations.fra.common}</h2>
                <h2>Capitale :{country.capital}</h2>
                <h2>{country.population.toLocaleString()}</h2>
                {/* toLocaleString() : est une fonction separateur de 
                milieu des chiffres */}
            </div>
        </li>
    );
};

export default Card;