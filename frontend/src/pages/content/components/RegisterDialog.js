import React, { useState } from "react";
import {
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import axios from "axios";

function RegisterDialog(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  // eslint-disable-next-line
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    props.setOpenChangePasswordDialog(false);
  };

  const handleRegister = () => {
    // console.log("Name:", name);
    // console.log("Email:", email);
    // console.log("Password:", password);
    // console.log("Admin Access:", isAdmin);

    // Make an API request to register the user
    axios
      .post(
        "http://127.0.0.1:5000/register",
        {
          name,
          email,
          password,
          isAdmin: isAdmin ? 1 : 0,
        },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        // console.log(response);
        // Assuming the server returns a success status
        window.alert("User Has Been Added Successfully!");

        handleClose(); // Close the dialog after successful registration
      })
      .catch((error, response) => {
        // console.log(response);
        window.alert(error.response.data);
        console.error("Registration failed:", error.response);
        // Handle the error accordingly
      });
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Register</DialogTitle>
      <DialogContent>
        <TextField
          id="name-input"
          label="Name"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          id="email-input"
          label="Email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          id="password-input"
          label="Password"
          variant="outlined"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="normal"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}
            />
          }
          label="Admin Access"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button variant="contained" onClick={handleRegister} color="primary">
          Register
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default RegisterDialog;
