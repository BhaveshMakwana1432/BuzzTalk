import "./update.css";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import Topbar from "../../components/topbar/Topbar";
import axios from "axios";
import {Link} from 'react-router-dom';

export default function Update() {
  const [file, setFile] = useState(null);
  const [filen, setFilen] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [desc,setDesc]=useState("");
  const [city,setCity]=useState("");
  const [contact,setContact]=useState("");
  const [relationship,setRelationship]=useState("");
  const [success, setSuccess] = useState(false);


  const { user, dispatch } = useContext(AuthContext);
  const PF=process.env.REACT_APP_PUBLIC_FOLDER;

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "UPDATE_START" });
    const updatedUser = {
      userId: user._id,
      username,
      email,
      password,
      desc,
      city,
      contact,
      relationship,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      updatedUser.profilePicture = filename;
      try {
        await axios.post("/upload", data);
      } catch (err) {}
    }
    if(filen){
   
    {
      const data = new FormData();
      const filename = Date.now() + filen.name;
      data.append("name", filename);
      data.append("file", filen);
      updatedUser.coverPicture = filename;
      try {
        await axios.post("/upload", data);
      } catch (err) {}
    }
  }
    console.log(updatedUser)
    try {

      const res = await axios.put("/users/" + user._id, updatedUser);
      setSuccess(true);
      dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
      console.log(res.data);
    } catch (err) {
      dispatch({ type: "UPDATE_FAILURE" });
    }

    window.location.reload();
  };

  console.log("file",file,filen)
  return (
    <>
    <Topbar />
    <div className="settings">
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <span className="settingsUpdateTitle">Update Your Account</span>
          <span className="settingsDeleteTitle">Delete Account</span>
        </div>
        <form className="settingsForm" onSubmit={handleSubmit}>

          <label>Profile Picture</label>
          <div className="settingsPP">
            <img
              src={file ? URL.createObjectURL(file) : PF+user.profilePicture}
              alt=""
            />
            <label htmlFor="fileInput">
              <i className="settingsPPIcon far fa-user-circle"></i>
            </label>
            <input
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
           
          </div>
          <label>Cover Picture</label>
          <div className="settingsPP">
            <img
              src={filen ? URL.createObjectURL(filen) : PF+user.coverPicture}
              alt=""
            />
            <label htmlFor="fileInput2">
              <i className="settingsPPIcon far fa-user-circle"></i>
            </label>
            <input
             type="file"
             id="fileInput2"
             style={{ display: "none" }}
             accept=".png,.jpeg,.jpg"
             onChange={(e) => setFilen(e.target.files[0])}
            />
           
          </div>




          <label>Username</label>
          <input
            type="text"
            placeholder={user.username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label>Email</label>
          <input
            type="email"
            placeholder={user.email}
            onChange={(e) => setEmail(e.target.value)}
          />
           <label>Desc</label>
           <input
            type="text"
            placeholder={user.desc}
            onChange={(e) => setDesc(e.target.value)}
          />
          <label>City</label>
           <input
            type="text"
            placeholder={user.city}
            onChange={(e) => setCity(e.target.value)}
          />
          <label>Contact</label>
           <input
            type="text"
            placeholder={user.contact}
            onChange={(e) => setContact(e.target.value)}
          />
          <label>Relationship</label>
           <input
            type="text"
            placeholder={user.relationship}
            onChange={(e) => setRelationship(e.target.value)}
          />
          <label>Password</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="btn">
         
          <button className="settingsSubmit" type="submit">
            Update
          </button>
    
          <Link to={`/`}>
          <button className="settingsCancle" >
            Cancle
          </button>
          </Link>
          </div>
          {success && (
            <span
              style={{ color: "green", textAlign: "center", marginTop: "20px" }}
            >
              Profile has been updated...
            </span>
          )}
        </form>
      </div>
      
    </div>
    </>
  );
  
}
