import { useDispatch, useSelector } from 'react-redux';

import { Fragment, useState, useEffect } from 'react';
import React from 'react';
import "./ResetPassword.css";
import { clearErrors , resetPassword } from '../../actions/UserAction';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useNavigate , useParams } from 'react-router';
import MetaData from "../layout/MetaData";
import Loader from '../layout/Loader/Loader';
import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockIcon from "@material-ui/icons/Lock";


const ResetPassword = () => {
    const dispatch = useDispatch();
    const navigate=useNavigate();
    const { token } = useParams(); 

    const { error, success, loading } = useSelector(
        (state) => state.forgetPassword
      );

      const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");


  const resetPasswordSubmit = (e) => {
    e.preventDefault(); // default the basic behavior
    const myForm = new FormData();
    myForm.set("password", password);
    myForm.set("confirmPassword", confirmpassword);

    dispatch(resetPassword(token, myForm));
    console.log(token);

  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Password Updated Successfully");

      navigate("/login");
    }
  }, [dispatch, error, success , navigate]);






  return (
    <Fragment>
    {loading ? (
      <Loader />
    ) : (
      <Fragment>
        <MetaData title="Change Password" />
        <div className="resetPasswordContainer">
          <div className="resetPasswordBox">
            <h2 className="resetPasswordHeading">Update Profile</h2>

            <form
              className="resetPasswordForm"
              onSubmit={resetPasswordSubmit}
            >
              <div>
                <LockOpenIcon />
                <input
                  type="password"
                  placeholder="New Password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="loginPassword">
                <LockIcon />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  required
                  value={confirmpassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <input
                type="submit"
                value="Update"
                className="resetPasswordBtn"
              />
            </form>
          </div>
        </div>
      </Fragment>
    )}
  </Fragment>
  )
}

export default ResetPassword
