import "https://cdnjs.cloudflare.com/ajax/libs/framework7/5.7.12/js/framework7.bundle.min.js";
import "https://cdnjs.cloudflare.com/ajax/libs/firebase/7.24.0/firebase-app.js";
import "https://cdnjs.cloudflare.com/ajax/libs/firebase/7.24.0/firebase-database.js";
// Your web app's Firebase configuration
import firebaseConfig from "./firebase.js";

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

window.StoreData = (oOrder) => {
  const orderID = new Date().toISOString().replace(".", "_");
  firebase
    .database()
    .ref("orders/" + orderID)
    .set(oOrder)
    .then(() => {
      window.open("", "_self");
      window.close();
    })
    .catch((e) => {
      console.log(e.toString());
    });
};
