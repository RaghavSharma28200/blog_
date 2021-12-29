import axios from "axios";
import React, { memo, useCallback, useEffect, useState } from "react";
import Login from "./Login";
import SignUp from "./SignUp";
import ShowLogoutPhoto from "./ShowLogoutPhoto";
import { NavLink } from "react-router-dom";

// const cookie = document.cookie.match(/^(.*;)?\s*jwt\s*=\s*[^;]+(.*)?$/);
// const cookie = document.cookie.indexOf('jwt');

const NavBar = () => {
  const [open, setOpen] = useState(false);
  const [pic, setPic] = useState("default.jpg");
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  const [signup, setSignup] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const handlePic = useCallback(async () => {
    const data = await axios.get("/api/v1/users/me");
    // console.log(data);
    setPic(data.data.data.data.photo);
  }, []);
  const checkUser = JSON.parse(localStorage.getItem("auth"));
  useEffect(() => {
    if (checkUser && checkUser.user) {
      handlePic();
    }
  }, [checkUser, handlePic]);

  let name, value;
  const handleLoginChange = (e) => {
    name = e.target.name;
    value = e.target.value;

    // console.log(name, value);
    setLogin({ ...login, [name]: value });
  };

  const handleLoginClick = async (e) => {
    e.preventDefault();
    try {
      const { email, password } = login;
      const res = await axios({
        method: "POST",
        url: "/api/v1/users/login",
        data: {
          email,
          password,
        },
      });

      if (res.data.status === "success") {
        console.log("Logged in sucessfully");
        // console.log(res.data.data.user.name);
        // setPic(res.data.data.user)

        setOpen(false);
        localStorage.setItem(
          "auth",
          JSON.stringify({ user: res.data.data.user.name })
        );
        setLogin("");
      }
      // const data =  await axios.get('/api/v1/users/me');
      // // console.log(data.data.data.data.photo);
      // setPic(data.data.data.data.photo)
    } catch (error) {
      console.log("error", error.response.data.message);
      // console.log(error)
    }
  };

  //////////signup
  const handleSignupChange = (e) => {
    name = e.target.name;
    value = e.target.value;
    setSignup({ ...signup, [name]: value });
  };
  const handleSignupClick = async (e) => {
    e.preventDefault();
    try {
      const { name, email, password, passwordConfirm } = signup;
      const res = await axios({
        method: "POST",
        url: "/api/v1/users/signup",
        data: {
          name,
          email,
          password,
          passwordConfirm,
        },
      });
      if (res.data.status === "success") {
        console.log("signned in sucessfully");
        console.log(res);

        localStorage.setItem(
          "auth",
          JSON.stringify({ user: res.data.data.user.name })
        );
        setOpen(false);
        setSignup("");
      }
    } catch (error) {
      console.log("error", error.response.data.message);
    }
  };

  ///////// for logout
  const handleLogout = async () => {
    const res = await axios.get("/api/v1/users/logout");
    console.log(res.data);
    localStorage.removeItem("auth");
    window.location.replace("/");
  };

  return (
    <>
      <nav className="header">
        <NavLink to="/">
          <div className="logo"></div>
        </NavLink>
        <div>
          <ul className="header_options">
            {checkUser && (
              <>
                <ShowLogoutPhoto
                  handlePic={handlePic}
                  handleLogout={handleLogout}
                  pic={pic}
                />
              </>
            )}
            {!checkUser && (
              <>
                <Login
                  handleLoginClick={handleLoginClick}
                  handleLoginChange={handleLoginChange}
                  login={login}
                />
                <SignUp
                  handleSignupChange={handleSignupChange}
                  handleSignupClick={handleSignupClick}
                  signup={signup}
                />
              </>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
};

export default memo(NavBar);
