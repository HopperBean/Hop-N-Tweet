import { get, post } from "../util";

export function getFeed() {
  return get("api/posts");
}

export function submitTweet(tweet) {
  return post("api/posts", {
    text: tweet.text,
  });
}
