'use client'

import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"

import Logo from "../../public/logo.png"
import Logo2 from "../../public/logo1.png"
import Image from "next/image"
import Icon from "../../public/icon.png"
import FooterLogo from "../../public/footer_logo.png";
import NameLogo from "../../public/kd_mobile_logo.png"

import { FaInstagram, FaFacebookF, FaCaretDown, FaYoutube } from "react-icons/fa";
import { FaXTwitter, FaLocationDot, FaBars } from "react-icons/fa6";
import { IoIosCall, IoIosMail, IoLogoWhatsapp } from "react-icons/io";
import { HiMiniBars3CenterLeft } from "react-icons/hi2";
import { RxCross1 } from "react-icons/rx";

import { Rings, RevolvingDot } from "react-loader-spinner"

import { GetCategories } from "@/api/product"

export const LoaderComp = () => {
    return (
        <div className="h-[100vh] flex justify-center items-center m-auto">
            <Rings
                visible={true}
                height="80"
                width="80"
                color="#DAA520"
                ariaLabel="rings-loading"
                wrapperStyle={{}}
                wrapperClass=""
            />
        </div>
    )
}

export const Sidebar = ({ toogle, setToogle }) => {

    const path = usePathname();
    const [data, setData] = useState([]);
    const [goldbox, setGoldbox] = useState(false);

    const isActive = (url) => {
        return path === url;
    };

    const getCategories = async () => {
        const res = await GetCategories();
        if (res.success) {
            setData(res.success);
        }
    };

    useEffect(() => {
        getCategories();
    }, []);

    return (
        <div>
            <div onClick={() => setToogle(false)} className={`${toogle ? 'fixed top-0 left-0 w-[40%] h-full' : ''} focus:outline-none`}>
            </div>

            <div className={`lg:hidden ${toogle ? 'translate-x-0 transition-transform duration-700 ease-in-out transform' : 'translate-x-full transition-transform duration-700 ease-in-out transform'} fixed z-40 right-0 top-0 bg-white h-full w-[60%] shadow-lg px-2 py-4 border-l`}>

                <RxCross1 onClick={() => setToogle(false)} className="absolute top-4 right-3 focus:outline-none" />

                <a href="/" className="w-fit flex justify-center mx-auto">
                    <Image
                        src={Icon}
                        className="h-20 w-auto drop-shadow-md rotate-360 duration-300 hover:drop-shadow-none"
                    />
                </a>

                {/* Items */}
                <div className="mt-6 pl-2 grid grid-cols-1 gap-3">
                    <div className="w-fit hover:scale-[110%] hover:text-[#71074F] duration-300">
                        <a href="/" className={`${isActive('/') ? 'text-[#71074F] font-semibold' : ''}`}>
                            Home
                        </a>
                        <div className={`${isActive('/') ? 'h-1 bg-[#71074F] rounded-lg w-1/2 flex justify-center mx-auto' : 'hidden'}`}></div>
                    </div>
                    <div className="w-fit hover:scale-[110%] hover:text-[#71074F] duration-300">
                        <a href="/about" className={`${isActive('/about') ? 'text-[#71074F] font-semibold' : ''}`}>
                            About
                        </a>
                        <div className={`${isActive('/about') ? 'h-1 bg-[#71074F] rounded-lg w-1/2 flex justify-center mx-auto' : 'hidden'}`}></div>
                    </div>
                    <div className="relative">
                        <button onClick={() => setGoldbox(!goldbox)} className="w-fit hover:text-[#71074F] duration-300 flex items-center my-auto ">Gold Jewellery
                            <FaCaretDown className="ml-1" />
                        </button>
                        {goldbox ?
                            <div
                                className="pl-2 mt-3">
                                {data.map((i) => {
                                    return (
                                        <div className="pb-1 border-b mt-1 hover:text-[#71074F] hover:scale-[110%] duration-300">
                                            <a href={`/gold-jewellery/${i.category.toLowerCase().replace(/ /g, '-')}`} className="text-nowrap ">{i.category}</a>
                                        </div>
                                    )
                                })}
                            </div> : ''}
                    </div>
                    <div className="w-fit hover:scale-[110%] hover:text-[#71074F] duration-300">
                        <a href="/contact" className={`${isActive('/contact') ? 'text-[#71074F] font-semibold' : ''}`}>
                            Contact
                        </a>
                        <div className={`${isActive('/contact') ? 'h-1 bg-[#71074F] rounded-lg w-1/2 flex justify-center mx-auto' : 'hidden'}`}></div>
                    </div>
                </div>

                {/* Social Icons */}
                <div className="flex justify-center mt-8">
                    <a href="https://www.facebook.com/kanakdharajewellers?mibextid=LQQJ4d" target="_blank" className="mx-3 w-fit text-black hover:scale-[120%] duration-300">
                        <FaFacebookF className="" />
                    </a>
                    <a href="https://www.youtube.com/@kanakdharajewellers" target="_blank" className="mx-3 w-fit text-black hover:scale-[120%] duration-300">
                        <FaYoutube className="" />
                    </a>
                    <a href="https://www.instagram.com/kanakdharajewellers/?igshid=MWI4MTIyMDE%3D" target="_blank" className="mx-3 w-fit text-black hover:scale-[120%] duration-300">
                        <FaInstagram className="" />
                    </a>
                </div>

            </div>
        </div>
    )
}

