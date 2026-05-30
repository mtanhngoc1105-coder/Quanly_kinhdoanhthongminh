import { Outlet } from "react-router-dom";

import Header from "../components/common/Header";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

function MainLayout() {
  return (
    <>
      <Header />
      <Navbar />

      <main className="main-container">
        <Outlet />
      </main>

      <Footer />
    </>
  );
}

export default MainLayout;