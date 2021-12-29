import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const Blog = ({ url, headingText, buttonText, req }) => {
  const [blog, setBlog] = useState({
    title: "",
    description: "",
  });
  const [imgPreview, setImgPreview] = useState(null);

  const [file, setFile] = useState(null);
  let name, value;
  const onBlogChange = (e) => {
    name = e.target.name;
    value = e.target.value;
    setBlog({ ...blog, [name]: value });
  };

  const history = useHistory();

  const onFileChange = (e) => {
    const file = e.target.files[0];
    const imgPreview = URL.createObjectURL(file);
    // console.log(imgPreview);
    setImgPreview(imgPreview);
    setFile(e.target.files[0]);
  };
  const onBlogClick = async (e) => {
    e.preventDefault();
    try {
      const { title, description } = blog;
      const formData = new FormData();
      if (blog.title !== "") {
        formData.append("title", title);
      }
      if (blog.description !== "") {
        formData.append("description", description);
      }
      if (file !== null) {
        formData.append("image", file);
      }
      const config = {
        headers: { "content-type": "multipart/form-data" },
      };

      const res = await axios({
        method: req,
        url: url,
        data: formData,
        config,
      });
      // console.log(res);
      if (res.data.status === "success") {
        history.push("/myBlogs");
      }
    } catch (error) {
      alert(error.response.data.message);
      // console.log(error.response.data.message);
    }
  };
  return (
    <>
      <div className="user-view__content p-t-b">
        <div className="user-view__form-container">
          <div className="txt-ctr">
            <h2 className="heading-secondary ma-bt-md">{headingText}</h2>
          </div>
          <div className="form__group form__photo-upload">
            {imgPreview === null && (
              <img
                className="form__blog-pic"
                src={`/public/img/post/default.jpeg`}
                alt="User pic"
              />
            )}

            {imgPreview !== null && (
              <img className="form__blog-pic" src={imgPreview} alt="User pic" />
            )}

            <input
              className="form__upload"
              type="file"
              accept="image/*"
              id="photo"
              name="photo"
              multiple={true}
              onChange={onFileChange}
            />
            <label htmlFor="photo">Choose New Image</label>
          </div>
          <form className="form form-user-data">
            <div className="form__group">
              <label className="form__label" htmlFor="name">
                Title
              </label>
              <input
                className="form__input "
                id="name"
                type="text"
                required=""
                name="title"
                minLength="8"
                maxLength="17"
                value={blog.title}
                onChange={onBlogChange}
              />
            </div>
            <div className="form__group ma-bt-md">
              <label className="form__label" htmlFor="textarea">
                Description
              </label>
              <textarea
                className="form__input form__myaccount"
                id="textarea"
                type="textarea"
                required=""
                name="description"
                value={blog.description}
                onChange={onBlogChange}
                rows="7"
                cols="50"
                minLength="50"
              />
            </div>
            <div className="form__group right">
              <button
                className="btn btn--small btn--green"
                onClick={onBlogClick}
              >
                {buttonText}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Blog;
