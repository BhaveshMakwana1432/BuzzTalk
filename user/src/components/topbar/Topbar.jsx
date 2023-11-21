import { Link } from "react-router-dom";
import "./topbar.css";
import { Search, Person, Chat, Notifications } from "@mui/icons-material";  
import LogoutIcon from '@mui/icons-material/Logout';
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Topbar() {
 

  const {user} = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const handleLog = () =>{
    localStorage.removeItem("user");
    window.location.reload();  
  }

console.log(user);

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={{textDecoration:"none"}}>
        <span className="logo">Buzz Talk</span>
        </Link>
          
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchIcon" />
          <input
            placeholder="Search for friend, post or video"
            className="searchInput"
          />
        </div>
      </div>
      <div className="topbarRight">
  
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <Person />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <Chat />
            <span className="topbarIconBadge">2</span>
          </div>
          <div className="topbarIconItem">
            <Notifications />
            <span className="topbarIconBadge">1</span>
          </div>

          
          <button className="topbarIconItem logoutButton"  onClick={handleLog}>
            <LogoutIcon/>
          </button>
        </div>
       
      </div>
      <Link to={`/profile/${user.username}`}> 
          <img src={user.profilePicture ? PF+user.profilePicture : PF+"person/noAvatar.png"}    alt=""
            className="topbarImg"
          />
       </Link>
    </div>
  );
}
