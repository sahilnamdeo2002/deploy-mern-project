
import { Fragment, useState, useEffect } from 'react';
import React from 'react'
import "./ForgetPassword.css";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, forgetPassword } from '../../actions/UserAction';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



import MetaData from "../layout/MetaData";
import Loader from '../layout/Loader/Loader';


const ForgetPassword = () => {

    const dispatch = useDispatch();


    const { error, message ,loading} = useSelector((state) => state.forgetPassword);

    const [email,setEmail]=useState("");

    const forgotPasswordSubmit=(e)=>{
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("email", email);
        dispatch(forgetPassword(myForm));
      };
    
      useEffect(() => {
        if (error) {
          toast.error(error);
          dispatch(clearErrors());
        }
    
        if (message) {
          toast.success(message);
        }
      }, [dispatch, error, message]);


  return (
    <Fragment>
    {loading ? (
      <Loader />
    ) : (
      <Fragment>
        <MetaData title="Forgot Password" />
        <div className="forgotPasswordContainer">
          <div className="forgotPasswordBox">
            <h2 className="forgotPasswordHeading">Forgot Password</h2>

            <form
              className="forgotPasswordForm"
              onSubmit={forgotPasswordSubmit}
            >
              <div className="forgotPasswordEmail">
                <MailOutlineIcon />
                <input
                  type="email"
                  placeholder="Email"
                  required
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <input
                type="submit"
                value="Send"
                className="forgotPasswordBtn"
              />
            </form>
          </div>
        </div>
      </Fragment>
    )}
  </Fragment>
  )
}

export default ForgetPassword
