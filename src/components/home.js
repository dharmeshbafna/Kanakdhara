'use client'

import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { Simonetta } from "next/font/google"

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Slider1 from "../../public/slider1.jpeg";
import Slider2 from "../../public/slider2.jpeg";
import Necklace from "../../public/necklace.jpeg";
import Bangles from "../../public/bangles.jpeg";
import NameLogo from "../../public/namelogo.png";

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

import { GetCategories } from "@/api/product";

const simonetta = Simonetta({ weight: '400', subsets: ["latin"] });
const simonetta2 = Simonetta({ weight: '900', subsets: ["latin"] });

export const Banner = () => {

    const sliderRef = useRef();
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 2300,
        pauseOnHover: false,
    };
    return (
        <div className="h-[100vh] w-full relative flex justify-center items-end lg:px-16">

            {/* Pink Shade bg */}
            <div className="absolute w-[40%] top-0 right-0 h-[85vh] bg-[#71074F] shadow-lg">
            </div>

            {/* Text between slider & bg */}
            <div className="absolute top-[40%] right-20 z-30 lg:w-[30%]">
                <div className={`${simonetta.className} text-white text-[55px]`}>
                    Looks Good
                </div>
                <div className="text-white text-sm mt-1">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </div>
            </div>

            {/* Line below logo */}
            <div className="absolute left-20 top-[22%]">
                <div className="h-12 border-l border-yellow-400 ml-4"></div>
                <Image
                    src={NameLogo}
                    className="w-6 h-auto my-2"
                />
                <div className="h-12 border-l border-yellow-400 ml-4"></div>
            </div>

            {/* Slider */}
            <div className="w-[75%] pb-8 pr-20 -ml-10">
                <Slider ref={sliderRef} {...settings} className="">
                    <div className="relative w-full h-[70vh] focus:outline-none shadow-lg">
                        <Image
                            src={Slider1}
                            objectFit="cover"
                            layout="fill"
                            priority={true}
                        />
                    </div>
                    <div className="relative w-full h-[70vh] focus:outline-none shadow-lg">
                        <Image
                            src={Slider2}
                            objectFit="cover"
                            layout="fill"
                            priority={true}
                        />
                    </div>
                </Slider>
            </div>
        </div>
    )
}

