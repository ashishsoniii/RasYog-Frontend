// import React, { useState, useEffect } from "react";
// import Button from "@mui/material/Button";
// import Dialog from "@mui/material/Dialog";
// import DialogActions from "@mui/material/DialogActions";
// import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
// import DialogTitle from "@mui/material/DialogTitle";
// import { TextField } from "@mui/material";
// import axios from "axios";
// import Fab from "@mui/material/Fab";
// import { AiOutlineLogin } from "react-icons/ai";

// export default function LoginBtn() {
//   const [open, setOpen] = useState(false);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loggedIn, setLoggedIn] = useState(false);

//   useEffect(() => {
//     const storedEmail = localStorage.getItem("email");
//     if (storedEmail) {
//       setLoggedIn(true);
//       setEmail(storedEmail);
//     }
//   }, []);

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   const handleLogin = () => {
//     axios
//       .post(
//         "http://127.0.0.1:5000/login",
//         {
//           email,
//           password,
//         },
//         {
//           withCredentials: true,
//         }
//       )
//       .then((response) => {
//         console.log(response);
//         // Assuming the server returns a success status
//         const cookies = response.headers["Set-Cookie"];
//         console.log(cookies + "This is cookies!");
//         setLoggedIn(true);
//         if (cookies) {
//           localStorage.setItem("cookie", cookies);
//           console.log("Login cookie seted");
      
//           console.log("Login successful");
//         }
//         localStorage.setItem("email", email); // Store email in local storage
//       })
//       .catch((error) => {
//         console.error("Login failed:", error);
//       });

//     handleClose();
//   };

//   const handleLogout = () => {
//     axios
//       .get("http://127.0.0.1:5000/logout", {
//         withCredentials: true,
//       })
//       .then((response) => {
//         // Assuming the server returns a success status
//         if (response.status === 200) {
//           // Clear login status and remove email from local storage
//           setLoggedIn(false);
//           localStorage.removeItem("email");
//           console.log("Logout successful");
//         }
//       })
//       .catch((error) => {
//         console.error("Logout failed:", error);
//       });
//   };

//   if (loggedIn) {
//     return (
//       <div>
//         <Fab variant="extended" onClick={handleLogout}>
//           <AiOutlineLogin className="svg-login-icon" sx={{ mr: 1 }} />
//           <p className="login-name">{email}</p>
//         </Fab>
//       </div>
//     );
//   }

//   return (
//     <div>
//       <Fab variant="extended" onClick={handleClickOpen}>
//         <AiOutlineLogin className="svg-login-icon" sx={{ mr: 1 }} />
//         <p className="login-name">Login</p>
//       </Fab>

//       <Dialog
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="alert-dialog-title"
//         aria-describedby="alert-dialog-description"
//         sx={{
//           "& .MuiDialog-paper": {
//             width: "350px",
//             backgroundColor: "floralwhite",
//             color: "black",
//           },
//           "& .MuiDialogContentText-root": {
//             display: "flex",
//             color: "black",
//             flexDirection: "column",
//           },
//           "& .MuiTextField-root": {
//             color: "black",
//             width: "90%",
//             fontSize: "2rem",
//           },
//         }}
//       >
//         <DialogTitle id="alert-dialog-title">
//           Login To View Analysis
//         </DialogTitle>
//         <DialogContent>
//           <DialogContentText id="alert-dialog-description">
//             <form>
//               <br />
//               <TextField
//                 id="outlined-basic"
//                 label="email"
//                 variant="outlined"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//               <br />
//               <br />
//               <TextField
//                 id="outlined-basic"
//                 label="Password"
//                 variant="outlined"
//                 type="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//               <br />
//               <br />
//               <Button variant="contained" onClick={handleLogin} autoFocus>
//                 Login
//               </Button>
//             </form>
//           </DialogContentText>
//         </DialogContent>
//         <DialogActions>
//           <Button
//             sx={{ color: "black", fontSize: "1.1rem" }}
//             onClick={handleClose}
//           >
//             Cancel
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// }
import React, { useState, useEffect } from "react";
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

export default function LoginBtn() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const storedEmail = sessionStorage.getItem("email");
    if (storedEmail) {
      setLoggedIn(true);
      setEmail(storedEmail);
    }
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogin = (e) => {
    e.preventDefault(); // Prevent form submission

    axios
      .post(
        "http://127.0.0.1:5000/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        console.log(response);
        // Assuming the server returns a success status
        const cookies = response.headers["Set-Cookie"];
        console.log(cookies + "This is cookies!");
        setLoggedIn(true);
        if (cookies) {
          sessionStorage.setItem("cookie", cookies);
          console.log("Login cookie set");
        }
        sessionStorage.setItem("email", email); // Store email in session storage
      })
      .catch((error) => {
        console.error("Login failed:", error);
      });

    handleClose();
  };

  const handleLogout = () => {
    axios
      .get("http://127.0.0.1:5000/logout", {
        withCredentials: true,
      })
      .then((response) => {
        // Assuming the server returns a success status
        if (response.status === 200) {
          // Clear login status and remove email from session storage
          setLoggedIn(false);
          sessionStorage.removeItem("email");
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
        <Fab variant="extended" onClick={handleLogout}>
          <AiOutlineLogin className="svg-login-icon" sx={{ mr: 1 }} />
          <p className="login-name">{email}</p>
        </Fab>
      </div>
    );
  }

  return (
    <div>
      <Fab variant="extended" onClick={handleOpen}>
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
            <form onSubmit={handleLogin}>
              <br />
              <TextField
                id="email-input"
                label="Email"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <br />
              <br />
              <TextField
                id="password-input"
                label="Password"
                variant="outlined"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <br />
              <br />
              <Button type="submit" variant="contained" autoFocus>
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
