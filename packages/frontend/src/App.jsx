import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { AppBar, Grid, Typography } from "@material-ui/core";

import MainBar from "./layout/MainBar";
import LeftBar from "./layout/LeftBar";
import RightBar from "./layout/RightBar";

import LoginPage from "./auth/LoginPage";
import RegisterPage from "./auth/RegisterPage";
import LogoutPage from "./auth/LogoutPage";
import FeedPage from "./feed/FeedPage";
import NotFoundPage from "./layout/NotFoundPage";
import StateProvider, { StateContext } from "./StateProvider";
import ProfilePage from "./ProfilePage";
import { checkSession } from "./auth/authApi";

export default function App() {
  return (
    <StateProvider>
      <AppBar
        position="static"
        style={{
          marginBottom: 24,
          background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
        }}
      >
        <Typography variant="h4" style={{ padding: 12 }}>
          Hop-N-Tweet
        </Typography>
      </AppBar>
      <Router>
        <Switch>
          <Route path="/auth/login">
            <LoginPage />
          </Route>
          <Route path="/auth/register">
            <RegisterPage />
          </Route>
          <Route>
            <Grid container>
              <LeftBar />
              <MainBar>
                <Switch>
                  <Route path="/" exact>
                    <FeedPage />
                  </Route>
                  <Route path="/profile" exact>
                    <ProfilePage />
                  </Route>
                  <Route path="/auth/logout">
                    <LogoutPage />
                  </Route>
                  <Route component={NotFoundPage} />
                </Switch>
              </MainBar>
              <RightBar />
            </Grid>
          </Route>
        </Switch>
      </Router>
    </StateProvider>
  );
}
