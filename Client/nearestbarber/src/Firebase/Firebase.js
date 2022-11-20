
import { initializeApp} from "firebase/app";
import {getStorage} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDLLCf1RHfIZtcKom229M20LTHOO60fbMw",
  authDomain: "nearestbarber.firebaseapp.com",
  projectId: "nearestbarber",
  storageBucket: "nearestbarber.appspot.com",
  messagingSenderId: "126119242351",
  appId: "1:126119242351:web:c248ecf7a8249d815c7b9a"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export default storage;