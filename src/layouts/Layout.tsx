import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Header />
      <main className="bg-slate-100 p-8 h-full min-h-screen">{children}</main>
      <Footer />
    </>
  );
};
export default Layout;
