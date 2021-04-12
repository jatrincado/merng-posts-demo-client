import React, { useContext, useState } from "react"; //useState en vez de Component
import { Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { AuthContext } from '../context/auth';

function MenuBar() {
  const { user, logout } = useContext(AuthContext);
  // function en vez de class
  const pathname = window.location.pathname;
  const path = pathname === "/" ? "home" : pathname.substr(1);
  //   state = { activeItem: 'bio' }
  // useState en vez de state
  const [activeItem, setActiveItem] = useState(path);

  //cambia el handler para el setter del use state
  const handleItemClick = (e, { name }) => setActiveItem(name);

  //no tiene render al ser function
  //   render() {
  //     const { activeItem } = this.state

  const menuBar = user ? (
    <Menu pointing secondary size="massive" color="teal">
      <Menu.Item name={user.username} active as={Link} to="/" />
      <Menu.Menu position="right">
        <Menu.Item name="logout" onClick={logout} />
      </Menu.Menu>
    </Menu>
  ) : (
    <Menu pointing secondary size="massive" color="teal">
      <Menu.Item
        name="home"
        active={activeItem === "home"}
        onClick={handleItemClick}
        as={Link}
        to="/"
      />
      <Menu.Menu position="right">
        <Menu.Item
          name="login"
          active={activeItem === "login"}
          onClick={handleItemClick}
          as={Link}
          to="/login"
        />
        <Menu.Item
          name="register"
          active={activeItem === "register"}
          onClick={handleItemClick}
          as={Link}
          to="/register"
        />
      </Menu.Menu>
    </Menu>
  );
  return menuBar
}

export default MenuBar;
