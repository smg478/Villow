import { csrfFetch } from "./csrf";

// ACTION TYPES
const RECEIVE_USER = "users/RECEIVE_USER";
const REMOVE_USER = "users/REMOVE_USER";

// ACTION CREATORS
export const receiveUser = (user) => ({
  type: RECEIVE_USER,
  user,
});

export const removeUser = () => ({
  type: REMOVE_USER,
});

export const getActiveUser = () => (state) => {
  if (state && state.session.user) {
    return state.session.user;
  }

  return null;
};

export const loginUser = (userCredentials) => async (dispatch) => {
  try {
    let res = await csrfFetch("/api/session", {
      method: "POST",
      body: JSON.stringify(userCredentials),
    });

    console.log("This is form usersReducer.js: ", res);

    if (res.ok) {
      const { user } = await res.json();
      const csrfToken = res.headers.get("X-CSRF-Token");

      if (csrfToken) {
        sessionStorage.setItem("X-CSRF-Token", csrfToken);
        sessionStorage.setItem(
          "currentUser",
          JSON.stringify({
            id: user.id,
            name: user.email,
          })
        );
      }

      dispatch(receiveUser(user));
    } else {
      try {
        const { errors } = await res.json();
        throw new Error(errors.join(", "));
      } catch (jsonError) {
        throw new Error(res.statusText);
      }
    }
  } catch (error) {
    throw error;
  }
};

export const logoutUser = () => async (dispatch) => {
  await csrfFetch("/api/session", {
    method: "DELETE",
  });
  sessionStorage.setItem("currentUser", null);
  dispatch(removeUser());
};

export const createUser = (user) => async (dispatch) => {
  let res = await csrfFetch("/api/users", {
    method: "POST",
    body: JSON.stringify(user),
  });

  if (res.ok) {
    let data = await res.json();
    sessionStorage.setItem("currentUser", JSON.stringify(data.user));
    dispatch(receiveUser(data.user));
  } else {
    const { errors } = await res.json();
    throw new Error(errors);
  }
};

export const fetchCurrentUser = () => async (dispatch) => {
  const res = await csrfFetch("/api/session");
  console.log("VALUE OF res from fetchCurrentUser: ", res);
  console.log("VALUE OF res.ok from fetchCurrentUser: ", res.ok);

  if (res.ok) {
    const { user } = await res.json();
    console.log('User:', user); // Add this line
    dispatch(receiveUser(user));
  }
};

// REDUCER
const userReducer = (state = {}, action) => {
  const nextState = { ...state };

  switch (action.type) {
    case RECEIVE_USER:
      nextState.user = action.user;
      return nextState;
    case REMOVE_USER:
      nextState["user"] = null;
      debugger;
      return nextState;
    default:
      return state;
  }
};

export default userReducer;
