'use client'

import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { Simonetta } from "next/font/google"

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

import { IoIosSearch } from "react-icons/io";
import { FaSearchPlus, FaWhatsapp } from "react-icons/fa";

import Slider1 from "../../public/slider1.jpeg";
import Slider2 from "../../public/slider2.jpeg";
import Belt from "../../public/belt.jpg"
import Bangles from "../../public/bangles.jpeg";
import Earrings from "../../public/earrings.jpg";
import NameLogo from "../../public/namelogo.png";

import { GetCategories } from "@/api/product";
import { usePathname } from "next/navigation";

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
        <div className="h-[70vh] md:h-[60vh] lg:h-[100vh] w-full relative flex justify-center items-end lg:px-16">

            {/* Pink Shade bg */}
            <div className="absolute w-1/2 lg:w-[40%] top-0 right-0 h-1/2 md:h-[75%] lg:h-[85%] bg-[#71074F] shadow-lg">
            </div>

            {/* Text between slider & bg */}
            <div className="hidden md:block absolute top-[20%] md:top-[40%] right-0 md:right-5 lg:right-20 z-30 w-1/2 md:w-[35%]">
                <div className={`${simonetta.className} text-white text-3xl lg:text-[40px]`}>
                    Kanakdhara Jewellers
                </div>
                <div className="text-white text-sm mt-5">
                    Welcome to Kanakdhara Jewellers, where excellence and craftsmanship converge to offer a diverse array of exquisite plain gold casting jewelry, meticulously crafted in the heart of Ahmedabad, India.
                </div>
            </div>

            {/* Line below logo */}
            <div className="block absolute left-2 lg:left-20 bottom-12 md:bottom-0 lg:bottom-auto lg:top-[22%]">
                <div className="h-8 md:h-12 border-l border-yellow-400 ml-3 md:ml-4"></div>
                <Image
                    src={NameLogo}
                    className="w-4 md:w-6 h-auto my-2"
                />
                <div className="h-8 md:h-12 border-l border-yellow-400 ml-3 md:ml-4"></div>
            </div>

            {/* Slider */}
            {/* <div className="w-[75%] pb-8 pr-20 -ml-10">
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
            </div> */}

            {/* video */}
            <div className="w-full lg:w-[75%] px-5 lg:pb-8 lg:pr-20 lg:-ml-10 relative">
                <div className="relative w-full h-[70vh] focus:outline-none">


                    <video width="100%" height="100%" loop autoPlay muted className="hidden lg:block shadow-lg">
                        <source src="/intro.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>

                    <video loop autoPlay muted className="w-[93%] md:w-[80%] h-[100%] absolute left-4 bottom-10 md:left-8 md:-bottom-20 lg:hidden">
                        <source src="/intro.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
            </div>

            <div className="md:hidden absolute bottom-4 left-4 px-5">
                <div className={`${simonetta.className} text-black text-4xl`}>
                    Kanakdhara Jewellers
                </div>
                <div className="text-black text-sm mt-5">
                    Welcome to Kanakdhara Jewellers, where excellence and craftsmanship converge to offer a diverse array of exquisite plain gold casting jewelry, meticulously crafted in the heart of Ahmedabad, India.
                </div>
            </div>
        </div>
    )
}

