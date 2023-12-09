import React, { useEffect, useState } from "react";
import './card.scss';
import backlog from '../../assets/Backlog.svg'
import todo from '../../assets/Todo.svg'
import progress from '../../assets/Progress.svg'
import done from '../../assets/Done.svg'
import cancelled from '../../assets/Dancelled.svg'

import urgent from '../../assets/Urgent.svg'
import high from '../../assets/High.svg'
import mediun from '../../assets/Medium.svg'
import low from '../../assets/Low.svg'
import noPriority from '../../assets/More.svg'



function Card({id,title,tag,status,priority, userId, groupBy}){

    const [user, setUser] = useState({});

    const getData = async () => {
        await fetch("https://api.quicksell.co/v1/internal/frontend-assignment")
          .then((response) => response.json())
          .then((data) => {

            for(let index = 0; index < data.users.length; index++){
                if(data.users[index].id === userId){
                    setUser(data.users[index]);
                    break;
                }
            }
          })
          .catch((err) => {
            console.log(err.message);
          })
          .finally(() => {});
      };
    
      useEffect(() => {
        getData();
      }, []);

    const priorityIcons = {
        0: noPriority,
        1: low,
        2: mediun,
        3: high,
        4: urgent
    }

    const statusIcons = {
        "Backlog": backlog,
        "Todo": todo,
        "In progress": progress,
        "Done": done,
        "Cancelled": cancelled
    }

    const profileLetters = (name) => {
        let letters = ""
        const words = name ? name.split(" ") : [""];
        for(let index = 0; index < words.length; index++){
            letters += words[index][0];
        }

        return letters.toUpperCase()
    }

    
    return(
        <div className="Card-Container">
            <div className="card-heading">
                <div className="Card-Id">{id}</div>
                {groupBy === "users" ? null :
                    <div className="profile">
                    <div className="initials">{profileLetters(user.name)}</div>
                    <div className={`availability ${user.available ? "available" : ""}`}></div>
                </div>
                }
            </div>
            <div className="title-row">
                {groupBy === "status" ? null :
                    <img alt="" src= {statusIcons[status]} className="status-icon"></img>
                }
                <div className="title-row">{title}</div>
            </div>
            
            <div className="Card-Tag">
                { groupBy === "priority" ? null :
                    <img className="priority icon" alt="" src={priorityIcons[priority]}/>
                }
                <span className="Card-Feature">{tag[0]}</span>
            </div>
        </div>
    )
}


export default Card;