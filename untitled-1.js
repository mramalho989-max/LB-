<script type="module">
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyCSLsPUmTwrNYZTl-ETITgYPQn57fGYFHA",
    authDomain: "banco-de-dados-eadae.firebaseapp.com",
    projectId: "banco-de-dados-eadae",
    storageBucket: "banco-de-dados-eadae.firebasestorage.app",
    messagingSenderId: "646162908537",
    appId: "1:646162908537:web:0f3f490a9fd9479b945ba8",
    measurementId: "G-1CM8DFFFBM"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
</script>