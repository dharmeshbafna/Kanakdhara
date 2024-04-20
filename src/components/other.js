'use client'

import { usePathname } from "next/navigation"

import Logo from "../../public/logo.png"
import Logo2 from "../../public/logo1.png"
import Image from "next/image"
import Icon from "../../public/icon.png"

import { FaInstagram, FaFacebookF } from "react-icons/fa";
import { FaXTwitter, FaLocationDot } from "react-icons/fa6";
import { IoIosCall, IoIosMail, IoLogoWhatsapp } from "react-icons/io";


export const Navbar = () => {

    const path = usePathname();

    const isActive = (url) => {
        return path === url;
    };

    return (
        <div className="z-50 absolute top-0 left-0 w-full lg:px-16 lg:py-5">

            <div className="flex items-center my-auto">

                {/* Desktop Navlogo & NavItems */}
                <div className="flex items-center lg:w-[65%]">

                    {/* Logo */}
                    <a href="/">
                        <Image
                            src={Icon}
                            className="h-20 w-auto drop-shadow-md rotate-360 duration-300 hover:drop-shadow-none"
                        />
                    </a>

                    {/* Desktop Items */}
                    <div className="flex items-center justify-center mx-auto">

                        <a href="/" className={`mx-4 w-fit ${isActive('/') ? 'text-[#71074F] font-semibold' : ''} hover:text-[#71074F] hover:scale-[110%] duration-300`}>
                            Home
                            <div className={`${isActive('/') ? 'h-1 w-1/2 bg-[#71074F] rounded-lg flex justify-center mx-auto' : ''}`}></div>
                        </a>

                        <a href="/about" className={`mx-4 w-fit ${isActive('/about') ? 'text-[#71074F] font-semibold' : ''} hover:text-[#71074F] hover:scale-[110%] duration-300`}>
                            About
                            <div className={`${isActive('/about') ? 'h-1 w-1/2 bg-[#71074F] rounded-lg flex justify-center mx-auto' : ''}`}></div>
                        </a>

                        <a href="/gold-jewellry" className={`mx-4 w-fit ${isActive('/gold-jewellry') ? 'text-[#71074F] font-semibold' : ''} hover:text-[#71074F] hover:scale-[110%] duration-300`}>
                            Gold Jewellry
                            <div className={`${isActive('/gold-jewellry') ? 'h-1 w-1/2 bg-[#71074F] rounded-lg flex justify-center mx-auto' : ''}`}></div>
                        </a>

                        <a href="/catalogs" className={`mx-4 w-fit ${isActive('/catalogs') ? 'text-[#71074F] font-semibold' : ''} hover:text-[#71074F] hover:scale-[110%] duration-300`}>
                            Catalogs
                            <div className={`${isActive('/catalogs') ? 'h-1 w-1/2 bg-[#71074F] rounded-lg flex justify-center mx-auto' : ''}`}></div>
                        </a>

                        <a href="/contact" className={`mx-4 w-fit ${isActive('/contact') ? 'text-[#71074F] font-semibold' : ''} hover:text-[#71074F] hover:scale-[110%] duration-300`}>
                            Contact
                            <div className={`${isActive('/contact') ? 'h-1 w-1/2 bg-[#71074F] rounded-lg flex justify-center mx-auto' : ''}`}></div>
                        </a>
                    </div>
                </div>

                {/* Desktop Social Icons */}
                <div className="lg:w-[35%] flex justify-end items-center m-auto">
                    <a href="#" className="mx-3 w-fit text-white hover:scale-[120%] duration-300">
                        <FaXTwitter className="" />
                    </a>
                    <a href="#" className="mx-3 w-fit text-white hover:scale-[120%] duration-300">
                        <FaFacebookF className="" />
                    </a>
                    <a href="#" className="mx-3 w-fit text-white hover:scale-[120%] duration-300">
                        <FaInstagram className="" />
                    </a>
                </div>
            </div>

        </div>
    )
}

