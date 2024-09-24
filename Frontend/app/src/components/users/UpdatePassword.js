
import { Fragment, useState, useEffect } from 'react';
import React from 'react'
import "./UpdatePassword.css";
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, updatePassword } from '../../actions/UserAction';
import { toast } from 'react-toastify';
import { UPDATE_PASSWORD_RESET } from '../../constants/UserConstants';
import { useNavigate } from 'react-router';
import MetaData from "../layout/MetaData";
import Loader from '../layout/Loader/Loader';
import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockIcon from "@material-ui/icons/Lock";
import VpnKeyIcon from "@material-ui/icons/VpnKey";



const UpdatePassword = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { error, isUpdated ,loading} = useSelector((state) => state.profile);

    const [oldpassword, setoldpassword] = useState("");
    const [newpassword, setnewpassword] = useState("");
    const [confirmpassword, setconfirmpassword] = useState("");



    const updatePasswordSubmit = (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("oldpassword", oldpassword);
        myForm.set("newPassword", newpassword);
        myForm.set("ConfirmPassword", confirmpassword);
        dispatch(updatePassword(myForm));
    };



    useEffect(() => {


        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }
        if (isUpdated) {
            toast.success("profile updated successfully");
            navigate("/account");
            dispatch({
                type: UPDATE_PASSWORD_RESET,
            });
        }

    }, [dispatch, error, isUpdated, navigate]);





  return (
    <Fragment>
        {loading ? (<Loader/>
        ):(
            <Fragment>
                  <MetaData title="Change Password" />
                  <div className="updatePasswordContainer">
            <div className="updatePasswordBox">
              <h2 className="updatePasswordHeading">Update Profile</h2>

              <form
                className="updatePasswordForm"
                onSubmit={updatePasswordSubmit}
              >
                <div className="loginPassword">
                  <VpnKeyIcon />
                  <input
                    type="password"
                    placeholder="Old Password"
                    required
                    value={oldpassword}
                    onChange={(e) => setoldpassword(e.target.value)}
                  />
                </div>

                <div className="loginPassword">
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="New Password"
                    required
                    value={newpassword}
                    onChange={(e) => setnewpassword(e.target.value)}
                  />
                </div>
                <div className="loginPassword">
                  <LockIcon />
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    required
                    value={confirmpassword}
                    onChange={(e) => setconfirmpassword(e.target.value)}
                  />
                </div>
                <input
                  type="submit"
                  value="Change"
                  className="updatePasswordBtn"
                />
              </form>
            </div>
          </div>
            </Fragment>
        )
        
    }
    </Fragment>
  )
}

export default UpdatePassword
