
import { atom } from "recoil";

export const userState = atom({
  key: "userState", 
  default: {
    firstname: "",
    lastname:"",
    email: "",
    balance: 0,
    token: "",
    isLoggedIn: false,
  },
});
