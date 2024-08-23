import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Header />
      <main className="bg-slate-100 min-h-screen p-8">{children}</main>
      <Footer />
    </>
  );
};
export default Layout;
