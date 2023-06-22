import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./pages/navbar/Navbar";
import "./App.css";
import Footer from "./pages/footer/Footer";
import Home from "./pages/content/Home";
import DataAnalysis from "./pages/content/DataAnalysis.js";
import Team from "./pages/content/components/Team";
import UploadFile from "./pages/content/UploadFile";
import LoginBtn from "./pages/content/components/LoginBtn";

const App = () => {
  const [topic, setTopic] = useState("data");
  const [activeTopic, setActiveTopic] = useState("Data Analysis");

  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const handleTopicChange = (newTopic) => {
    setTopic(newTopic);
  };
  const handleActiveTopicChange = (newTopic) => {
    setActiveTopic(newTopic);
  };
  return (
    <>
      <div className="loginFloat">
        <LoginBtn
          open={open}
          setOpen={setOpen}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          loggedIn={loggedIn}
          setLoggedIn={setLoggedIn}
        />
      </div>
      <div className="bg">
        <Navbar
          onTopicChange={handleTopicChange}
          onAcitiveTopicChange={handleActiveTopicChange}
        />
      </div>
      <Routes>
        <Route exact path="/" element={<Home  setOpen={setOpen}         loggedIn={loggedIn}/>} />
        <Route
          exact
          path="/dataAnalysis"
          element={<DataAnalysis topic={topic} activeTopic={activeTopic} loggedIn={loggedIn} setOpen={setOpen} />}
        />
        <Route
          exact
          path="/team"
          element={<Team topic={topic} activeTopic={activeTopic} />}
        />
        <Route exact path="/upload" element={<UploadFile loggedIn={loggedIn} />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
