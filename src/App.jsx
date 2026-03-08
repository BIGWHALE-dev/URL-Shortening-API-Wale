// import { useState } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Boost from "./components/Main/BoostSection/BoostLink";
import MainSection from "./components/Main/MainSection";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <>
      <Header />
      <MainSection />
      <Boost />
      <Footer />
    </>
  );
}

export default App;