export const Products = () => {

    const [data, setData] = useState([]);
    const [activeCat, setActiveCat] = useState('');
    const [modal, setModal] = useState(false);
    const [imgpopup, setImgPopup] = useState('');

    const getallcategories = async () => {

        const res = await GetCategories();

        if (res.success) {
            setData(res.success);
            setActiveCat(res.success[0]);
        }

    };

    useEffect(() => {
        getallcategories();
    }, []);

    return (
        <div className="py-14 lg:px-16 min-h-[100vh] flex items-center my-auto">
            <div className="w-full">
                <div className="text-base flex justify-center mx-auto text-center">
                    Basic and Exquisite
                </div>
                <div className={`flex justify-center mx-auto text-[3.25rem] ${simonetta.className}`}>
                    Our Products
                </div>

                <div className="flex items-center justify-center m-auto py-4 w-full">
                    {data && data.map((i) => {
                        return (
                            <div>
                                <div onClick={() => setActiveCat(i)} className="mx-2 w-fit hover:scale-[110%] duration-300 focus:outline-none">
                                    <button className={`${i._id == activeCat._id ? 'font-semibold' : ''}`}>
                                        {i.category}
                                    </button>
                                    {activeCat._id == i._id ?
                                        <div className="h-1 w-1/2 bg-black flex justify-center mx-auto rounded-lg">
                                        </div>
                                        : ''}
                                </div>
                            </div>
                        )
                    })}
                </div>

                <div className="flex items-center justify-center m-auto w-full py-3">
                    <div className="grid grid-cols-4 gap-6">
                        {activeCat.products && activeCat.products
                            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                            .slice(0, 4)
                            .map((i) => {
                                return (
                                    <button
                                    onClick={() => {
                                        setModal(true);
                                        setImgPopup(i.imglink);
                                    }} 
                                    className="shadow-lg relative h-56 w-56 hover:scale-[110%] duration-300">
                                        <Image
                                            src={i.imglink}
                                            objectFit="cover"
                                            layout="fill"
                                            objectPosition="center"
                                            className="bg-white"
                                        />
                                    </button>
                                )
                            })}
                    </div>
                </div>

                <div className="flex justify-center mt-3">
                    <a href={`/gold-jewellery/${activeCat ? activeCat.category.toLowerCase().replace(/ /g, '-') : ''}`} className="focus:outline-none px-5 py-2 border border-black hover:bg-black hover:text-white duration-300 hover:shadow-lg">
                        View All
                    </a>
                </div>
            </div>
            <Modal
                open={modal}
                onClose={() => setModal(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className="absolute top-1/2 left-1/2 bg-white shadow-lg focus:outline-none -translate-x-1/2 -translate-y-1/2 w-[90%] md:w-[65%] lg:w-auto md:max-w-[80%]">
                    <div className="">
                        <Image
                            src={imgpopup}
                            priority={true}
                            width={300}
                            height={300}
                            className="flex justify-center items-center m-auto w-full h-auto md:max-h-[500px] md:w-auto"
                        />
                    </div>
                </Box>
            </Modal>
        </div>
    )
}

export const About = () => {
    return (
        <div className="py-14 lg:px-16 bg-gray-100 min-h-[100vh] items-center my-auto flex">
            <div className="grid grid-cols-2 gap-2">

                <div className="relative flex justify-center items-center m-auto w-full">
                    <Image
                        src={Necklace}
                        className="h-96 w-auto rounded-t-full shadow-lg"
                    />
                    <div className="absolute -bottom-3 right-10">
                        <div className="relative h-48 w-48 rounded-full overflow-hidden shadow-lg">
                            <Image
                                src={Bangles}
                                objectFit="cover"
                                layout="fill"
                                className=""
                            />
                        </div>
                    </div>
                </div>

                <div className="flex items-center my-auto p-3">
                    <div>
                        <div className="text-base">
                            Basic and Exquisite
                        </div>
                        <div className={`${simonetta.className} text-[50px]`}>
                            About Us
                        </div>
                        <div className="">
                            What you need, wear how you need, celebrate with when you need, and keep for eternity. It's for great minutes, minor achievements, and in the middle between.
                            <br /><br />
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        </div>
                        <div className="w-fit mt-7">
                            <a href="/about" className="focus:outline-none px-5 py-2 border border-black hover:bg-black hover:text-white duration-300 hover:shadow-lg">
                                Read More
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export const Desc = () => {
    return (
        <div className="py-14 lg:px-16 bg-[#71074F] min-h-[100vh] items-center my-auto flex text-white">
            <div className="grid grid-cols-2 gap-2">

                <div className="flex items-center my-auto">
                    <div>
                        <div className="text-base">
                            Basic and Exquisite
                        </div>
                        <div className={`${simonetta.className} text-[50px]`}>
                            Fine Jewellery
                        </div>
                        <div className="">
                            What you need, wear how you need, celebrate with when you need, and keep for eternity. It's for great minutes, minor achievements, and in the middle between.
                            <br /><br />
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        </div>
                        <div className="w-fit mt-7">
                            <a href="#" className="focus:outline-none px-5 py-2 border border-white hover:bg-white hover:text-[#71074F] duration-300 hover:shadow-lg">
                                Read More
                            </a>
                        </div>
                    </div>
                </div>

                <div className="relative flex justify-center items-center m-auto w-full">
                    <Image
                        src={Necklace}
                        className="h-96 w-auto rounded-t-full shadow-lg"
                    />
                    <div className="absolute -bottom-3 right-10">
                        <div className="relative h-48 w-48 rounded-full overflow-hidden shadow-lg">
                            <Image
                                src={Bangles}
                                objectFit="cover"
                                layout="fill"
                                className=""
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}