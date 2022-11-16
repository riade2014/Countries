import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Article from '../composants/Article';
import Logo from '../composants/Logo';
import Navigation from '../composants/Navigation';

//Si vous l'installez localement dans votre projet, 
// utilisez npxpour l'exécuter

// npx json-server --watch db.json(--port 3004; j'ai le port sur lequel je souhaite run)

const Blog = () => {
    const[blogData,setBlogData]=useState([]);
    const [author,setAuthor]=useState();
    const[content,setContent]=useState("");
    const[error,setError]=useState(false);
    const getData=()=>{
        axios
        .get(" http://localhost:3004/articles")
        .then((res)=> setBlogData(res.data));
    };
    useEffect(() => getData(),[]);
    //[] est appelé le colback
    //useEffect permet d'exercuter une tache lorsque un composant est appelé
    const handleSubmit = (e)=>{
        e.preventDefault();

        if(content.length < 140){
            setError(true);
        }
        else{
            axios.post("http://localhost:3004/articles",{
                //author: "TEST",
                author,
                content,
                date:Date.now()
            });
            setError(false);
            setAuthor("");
            setContent("");
            getData();//son role est d'actualiser le state de getData.
            //c-à-d que ça permet d'afficher ce qu'on a submit sans devoir actualiser la page
        }
    };//cette fonction nous premunie du 
    //rechargement de la page chaque fois 
    //qu'on soumet le formulaire
    return (
        <div className='blog-container'>
            <Logo/>
            <Navigation/>
            <h1>Blog</h1>
            <form onSubmit={(e)=> handleSubmit(e)}>
                <input 
                    type="texte" 
                    placeholder="Nom"
                    onChange={(e)=>setAuthor(e.target.value)}
                    value={author}//cette ligne permet de le champ une fois que le contenu est soumis
                />
                <textarea 
                    style={{ border: error ? "1px solid red" : "1px solid #61dafb"}}
                    //le style conditionnelle: ici si l'utilisateur entre moins de 
                    //140 caracteres, les bordures passesnt au rouge
                    placeholder="Message"
                    onChange={(e)=>setContent(e.target.value)}
                    value={content}//cette ligne permet de le champ une fois que le contenu est soumis
                    >
                </textarea>
                {/* cette ligne s'affichera uniquement
                si l'utilisateur entre moins de 140
                caracteres */}
                {error && <p>Veuillez ecrire minimum 140 caracteres</p>}
                <input type="submit" value="Envoyer"></input>
            </form>
            <ul>
                {blogData
                .sort((a,b)=>b.date-a.date)
                .map((article)=>(
                    <Article key={article.id} article={article} />
                ))}
            </ul>
        </div>
    );
};

export default Blog;