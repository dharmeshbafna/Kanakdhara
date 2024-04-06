'use client'
import Logo from "../../public/logo.png"
import Logo2 from "../../public/logo1.png"
import Image from "next/image"
import Icon from "../../public/icon.png"

import { FaInstagram, FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export const Navbar = () => {
    return (
        <div className="z-50 absolute top-0 left-0 w-full p-5 flex">
            <div className="w-[30%] grid grid-cols-2 items-center my-auto text-lg">
                <div className="flex justify-center m-auto items-center h-full">
                    <a href="/" className="text-yellow-400">
                        Home
                    </a>
                </div>
                <div className="flex justify-center m-auto items-center h-full">
                    <a href="/" className="text-yellow-400">
                        About
                    </a>
                </div>
            </div>
            <div className="flex justify-center mx-auto w-[40%]">
                <Image
                    src={Logo}
                    className="h-24 w-auto drop-shadow-2xl"
                />
            </div>
            <div className="w-[30%] grid grid-cols-2 items-center my-auto text-lg">
                <div className="flex justify-center m-auto items-center h-full">
                    <a href="/" className="text-yellow-400">
                        Products
                    </a>
                </div>
                <div className="flex justify-center m-auto items-center h-full">
                    <a href="/" className="text-yellow-400">
                        Contact
                    </a>
                </div>
            </div>
        </div>
    )
}

export const Footer = () => {
    return (
        <div className="p-10 bg-gray-900">

            {/* Main */}
            <div className="grid grid-cols-2 mt-5">
                <div>
                    <Image
                        src={Logo2}
                        className="h-16 w-auto drop-shadow-2xl"
                    />
                    <div className="text-white my-3">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </div>

                    <div className="flex pt-2">
                        <a href="#">
                            <FaInstagram className="text-white text-2xl hover:text-yellow-400 duration-300" />
                        </a>
                        <a href="#" className="mx-5">
                            <FaFacebookF className="text-white text-2xl hover:text-yellow-400 duration-300" />
                        </a>
                        <a href="#">
                            <FaXTwitter className="text-white text-2xl hover:text-yellow-400 duration-300" />
                        </a>
                    </div>
                </div>

                <div className="flex-col justify-center mx-auto">
                    <div className="text-2xl font-semibold text-white">
                        Useful Links
                    </div>
                    <ul className="ml-3 text-gray-300 mt-4 grid grid-cols-1 gap-2">
                        <li className="hover:text-yellow-400 duration-300">
                            <a href="#">Terms & Conditions</a>
                        </li>
                        <li className="hover:text-yellow-400 duration-300">
                            <a href="#">Privacy Policy</a>
                        </li>
                        <li className="hover:text-yellow-400 duration-300">
                            <a href="#">Refund Policy</a>
                        </li>
                        <li className="hover:text-yellow-400 duration-300">
                            <a href="#">Contact</a>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Copyright */}
            <div className="mt-10">
                <div className="text-gray-500 border-t border-gray-700 lg:w-[65%] pt-3">
                    © Copyright 2024 Kanakdhara Jewellers. All Rights Reserved.
                </div>
            </div>
        </div>
    )
}