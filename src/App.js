import React from "react";
import { Container } from "@material-ui/core";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Routes, Route, Navigate } from "react-router-dom";

import NavBar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import Postdetails from "./components/PostDetails/PostDetails";

const App = () => {
  return (
    <GoogleOAuthProvider clientId="10258346837-9hbifcgk8jm2ohualm0ce33f8tohbeet.apps.googleusercontent.com">
      <NavBar />
      <Container maxWidth="xl">
        <Routes>
          <Route path="/" exact element={<Navigate to="/posts" replace />} />
          <Route path="/posts" exact element={<Home />} />
          <Route path="/posts/search" exact element={<Home />} />
          <Route path="/posts/:id" exact element={<Postdetails />} />
          <Route path="/auth" exact element={<Auth />} />
        </Routes>
      </Container>
    </GoogleOAuthProvider>
  );
};

export default App;
