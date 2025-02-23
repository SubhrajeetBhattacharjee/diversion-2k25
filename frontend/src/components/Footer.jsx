import React from "react";

const Footer = () => {
  return (
    <footer className="relative bottom-0 left-0 w-full px-6 py-4 text-center text-white text-sm backdrop-none bg-transparent select-none cursor-default">
      <p>© {new Date().getFullYear()} Findora. All rights reserved.</p>
    </footer>
  );
};

export default Footer;