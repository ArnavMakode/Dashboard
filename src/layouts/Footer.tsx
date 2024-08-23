import { BsGithub } from "react-icons/bs";

const Footer = () => {
  return (
    <div className="bg-gray-800 py-8">
      <div className="mx-auto flex flex-col gap-4">
        <span className="text-white tracking-tight font-bold flex justify-around items-center gap-4">
          <p className="cursor-pointer">Privacy Policy</p>
          <p className="cursor-pointer">Terms of Service</p>
        </span>
        <span className="text-center text-white tracking-tight">
          Copyright © 2024 Dashboard™. All rights reserved.
        </span>
        <span className="text-center text-white tracking-tight">
          Created by Arnav Makode
        </span>
        <span className="flex justify-center items-center text-white gap-2">
          <BsGithub />
          <a
            target="_blank"
            href="https://github.com/ArnavMakode/Dashboard"
            className="hover:underline"
          >
            GitHub link
          </a>
        </span>
        <span className="font-bold text-white tracking-tight text-xl text-center font-mono">
          Dashboard Builder
        </span>
      </div>
    </div>
  );
};
export default Footer;
