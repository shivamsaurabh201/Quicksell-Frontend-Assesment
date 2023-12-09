import React,{useState,useEffect} from "react";
import Card from "../ui-elements/card/card";
import './group.scss'
import Column from "./column/column";



function GroupbyPriority({ticketData=[],orderby}){

    const [Priority0,setPriority0]=useState([])
    const [Priority1,setPriority1]=useState([])
    const [Priority2,setPriority2]=useState([])
    const [Priority3,setPriority3]=useState([])
    const [Priority4,setPriority4]=useState([])
    const [Loading,setLoading]=useState(false)

    useEffect(() => {
        let cPriority0=[]
        let cPriority1=[]
        let cPriority2=[]
        let cPriority3=[]
        let cPriority4=[]
        
        for (let i = 0;i<ticketData.length;i++){
            if(ticketData[i].priority===0){
                cPriority0=[...cPriority0,ticketData[i]]
                continue
            }
            if(ticketData[i].priority===1){
                cPriority1=[...cPriority1,ticketData[i]]
                continue
            }
            if(ticketData[i].priority===2){
                cPriority2=[...cPriority2,ticketData[i]]
                continue
            }
            if(ticketData[i].priority===3){
                cPriority3=[...cPriority3,ticketData[i]]
                continue
            }
            if(ticketData[i].priority===4){
                cPriority4=[...cPriority4,ticketData[i]]
                continue
            }
        }


        cPriority0.sort((a,b)=> a.title.localeCompare(b.title))
        cPriority1.sort((a,b)=> a.title.localeCompare(b.title))
        cPriority2.sort((a,b)=> a.title.localeCompare(b.title))
        cPriority3.sort((a,b)=> a.title.localeCompare(b.title))
        cPriority4.sort((a,b)=> a.title.localeCompare(b.title))
            
            
        
        setPriority0(cPriority0)
        setPriority1(cPriority1)
        setPriority2(cPriority2)
        setPriority3(cPriority3)
        setPriority4(cPriority4)
        setLoading(true)

        
      }, [ticketData]);


    return(
        <div className="Groups-Container">
            <Column Loading={Loading} list={Priority4} title={"Urgent"} groupBy={"priority"}/>
            <Column Loading={Loading} list={Priority3} title={"High"} groupBy={"priority"}/>
            <Column Loading={Loading} list={Priority2} title={"Medium"} groupBy={"priority"}/>
            <Column Loading={Loading} list={Priority1} title={"Low"} groupBy={"priority"}/>
            <Column Loading={Loading} list={Priority0} title={"No Priority"} groupBy={"priority"}/>
        </div>
    )
}


export default GroupbyPriority;