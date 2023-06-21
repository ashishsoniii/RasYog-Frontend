import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { TextField } from "@mui/material";
import axios from "axios";
import Fab from "@mui/material/Fab";
import { AiOutlineLogin } from "react-icons/ai";

// axios.defaults.withCredentials = true;

export default function LoginBtn() {
  const [open, setOpen] = useState(false);
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogin = () => {
    axios
      .post("http://127.0.0.1:5000/login", {
        email,
        password,
      })
      .then((response) => {
        // Assuming the server returns a success status
        if (response.status === 200) {
          // Store login status using cookies or any other desired method
          setLoggedIn(true);
          console.log("Login successful");
        }
      })
      .catch((error) => {
        console.error("Login failed:", error);
      });

    handleClose();
  };

  const handleLogout = () => {
    axios
      .get("http://127.0.0.1:5000/logout")
      .then((response) => {
        // Assuming the server returns a success status
        if (response.status === 200) {
          // Clear login status using cookies or any other desired method
          setLoggedIn(false);
          console.log("Logout successful");
        }
      })
      .catch((error) => {
        console.error("Logout failed:", error);
      });
  };

  if (loggedIn) {
    return (
      <div>
        {/* <Button variant="outlined" onClick={handleLogout}>
          Logout
        </Button> */}
        <Fab variant="extended" onClick={handleLogout}>
          <AiOutlineLogin className="svg-login-icon" sx={{ mr: 1 }} />
          <p className="login-name">{email}</p>
        </Fab>
      </div>
    );
  }

  return (
    <div>
      <Fab variant="extended" onClick={handleClickOpen}>
        <AiOutlineLogin className="svg-login-icon" sx={{ mr: 1 }} />
        <p className="login-name">Login</p>
      </Fab>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          "& .MuiDialog-paper": {
            width: "350px",
            backgroundColor: "floralwhite",
            color: "black",
          },
          "& .MuiDialogContentText-root": {
            display: "flex",
            color: "black",
            flexDirection: "column",
          },
          "& .MuiTextField-root": {
            color: "black",
            width: "90%",
            fontSize: "2rem",
          },
        }}
      >
        <DialogTitle id="alert-dialog-title">
          Login To View Analysis
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <form>
              <br />
              <TextField
                id="outlined-basic"
                label="email"
                variant="outlined"
                value={email}
                onChange={(e) => setemail(e.target.value)}
              />
              <br />
              <br />
              <TextField
                id="outlined-basic"
                label="Password"
                variant="outlined"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <br />
              <br />
              <Button variant="contained" onClick={handleLogin} autoFocus>
                Login
              </Button>
            </form>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            sx={{ color: "black", fontSize: "1.1rem" }}
            onClick={handleClose}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
