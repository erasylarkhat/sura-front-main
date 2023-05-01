import React, { useEffect, useState } from "react";
import decode from 'jwt-decode';

import '../../styles/profile/settings.scss';
import { CLEAR_USER_STATUS, LOGOUT } from "../../constants";
import { useDispatch, useSelector } from "react-redux";
import { updateUserAvatar, updateUserInfo, updateUserPass } from "../../actions/user";

const initFormData = {
    firstname: '',
    lastname: '',
    email: '',
    credential: '',
    bio: ''
};
const initPassFormData = {
    oldPassword: '',
    newPassword: '',
    newPasswordRe: ''
}
const ProfileSettings = () => {
    const dispatch = useDispatch();
    const [profile, setProfile] = useState(JSON.parse(localStorage.getItem('profile')))
    const [user, setUser] = useState(null);
    const [formData, setFormData] = useState(initFormData);
    const [passFormData, setPassFormData] = useState(initPassFormData);
    const [avatar, setAvatar] = useState(null);
    const [preview, setPreview] = useState(null);

    const {userUpdateStatus} = useSelector((state) => state.user);

    useEffect(()=>{
        if(userUpdateStatus){
            setProfile(JSON.parse(localStorage.getItem('profile')));
            dispatch({type: CLEAR_USER_STATUS});
        }
    }, [userUpdateStatus]);

    useEffect(() => {
        if(profile && profile.user && profile.token){
            const token = profile.token;
            if (token) {
                const decodedToken = decode(token);
          
                if (decodedToken.exp * 1000 > new Date().getTime()){
                    setUser(profile.user);
                } else{
                    dispatch({type: LOGOUT});
                    setProfile(null);
                }
            }
        }
    }, [profile]);

    useEffect(()=>{
        if(user){
            setFormData(user)
        }
    }, [user])
    

    const handleChange = (e) => {
        const name = e.currentTarget.name;
        const value = e.currentTarget.value;
        setFormData({...formData, [name]: value});
    }
    const handlePassChange = (e) => {
        const name = e.currentTarget.name;
        const value = e.currentTarget.value;
        setPassFormData({...passFormData, [name]: value});
    }
    const clearInfo = (e) => {
        e.preventDefault();
        if(user){
            setFormData(user);
        }else{
            setFormData(initFormData);
        }
    }
    const handleInfoSubmit = (e) => {
        e.preventDefault();
        dispatch(updateUserInfo(formData));
    }
    const clearPass = (e) => {
        e.preventDefault();
        setPassFormData(initPassFormData);
    }
    const handlePassSubmit = (e) => {
        e.preventDefault();
        dispatch(updateUserPass(passFormData));
    }

    const handleAvatarChange = (e) => {
        const selectedFile = e.target.files[0];
        setAvatar(selectedFile);
        // Create a preview URL using FileReader
        const reader = new FileReader();
        reader.onload = () => {
            setPreview(reader.result);
        };
        reader.readAsDataURL(selectedFile);
    }
    const handleAvatarSave = (e) => {
        e.preventDefault();
        dispatch(updateUserAvatar(avatar));
    }
    return user ? (
        <div id="profileSettings">
            <div className="container">
                <div className="content">
                    <div className="title">
                        Account Settings
                    </div>
                    <div className="form">
                        <form>
                            <div className="avatar-group">
                                <div className="userImage">
                                    {preview ? (
                                        <img src={preview} alt="profile" />
                                    ) : user.avatar ? (
                                            <img src={`${process.env.REACT_APP_SERVER}avatars/${user.avatar}`} alt="profile" />
                                        ) : (
                                            <div className="alt">{user.firstname[0]}</div>
                                        )
                                    }
                                </div>
                                <label>
                                    Edit photo
                                   <input type="file" onChange={handleAvatarChange} />
                                </label>
                                <div className="save" onClick={handleAvatarSave}>Save</div>
                            </div>
                        </form>
                        <form>
                            <div className="title">User information</div>
                            <div className="form-group">
                                <label>Email</label>
                                <input type="email" placeholder="Email" name="email" value={formData.email} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label>First Name</label>
                                <input type="text" placeholder="First Name" name="firstname" value={formData.firstname} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label>Last Name</label>
                                <input type="text" placeholder="Last Name" name="lastname" value={formData.lastname} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label>Credential</label>
                                <input type="text" placeholder="Credential" name="credential" value={formData.credential} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label>Bio</label>
                                <textarea name="bio" placeholder="Bio" value={formData.bio} rows={4} onChange={handleChange} ></textarea>
                            </div>
                            <div className="btns">
                                <div className="btn" onClick={clearInfo}>Clear</div>
                                <div className="btn" onClick={handleInfoSubmit}>Submit</div>
                            </div>
                        </form>
                        <form>
                            <div className="title">Password</div>
                            <div className="form-group">
                                <label>Current password</label>
                                <input type="password" placeholder="Current Password" name="oldPassword" value={passFormData.oldPassword} onChange={handlePassChange} />
                            </div>
                            <div className="form-group">
                                <label>New Password</label>
                                <input type="password" placeholder="New Password" name="newPassword" value={passFormData.newPassword} onChange={handlePassChange} />
                            </div>
                            <div className="form-group">
                                <label>Repeat new password</label>
                                <input type="password" placeholder="Repeat new password" name="newPasswordRe" value={passFormData.newPasswordRe} onChange={handlePassChange} />
                            </div>
                            <div className="btns">
                                <div className="btn" onClick={clearPass}>Clear</div>
                                <div className="btn" onClick={handlePassSubmit}>Submit</div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    ) : (
        <div className="loading"></div>
    );
};

export default ProfileSettings;