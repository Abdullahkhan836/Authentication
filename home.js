import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { auth, db } from "./config.js";
import { collection, addDoc, getDocs ,query, where, Timestamp, orderBy } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

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


// logout Function //
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


// Sending Data to Firebase Database//
form.addEventListener("submit", async (event) => {
  event.preventDefault();
  card.innerHTML = '';
  try {
    const docRef = await addDoc(collection(db, "users"), {
      Email: email.value,
      Name: username.value,
      born: 1815,
      uid: auth.currentUser.uid,
      postData: Timestamp.fromDate(new Date())

    });
    username.value = "";
    email.value = "";
    console.log("Document written with ID: ", docRef.id);
    getData();
  } catch (e) {
    console.error("Error adding document: ", e);
  }
})

// getting data from firebase database//
let array = [];
 async function getData() {
  array.length = 0;
  const q = query(collection(db, "users"),  orderBy('postData' , 'desc'));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    array.push({...doc.data(), docID: doc.id})
   });
    array.map((item)=>{
      card.innerHTML += `<div class="card">
      <div class="card-body">
           <p><span class="h4">Email : </span>${item.Email}</p>
           <p><span class="h4">Name : </span>${item.Name}</p>
           <p><span class="h4">born : </span>${item.born}</p>

           <button id="updBtn" type="button" class="btn btn-info">Update</button>
           <button  id="delBtn" type="button" class="btn btn-danger">Delete</button>

      </div>
    </div>`
  })
  const  updBtn = document.querySelectorAll("#updBtn")
   const  delBtn = document.querySelectorAll("#delBtn")

        updBtn.forEach((item,index)=>{
            item.addEventListener("click",()=>{
              console.log("update",array[index])
            })
        })

        delBtn.forEach((item ,index)=>{
          item.addEventListener("click",()=>{
            console.log("Delete",array[index])
          })
        })
}
getData()

