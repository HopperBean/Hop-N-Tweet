import { FormControl, Grid, Input, Box, Typography } from "@material-ui/core";
import React, { useContext, useState } from "react";
import { StateContext, ContextType } from "../StateProvider";
import { login } from "./authApi";
import AuthError from "./AuthError";
import { Link, Redirect } from "react-router-dom";

export default function LoginPage() {
  const [handle, setHandle] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const { state, dispatch } = useContext(StateContext);
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(evt) {
    evt.preventDefault();

    try {
      const user = await login(handle, password);
      dispatch({
        type: "setUser",
        payload: user,
      });
    } catch (e) {
      setErrorMsg("Failed to log in, please try again.");
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
                  type="password"
                  id="password"
                  placeholder="Password"
                  value={password}
                  onChange={(evt) => setPassword(evt.target.value)}
                />
              </FormControl>
              <FormControl fullWidth>
                <Input type="submit" value="Login"></Input>
              </FormControl>
            </form>
            Don't have an account? <Link to="/auth/register">Sign Up</Link>.
            <AuthError errorMsg={errorMsg} open={error} setOpen={setError} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
