import { FormControl, Grid, Input, Box, Typography } from "@material-ui/core";
import React, { useContext, useState } from "react";
//NOTE! ContextType is not defined in the StateProvider.jsx - looks like we are supposed to define it on our own?
//From React docs:
//The contextType property on a class can be assigned a Context object created by React.createContext(). Using this property lets you consume the nearest current value of that Context type using this.context. You can reference this in any of the lifecycle methods including the render function.

import { StateContext, ContextType } from "../StateProvider";
import { register } from "./authApi";
import AuthError from "./AuthError";
import { Link, Redirect } from "react-router-dom";

export default function LoginPage() {
  const [handle, setHandle] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const { state, dispatch } = useContext(StateContext);

  async function handleSubmit(evt) {
    evt.preventDefault();

    try {
      const user = await register(handle, password);
      dispatch({
        type: "setUser",
        payload: user,
      });
    } catch (e) {
      // console.log(e);
      // alert("Failed to login.");
      setError(true);
    }
  }

  if (state.user) {
    return <Redirect to="/" />;
  }

  return (
    <Grid container>
      <Grid item xs={8}>
        <Grid container>
          <Grid item xs={2}></Grid>
          <Grid item xs={10}>
            <Typography variant="h4">Welcome to Twitterbean!</Typography>
            <Typography variant="h6">Make new friends!</Typography>
            <Typography variant="h6">Talk about things!</Typography>
            <Typography variant="h6">Be part of a community!</Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={4}>
        <Grid container>
          <Grid item xs={1}>
            {/* Empty grid for spacing */}
          </Grid>
          <Grid item xs={4}>
            <form onSubmit={(evt) => handleSubmit(evt)}>
              <FormControl fullWidth>
                <Input
                  id="handle"
                  placeholder="Handle"
                  value={handle}
                  onChange={(evt) => setHandle(evt.target.value)}
                />
              </FormControl>
              <FormControl fullWidth>
                <Input
                  type="password"
                  id="password"
                  placeholder="Password"
                  value={password}
                  onChange={(evt) => setPassword(evt.target.value)}
                />
              </FormControl>
              <FormControl fullWidth>
                <Input type="submit" value="Register"></Input>
              </FormControl>
            </form>
            Already have an account? <Link to="/auth/login">Sign in</Link>.
            <AuthError open={error} setOpen={setError} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
