import axios from "axios";
import React, { useEffect, useState } from 'react';
import Card from "./Card";

const Countries = () => {
    const [data, setData]=useState([]);
    const[rangeValue,setRangeValue]=useState(36);
    //const [paysParContinent,setPaysParContinent]=useState("");
    const radios=["Africa","America","Asia","Europe","Oceania"];
    const [paysParContinent,setPaysParContinent]=useState("");
    //axios permet de faire les fetch 
    //un peu plus rapide
    useEffect(()=>{
        //le useEffect se joue lorsque le composant est monté(est en place)
        axios
        .get('https://restcountries.com/v3.1/all')
        .then((res)=>setData(res.data));
    },[]);
    return (
        <div className='countries'>
            <ul className="radio-container">
                <input type="range" 
                min="1" 
                max="250" 
                defaultValue={rangeValue}  
                onChange={(e) => setRangeValue(e.target.value)}
                />
                {radios.map((continent)=>(
                    <li>
                        <input type="radio" 
                        id={continent} 
                        name="continentRadio" 
                        checked={continent === paysParContinent}
                        onChange={(e)=>
                            setPaysParContinent(e.target.id)}
                        />
                        <label htmlFor={continent}>{continent}</label>
                    </li>
                ))}
            </ul>
            {paysParContinent && (
                <button onClick={() => setPaysParContinent("")}>
                    Annuler la recherche
                </button>
            )}
            <ul>
                {
                    data
                    .filter((country)=> country.continents[0].includes(paysParContinent))
                    .sort((a,b)=>b.population-a.population)
                    .slice(0,rangeValue)//cette fonction permet de garder uniquement le nbre d'elt definie
                    .map((country,index)=> (
                    // <li key={index}>{Country.translations.fra.common}</li>
                    // )
                    <Card key={index} country={country}/>
                ))}
            </ul>
        </div>
    );
};

export default Countries;