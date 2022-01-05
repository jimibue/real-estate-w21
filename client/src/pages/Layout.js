import { useContext } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";

const Layout = () => {
  // x bad name for tutorial sake
  let x = useNavigate();

  const { authenticated, handleLogout } = useContext(AuthContext);
  const renderAuthLinks = () => {
    if (authenticated) {
      return <button onClick={() => handleLogout(x)}>Logout</button>;
    }
    return (
      <>
        <div>
          <Link to="/register">Register</Link>
        </div>
        <div>
          <Link to="/login">Login</Link>
        </div>
      </>
    );
  };
  return (
    <div>
      <div style={styles.navbar}>
        <div>
          <Link to="/">Home</Link>
        </div>
        <div>
          <Link to="/available">Available</Link>
        </div>

        {renderAuthLinks()}
      </div>
      <div style={styles.pageContainer}>
        <Outlet />
      </div>
    </div>
  );
};

const styles = {
  navbar: {
    display: "flex",
    border: "1px solid",
  },
  pageContainer: {
    maxWidth: "1000px",
    margin: "auto",
    border: "1px solid grey",
    padding: "10px",
  },
};

export default Layout;
