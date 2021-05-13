import React, { useContext } from "react";
import { StateContext, ContextType } from "./StateProvider";

import { Link, Redirect } from "react-router-dom";

const ProfilePage = () => {
  const { state, dispatch } = useContext(StateContext);
  console.log("State ", state);
  let { handle, firstName, lastName,img, bio} = state.user;
  return (
    <div>
      <h1>Welcome to {firstName} profile!</h1>
      <img src={img}/>
      <h2>Handle: {handle}</h2>
      <h2>First Name: {firstName}</h2>
      <h2>Last Name: {lastName}</h2>
      <h2>Bio: {bio}</h2>
    </div>
  );
};

export default ProfilePage;
