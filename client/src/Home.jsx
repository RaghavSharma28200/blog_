import axios from "axios";
import React, { useEffect, useState } from "react";
import { Loader } from "rsuite";
import Heading from "./misc/Heading";
import Card from "./pages/card/Card";

const Home = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios
      .get("/api/v1/posts")
      .then((data) => {
        // console.log(data.data.data.posts);
        setData(data.data.data.posts);
        setLoading(false);
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  }, []);
  return (
    <>
      {loading && <Loader content="loading...." center vertical />}
      {!loading && (
        <>
          <Heading />
          <Card data={data} />{" "}
        </>
      )}
    </>
  );
};

export default Home;
