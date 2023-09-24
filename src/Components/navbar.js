import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar({ navigation, btn }) {
  const navigate = useNavigate();
  return (
    <div>
      <AppBar position="fixed">
        <Toolbar sx={{ color: "white", background: "black" }}>
          <Typography
            variant="h6"
            fontWeight={"bold"}
            component="div"
            sx={{ flexGrow: 1 }}
          >
            Neonflake
          </Typography>
          <Button
            style={{
              borderRadius: "1.5rem",

              border: "2px solid blue",

              fontWeight: "bold",
              textTransform: "none",
              // textAlign: "center",
            }}
            onClick={() => navigate(navigation)}
            color="inherit"
          >
            {btn}
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
