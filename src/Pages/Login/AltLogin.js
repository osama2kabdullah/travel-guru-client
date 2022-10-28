import React, { useEffect, useState } from "react";
import AltButton from "./AltButton";
import fb from "../../travel-guru/images/icons/fb.png";
import google from "../../travel-guru/images/icons/google.png";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";
import auth from "../../firebase.init";
import { useNavigate } from "react-router-dom";

const AltLogin = () => {
  const Gprovider = new GoogleAuthProvider();
  const Fprovider = new FacebookAuthProvider();
  const [error, setError] = useState(true);
  const [doc, setDoc] = useState({});
  const navigate = useNavigate();

  const userAuth = auth;
  // console.log(auth);
  useEffect(() => {
    if (userAuth) {
      onAuthStateChanged(userAuth, (user) => {
        user ? setDoc(user) : setDoc("");
      });
    }
  }, [userAuth]);

  useEffect(() => {
    if (!error && doc) {
      const { email, displayName, emailVerified, photoURL } = doc;
      fetch("http://localhost:5000/insertUser", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          displayName,
          emailVerified,
          photoURL,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          localStorage.setItem(
            "authorization_token",
            JSON.stringify(data.token)
          );
          setError(true);
          //redirecting
          navigate("/");
        });
    }
  }, [error, doc, navigate]);

  const handleGLogin = (e) => {
    signInWithPopup(auth, Gprovider)
      .then((result) => {
        console.log(result.user);
        if (result.user) {
          setError(false);
        }
      })
      .then((error) => {
        console.log(error);
      });
  };
  const handleFLogin = () => {
    console.log("face login");
    signInWithPopup(auth, Fprovider)
      .then((result) => {
        console.log(result.user);
        if (result.user) {
          setError(false);
        }
      })
      .then((error) => {
        console.log(error);
      });
  };

  return (
    <div className="grid gap-3">
      <AltButton btn={handleFLogin} icon={fb}>
        Continue with Facebook
      </AltButton>
      <AltButton btn={handleGLogin} icon={google}>
        Continue with Google
      </AltButton>
    </div>
  );
};

export default AltLogin;
