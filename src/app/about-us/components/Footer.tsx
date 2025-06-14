import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa"
const Footer = () => {
  return (
    <>
     <footer className="bg-pink-100 text-center text-gray-800 py-8 px-4">
      <div className="max-w-2xl mx-auto space-y-4">
        <p>
          You can also reach out to us through our social channels or the
          contact form on our website.
        </p>
        <p className="font-medium">Let’s grow your restaurant—together.</p>

        {/* Social Media Icons */}
        <div className="flex justify-center gap-4 text-[#E53888] text-xl mt-4">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebook className="hover:text-pink-600" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <FaTwitter className="hover:text-pink-600" />
          </a>
          <a href="https://www.instagram.com/menucards" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="hover:text-pink-600" />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            <FaLinkedin className="hover:text-pink-600" />
          </a>
        </div>

        {/* Footer Text */}
        <p className="pt-4 text-sm text-gray-800">
          <span className="text-black font-medium">MenuCards</span> – Powered by{" "}
          <span className="font-bold text-black">Welina Foods Pvt. Ltd.</span>
        </p>
      </div>
    </footer>

    </>
    
  );
};

export default Footer;