export const Products = () => {

    const [data, setData] = useState([]);
    const [activeCat, setActiveCat] = useState('');
    const [modal, setModal] = useState(false);
    const [type, setType] = useState('');
    const [imgpopup, setImgPopup] = useState('');
    const [activeSlide, setActiveSlide] = useState(0);
    const [fd, setFd] = useState({
        name: '',
        contact: '',
        message: ''
    });
    const sliderRef = useRef();
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 2300,
        beforeChange: (current, next) => setActiveSlide(next),
        customPaging: ((i, index) => {
            return (
                <div className={`${i == activeSlide ? 'bg-black' : 'bg-gray-200'} rounded-full w-3 h-3`}>

                </div>
            )
        }),
        dotsClass: "slick-dots",
    };

    const getallcategories = async () => {

        const res = await GetCategories();

        if (res.success) {
            setData(res.success);
            setActiveCat(res.success[0]);
        }

    };

    const handlemessage = (e) => {
        e.preventDefault();

        const message = `Hello Kanakdhara Jewellers, I want to talk about this item which i found on your website. \n\nName: ${fd.name}\nContact: ${fd.contact}\nMessage: ${fd.message}\nCategory: ${data.category}\nTitle: ${imgpopup.title}\nImageurl: ${imgpopup.imglink}
        `;
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/919510902129?text=${encodedMessage}`;
        window.open(whatsappUrl, '_blank');

        setTimeout(() => {
            setModal(false);
            setFd({
                name: '',
                contact: '',
                message: ''
            });
        }, 1000);
    };

    useEffect(() => {
        getallcategories();
    }, []);

    return (
        <div className="px-5 py-16 lg:py-14 lg:px-16 lg:min-h-[100vh] flex items-center my-auto">
            <div className="w-full">
                <div className="text-base flex justify-center mx-auto text-center">
                    Basic and Exquisite
                </div>
                <div className={`flex justify-center mx-auto text-[3.25rem] ${simonetta.className}`}>
                    Our Products
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 lg:flex items-center justify-center m-auto py-4 w-full">
                    {/* {data && data.map((i) => {
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
                    })} */}
                    {data && data.map((i) => {
                        return (
                            <button onClick={() => setActiveCat(i)} className={`${i._id == activeCat._id ? 'bg-[#71074F] text-[#EFCF77]' : ''} lg:w-fit w-full px-2 py-1 lg:px-5 border border-[#71074F] hover:bg-[#71074F] hover:text-[#EFCF77] duration-300`}>
                                {i.category}
                            </button>
                        )
                    })}
                </div>

                {/* Items Desktop*/}
                <div className="hidden lg:flex items-center justify-center m-auto w-full py-3">
                    <div className="grid grid-cols-4 gap-6">
                        {activeCat.products && activeCat.products
                            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                            .slice(0, 4)
                            .map((i) => {
                                return (
                                    <button
                                        className="shadow-lg relative h-56 w-56 duration-300 hover:text-[#EFCF77] product-overlay text-transparent">
                                        <Image
                                            src={i.imglink}
                                            objectFit="cover"
                                            layout="fill"
                                            objectPosition="center"
                                            className="bg-white"
                                        />

                                        <div className="absolute top-0 left-0 w-full h-full bg flex justify-center items-center m-auto">
                                            <FaSearchPlus
                                                onClick={() => {
                                                    setModal(true);
                                                    setImgPopup(i);
                                                    setType('image');
                                                }}
                                                className="focus:outline-none text-2xl mr-5 hover:scale-[120%] duration-300"
                                            />
                                            <FaWhatsapp
                                                onClick={() => {
                                                    setModal(true);
                                                    setImgPopup(i);
                                                    setType('form');
                                                }}
                                                className="focus:outline-none text-2xl z-30 hover:scale-[120%] duration-300"
                                            />
                                        </div>
                                    </button>
                                )
                            })}
                    </div>
                </div>

                {/* Items Responsive*/}
                <div className="lg:hidden pt-3 pb-5">
                    <Slider ref={sliderRef} {...settings} className="">
                        {activeCat.products && activeCat.products
                            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                            .slice(0, 4)
                            .map((i) => {
                                return (
                                    <button
                                        onClick={() => {
                                            setModal(true);
                                            setImgPopup(i);
                                            setType('form');
                                        }}
                                        className="relative w-full h-60 md:h-96 duration-300 mb-4 hover:text-[#EFCF77] product-overlay text-transparent">
                                        <Image
                                            src={i.imglink}
                                            objectFit="cover"
                                            layout="fill"
                                            objectPosition="center"
                                            className="bg-white"
                                        />
                                        <FaWhatsapp className="text-xl absolute top-1/2 left-1/2 z-30" />
                                        <div className="absolute top-0 left-0 w-full h-full bg"></div>
                                    </button>
                                )
                            })}
                    </Slider>
                </div>

                <div className="flex justify-center mt-5">
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
                <Box className="absolute top-1/2 left-1/2 bg-transparent shadow-lg focus:outline-none -translate-x-1/2 -translate-y-1/2 w-[80%] md:w-auto md:max-w-[80%]">

                    {type == 'image' ?
                        <Image
                            src={imgpopup.imglink}
                            priority={true}
                            width={300}
                            height={300}
                            className="flex justify-center items-center m-auto max-h-[500px] min-h-[400px] h-full w-auto"
                        /> : type == 'form' ?
                            <div className="p-5 bg-white lg:w-[65%] flex justify-center mx-auto">
                                <div className="flex items-center my-auto h-full">
                                    <div className="">
                                        <div className={`${simonetta.className} text-2xl`}>
                                            Get Info
                                        </div>
                                        <form onSubmit={handlemessage} className="w-full mt-3">

                                            <input
                                                className="w-full h-fit p-2 border border-black focus:outline-none focus:border focus:border-yellow-600"
                                                placeholder="Full Name"
                                                value={fd.name}
                                                onChange={(e) => setFd({ ...fd, name: e.target.value })}
                                                required
                                            />

                                            <input
                                                className="mt-2 w-full h-fit p-2 border border-black focus:outline-none focus:border focus:border-yellow-600"
                                                placeholder="Contact Number"
                                                value={fd.contact}
                                                onChange={(e) => setFd({ ...fd, contact: e.target.value })}
                                                required
                                            />

                                            <textarea
                                                className="mt-2 w-full h-fit p-2 border border-black focus:outline-none focus:border focus:border-yellow-600"
                                                placeholder="Message"
                                                value={fd.message}
                                                onChange={(e) => setFd({ ...fd, message: e.target.value })}
                                                rows={4}
                                                required
                                            >
                                            </textarea>
                                            <button type="submit" className="focus:outline-none px-5 py-2 border border-black hover:bg-black hover:text-white duration-300 hover:shadow-lg">
                                                Send Message
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            : ''}
                </Box>
            </Modal>
        </div>
    )
}