export const Footer = () => {
    return (
        <div className="lg:p-16 bg-gray-300">

            {/* Main */}
            <div className="w-full flex pb-10">

                <div className="lg:w-[35%] pr-6">
                    <Image
                        src={Logo2}
                        className="w-full h-auto"
                    />

                    <div className="my-3">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </div>

                    <div className="flex items-center my-auto">
                        <a href="#" target="_blank" className="p-2 rounded-full border border-gray-400 hover:text-white hover:bg-[#71074F] duration-300">
                            <FaXTwitter className="" />
                        </a>
                        <a href="#" target="_blank" className="mx-4 p-2 rounded-full border border-gray-400 hover:text-white hover:bg-[#71074F] duration-300">
                            <FaFacebookF className="" />
                        </a>
                        <a href="#" target="_blank" className="p-2 rounded-full border border-gray-400 hover:text-white hover:bg-[#71074F] duration-300">
                            <FaInstagram className="" />
                        </a>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-2 lg:w-[65%] px-2">

                    <div className="flex justify-center mx-auto">
                        <div className="px-3">
                            <div className="font-semibold text-lg">
                                Useful Links
                            </div>
                            <div className="mt-3 grid grid-cols-1 gap-2 pl-1">
                                <a href="#" className="w-fit hover:text-[#71074F] duration-300">
                                    Privacy Policy
                                </a>
                                <a href="#" className="w-fit hover:text-[#71074F] duration-300">
                                    Terms & Conditions
                                </a>
                                <a href="#" className="w-fit hover:text-[#71074F] duration-300">
                                    Refund Policy
                                </a>
                                <a href="#" className="w-fit hover:text-[#71074F] duration-300">
                                    Contact Us
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center mx-auto">
                        <div className="px-3">
                            <div className="font-semibold text-lg">
                                Gold Jewellry
                            </div>
                            <div className="mt-3 grid grid-cols-1 gap-2 pl-1">
                                <a href="#" className="w-fit hover:text-[#71074F] duration-300">
                                    Bracelet
                                </a>
                                <a href="#" className="w-fit hover:text-[#71074F] duration-300">
                                    Earings
                                </a>
                                <a href="#" className="w-fit hover:text-[#71074F] duration-300">
                                    Necklace
                                </a>
                                <a href="#" className="w-fit hover:text-[#71074F] duration-300">
                                    Pendant Set
                                </a>
                                <a href="#" className="w-fit hover:text-[#71074F] duration-300">
                                    Pendants
                                </a>
                                <a href="#" className="w-fit hover:text-[#71074F] duration-300">
                                    Rings & Bands
                                </a>
                                <a href="#" className="w-fit hover:text-[#71074F] duration-300">
                                    Watches
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center mx-auto">
                        <div className="px-3">
                            <div className="font-semibold text-lg">
                                Contact Us
                            </div>
                            <div className="mt-3 grid grid-cols-1 gap-2 pl-1">
                                <a href="#" className="w-fit hover:text-[#71074F] duration-300 flex items-center my-auto">
                                    <IoIosCall className="mr-2" />
                                    <span>+91 XXXXXXXXXXX</span>
                                </a>
                                <a href="#" className="w-fit hover:text-[#71074F] duration-300 flex items-center my-auto">
                                    <IoIosMail className="mr-2" />
                                    <span>info@kanakdharajewellers.com</span>
                                </a>
                                <a href="#" className="w-fit hover:text-[#71074F] duration-300 flex items-center my-auto">
                                    <IoLogoWhatsapp className="mr-2" />
                                    <span>Kanakdhara Jewellers</span>
                                </a>
                                <a href="#" className="w-fit hover:text-[#71074F] duration-300 flex">
                                    <FaLocationDot className="mt-1 mr-2" />
                                    <div style={{ maxWidth: 'calc(100% - 1.5em)' }}>
                                        <span>114, Kanak Chamber, Gandhi Road, Ahmedabad - 380001</span>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Copyright */}
            <div className="pt-10 border-t border-gray-400 text-gray-700 text-center flex justify-center mx-auto">
                © Copyright 2022. All Rights Reserved by Kanakdhara Jewellers.
            </div>
        </div>
    )
}
