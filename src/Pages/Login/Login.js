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
import { useForm } from "react-hook-form";
import DivSpinner from "../Common/DivSpinner";

const Login = () => {
  const [registerOk, setRegister] = useState(false);
  const [forgotPass, setForgotPass] = useState(false);
  const [error, setError] = useState(true);
  const [doc, setDoc] = useState({});
  const navigate = useNavigate();
  const [proccessLogin, setProccessLogin] = useState(false);
  const [logError, setLogError] = useState("");

  useEffect(() => {
    if (auth.currentUser) {
      navigate("/");
    }
  }, [navigate]);

  //store in db
  useEffect(() => {
    if (!error && doc) {
      fetch("https://guarded-ravine-02179.herokuapp.com/insertUser", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(doc),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          localStorage.setItem(
            "authorization_token",
            data.token
          );
          setError(true);
          //redirecting
          navigate("/");
        });
    }
  }, [error, doc, navigate]);

  //react hook form
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    setProccessLogin(true);
    const { email, firstName, lastName, password, Confpassword } = data;
    //login or sign up
    if (Confpassword && firstName && lastName && email) {
      if (password !== Confpassword) {
        setProccessLogin(false);
        setLogError("Password didn't match");
        return;
      }
      await createUserWithEmailAndPassword(auth, email, password)
        .then(async (res) => {
          if (res.user) {
            await updateProfile(res.user.auth.currentUser, {
              displayName: `${firstName} ${lastName}`,
            });
            setProccessLogin(false);
            setError(false);
          }
        })
        .catch((err) => {
          console.error(err);
          setLogError(err.message);
          setProccessLogin(false);
        });
    } else {
      await signInWithEmailAndPassword(auth, email, password)
        .then((res) => {
          console.log(res.user);
          setProccessLogin(false);
          setError(false);
        })
        .catch((err) => {
          setProccessLogin(false);
          console.error(err.message);
          setLogError(err.message);
        });
    }
    //set the user data
    setDoc({ displayName: `${firstName} ${lastName}`, email });
  };

  return (
    <section>
      <Header black="black" />
      <div className="py-16">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="border grid relative gap-8 mx-auto p-5 md:p-12 md:w-2/5 w-11/12 rounded"
        >
          {proccessLogin && <DivSpinner />}
          <h1 className="text-2xl font-bold">
            {registerOk ? "Create an account" : "Login"}
          </h1>

          {logError && (
            <p className="text-red-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 inline"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                />
              </svg>{" "}
              {logError}
            </p>
          )}

          {registerOk && (
            <>
              <input
                className="border-b-2 w-full py-2"
                placeholder="First name"
                style={{ outline: "none" }}
                {...register("firstName", { required: true })}
              />

              <input
                className="border-b-2 w-full py-2"
                placeholder="Last name"
                style={{ outline: "none" }}
                {...register("lastName", { required: true })}
              />
            </>
          )}

          <input
            className="border-b-2 w-full py-2"
            placeholder="Username or Email"
            style={{ outline: "none" }}
            {...register("email", { required: true })}
          />

          <span>
            <input
              className="border-b-2 w-full mb-3 py-2"
              placeholder="Password"
              style={{ outline: "none" }}
              {...register("password", { required: true })}
            />

            {registerOk || (
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

          {registerOk && (
            <input
              className="border-b-2 w-full mb-3 py-2"
              placeholder="Confirm Password"
              style={{ outline: "none" }}
              {...register("Confpassword", { required: true })}
            />
          )}

          <Button>{registerOk ? "Signup" : "Login"}</Button>
          <p className="text-center">
            {registerOk ? "Already have an account?" : "Don't have an account?"}{" "}
            <span
              onClick={() => setRegister(!registerOk)}
              className="underline text-orange-400 cursor-pointer"
            >
              {registerOk ? "Login" : "Create one"}
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
