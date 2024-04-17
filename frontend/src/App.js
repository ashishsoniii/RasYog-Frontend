import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./pages/navbar/Navbar";
import "./App.css";
import Footer from "./pages/footer/Footer";
import Home from "./pages/content/Home";
import DataAnalysis from "./pages/content/DataAnalysis.js"; // page for analysis (Access through Navbar!) // route -> /dataAnalysis
import Team from "./pages/content/components/Team"; // team detial here!
import UploadFile from "./pages/content/UploadFile"; // Component to upload file to backend! --> route -> /upload!
import LoginBtn from "./pages/content/components/LoginBtn";
import Navbar2 from "./pages/navbar/Navbar2";

const App = () => {
  const [topic, setTopic] = useState("margin");
  const [activeTopic, setActiveTopic] = useState("Popularity and Margin Analysis");

  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(true);

  // updates Headeding | endpoint sfor axios request for graph fetching!
  const handleTopicChange = (newTopic) => {
    setTopic(newTopic);
  };

  // sets heading! on dataAnalysis!
  const handleActiveTopicChange = (newTopic) => {
    setActiveTopic(newTopic);
  };

  // Structure
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
        {loggedIn ? (
          <Navbar
            onTopicChange={handleTopicChange}
            onAcitiveTopicChange={handleActiveTopicChange}
          />
        ) : (
          <Navbar2 />
        )}
      </div>

      {/* Landing Page Route - Displays all info for project! */}

      <Routes>
        <Route
          exact
          path="/"
          element={<Home setOpen={setOpen} loggedIn={loggedIn} />}
        />
        <Route
          exact
          path="/dataAnalysis"
          element={
            <DataAnalysis
              topic={topic}
              activeTopic={activeTopic}
              loggedIn={loggedIn}
              setOpen={setOpen}
            />
          }
        />
        <Route
          exact
          path="/team"
          element={<Team topic={topic} activeTopic={activeTopic} />}
        />
        <Route
          exact
          path="/upload"
          element={<UploadFile loggedIn={loggedIn} />}
        />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
