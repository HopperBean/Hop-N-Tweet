import React, { useEffect } from "react";
import { useReducer, createContext } from "react";
import { checkSession } from "./auth/authApi";

// see https://reactjs.org/docs/hooks-reference.html#usereducer

const initialState = {
  user: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "setUser":
      return { ...state, user: action.payload };
    case "unsetUser":
      return { ...state, user: null };
  }
}


export const StateContext = createContext({
  state: initialState,
  dispatch: () => alert("Initial dispatcher. This should never be called."),
});

export default function StateProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    checkSession().then((user) => {
      if (user && user._id) {
        // this sets the session
        dispatch({
          type: "setUser",
          payload: user,
        });
      }
    });
  }, []);

  console.log("STATE", state);

  return (
    <StateContext.Provider value={{ state, dispatch }}>
      {props.children}
    </StateContext.Provider>
  );
}
