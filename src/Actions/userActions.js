export const SET_USER_TYPE = "SET_USER_TYPE";

// This action creator helps in toogling the user and admin user type.
export const setUserAction = (userType) => ({ type: SET_USER_TYPE, payload: userType});
