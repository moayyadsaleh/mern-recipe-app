import { Link } from "react-router-dom";
import "./navbar.css";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
export const Navbar = () => {
  const [cookies, , removeCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove the access token cookie and perform any additional logout actions if needed
    removeCookies("access_token");
    windows.localStorage.removeItem("userID");
    navigate("/auth");
  };

  return (
    <div className="navbar">
      <Link to={"/"}>Home</Link>
      <Link to={"/create-recipe"}>Create Recipe</Link>
      <Link to={"/saved-recipes"}>Saved Recipes</Link>
      {!cookies.access_token ? (
        <Link to="/auth">Login/Register</Link>
      ) : (
        <>
          <button onClick={handleLogout}>Logout</button>
        </>
      )}
    </div>
  );
};
