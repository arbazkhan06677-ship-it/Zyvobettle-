import { initializeApp, getApps } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
initializeFirestore,
getFirestore,
doc,
getDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
apiKey: "AIzaSyDJpr9gktLVZgPOF2K89mOlubJrddw9OT0",
authDomain: "zyvobettle.firebaseapp.com",
projectId: "zyvobettle",
storageBucket: "zyvobettle.firebasestorage.app",
messagingSenderId: "335264733948",
appId: "1:335264733948:web:30217c54d3e15c8b1bd579"
};

const status = document.getElementById("connectionStatus");

function showStatus(message) {
if (status) status.textContent = message;
console.log("[Firebase Check]", message);
}

async function checkFirebase() {
try {
showStatus("Firebase initialize ho raha hai...");

const app = getApps().length
  ? getApps()[0]
  : initializeApp(firebaseConfig);

let db;

try {
  db = initializeFirestore(app, {
    experimentalAutoDetectLongPolling: true
  });
} catch (error) {
  if (
    error.code === "failed-precondition" ||
    error.code === "already-initialized"
  ) {
    db = getFirestore(app);
  } else {
    throw error;
  }
}

showStatus("Firebase initialized. Database test ho raha hai...");

// Sirf read test; database mein kuch create/change nahi karega.
await getDoc(doc(db, "tournaments", "__connection_test__"));

showStatus("✅ Firebase connected! Firestore response mil gaya.");

} catch (error) {
console.error("Firebase connection test failed:", error);

showStatus(
  "❌ Firebase error: " +
  (error.code || error.name || "unknown") +
  " — " +
  (error.message || "Connection test failed")
);

}
}

checkFirebase();
