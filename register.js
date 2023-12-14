import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

import {auth,db} from "./config.js"

const form = document.querySelector("#form");
const email = document.querySelector("#exampleInputEmail1");
const password = document.querySelector("#exampleInputPassword1");
const fName = document.querySelector("#validationCustom01");
const lName = document.querySelector("#validationCustom02");
const city = document.querySelector("#validationCustom03");
const userName = document.querySelector("#validationCustomUsername");


form.addEventListener("submit",(event)=>{
    event.preventDefault();

    createUserWithEmailAndPassword(auth, email.value, password.value)
    .then(async (userCredential) => {
      // Signed up 
      const user = userCredential.user;
       console.log(user);
       try {
        const docRef = await addDoc(collection(db, "registeration"), {
            Email : email.value,
            fName : fName.value,
            lName : lName.value,
            city : city.value,
            userName : userName.value,
            uid : auth.currentUser.uid
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
      
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
       console.log(errorMessage);
    });
  

})

