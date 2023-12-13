import { onAuthStateChanged , signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import {auth} from "./config.js";

onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      console.log(uid)
    } else {
      window.location = "login.html"
    }
  });

  const logout = document.querySelector("#Logout-btn");
  logout.addEventListener("click", ()=>{
    signOut(auth).then(() => {
        alert("successfully Logout")
      }).catch((error) => {
          alert(error)
      });
      

  })
