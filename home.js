import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { auth, db } from "./config.js";
import { collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const form = document.querySelector("#form");
const email = document.querySelector("#email")
const username = document.querySelector("#username")
const card = document.querySelector("#card")


// User is login or not //
onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    console.log(uid)
  } else {
    window.location = "login.html"
  }
});

const logout = document.querySelector("#Logout-btn");
logout.addEventListener("click", () => {
  signOut(auth).then(() => {
    swal("Logout Successfully!", "Please Login again!", "success");
    setTimeout(()=>{
     window.location.href="login.html";
    },2000)
  }).catch((error) => {
    alert(error)
  });


})


form.addEventListener("submit", async (event) => {
  event.preventDefault();

  try {
    const docRef = await addDoc(collection(db, "users"), {
      Email: email.value,
      Name: username.value,
      born: 1815,
      uid: auth.currentUser.uid
    });
    username.value = "";
    email.value = "";
    console.log("Document written with ID: ", docRef.id);
    getData();
  } catch (e) {
    console.error("Error adding document: ", e);
  }
})


 async function getData() {
  let array = [];
  const querySnapshot = await getDocs(collection(db, "users"));
  querySnapshot.forEach((doc) => {
    array.push(doc.data())
   });
    array.map((item)=>{
      card.innerHTML += `<div class="card">
      <div class="card-body">
           <p><span class="h4">Email</span>${item.Email}</p>
           <p><span class="h4">Name</span>${item.Name}</p>
           <p><span class="h4">born</span>${item.born}</p>
      </div>
    </div>`
  });
}
getData()