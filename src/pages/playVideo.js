import { Skeleton, Toolbar } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Components/navbar";

export default function PlayVideo() {
  const [videoUrl, setVideoUrl] = useState(null);
  const { _id } = useParams();

  console.log(_id);
  const getVideoUrl = async (_id) => {
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/thumbnails/` + _id
    );
    const result = response.data;

    setVideoUrl(result.videoUrl);
  };
  useEffect(() => {
    getVideoUrl(_id);
  }, []);
  return (
    <div>
      <Navbar btn="Add new thumbnail" navigation={"/"} />
      <Toolbar />
      <div
        style={{
          width: "100%",
          height: "90vh",
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
        }}
      >
        {!videoUrl && (
          <Skeleton variant="rectangular" height={300} width={500} />
        )}
        {videoUrl && (
          <video autoPlay controls width="500" height="300">
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
      </div>
    </div>
  );
}
