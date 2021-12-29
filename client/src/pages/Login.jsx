import React, { useState } from "react";
import { NavLink } from "react-router-dom";

import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import Modal from "@mui/material/Modal";
import { Backdrop } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 350,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "3%",
  p: 2,
};

const Login = ({ handleLoginChange, handleLoginClick, login }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <li className="option_features">
        <NavLink onClick={handleOpen} to="#" className="link_style">
          Login
        </NavLink>
      </li>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <div className="login-form">
              <h2 className="heading-secondary ma-bt-lg">
                Log into your account
              </h2>
              <form className="form form--login">
                <div className="form__group">
                  <label className="form__label" htmlFor="email">
                    Email address
                  </label>
                  <input
                    className="form__input"
                    id="email"
                    type="email"
                    name="email"
                    value={login.email}
                    onChange={(e) => handleLoginChange(e)}
                    placeholder="you@example.com"
                    required=""
                  />
                </div>
                <div className="form__group ma-bt-md">
                  <label className="form__label" htmlFor="password">
                    Password
                  </label>
                  <input
                    className="form__input"
                    id="password"
                    type="password"
                    name="password"
                    value={login.password}
                    onChange={(e) => handleLoginChange(e)}
                    placeholder="••••••••"
                    required=""
                    minLength="8"
                  />
                </div>
                <div className="form__group">
                  <button
                    onClick={(e) => handleLoginClick(e)}
                    className="btn btn--green"
                  >
                    Login
                  </button>
                </div>
              </form>
            </div>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default Login;
