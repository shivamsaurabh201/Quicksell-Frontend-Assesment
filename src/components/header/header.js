import React from "react";
import "./header.scss";
import Display from "../../assets/Display.svg";
import DownArrow from "../../assets/DownArrow.svg";

const Header = ({
  toggleMenu,
  showMenu,
  Groupby,
  groupbyHandler,
  orderbyHandler,
  Orderby,
}) => {
  return (
    <div className="Header">
      <div id="menu-toggle" className="menu-toggle" onClick={toggleMenu}>
        <img alt="" src= {Display} className="filter-icon"></img>
        <div className="display-text">Display</div>
        <img alt="" src= {DownArrow} className="down-icon"></img>
      </div>
      {showMenu && (
        <div id="menu-id" className="menu active">
          <div className="select">
            <div>Grouping</div>
            <select
              value={Groupby}
              onChange={groupbyHandler}
              name="todos"
              className="filter-todo"
            >
              <option value="priority">Priority</option>
              <option value="users">Users</option>
              <option value="status">Status</option>
            </select>
          </div>
          <div className="select">
            <div>Ordering</div>
            <select
              value={Orderby}
              onChange={orderbyHandler}
              name="todos"
              className="filter-todo"
            >
              <option value="priority">Priority</option>
              <option value="title">Title</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
