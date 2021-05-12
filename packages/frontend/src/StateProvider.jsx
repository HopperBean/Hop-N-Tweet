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

//CreateContext - creates a Context object. When React renders a component that subscribes to this Context object it will read the current context value from the closest matching Provider above it in the tree.
//Every Context object comes with a Provider React component that allows consuming components to subscribe to context changes.
//The Provider component accepts a **value** prop (-> see return statement at the bottom of the file) to be passed to consuming components that are descendants of this Provider.

export const StateContext = createContext({
  state: initialState,
  //can use contextType here instead of the filler function
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

 // console.log("STATE", state);

  return (
    <StateContext.Provider value={{ state, dispatch }}>
      {props.children}
    </StateContext.Provider>
  );
}
