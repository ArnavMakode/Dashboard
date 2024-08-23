import Navbar from "../components/Navbar";
import Seachbar from "../components/Seachbar";

const Header = () => {
  return (
    <header className="sticky top-0 bg-white flex justify-between py-2 px-8 items-center z-30 shadow max-sm:flex-col">
      <Navbar />
      <Seachbar />
    </header>
  );
};
export default Header;
