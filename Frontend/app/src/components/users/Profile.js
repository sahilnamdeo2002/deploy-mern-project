import React, { Fragment ,useEffect} from 'react'
import "./Profile.css"
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader/Loader";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router';



const Profile = () => {
    const navigate = useNavigate();
    const { user,loading,isAuthenticated}=useSelector((state)=>state.user);
    useEffect(()=>{
        if(!isAuthenticated){
            navigate("/login");
        }
    },[isAuthenticated , navigate])
  return (
    <Fragment >
        {loading ? <Loader/> :  <Fragment>
        <MetaData title={`${user.name}s Profile`}/>
        <div className='profileContainer'>
        <div >
            <h1>My Profile</h1>
            <img src={user.avatar.url} alt={user.name} />
            <Link to="/me/update" >EDIT PROFILE</Link>
        </div>
            <div>
        <div>
            <h4>FULL NAME</h4>
            <p>{user.name}</p>

        </div>
        <div>
            <h4>EMAIL</h4>
            <p>{user.email}</p>
        </div>
        <div>
            <h4>JOINED ON</h4>
            <p>{String(user.createdAt).substr(0, 10)}</p>
        </div>
        <div>
            <Link to="/orders">MY ORDERS</Link>
            <Link to="/password/update">CHANGE PASSWORD</Link>
        </div>
        </div>
        </div>
    </Fragment> }
    </Fragment>
   
  )
}

export default Profile;
