import axios from "axios";
import { logout } from "./shared/utils/auth";
import { openAlertMessage } from "./store/actions/alertActions";
import store from "./store/store";

const apiClient = axios.create({
  baseURL: "https://discordclone-bychethan.herokuapp.com/api",

  timeout: 5000,
});

// axios middleware adds token to every request in authorization
apiClient.interceptors.request.use(
  (config) => {
    const userDetails = localStorage.getItem("user");
    if (userDetails) {
      const token = JSON.parse(userDetails).token;
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

// Api calls
// login user
export const login = async (data) => {
  try {
    return await apiClient.post("/auth/login", data);
  } catch (exception) {
    return { error: true, exception };
  }
};

// register user
export const register = async (data) => {
  try {
    return await apiClient.post("/auth/register", data);
  } catch (exception) {
    return { error: true, exception };
  }
};

// secure routes

// send friend invite
export const sendFriendInvitation = async (data) => {
  try {
    return await apiClient.post("/friend-invitation/invite", data);
  } catch (exception) {
    checkResponseCode(exception);
    return { error: true, exception };
  }
};

// invitation accept
export const acceptFriendInvitation = async (data) => {
  try {
    return await apiClient.post("/friend-invitation/accept", data);
  } catch (exception) {
    checkResponseCode(exception);
    return {
      error: true,
      exception,
    };
  }
};

// invitation reject
export const rejectFriendInvitation = async (data) => {
  try {
    return await apiClient.post("/friend-invitation/reject", data);
  } catch (exception) {
    checkResponseCode(exception);
    return {
      error: true,
      exception,
    };
  }
};

// if jwt token error then we logout
const checkResponseCode = (exception) => {
  const responseCode = exception?.response?.status;
  if (responseCode) {
    if (responseCode === 401 || responseCode === 403) {
      openAlertMessage(store.dispatch, "Login Again");
      logout();
    }
  }
};
