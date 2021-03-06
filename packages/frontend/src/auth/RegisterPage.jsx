import { FormControl, Grid, Input, Box, Typography } from "@material-ui/core";
import React, { useContext, useState } from "react";
import { StateContext, ContextType } from "../StateProvider";
import { register } from "./authApi";
import AuthError from "./AuthError";
import { Link, Redirect } from "react-router-dom";

export default function LoginPage() {
  const [handle, setHandle] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const { state, dispatch } = useContext(StateContext);
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(evt) {
    evt.preventDefault();

    try {
      const user = await register(handle, firstName, lastName, password);
      dispatch({
        type: "setUser",
        payload: user,
      });
    } catch (e) {
      if (!handle || !firstName || !lastName || !password) {
        setErrorMsg("Please fill out all fields to create an account.");
      } else {
        setErrorMsg(
          "This handle is already in use. Please register with another handle."
        );
      }
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
            <Typography variant="h4">Welcome to Hop-N-Tweet!</Typography>
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
                  id="firstName"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(evt) => setFirstName(evt.target.value)}
                />
              </FormControl>
              <FormControl fullWidth>
                <Input
                  id="lastName"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(evt) => setLastName(evt.target.value)}
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
            <AuthError errorMsg={errorMsg} open={error} setOpen={setError} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
