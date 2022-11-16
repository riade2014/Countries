import axios from 'axios';
import React, { useState } from 'react';

const Article = ({article}) => {
    const[isEditing,setIsEditing]=useState(false);
    const[editContent,setEditContent]=useState("");
    const dateFormater=(date)=>{
        let newDate = new Date(date).toLocaleDateString("fr-FR",{
            year:"numeric",
            month:"long",
            day:"numeric",
            hour:"numeric",
            minute:"numeric",
            seconde:"numeric"
        });
        return newDate;
    };

    const handleEdit = ()=>{
        const data={
            author:article.author,
            content:editContent? editContent:article.content,
            date:article.date,
            updateDate: Date.now(),//cette ligne nous permettra 
            //de savoir dans la db la date à laquelle le update
            // a été effectué
        };

        axios.put("http://localhost:3004/articles/" + article.id,data).then(()=>{
            setIsEditing(false);
        });
        // setIsEditing(false);
    };

    const handleDelete=()=>{
        axios.delete("http://localhost:3004/articles/" +article.id);
        window.location.reload();//permet de recharger la page à chaque suppression automatiquement
        //console.log("supprimer");
    };

    return (
        <div className='article' 
            style={{background: isEditing ? "#f3feff":"whrite"}}>
            <div className='card-header'>
                <h3>{article.author}</h3>
                <em>Posté le {dateFormater(article.date)}</em>
            </div>
            {
                // isEdeting ? <textarea name='id="" col="30" row="10"'></textarea>
                isEditing ? (
                <textarea 
                defaultValue={editContent ? editContent : article.content} 
                autoFocus
                onChange={(e) => setEditContent(e.target.value) }>
                </textarea>):<p>{editContent ? editContent: article.content}</p>
            }
            {/* <p>{article.content}</p> */}
            <div className='btn-container'>
                {
                    isEditing ? (<button onClick={()=> handleEdit()}>Valide</button>):
                    (<button onClick={()=> setIsEditing(true)}>Edit</button>)
                }
                <button onClick={() => {
                    if(window.confirm("Voulez-vous vraiment supprimer ?")){
                        handleDelete();
                    }
                }}>Delete</button>
            </div>
        </div>
    );
};

export default Article;