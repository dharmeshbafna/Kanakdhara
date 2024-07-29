'use client'

import { useState, useEffect } from "react";
import { Simonetta } from "next/font/google"

import { FaInstagram, FaFacebookF, FaCaretDown, FaYoutube } from "react-icons/fa";
import { FaXTwitter, FaLocationDot } from "react-icons/fa6";
import { IoIosCall, IoIosMail, IoLogoWhatsapp } from "react-icons/io";

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Loader } from "./admin";
import AOS from 'aos';
import 'aos/dist/aos.css';

import { ContactForm } from "@/api/form";

const simonetta = Simonetta({ weight: '400', subsets: ["latin"] });

export const ContactComp = () => {

    const [modal, setModal] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [fd, setFd] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });


    const handleSubmit = async (e) => {
        e.preventDefault();
        setModal(true);

        const res = await ContactForm(fd);

        if (res.success) {
            setLoading(false);
            setSuccess(res.success);
            setError('');
            setFd({
                name: '',
                email: '',
                phone: '',
                subject: '',
                message: ''
            })
            setTimeout(() => {
                setError('');
                setSuccess('');
                setLoading(true);
                setModal(false);
            }, 2500);
        } else {
            setLoading(false);
            setSuccess('');
            setError(res.error || 'Internal Server Error.');
            setFd({
                name: '',
                email: '',
                phone: '',
                subject: '',
                message: ''
            })
            setTimeout(() => {
                setSuccess('');
                setError('');
                setLoading(true);
                setModal(false);
            }, 2500);
        }
    }

    useEffect(() => {
        AOS.init({
            once: true,
        });
    }, []);
    return (
        <div className="lg:px-16 pt-24 pb-10 px-5">
            <div className="my-10 flex justify-center mx-auto">
                <div className="w-fit ">
                    <div data-aos="fade-in" data-aos-duration="2000" className={` ${simonetta.className} text-[3.25rem] text-center flex justify-center mx-auto`}>
                        Contact Us
                    </div>
                    <div data-aos="fade-in" data-aos-duration="2000" className="flex justify-center mx-auto w-1/2 bg-black h-1 rounded-lg"></div>
                </div>
            </div>

            {/* Main */}
            <div className="grid grid-cols-1 gap-3 lg:flex justify-center mx-auto">

                <div data-aos="fade-right" data-aos-duration="2000" className="bg-[#71074F] p-5 shadow-lg lg:max-w-[35%]">
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
                        <a href="https://maps.app.goo.gl/bue3xGxnRnUVScQr5?g_st=com.google.maps.preview.copy" target="_blank" className="text-lg w-fit hover:text-[#EFCF77] hover:scale-[105%] duration-300 flex">
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

                <form data-aos="fade-left" data-aos-duration="2000" onSubmit={handleSubmit} className="lg:px-3 lg:w-1/2 grid grid-cols-1 gap-3 h-fit">
                    <input
                        className="h-fit p-2 border border-black w-full focus:outline-none focus:border focus:border-yellow-600"
                        placeholder="Full Name"
                        type="name"
                        value={fd.name}
                        onChange={(e) => setFd({ ...fd, name: e.target.value })}
                        required
                    />

                    <div className="grid grid-cols-2 gap-2 ">
                        <input
                            className="h-fit p-2 border border-black w-full focus:outline-none focus:border focus:border-yellow-600"
                            placeholder="Email"
                            type="email"
                            value={fd.email}
                            onChange={(e) => setFd({ ...fd, email: e.target.value })}
                            required
                        />
                        <input
                            className="h-fit p-2 border border-black w-full focus:outline-none focus:border focus:border-yellow-600"
                            placeholder="Phone"
                            type="tel"
                            value={fd.phone}
                            onChange={(e) => setFd({ ...fd, phone: e.target.value })}
                            required
                        />
                    </div>

                    <input
                        className="h-fit p-2 border border-black w-full focus:outline-none focus:border focus:border-yellow-600"
                        placeholder="Subject"
                        value={fd.subject}
                        onChange={(e) => setFd({ ...fd, subject: e.target.value })}
                        required
                    />

                    <textarea
                        className="h-fit p-2 border border-black w-full focus:outline-none focus:border focus:border-yellow-600"
                        placeholder="Message"
                        rows={8}
                        value={fd.message}
                        onChange={(e) => setFd({ ...fd, message: e.target.value })}
                        required
                    >
                    </textarea>

                    <button type="submit" className="focus:outline-none px-5 py-2 border border-black hover:bg-black hover:text-white duration-300 hover:shadow-lg w-fit">
                        Submit
                    </button>
                </form>
            </div>
            <Modal
                open={modal}
                onClose={() => setModal(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className="absolute top-1/2 left-1/2 bg-white shadow-lg p-3 focus:outline-none -translate-x-1/2 -translate-y-1/2 w-[90%] md:w-[65%] lg:w-auto md:max-w-[80%]">
                    {loading ?
                        <div>
                            <Loader />
                        </div> :
                        success ?
                            <div className="text-green-500 text-xl font-semibold text-center">
                                {success}
                            </div> :
                            error ?
                                <div className="text-red-500 text-xl font-semibold text-center">
                                    {error}
                                </div> : ''}
                </Box>
            </Modal>
        </div>
    )
}