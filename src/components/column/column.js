import React from 'react'
import './column.scss'
import Card from '../../ui-elements/card/card'
import ColHeader from './colHeader/colHeader'

import high from '../../assets/High.svg'
import urgent from '../../assets/Urgent.svg'
import medium from '../../assets/Medium.svg'
import low from '../../assets/Low.svg'
import noPriority from '../../assets/More.svg'

import backlog from '../../assets/Backlog.svg'
import todo from '../../assets/Todo.svg'
import inProgress from '../../assets/Progress.svg'
import done from '../../assets/Done.svg'
import cancelled from '../../assets/Dancelled.svg'

const Column = ({groupBy, Loading, list, title}) => {
    const icons = {
        "Urgent": urgent,
        "High": high,
        "Medium": medium,
        "Low": low,
        "No Priority": noPriority,
        "Backlog": backlog,
        "ToDo": todo,
        "In Progress": inProgress,
        "Done": done,
        "Cancelled": cancelled
    }

    return(
        <div className="column">
                <ColHeader title={title} listCount={list.length} headerIcon={icons[title]}/>
                {
                    (!Loading)?<div>Loading ...</div>:(<>{
                        list.map((ticket,index)=>{
                            return(
                                <Card key={index} id={ticket.id} title={ticket.title} tag={ticket.tag} priority={ticket.priority} status={ticket.status} userId={ticket.userId} groupBy={groupBy}/>
                            )
                        })
                    }</>)
                }
            </div>
    )
}

export default Column;