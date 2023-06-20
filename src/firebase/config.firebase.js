// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBgnTSLZR1AOBRJIN01p5EfkMMJ9Du0Q1Y",
  authDomain: "unipay-client.firebaseapp.com",
  projectId: "unipay-client",
  storageBucket: "unipay-client.appspot.com",
  messagingSenderId: "424356490527",
  appId: "1:424356490527:web:7bf48dc01c3f133b65542a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;