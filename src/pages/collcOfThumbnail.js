import { Box, Grid, Paper, Skeleton, Toolbar, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/navbar";

export default function CollcOfThumbnail() {
  const navigate = useNavigate();
  const [thumbnail, setThumbnail] = useState(null);
  const getThumbnail = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/thumbnails/`
    );

    const thumbnails = response.data;
    if (thumbnails) {
      setThumbnail(thumbnails);
    }
  };
  useEffect(() => {
    getThumbnail();
  }, []);
  return (
    <div>
      <Navbar btn="Add new thumbnail" navigation={"/"} />
      <Toolbar />
      <Box>
        <Box padding={"1rem"}>
          {thumbnail && (
            <Box>
              <Grid container spacing={2}>
                {thumbnail.map((thumbnail) => (
                  <Grid item key={thumbnail._id} xs={12} sm={6} md={3} lg={3}>
                    <Paper
                      onClick={() => navigate(`/${thumbnail._id}`)}
                      sx={{
                        background: "black",
                        cursor: "pointer",
                        height: "380px",
                      }}
                    >
                      <img
                        src={thumbnail.thumbnailUrl}
                        alt=""
                        width={"100%"}
                        style={{
                          objectFit: "fill",
                          maxHeight: "200px",
                          background: "#f8f8f8",
                        }}
                      />
                      <Typography
                        variant="h6"
                        sx={{
                          // margin: "1rem 0rem 0rem 0rem",
                          padding: "0.5rem",
                          color: "white",
                        }}
                        fontWeight={"bold"}
                      >
                        {thumbnail.title}
                      </Typography>
                      <Typography
                        sx={{
                          padding: "0rem 0.5rem",
                          color: "white",
                        }}
                      >
                        {thumbnail.description}
                      </Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}
          {!thumbnail && (
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={3} lg={3}>
                <Skeleton variant="rectangular" width="100%" height={200} />
                <Skeleton height={40} />
                <Skeleton height={60} />
              </Grid>
              <Grid item sm={6} xs={12} md={3} lg={3}>
                <Skeleton variant="rectangular" width="100%" height={200} />
                <Skeleton height={40} />
                <Skeleton height={60} />
              </Grid>
              <Grid item sm={6} xs={12} md={3} lg={3}>
                <Skeleton variant="rectangular" width="100%" height={200} />
                <Skeleton height={40} />
                <Skeleton height={60} />
              </Grid>
              <Grid item sm={6} xs={12} md={3} lg={3}>
                <Skeleton variant="rectangular" width="100%" height={200} />
                <Skeleton height={40} />
                <Skeleton height={60} />
              </Grid>
            </Grid>
          )}
        </Box>
      </Box>
    </div>
  );
}
