import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../Common/Button";
import Header from "../Common/Header";
import AltLogin from "./AltLogin";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import auth from "../../firebase.init";
import useSaveUser from "../../hooks/useSaveUser";

const Login = () => {
  const [register, setRegister] = useState(false);
  const [forgotPass, setForgotPass] = useState(false);
  const [error, setError] = useState(true);
  const [doc, setDoc] = useState({});
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!error && doc) {
      fetch("http://localhost:5000/insertUser", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(doc),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          localStorage.setItem('authorization_token', JSON.stringify(data.token));
          setError(true);
          //redirecting
          navigate('/');
        });
    }
  }, [error, doc, navigate]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const firstName = e.target.firstName?.value;
    const lastName = e.target.lastName?.value;
    const displayName= `${firstName} ${lastName}`;
    const Confpassword = e.target.Confpassword?.value;
    const password = e.target.password?.value;
    const email = e.target.email?.value;

    //login or sign up
    if (password === Confpassword && firstName && lastName && email) {
      await createUserWithEmailAndPassword(auth, email, password)
        .then(async (res) => {
          if (res.user) {
            await updateProfile(res.user.auth.currentUser, {
              displayName,
            });
            setError(false);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      await signInWithEmailAndPassword(auth, email, password)
        .then((res) => {
          console.log(res.user);
          setError(false);
        })
        .catch((err) => {
          console.error(err);
        });
    };
    //set the user data
    setDoc({ displayName, email });
  };

  return (
    <section>
      <Header black="black" />
      <div className="py-16">
        <form
          onSubmit={handleSubmit}
          className="border grid gap-8 mx-auto p-12 md:w-2/5 w-10/12 rounded"
        >
          <h1 className="text-2xl font-bold">
            {register ? "Create an account" : "Login"}
          </h1>

          {register && (
            <>
              <input
                className="border-b-2 w-full py-2"
                placeholder="First name"
                style={{ outline: "none" }}
                type="firstName"
                name="firstName"
              />

              <input
                className="border-b-2 w-full py-2"
                placeholder="Last name"
                style={{ outline: "none" }}
                type="lastName"
                name="lastName"
              />
            </>
          )}

          <input
            className="border-b-2 w-full py-2"
            placeholder="Username or Email"
            style={{ outline: "none" }}
            type="email"
            name="email"
          />

          <span>
            <input
              className="border-b-2 w-full mb-3 py-2"
              placeholder="Password"
              style={{ outline: "none" }}
              type="password"
              name="password"
            />

            {register || (
              <div className="flex justify-between">
                <div className="flex gap-2">
                  <input type="checkbox" name="remember" id="remember" />
                  <label htmlFor="remember" id="remember">
                    Remember me
                  </label>
                </div>
                <span
                  onClick={() => setForgotPass(true)}
                  className="underline cursor-pointer text-orange-400"
                  to="/forgetpass"
                >
                  Forget Password
                </span>
              </div>
            )}
          </span>

          {register && (
            <input
              className="border-b-2 w-full mb-3 py-2"
              placeholder="Confirm Password"
              style={{ outline: "none" }}
              type="Confpassword"
              name="Confpassword"
            />
          )}

          <Button>Login</Button>
          <p className="text-center">
            {register ? "Already have an account?" : "Don't have an account?"}{" "}
            <span
              onClick={() => setRegister(!register)}
              className="underline text-orange-400 cursor-pointer"
            >
              {register ? "Login" : "Create an account"}
            </span>
          </p>
        </form>

        <div className="md:w-2/6 w-8/12 mx-auto">
          <div
            style={{ gridTemplateColumns: "45% 10% 45%" }}
            className="grid justify-center mt-12 mb-4 text-center items-center"
          >
            <span className="h-[1px] bg-gray-300 w-full block"></span>
            <span>or</span>
            <span className="h-[1px] bg-gray-300 w-full block"></span>
          </div>
          <AltLogin></AltLogin>
        </div>
      </div>
    </section>
  );
};

export default Login;
