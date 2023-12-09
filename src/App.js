import { useState, useEffect } from "react";
import "./App.scss";
import GroupbyUsers from "./components/users";
import GroupbyPriority from "./components/priority";
import GroupbyStatus from "./components/taskstatus";
import Header from "./components/header/header";

function App() {
  const [Data, setData] = useState([]);
  const [ticketData, setticketData] = useState("NO");
  const [userData, setuserData] = useState([]);

  const getData = async () => {
    await fetch("https://api.quicksell.co/v1/internal/frontend-assignment")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      })
      .catch((err) => {
        console.log(err.message);
      })
      .finally(() => {});
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    setticketData(Data.tickets);
    setuserData(Data.users);
  }, [Data]);

  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const [Groupby, setGroupby] = useState(
    localStorage.getItem("Groupby") || "priority"
  );
  const [Orderby, setOrderby] = useState(
    localStorage.getItem("Orderby") || "priority"
  );

  const groupbyHandler = (e) => {
    setGroupby(e.target.value);
  };

  const orderbyHandler = (e) => {
    setOrderby(e.target.value);
  };
  useEffect(() => {
    localStorage.setItem("Groupby", Groupby);
  }, [Groupby]);

  useEffect(() => {
    localStorage.setItem("Orderby", Orderby);
  }, [Orderby]);

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

  return (
    <div className="App">
      <Header
        Orderby={Orderby}
        Groupby={Groupby}
        groupbyHandler={groupbyHandler}
        orderbyHandler={orderbyHandler}
        showMenu={showMenu}
        toggleMenu={toggleMenu}
      />

      {ticketData === "NO" ? (
        <div>Loading ...</div>
      ) : Groupby === "priority" ? (
        <GroupbyPriority orderby={Orderby} ticketData={ticketData} />
      ) : Groupby === "users" ? (
        <GroupbyUsers
          orderby={Orderby}
          ticketData={ticketData}
          userData={userData}
        />
      ) : (
        <GroupbyStatus orderby={Orderby} ticketData={ticketData} />
      )}
    </div>
  );
}

export default App;
