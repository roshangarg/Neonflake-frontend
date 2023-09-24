import React, { useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Button,
  IconButton,
  Toolbar,
} from "@mui/material";
import CloudUploadSharpIcon from "@mui/icons-material/CloudUploadSharp";
import DeleteSharpIcon from "@mui/icons-material/DeleteSharp";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/navbar";
import axios from "axios";

export default function Home() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [video, setVideo] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [error1, setError1] = useState("");
  const [videoTypeError, setVideoTypeError] = useState("");
  const [imageTypeError, setImageTypeError] = useState("");

  const navigate = useNavigate();

  const handleTitle = (event) => {
    const value = event.target.value;
    setTitle(value);

    if (value.length > 50) {
      setError("Cannot enter more than 50 characters");
    } else {
      setError("");
    }
  };
  const handleDescription = (e) => {
    setDescription(e.target.value);
    if (description.length > 200) {
      setError1("cannot enter more than 200 characters");
    } else {
      setError1("");
    }
  };
  const handleVideoFileChange = (selectedFile) => {
    if (selectedFile) {
      const allowedTypes = [".mpg", ".mp4", ".avi"];

      if (allowedTypes.some((type) => selectedFile.name.endsWith(type))) {
        setVideo(selectedFile);
        setVideoTypeError(""); // Clear any previous error message
      } else {
        setVideo(null); // Clear the selected file
        setVideoTypeError(
          "Unsupported file type. Please select a .mpg, .mp4, or .avi file."
        );
      }
    }
  };
  const handleImageChange = (selectedFile) => {
    if (selectedFile) {
      const allowedTypes = [".png", ".jpg"];
      if (allowedTypes.some((type) => selectedFile.name.endsWith(type))) {
        setImage(selectedFile);
        setImageTypeError(""); // Clear any previous error message
      } else {
        setImage(""); // Clear the selected file
        setImageTypeError(
          "Unsupported file type. Please select a .png or .jpg file."
        );
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("reuest created ");
    // Validation checks
    if (!title || !description || !image || !video) {
      setError("Please fill in all fields.");
      return;
    }

    const formData1 = new FormData();
    formData1.append("file", video);
    formData1.append("upload_preset", "zauuzvfi");
    formData1.append("cloud_name", "de2ugyg7a");

    const formData2 = new FormData();
    formData2.append("file", image);
    formData2.append("upload_preset", "zauuzvfi");
    formData2.append("cloud_name", "de2ugyg7a");

    let videoUrl = null;
    let thumbnailUrl = null;

    try {
      const videouploadResponse = await fetch(
        `https://api.cloudinary.com/v1_1/de2ugyg7a/video/upload`,
        {
          method: "POST",
          body: formData1,
        }
      );
      console.log("hello ");

      if (!videouploadResponse) {
        throw new Error("Video upload failed");
      }
      console.log("Hello 2");

      const videouploadResult = await videouploadResponse.json();
      videoUrl = videouploadResult.secure_url;

      const imageuploadResponse = await fetch(
        `https://api.cloudinary.com/v1_1/de2ugyg7a/image/upload`,
        {
          method: "POST",
          body: formData2,
        }
      );

      if (!imageuploadResponse) {
        throw new Error("Image upload failed");
      }

      const imageuploadResult = await imageuploadResponse.json();
      thumbnailUrl = imageuploadResult.secure_url;

      const lastResult = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/thumbnails/`,
        {
          title,
          description,
          thumbnailUrl,
          videoUrl,
        }
      );
      console.log("Hello 5");
      console.log(lastResult);

      if (lastResult.status === 201) {
        setSuccess(true);
        setTitle("");
        setDescription("");
        setImage("");
        setVideo("");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred while uploading.");
    }
    setTimeout(() => {
      setSuccess(false);
      setError("");
    }, 1000);
  };

  return (
    <div>
      <Navbar navigation="thumbnails" btn="View thumbnails" />
      <div
        style={{
          width: "100%",
          minHeight: "100vh",
          background: "#f5f5f5",
          display: "flex",
          flexDirection: "column",

          textAlign: "center",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Toolbar />
        <form
          style={{
            maxWidth: "600px",
            padding: "1rem",

            textAlign: "center",
          }}
          onSubmit={handleSubmit}
        >
          <TextField
            required
            variant="outlined"
            fullWidth
            label="Title"
            size="small"
            name="name"
            value={title}
            error={Boolean(error)}
            helperText={error}
            onChange={handleTitle}
            sx={{
              marginBottom: "2rem",

              "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                {
                  borderColor: "#b26ff8",
                },
              "& .MuiFormLabel-root": {
                color: "#000000",
              },
              "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                {
                  borderColor: "#b26ff8",
                },
            }}
          />
          <TextField
            variant="outlined"
            fullWidth
            multiline
            minRows={4}
            label="Description"
            size="small"
            name="Description"
            value={description}
            error={Boolean(error1)}
            helperText={error1}
            onChange={handleDescription}
            sx={{
              marginBottom: "1rem",

              "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                {
                  borderColor: "#b26ff8",
                },
              "& .MuiFormLabel-root": {
                color: "#000000",
              },
              "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                {
                  borderColor: "#b26ff8",
                },
            }}
          />

          {image !== "" ? (
            <Box>
              <img
                src={URL.createObjectURL(image)}
                alt="profileImage"
                style={{
                  width: 200,
                  height: 200,

                  objectFit: "contain",
                  marginBottom: "1rem",
                }}
              />
              <IconButton
                onClick={() => setImage("")}
                sx={{
                  position: "absolute",
                  fontSize: "large",
                  "&:hover": {
                    background: "black",
                  },
                  background: "black",
                }}
              >
                <DeleteSharpIcon sx={{ color: "white" }} />
              </IconButton>
              {imageTypeError && <Typography>{imageTypeError}</Typography>}
            </Box>
          ) : (
            <Box>
              <label htmlFor="upload-Image">
                <TextField
                  style={{
                    display: "none",
                    width: "350px",
                    height: "350px",
                    borderRadius: "10%",
                  }}
                  fullWidth
                  id="upload-Image"
                  type="file"
                  accept=".jpg , .png"
                  label="file"
                  variant="outlined"
                  onChange={(e) => handleImageChange(e.target.files[0])}
                />
                <Box
                  style={{ borderRadius: "10%" }}
                  sx={{
                    margin: "1rem 0rem",
                    cursor: "pointer",
                    width: "140px",
                    height: "140px",
                    border: "2px solid grey",
                    // borderRadius: '50%',

                    "&:hover": {
                      background: "rgba(112,112,112,0.5)",
                    },
                  }}
                >
                  <CloudUploadSharpIcon
                    style={{
                      color: "grey",
                      margin: "auto",
                      fontSize: "5rem",
                    }}
                    fontSize="large"
                  />
                </Box>
              </label>
            </Box>
          )}
          <TextField
            variant="outlined"
            fullWidth
            size="small"
            type="file"
            accept=".mpg, .mp4, .avi"
            error={Boolean(videoTypeError)}
            helperText={videoTypeError}
            onChange={(e) => handleVideoFileChange(e.target.files[0])}
            sx={{
              marginBottom: "2rem",
              color: "black",

              "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                {
                  borderColor: "#b26ff8",
                },
              "& .MuiFormLabel-root": {
                color: "#000000",
              },
              "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                {
                  borderColor: "#b26ff8",
                },
            }}
          />

          <Box
            sx={{
              textAlign: "center",
              mt: 2,
            }}
          >
            <Button
              variant="outlined"
              type="submit"
              style={{
                borderRadius: "1.5rem",
                padding: " 11px 2rem",
                border: "2px solid black",
                color: "black",
                fontSize: "18px",
                fontWeight: "bold",
                textTransform: "none",
                textAlign: "center",
                marginBottom: "2rem",
              }}
            >
              Add new Thumbnail
            </Button>
          </Box>
        </form>
      </div>
      {success && (
        <Box
          sx={{
            background: "#A6FF96",

            padding: "0.5rem",
            position: "absolute",
            top: 70,
            width: "200px",
            borderRadius: "10px",

            right: 20,
          }}
        >
          <Typography sx={{ color: "blue", fontWeight: "bold" }}>
            Added Successfully
          </Typography>
        </Box>
      )}
    </div>
  );
}
// "proxy": "http://localhost:4000",
