import { Outlet } from "react-router-dom";

import Header from "../components/common/Header";
import Footer from "../components/common/Footer";

function MainLayout() {
  return (
    <>
      <Header />

      <main className="main-container">
        <Outlet />
      </main>

      <Footer />
    </>
  );
}

export default MainLayout;