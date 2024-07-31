import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyDc_BFVzr9M0D7TYqFFPKWvJeeaqwLms54",
  authDomain: "netflix-clone-d10ef.firebaseapp.com",
  projectId: "netflix-clone-d10ef",
  storageBucket: "netflix-clone-d10ef.appspot.com",
  messagingSenderId: "1049887462064",
  appId: "1:1049887462064:web:f6149adae11d519e65e175"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth= getAuth(app);
const db= getFirestore(app);

const signup = async(name,email,password)=>{
    try {
        const res=await createUserWithEmailAndPassword(auth,email,password);
        const user = res.user;
        await addDoc(collection(db,"user"),{
            uid:user.uid,
            name,
            authProvider:"local",
            email,
        });
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}
const login = async (email,password)=>{
    try {
        await signInWithEmailAndPassword(auth,email,password);
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}
const logout = ()=>{
    signOut(auth);
}
export {auth,db,login,signup,logout}