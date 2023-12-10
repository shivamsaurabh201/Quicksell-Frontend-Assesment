import React, { useState, useEffect } from "react";
import "./App.scss";
import GroupbyUsers from "./components/users";
import GroupbyPriority from "./components/priority";
import GroupbyStatus from "./components/taskstatus";
import Header from "./components/header/header";

function App() {
  // State variables
  const [data, setData] = useState([]);
  const [ticketData, setTicketData] = useState("NO");
  const [userData, setUserData] = useState([]);
  const [showMenu, setShowMenu] = useState(false);
  const [groupby, setGroupby] = useState(localStorage.getItem("Groupby") || "priority");
  const [orderby, setOrderby] = useState(localStorage.getItem("Orderby") || "priority");

  // Fetch data from the API
  const getData = async () => {
    try {
      const response = await fetch("https://api.quicksell.co/v1/internal/frontend-assignment");
      const data = await response.json();
      setData(data);
    } catch (err) {
      console.error(err.message);
    }
  };

  // Set ticketData and userData on data change
  useEffect(() => {
    setTicketData(data.tickets);
    setUserData(data.users);
  }, [data]);

  // Fetch data on component mount
  useEffect(() => {
    getData();
  }, []);

  // Save groupby and orderby to localStorage on change
  useEffect(() => {
    localStorage.setItem("Groupby", groupby);
  }, [groupby]);

  useEffect(() => {
    localStorage.setItem("Orderby", orderby);
  }, [orderby]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const divToExclude = document.getElementById("menu-id");
      const divDisplayToggle = document.getElementById("menu-toggle");

      if (
        divToExclude &&
        !divToExclude.contains(event.target) &&
        !divDisplayToggle.contains(event.target)
      ) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // Toggle menu visibility
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  // Handle groupby and orderby changes
  const groupbyHandler = (e) => {
    setGroupby(e.target.value);
  };

  const orderbyHandler = (e) => {
    setOrderby(e.target.value);
  };

  return (
    <div className="App">
      {/* Header component */}
      <Header
        Orderby={orderby}
        Groupby={groupby}
        groupbyHandler={groupbyHandler}
        orderbyHandler={orderbyHandler}
        showMenu={showMenu}
        toggleMenu={toggleMenu}
      />

      {/* Render content based on groupby */}
      {ticketData === "NO" ? (
        <div>Loading ...</div>
      ) : groupby === "priority" ? (
        <GroupbyPriority orderby={orderby} ticketData={ticketData} />
      ) : groupby === "users" ? (
        <GroupbyUsers orderby={orderby} ticketData={ticketData} userData={userData} />
      ) : (
        <GroupbyStatus orderby={orderby} ticketData={ticketData} />
      )}
    </div>
  );
}

export default App;
