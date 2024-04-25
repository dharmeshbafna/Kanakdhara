'use client'

import { useState, useEffect } from "react";
import { Simonetta } from "next/font/google"

import { FaInstagram, FaFacebookF, FaCaretDown, FaYoutube } from "react-icons/fa";
import { FaXTwitter, FaLocationDot } from "react-icons/fa6";
import { IoIosCall, IoIosMail, IoLogoWhatsapp } from "react-icons/io";

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

const simonetta = Simonetta({ weight: '400', subsets: ["latin"] });

export const ContactComp = () => {
    return (
        <div className="lg:px-16 pt-24 pb-10">
            <div className="my-10 flex justify-center mx-auto">
                <div className="w-fit ">
                    <div className={` ${simonetta.className} text-[3.25rem] text-center flex justify-center mx-auto`}>
                        Contact Us
                    </div>
                    <div className="flex justify-center mx-auto w-1/2 bg-black h-1 rounded-lg"></div>
                </div>
            </div>

            {/* Main */}
            <div className="flex justify-center mx-auto">

                <div className="bg-[#71074F] p-5 shadow-lg lg:max-w-[35%]">
                    <div className="text-xl text-[#EFCF77] font-semibold">
                        Contact Details
                    </div>
                    <div className="grid grid-cols-1 gap-2 mt-4 text-white">
                        <a href="tel:+919510902129" className="text-lg w-fit hover:text-[#EFCF77] hover:scale-[105%] duration-300 flex items-center my-auto">
                            <IoIosCall className="mr-2" />
                            <span>+91 9510902129</span>
                        </a>
                        <a href="mailto:mitzchhajed@gmail.com" className="text-lg w-fit hover:text-[#EFCF77] hover:scale-[105%] duration-300 flex items-center my-auto">
                            <IoIosMail className="mr-2" />
                            <span>mitzchhajed@gmail.com</span>
                        </a>
                        <a href="https://api.whatsapp.com/send?phone=919510902129" target="_blank" className="text-lg w-fit hover:text-[#EFCF77] hover:scale-[105%] duration-300 flex items-center my-auto">
                            <IoLogoWhatsapp className="mr-2" />
                            <span>+91 9510902129</span>
                        </a>
                        <a href="#" className="text-lg w-fit hover:text-[#EFCF77] hover:scale-[105%] duration-300 flex">
                            <FaLocationDot className="mr-2 mt-2" />
                            <span>114, Kanak Chamber, Gandhi Road, Ahmedabad - 380001</span>
                        </a>
                    </div>
                    <div className="text-xl text-[#EFCF77] font-semibold mt-4">
                        Social Profiles
                    </div>
                    <div className="grid grid-cols-1 gap-2 mt-4 text-white">
                        <a href="https://www.facebook.com/kanakdharajewellers?mibextid=LQQJ4d" target="_blank" className="text-lg w-fit hover:text-[#EFCF77] hover:scale-[105%] duration-300 flex items-center my-auto">
                            <FaFacebookF className="mr-2" />
                            <span>Kanakdhara Jewellers</span>
                        </a>
                        <a href="https://www.youtube.com/@kanakdharajewellers" target="_blank" className="text-lg w-fit hover:text-[#EFCF77] hover:scale-[105%] duration-300 flex items-center my-auto">
                            <FaYoutube className="mr-2" />
                            <span>@kanakdharajewellers</span>
                        </a>
                        <a href="https://www.instagram.com/kanakdharajewellers/?igshid=MWI4MTIyMDE%3D" target="_blank" className="text-lg w-fit hover:text-[#EFCF77] hover:scale-[105%] duration-300 flex items-center my-auto">
                            <FaInstagram className="mr-2" />
                            <span>@kanakdharajewellers</span>
                        </a>
                    </div>
                </div>

                <form className="px-3 lg:w-1/2 grid grid-cols-1 gap-3 h-fit">
                    <input
                        className="h-fit p-2 border border-black w-full focus:outline-none focus:border focus:border-yellow-600"
                        placeholder="Full Name"
                    />

                    <div className="grid grid-cols-2 gap-2 ">
                        <input
                            className="h-fit p-2 border border-black w-full focus:outline-none focus:border focus:border-yellow-600"
                            placeholder="Email"
                        />
                        <input
                            className="h-fit p-2 border border-black w-full focus:outline-none focus:border focus:border-yellow-600"
                            placeholder="Phone"
                        />
                    </div>

                    <input
                        className="h-fit p-2 border border-black w-full focus:outline-none focus:border focus:border-yellow-600"
                        placeholder="Subject"
                    />

                    <textarea
                        className="h-fit p-2 border border-black w-full focus:outline-none focus:border focus:border-yellow-600"
                        placeholder="Message"
                        rows={8}
                    >
                    </textarea>

                    <button className="focus:outline-none px-5 py-2 border border-black hover:bg-black hover:text-white duration-300 hover:shadow-lg w-fit">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    )
}