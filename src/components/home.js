'use client'

import Image from "next/image";
import { useRef } from "react";
import { Simonetta } from "next/font/google"

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Slider1 from "../../public/slider1.jpg";
import Slider2 from "../../public/slider2.jpeg";

import NameLogo from "../../public/namelogo.png";

const simonetta = Simonetta({ weight: '400', subsets: ["latin"] });

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
            <div className="absolute top-[40%] right-20 z-40 lg:w-[30%]">
                <div className={`${simonetta.className} text-white text-[55px]`}>
                    Looks Good
                </div>
                <div className="text-white text-sm mt-1">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </div>
            </div>

            {/* Line below logo */}
            <div className="absolute left-20 top-[30%]">
                <Image
                    src={NameLogo}
                    className="w-6 h-auto"
                />
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