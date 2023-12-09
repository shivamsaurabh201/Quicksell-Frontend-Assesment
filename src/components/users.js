import React from "react";
import "./group.scss";
import Column from "./column/column";

function GroupbyUsers({ ticketData = [], orderby, userData = [] }) {
  function ticketsbyUser({ userid, userName }) {
    let usertickets = [];
    // let userName=''

    // for(let j=0;j<userData;j++){
    //     if(userData[i].id===userid){
    //         userName=userData[i].name
    //         break
    //     }
    // }

    for (let i = 0; i < ticketData.length; i++) {
      if (ticketData[i].userId === userid) {
        usertickets = [...usertickets, ticketData[i]];
        continue;
      }
    }

    if (orderby === "priority") {
      usertickets.sort((a, b) => b.priority - a.priority);
    } else {
      usertickets.sort((a, b) => a.title.localeCompare(b.title));
    }
    return (
      <Column groupBy={"users"} Loading={true} list={usertickets} title={userName} />
    );
  }

  function CallUser() {
    const Groups = [];

    for (let i = 0; i < userData.length; i++) {
      let newGroup = ticketsbyUser({
        userid: userData[i].id,
        userName: userData[i].name,
      });
      Groups.push(newGroup);
    }

    return Groups;
  }

  return (
    <div className="Groups-Container">
      <CallUser />
    </div>
  );
}

export default GroupbyUsers;