export const About = () => {
    return (
        <div className="px-5 py-16 lg:py-14 lg:px-16 bg-gray-100 lg:min-h-[100vh] items-center my-auto flex">
            <div className="grid md:grid-cols-2 gap-8 md:gap-2">

                <div className="relative hidden md:flex justify-center items-center m-auto w-full">
                    <Image
                        src={Belt}
                        className="h-96 w-auto rounded-t-full shadow-lg"
                    />
                    <div className="absolute -bottom-3 -right-4 lg:right-20">
                        <div className="relative h-48 w-48 rounded-full overflow-hidden shadow-lg">
                            <Image
                                src={Earrings}
                                objectFit="cover"
                                layout="fill"
                                className=""
                            />
                        </div>
                    </div>
                </div>

                <div className="flex items-center my-auto p-3">
                    <div>
                        <div className={`${simonetta.className} text-[50px]`}>
                            About Us
                        </div>
                        <div className="mt-3">
                            We stand as a premier Plain Gold Casting & Plain Rajkot Jewellery Manufacturers.
                            <br /><br />
                            Our dedication to perfection is evident in every piece we create, meticulously crafting a diverse array of exquisite 18k and 22k hallmarked plain gold casting rings, bracelets, pendants, and earrings.
                        </div>
                        <div className="w-fit mt-7">
                            <a href="/about" className="focus:outline-none px-5 py-2 border border-black hover:bg-black hover:text-white duration-300 hover:shadow-lg">
                                Read More
                            </a>
                        </div>
                    </div>
                </div>

                <div className="relative md:hidden flex justify-center items-center m-auto w-full">
                    <Image
                        src={Belt}
                        className="h-96 w-auto rounded-t-full shadow-lg"
                    />
                    <div className="absolute -bottom-3 -right-5">
                        <div className="relative h-48 w-48 rounded-full overflow-hidden shadow-lg">
                            <Image
                                src={Earrings}
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

export const Desc = () => {
    return (
        <div className="px-5 py-16 lg:py-0 lg:px-16 bg-[#71074F] lg:min-h-[100vh] items-center my-auto flex text-white">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-2">

                <div className="flex items-center my-auto">
                    <div>
                        <div className={`${simonetta.className} text-[50px] text-[#EFCF77]`}>
                            Fine Jewellery
                        </div>
                        <div className="mt-3">
                            What you need, wear how you need, celebrate with when you need, and keep for eternity. Our jewelry is not just for grand occasions; it's for the everyday moments that make life extraordinary.
                            <br /><br />
                            Whether it's a significant milestone or a simple joy, our pieces are crafted to accompany you through every step of your journey. From the unforgettable moments to the quiet in-betweens, our collections are designed to be cherished for a lifetime, capturing the essence of each moment and turning them into timeless memories.
                        </div>
                        {/* <div className="w-fit mt-7">
                            <a href="#" className="focus:outline-none px-5 py-2 border border-white hover:bg-white hover:text-[#71074F] duration-300 hover:shadow-lg">
                                Read More
                            </a>
                        </div> */}
                    </div>
                </div>

                <div className="relative flex justify-center items-center m-auto w-full">
                    <Image
                        src={Belt}
                        className="h-96 w-auto rounded-t-full shadow-lg"
                    />
                    <div className="absolute -bottom-3 -right-5 md:-right-4 lg:right-20">
                        <div className="relative h-48 w-48 rounded-full overflow-hidden shadow-lg">
                            <Image
                                src={Earrings}
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

export const CTA = () => {

    const path = usePathname();

    return (
        <div className={`p-5 py-16 lg:py-0 lg:min-h-[70vh] flex items-center justify-center m-auto ${path == '/contact' ? 'hidden' : ''}`}>
            <div>
                <div className={`${simonetta.className} flex justify-center mx-auto text-[3.25rem]`}>
                    Contact Us
                </div>
                <div className="mt-4 mb-6 lg:w-[80%] text-center flex justify-center mx-auto">
                    If you have any queries or need any help, feel free to contact us.
                </div>
                <a href="/contact" className="focus:outline-none px-5 py-2 border border-black hover:bg-black hover:text-white duration-300 hover:shadow-lg flex justify-center mx-auto w-fit">
                    Contact Us
                </a>
            </div>
        </div>
    )
}