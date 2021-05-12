import {
  Button,
  FormControl,
  Input,
  InputLabel,
  Paper,
} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import React, { SyntheticEvent, useEffect, useRef, useState } from "react";
import { getFeed, submitTweet } from "./feedApi";
import ProfilePage from "../ProfilePage";

export default function FeedPage() {
  const [tweets, setTweets] = useState([]);
  const [tweetInputValue, setTweetInputValue] = useState("");

  useEffect(() => {
    getTweets();
  }, []);

  async function getTweets() {
    const tweets = await getFeed();
    setTweets(tweets);
  }

  async function submit(evt) {
    evt.preventDefault();

    //optional chaining syntax
    //tweetInputValue.?trim()
    const value = tweetInputValue ? tweetInputValue.trim() : undefined;

    if (!value) {
      alert("you must provide some text");
      return;
    }
    try {
      await submitTweet({ text: value });
      setTweetInputValue("");
      await getTweets();
    } catch(error) {
      alert("Please log in to submit a tweet")
    }

  }

  return (
    <Grid item xs={10}>
      <ProfilePage />
      <Paper elevation={2}>
        <form onSubmit={(evt) => submit(evt)}>
          <FormControl fullWidth>
            <Input
              id="tweet-input"
              placeholder="What's happening?"
              value={tweetInputValue}
              onChange={(evt) => setTweetInputValue(evt.target.value)}
            />
          </FormControl>
          <FormControl fullWidth>
            <Input type="submit" value="Tweet"></Input>
          </FormControl>
        </form>
      </Paper>
      {tweets.map((tweet) => (
        <Box key={tweet._id} padding={1}>
          <Paper elevation={1}>
            <Box padding={1}>@{tweet.user.handle}</Box>
            <Box padding={1}>{tweet.text}</Box>
          </Paper>
        </Box>
      ))}
    </Grid>
  );
}
