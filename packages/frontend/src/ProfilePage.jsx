import React, { useContext } from "react";
import { StateContext, ContextType } from "./StateProvider";

import { Link, Redirect } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";

const ProfilePage = () => {
  const { state, dispatch } = useContext(StateContext);
  console.log("State ", state);
  let { handle, firstName, lastName, img, bio } = state.user;
  return (
    <div>
      <h1>Welcome, {firstName}!</h1>
      <Card
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "column",
          height: 200,
          width: 200,
        }}
      >
        <CardMedia
          style={{ height: 0, paddingTop: "25%", flex: 2 }}
          image={img}
        />
      </Card>
      <h2>Handle: {handle}</h2>
      <h2>First Name: {firstName}</h2>
      <h2>Last Name: {lastName}</h2>
      <h2>Bio: {bio}</h2>
    </div>
  );
};

export default ProfilePage;
