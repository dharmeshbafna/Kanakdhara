'use client'

import { useState, useEffect } from "react";
import { Simonetta } from "next/font/google"
import Image from "next/image";

import { FaInstagram, FaFacebookF, FaCaretDown } from "react-icons/fa";
import { FaXTwitter, FaLocationDot } from "react-icons/fa6";
import { IoIosCall, IoIosMail, IoLogoWhatsapp } from "react-icons/io";

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import AOS from 'aos';
import 'aos/dist/aos.css';

import AboutImg from "../../public/kanakdhara.jpg";
import Necklace from "../../public/necklace.jpeg";
import Bangles from "../../public/bangles.jpeg";
import NameLogo from "../../public/namelogo.png";

const simonetta = Simonetta({ weight: '400', subsets: ["latin"] });

export const AboutComp = () => {
    
    useEffect(() => {
        AOS.init({
            once: true,
        });
    }, []);

    return (
        <div className="lg:px-16 pt-24 pb-14 px-5">

            <div className="my-10 flex justify-center mx-auto">
                <div className="w-fit ">
                    <div data-aos="fade-in" data-aos-duration="2000" className={` ${simonetta.className} text-[3.25rem] text-center flex justify-center mx-auto`}>
                        About Us
                    </div>
                    <div data-aos="fade-in" data-aos-duration="2000" className="flex justify-center mx-auto w-1/2 bg-black h-1 rounded-lg"></div>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4 lg:flex w-full">

                <div data-aos="fade-in" data-aos-duration="2000" className="lg:hidden">
                    <Image
                        src={AboutImg}
                        className="w-full h-auto flex justify-center items-center m-auto shadow-lg"
                        priority={true}
                    />
                </div>

                <div data-aos="fade-right" data-aos-duration="2000" className="lg:w-[60%] lg:p-3">
                    <div className={` ${simonetta.className} text-4xl md:text-[2.5rem]`}>
                        About Kanakdhara Jewellers
                    </div>
                    <div className="mt-4">
                        A renowned presence in the heart of Ahmedabad, India, we stand as a premier Plain Gold Casting & Plain Rajkot Jewellery Manufacturer, epitomizing excellence and craftsmanship.

                        Our dedication to perfection is evident in every piece we create, meticulously crafting a diverse array of exquisite 18k and 22k hallmarked plain gold casting rings, bracelets, pendants, and earrings.
                        <br /><br />
                        Catering to the discerning tastes of both men and women, our collections exude timeless elegance and sophistication. With unwavering commitment to quality, we proudly serve as trusted suppliers to numerous esteemed wholesalers and retailers within the jewelry industry, fostering enduring partnerships built on integrity and reliability.
                    </div>
                </div>

                <div data-aos="fade-left" data-aos-duration="2000" className="hidden lg:block lg:w-[40%] lg:p-3 ">
                    <Image
                        src={AboutImg}
                        className="w-full h-auto flex justify-center items-center m-auto shadow-lg"
                        priority={true}
                    />
                </div>
            </div>
        </div>
    )
}

export const Manufacturing = () => {
    return (
        <div className="bg-gray-200 lg:px-16 py-16 px-5">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-2">

                <div  data-aos="fade-right" data-aos-duration="2000" className="relative flex justify-center items-center m-auto w-full h-full">
                    <Image
                        src={Necklace}
                        className="h-96 w-auto rounded-t-full shadow-lg"
                    />
                    <div className="absolute -bottom-3 right-0 lg:right-10">
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

                <div className="flex items-center my-auto md:p-3">
                    <div data-aos="fade-left" data-aos-duration="2000">
                        <div className={`${simonetta.className} text-[2.5rem]`}>
                            Manufacturing
                        </div>
                        <div className="mt-5">

                            Our diverse product line of gold jewelry is always changing to keep up with the latest trends in the jewelry industry.

                            We pride ourselves in offering high-quality products, reliable services, and customer satisfaction.
                            <br /><br />
                            We hope you will give us the pleasure to serve your jewelry purchasing needs and please feel free to contact us if you need any further information.
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}