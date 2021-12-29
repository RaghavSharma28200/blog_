import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import Avatar from "../../misc/Avatar";
import { AiFillSetting } from "react-icons/ai";
import { MdLocalPostOffice } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const ShowUserAccount = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
  });

  const [userPassword, setUserPassword] = useState({
    passwordCurrent: "",
    password: "",
    passwordConfirm: "",
  });

  const [file, setFile] = useState("");
  const [image, setImage] = useState(null);
  const [active, setActive] = useState(true);

  const history = useHistory();

  let name, value;
  useEffect(() => {
    axios
      .get("/api/v1/users/me")
      .then((data) => {
        // console.log(data.data.data.data);
        setUser(data.data.data.data);
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  }, []);
  const handleInputChange = (e) => {
    name = e.target.name;
    value = e.target.value;

    // console.log(name, value);
    setUser({ ...user, [name]: value });
  };

  const handleFileChange = (e) => {
    // console.log(e.target.files[0]);
    setFile(e.target.files[0]);
  };

  const handleUserModify = async (e) => {
    e.preventDefault();
    try {
      const { name, email } = user;
      // console.log(name, email);
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("photo", file);
      const url = "/api/v1/users/updateMe";
      const config = {
        headers: { "content-type": "multipart/form-data" },
      };
      const res = await axios.patch(url, formData, config);
      // console.log(res.data.data.user.photo);
      setUser(res.data.data.user);
      setImage(res.data.data.user.photo);
      alert("data updated sucessfully");
      window.location.replace("/");
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const handleUserPassword = (e) => {
    name = e.target.name;
    value = e.target.value;
    // console.log(name, value);
    setUserPassword({ ...userPassword, [name]: value });
  };

  const handleUserPasswordModify = async (e) => {
    e.preventDefault();

    try {
      const { passwordCurrent, password, passwordConfirm } = userPassword;
      const url = "/api/v1/users/updateMyPassword";
      const data = {
        passwordCurrent,
        password,
        passwordConfirm,
      };
      const res = await axios.patch(url, data);
      alert("password updated Sucessfully");
      // console.log(res);
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const handleActive2 = () => {
    setActive(false);
  };

  const handleActive1 = () => {
    setActive(true);
  };

  return (
    <>
      {image !== null && (
        <div className="avatar-state">
          <Avatar image={image} />
        </div>
      )}
      <div className="account__setting">
        <span
          onClick={handleActive1}
          className={`${
            active
              ? "account__setting__option act-active"
              : "account__setting__option"
          }`}
        >
          <AiFillSetting className="account__icon" /> Setting
        </span>
        <span className="account__setting__option " onClick={handleActive2}>
          <NavLink to="/myBlogs" className="link-style act_lnk">
            <MdLocalPostOffice className="account__icon" /> My Blogs
          </NavLink>
        </span>
      </div>
      <div className="user-view__content">
        <div className="user-view__form-container">
          <div className="txt-ctr">
            <h2 className="heading-secondary ma-bt-md">
              Your account settings
            </h2>
          </div>
          <div className="form__group form__photo-upload">
            {user.photo !== undefined && (
              <img
                className="form__user-pic"
                src={`/public/img/user/${user.photo}`}
                alt="User pic"
              />
            )}
            <input
              className="form__upload"
              type="file"
              accept="image/*"
              id="photo"
              name="photo"
              onChange={handleFileChange}
            />
            <label htmlFor="photo">Choose new photo</label>
          </div>
          <form className="form form-user-data">
            <div className="form__group">
              <label className="form__label" htmlFor="name">
                Name
              </label>
              <input
                className="form__input"
                id="name"
                value={user.name}
                onChange={handleInputChange}
                type="text"
                required=""
                name="name"
              />
            </div>
            <div className="form__group ma-bt-md">
              <label className="form__label" htmlFor="email">
                Email address
              </label>
              <input
                className="form__input form__myaccount"
                onChange={handleInputChange}
                value={user.email}
                id="email"
                type="email"
                required=""
                name="email"
              />
            </div>
            <div className="form__group right">
              <button
                onClick={handleUserModify}
                className="btn btn--small btn--green"
              >
                Save settings
              </button>
            </div>
          </form>
        </div>
        <div className="line">&nbsp;</div>
        <div className="user-view__form-container">
          <h2 className="heading-secondary ma-bt-md">Password change</h2>
          <form className="form form-user-password">
            <div className="form__group">
              <label className="form__label" htmlFor="password-current">
                Current password
              </label>
              <input
                className="form__input form__myaccount"
                id="password-current"
                type="password"
                placeholder="••••••••"
                required=""
                minLength="8"
                name="passwordCurrent"
                value={userPassword.passwordCurrent}
                onChange={handleUserPassword}
              />
            </div>
            <div className="form__group">
              <label className="form__label" htmlFor="password">
                New password
              </label>
              <input
                className="form__input form__myaccount"
                id="password"
                type="password"
                placeholder="••••••••"
                required=""
                minLength="8"
                name="password"
                value={userPassword.password}
                onChange={handleUserPassword}
              />
            </div>
            <div className="form__group ma-bt-lg">
              <label className="form__label" htmlFor="password-confirm">
                Confirm password
              </label>
              <input
                className="form__input form__myaccount"
                id="password-confirm"
                type="password"
                placeholder="••••••••"
                required=""
                minLength="8"
                name="passwordConfirm"
                value={userPassword.passwordConfirm}
                onChange={handleUserPassword}
              />
            </div>
            <div className="form__group right">
              <button
                className="btn btn--small btn--green btn--save-password"
                onClick={handleUserPasswordModify}
              >
                Save password
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ShowUserAccount;
