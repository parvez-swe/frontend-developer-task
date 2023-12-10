import React from "react";
import { FaDiscord, FaFacebook, FaInstagram } from "react-icons/fa";
import { TiSocialTwitter } from "react-icons/ti";

const Footer = () => {
  return (
    <div className=" flex flex-col lg:flex-row justify-between items-center border-t border-slate-300 dark:border-slate-700  pt-5 pl-5 py-5 lg:pr-10">
      <div className="flex flex-row items-center text-3xl [&>*]:mr-3">
        <FaFacebook
          className={`  hover:cursor-pointer  text-slate-800 dark:text-white `}
        />
        <FaInstagram className=" hover:cursor-pointer text-slate-800 dark:text-white" />
        <TiSocialTwitter
          className={` hover:cursor-pointer   text-slate-800 dark:text-white `}
        />
        <FaDiscord
          className={` hover:cursor-pointer   text-slate-800 dark:text-white `}
        />
      </div>
      <div>
        <div className="">
          <ul className="my-5 lg:my-0 [&>*]:mx-2 flex flex-row flex-wrap  items-center justify-center font-bold  text-transparent bg-clip-text bg-gradient-to-r from-porrange to-sorrange dark:from-pgreen dark:to-sgreen">
            <li>General Statement</li>
            <li>Legal Advice</li>
            <li>About Us</li>
            <li>Blog Post</li>
            <li>Team</li>
            <li>Contact</li>
          </ul>
          <p className=" text-center">
            &copy; 2023 mdparvezmusharaf2@gmail.com. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
