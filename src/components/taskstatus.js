import { useEffect, useState } from "react";
import React from "react";
import './group.scss'
import Column from "./column/column";



function GroupbyStatus({ticketData=[],orderby}){

    const [BackLog,setBackLog]=useState([])
    const [Todo,setTodo]=useState([])
    const [Inprog,setInprog]=useState([])
    const [Done,setDone]=useState([])
    const [Cancel,setCancel]=useState([])
    const [Loading,setLoading]=useState(false)
    
    
   
    
    useEffect(() => {
        let cBackLog=[]
        let cTodo=[]
        let cInprog=[]
        let cDone=[]
        let cCancel=[]
        
        for (let i = 0;i<ticketData.length;i++){
            if(ticketData[i].status==='Backlog'){
                cBackLog=[...cBackLog,ticketData[i]]
                continue
            }
            if(ticketData[i].status==='Todo'){
               cTodo=[...cTodo,ticketData[i]]
                continue
            }
            if(ticketData[i].status==='In progress'){
                cInprog=[...cInprog,ticketData[i]]
                continue
            }
            if(ticketData[i].status==='Done'){
                cDone=[...cDone,ticketData[i]]
                continue
            }
            if(ticketData[i].status==='Cancelled'){
                cCancel=[...cCancel,ticketData[i]]
                continue
            }
        }
        if (orderby==='priority'){
            cBackLog.sort((a,b)=>b.priority-a.priority)
            cTodo.sort((a,b)=>b.priority-a.priority)
            cInprog.sort((a,b)=>b.priority-a.priority) 
        }

        else{
            cBackLog.sort((a,b)=> a.title.localeCompare(b.title))
            cTodo.sort((a,b)=> a.title.localeCompare(b.title))
            cInprog.sort((a,b)=> a.title.localeCompare(b.title))
            
        }
        setBackLog(cBackLog)
        setTodo(cTodo)
        setInprog(cInprog)
        setDone(cDone)
        setCancel(cCancel)
        setLoading(true)

        
      }, [ticketData,orderby]);
    

      


    return(
        <div className="Groups-Container">
            <Column Loading={Loading} list={BackLog} title={"Backlog"} groupBy={"status"}/>
            <Column Loading={Loading} list={Todo} title={"ToDo"} groupBy={"status"}/>
            <Column Loading={Loading} list={Inprog} title={"In Progress"} groupBy={"status"}/>
            <Column Loading={Loading} list={Done} title={"Done"} groupBy={"status"}/>
            <Column Loading={Loading} list={Cancel} title={"Cancelled"} groupBy={"status"}/>
        </div>
    )
}


export default GroupbyStatus;