export const Navbar = () => {

    const path = usePathname();
    const [data, setData] = useState([]);
    const [goldbox, setGoldbox] = useState(false);
    const [stickynav, setStickynav] = useState(false);
    const [toogle, setToogle] = useState(false);

    const isActive = (url) => {
        return path === url;
    };

    const getCategories = async () => {
        const res = await GetCategories();
        if (res.success) {
            setData(res.success);
        }
    };

    const handlescroll = () => {

        if (window.scrollY > 100) {
            setStickynav(true);
        } else {
            setStickynav(false);
        }
    };

    useEffect(() => {
        getCategories();

        window.addEventListener('scroll', handlescroll);
        return () => {
            window.removeEventListener('scroll', handlescroll);
        }
    }, []);

    return (
        <div className="z-50 absolute top-0 left-0 w-full p-5 lg:px-16 lg:py-5">

            {/* Desktop */}

            <div className="hidden lg:flex items-center my-auto">

                {path == '/' && !stickynav ?
                    <div className="w-full flex items-center my-auto">
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

                                <div className={`relative mx-4 w-fit `}>
                                    <span
                                        onMouseEnter={() => setGoldbox(true)}
                                        onMouseLeave={() => setGoldbox(false)}
                                        className="hover:text-[#71074F] hover:scale-[110%] duration-300 flex items-center my-auto cursor-pointer">
                                        Gold Jewellry <FaCaretDown className={`ml-1`} />
                                    </span>
                                    <div className={`${isActive('/gold-jewellry') ? 'h-1 w-1/2 bg-[#71074F] rounded-lg flex justify-center mx-auto' : ''}`}></div>
                                    {goldbox ?
                                        <div
                                            onMouseEnter={() => setGoldbox(true)}
                                            onMouseLeave={() => setGoldbox(false)}
                                            className="absolute shadow-lg p-3 top-5 z-50 bg-white">
                                            {data.map((i) => {
                                                return (
                                                    <div className="pb-1 border-b mt-1 hover:text-[#71074F] hover:scale-[110%] duration-300">
                                                        <a href={`/gold-jewellery/${i.category.toLowerCase().replace(/ /g, '-')}`}
                                                            className={`text-nowrap`}>
                                                            {i.category}
                                                        </a>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                        : ''}
                                </div>

                                <a href="/contact" className={`mx-4 w-fit ${isActive('/contact') ? 'text-[#71074F] font-semibold' : ''} hover:text-[#71074F] hover:scale-[110%] duration-300`}>
                                    Contact
                                    <div className={`${isActive('/contact') ? 'h-1 w-1/2 bg-[#71074F] rounded-lg flex justify-center mx-auto' : ''}`}></div>
                                </a>
                            </div>
                        </div>

                        {/* Desktop Social Icons */}
                        <div className="lg:w-[35%] flex justify-end items-center m-auto">
                            <a href="https://www.facebook.com/kanakdharajewellers?mibextid=LQQJ4d" target="_blank" className="mx-3 w-fit text-white hover:scale-[120%] duration-300">
                                <FaFacebookF className="" />
                            </a>
                            <a href="https://www.youtube.com/@kanakdharajewellers" target="_blank" className="mx-3 w-fit text-white hover:scale-[120%] duration-300">
                                <FaYoutube className="" />
                            </a>
                            <a href="https://www.instagram.com/kanakdharajewellers/?igshid=MWI4MTIyMDE%3D" target="_blank" className="mx-3 w-fit text-white hover:scale-[120%] duration-300">
                                <FaInstagram className="" />
                            </a>
                        </div>
                    </div>
                    :
                    <div className={`${stickynav ? 'fixed top-0 z-50 shadow-lg bg-white left-0 lg:px-16 lg:py-3' : ''} flex items-center my-auto w-full`}>
                        {/* Logo */}
                        <div className="lg:w-[25%] flex items-center my-auto">
                            <a href="/">
                                <Image
                                    src={Icon}
                                    className="h-20 w-auto drop-shadow-md rotate-360 duration-300 hover:drop-shadow-none"
                                />
                            </a>
                        </div>

                        {/* Items */}
                        <div className="lg:w-[50%] flex items-center justify-center mx-auto">

                            <a href="/" className={`mx-4 w-fit ${isActive('/') ? 'text-[#71074F] font-semibold' : ''} hover:text-[#71074F] hover:scale-[110%] duration-300`}>
                                Home
                                <div className={`${isActive('/') ? 'h-1 w-1/2 bg-[#71074F] rounded-lg flex justify-center mx-auto' : ''}`}></div>
                            </a>

                            <a href="/about" className={`mx-4 w-fit ${isActive('/about') ? 'text-[#71074F] font-semibold' : ''} hover:text-[#71074F] hover:scale-[110%] duration-300`}>
                                About
                                <div className={`${isActive('/about') ? 'h-1 w-1/2 bg-[#71074F] rounded-lg flex justify-center mx-auto' : ''}`}></div>
                            </a>

                            <div className={`relative mx-4 w-fit `}>
                                <span
                                    onMouseEnter={() => setGoldbox(true)}
                                    onMouseLeave={() => setGoldbox(false)}
                                    className="hover:text-[#71074F] hover:scale-[110%] duration-300 flex items-center my-auto cursor-pointer">
                                    Gold Jewellry <FaCaretDown className={`ml-1`} />
                                </span>
                                <div className={`${isActive('/gold-jewellry') ? 'h-1 w-1/2 bg-[#71074F] rounded-lg flex justify-center mx-auto' : ''}`}></div>
                                {goldbox ?
                                    <div
                                        onMouseEnter={() => setGoldbox(true)}
                                        onMouseLeave={() => setGoldbox(false)}
                                        className="absolute shadow-lg p-3 top-5 z-50 bg-white">
                                        {data.map((i) => {
                                            return (
                                                <div className="pb-1 border-b mt-1 hover:text-[#71074F] hover:scale-[110%] duration-300">
                                                    <a href={`/gold-jewellery/${i.category.toLowerCase().replace(/ /g, '-')}`} className="text-nowrap ">{i.category}</a>
                                                </div>
                                            )
                                        })}
                                    </div>
                                    : ''}
                            </div>

                            <a href="/contact" className={`mx-4 w-fit ${isActive('/contact') ? 'text-[#71074F] font-semibold' : ''} hover:text-[#71074F] hover:scale-[110%] duration-300`}>
                                Contact
                                <div className={`${isActive('/contact') ? 'h-1 w-1/2 bg-[#71074F] rounded-lg flex justify-center mx-auto' : ''}`}></div>
                            </a>
                        </div>

                        {/* Social Icons */}
                        <div className="lg:w-[25%] flex justify-end items-center my-auto">
                            <a href="https://www.facebook.com/kanakdharajewellers?mibextid=LQQJ4d" target="_blank" className="mx-3 w-fit hover:scale-[120%] duration-300 hover:text-[#71074F]">
                                <FaFacebookF className="" />
                            </a>
                            <a href="https://www.youtube.com/@kanakdharajewellers" target="_blank" className="mx-3 w-fit hover:scale-[120%] duration-300 hover:text-[#71074F]">
                                <FaYoutube className="" />
                            </a>
                            <a href="https://www.instagram.com/kanakdharajewellers/?igshid=MWI4MTIyMDE%3D" target="_blank" className="mx-3 w-fit hover:scale-[120%] duration-300 hover:text-[#71074F]">
                                <FaInstagram className="" />
                            </a>
                        </div>
                    </div>}
            </div>

            {/* Responsive */}

            <div className={`${stickynav ? 'fixed top-0 z-50 shadow-lg bg-white left-0 p-5' : ''} grid grid-cols-2 w-full lg:hidden`}>

                <div>
                    <a href="/">
                        <Image
                            src={stickynav ? NameLogo : Icon}
                            className={`${stickynav ? 'w-full h-auto md:h-14 md:w-auto drop-shadow-none' : 'h-14 md:h-20 w-auto drop-shadow-md rotate-360 duration-300 hover:drop-shadow-none'}  `}
                        />
                    </a>
                </div>

                <div className="flex justify-end items-center my-auto">
                    <FaBars
                        onClick={() => setToogle(true)}
                        className={`${path == '/' && !stickynav ? 'text-white' : ''} text-lg md:text-xl`} />
                </div>

                <Sidebar toogle={toogle} setToogle={setToogle} />
            </div>

        </div >
    )
}

export const Footer = () => {

    const [cat, setCat] = useState([]);

    const getallcategories = async () => {

        const res = await GetCategories();

        if (res.success) {
            setCat(res.success);
        }
    };

    useEffect(() => {
        getallcategories();
    }, []);

    return (
        <div className="lg:p-16 bg-[#71074F] p-5">

            {/* Main */}
            <div className="hidden w-full lg:flex pb-10">

                <div className="lg:w-[35%] pr-6">
                    <Image
                        src={FooterLogo}
                        className="w-full h-auto"
                    />

                    <div className="my-3 text-white">

                        Discover our beautiful plain gold jewelry, carefully made in Ahmedabad, India, where skill and quality come together.
                    </div>

                    <div className="flex items-center my-auto">
                        <a href="https://www.youtube.com/@kanakdharajewellers" target="_blank" className="p-2 rounded-full border border-white text-white hover:bg-[#EFCF77] hover:border-yellow-500 hover:text-[#71074F] duration-300">
                            <FaYoutube className="" />
                        </a>
                        <a href="https://www.facebook.com/kanakdharajewellers?mibextid=LQQJ4d" target="_blank" className="mx-4 p-2 rounded-full border border-white text-white hover:bg-[#EFCF77] hover:border-yellow-500 hover:text-[#71074F] duration-300">
                            <FaFacebookF className="" />
                        </a>
                        <a href="https://www.instagram.com/kanakdharajewellers/?igshid=MWI4MTIyMDE%3D" target="_blank" className="p-2 rounded-full border border-white text-white hover:bg-[#EFCF77] hover:border-yellow-500 hover:text-[#71074F] duration-300">
                            <FaInstagram className="" />
                        </a>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-2 lg:w-[65%] px-2">

                    <div className="flex justify-center mx-auto">
                        <div className="px-3">
                            <div className="font-semibold text-xl text-[#EFCF77]">
                                Useful Links
                            </div>
                            <div className="mt-5 grid grid-cols-1 gap-2 pl-1 text-white">
                                <a href="#" className="w-fit hover:text-[#EFCF77] hover:scale-[105%] duration-300">
                                    Privacy Policy
                                </a>
                                <a href="#" className="w-fit hover:text-[#EFCF77] hover:scale-[105%] duration-300">
                                    Terms & Conditions
                                </a>
                                <a href="#" className="w-fit hover:text-[#EFCF77] hover:scale-[105%] duration-300">
                                    Refund Policy
                                </a>
                                <a href="#" className="w-fit hover:text-[#EFCF77] hover:scale-[105%] duration-300">
                                    Contact Us
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center mx-auto">
                        <div className="px-3">
                            <div className="font-semibold text-xl text-[#EFCF77]">
                                Gold Jewellry
                            </div>
                            <div className="mt-5 grid grid-cols-1 gap-2 pl-1 text-white">
                                {cat.map((i) => {
                                    return (
                                        <a href={`/gold-jewellery/${i.category.toLowerCase().replace(/ /g, '-')}`} className="w-fit hover:text-[#EFCF77] hover:scale-[105%] duration-300">
                                            {i.category}
                                        </a>
                                    )
                                })}
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center mx-auto">
                        <div className="px-3">
                            <div className="font-semibold text-xl text-[#EFCF77]">
                                Contact Us
                            </div>
                            <div className="mt-5 grid grid-cols-1 gap-2 pl-1 text-white">
                                <a href="+919510902129" className="w-fit hover:text-[#EFCF77] hover:scale-[105%] duration-300 flex items-center my-auto">
                                    <IoIosCall className="mr-2" />
                                    <span>+91 9510902129</span>
                                </a>
                                <a href="mailto:mitzchhajed@gmail.com" className="w-fit hover:text-[#EFCF77] hover:scale-[105%] duration-300 flex items-center my-auto">
                                    <IoIosMail className="mr-2" />
                                    <span>mitzchhajed@gmail.com</span>
                                </a>
                                <a href="https://api.whatsapp.com/send?phone=919510902129" target="_blank" className="w-fit hover:text-[#EFCF77] hover:scale-[105%] duration-300 flex items-center my-auto">
                                    <IoLogoWhatsapp className="mr-2" />
                                    <span>+91 9510902129</span>
                                </a>
                                <a href="#" className="w-fit hover:text-[#EFCF77] hover:scale-[105%] duration-300 flex">
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

            {/* Responsive main */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-7 lg:hidden py-4">

                <div className="">
                    <Image
                        src={FooterLogo}
                        className="w-full h-auto"
                    />

                    <div className="my-3 text-white">
                        Discover our beautiful plain gold jewelry, carefully made in Ahmedabad, India, where skill and quality come together.
                    </div>

                    <div className="flex items-center my-auto">
                        <a href="https://www.youtube.com/@kanakdharajewellers" target="_blank" className="p-2 rounded-full border border-white text-white hover:bg-[#EFCF77] hover:border-yellow-500 hover:text-[#71074F] duration-300">
                            <FaYoutube className="" />
                        </a>
                        <a href="https://www.facebook.com/kanakdharajewellers?mibextid=LQQJ4d" target="_blank" className="mx-4 p-2 rounded-full border border-white text-white hover:bg-[#EFCF77] hover:border-yellow-500 hover:text-[#71074F] duration-300">
                            <FaFacebookF className="" />
                        </a>
                        <a href="https://www.instagram.com/kanakdharajewellers/?igshid=MWI4MTIyMDE%3D" target="_blank" className="p-2 rounded-full border border-white text-white hover:bg-[#EFCF77] hover:border-yellow-500 hover:text-[#71074F] duration-300">
                            <FaInstagram className="" />
                        </a>
                    </div>
                </div>

                <div className="flex">
                    <div className="md:px-3">
                        <div className="font-semibold text-xl text-[#EFCF77]">
                            Useful Links
                        </div>
                        <div className="mt-5 grid grid-cols-1 gap-2 pl-1 text-white">
                            <a href="#" className="w-fit hover:text-[#EFCF77] hover:scale-[105%] duration-300">
                                Privacy Policy
                            </a>
                            <a href="#" className="w-fit hover:text-[#EFCF77] hover:scale-[105%] duration-300">
                                Terms & Conditions
                            </a>
                            <a href="#" className="w-fit hover:text-[#EFCF77] hover:scale-[105%] duration-300">
                                Refund Policy
                            </a>
                            <a href="#" className="w-fit hover:text-[#EFCF77] hover:scale-[105%] duration-300">
                                Contact Us
                            </a>
                        </div>
                    </div>
                </div>

                <div className="flex">
                    <div className="">
                        <div className="font-semibold text-xl text-[#EFCF77]">
                            Gold Jewellry
                        </div>
                        <div className="mt-5 grid grid-cols-1 gap-2 pl-1 text-white">
                            {cat.map((i) => {
                                return (
                                    <a href={`/gold-jewellery/${i.category.toLowerCase().replace(/ /g, '-')}`} className="w-fit hover:text-[#EFCF77] hover:scale-[105%] duration-300">
                                        {i.category}
                                    </a>
                                )
                            })}
                        </div>
                    </div>
                </div>

                <div className="flex">
                    <div className="md:px-3">
                        <div className="font-semibold text-xl text-[#EFCF77]">
                            Contact Us
                        </div>
                        <div className="mt-5 grid grid-cols-1 gap-2 pl-1 text-white">
                            <a href="+919510902129" className="w-fit hover:text-[#EFCF77] hover:scale-[105%] duration-300 flex items-center my-auto">
                                <IoIosCall className="mr-2" />
                                <span>+91 9510902129</span>
                            </a>
                            <a href="mailto:mitzchhajed@gmail.com" className="w-fit hover:text-[#EFCF77] hover:scale-[105%] duration-300 flex items-center my-auto">
                                <IoIosMail className="mr-2" />
                                <span>mitzchhajed@gmail.com</span>
                            </a>
                            <a href="https://api.whatsapp.com/send?phone=919510902129" target="_blank" className="w-fit hover:text-[#EFCF77] hover:scale-[105%] duration-300 flex items-center my-auto">
                                <IoLogoWhatsapp className="mr-2" />
                                <span>+91 9510902129</span>
                            </a>
                            <a href="#" className="w-fit hover:text-[#EFCF77] hover:scale-[105%] duration-300 flex">
                                <FaLocationDot className="mt-1 mr-2" />
                                <div style={{ maxWidth: 'calc(100% - 1.5em)' }}>
                                    <span>114, Kanak Chamber, Gandhi Road, Ahmedabad - 380001</span>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Copyright */}
            <div className="mt-4 lg:mt-0 pt-8 border-t border-gray-400 text-gray-300 text-center flex justify-center mx-auto">
                © Copyright 2022. All Rights Reserved by Kanakdhara Jewellers.
            </div>
        </div>
    )
}
