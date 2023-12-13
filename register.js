import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import {auth} from "./config.js"

const form = document.querySelector("#form");
const email = document.querySelector("#exampleInputEmail1");
const password = document.querySelector("#exampleInputPassword1");

form.addEventListener("submit",(event)=>{
    event.preventDefault();
    createUserWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      // Signed up 
      const user = userCredential.user;
       console.log(user)
       email.value = "";
       password.value="";
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
       console.log(errorMessage);
    });
  

})