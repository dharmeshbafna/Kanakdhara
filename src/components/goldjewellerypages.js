'use client'

import { useState, useEffect } from "react";
import Image from "next/image";
import { Simonetta } from "next/font/google"
import { GetCategories } from "@/api/product";
import { LoaderComp } from "./other";

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

const simonetta = Simonetta({ weight: '400', subsets: ["latin"] });

export const Main = ({ name }) => {

    const [data, setData] = useState([]);
    const [load, setLoad] = useState(true);
    const [modal, setModal] = useState(false);
    const [imgpopup, setImgPopup] = useState('');
    const [fd, setFd] = useState({
        name: '',
        contact: '',
        message: ''
    });

    const getdata = async () => {

        const res = await GetCategories();

        if (res.success) {

            const a = res.success;

            a.map((i) => {
                if (i.category.toLowerCase().replace(/ /g, '-') == name) {
                    setData(i);
                }
            });

            setLoad(false);
        }
    };

    useEffect(() => {
        getdata();
    }, []);

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
    

    return (
        <div className={`lg:px-16 ${load ? '' : 'pt-24 pb-10'}`}>
            {load ?
                <LoaderComp />
                :
                <div>
                    <div className="my-10 flex justify-center mx-auto">
                        <div className="w-fit ">
                            <div className={` ${simonetta.className} text-[3.25rem] text-center flex justify-center mx-auto`}>
                                {data.category}
                            </div>
                            <div className="flex justify-center mx-auto w-1/2 bg-black h-1 rounded-lg"></div>
                        </div>
                    </div>
                    {/* Items */}
                    <div className="grid grid-cols-4 gap-7">
                        {data.products && data.products
                            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                            .map((i) => {
                                return (
                                    <div className="flex-col justify-center mx-auto">
                                        <button
                                            onClick={() => {
                                                setModal(true);
                                                setImgPopup(i);
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
                                        <div className="flex justify-center mx-auto text-center mt-3">{i.title}</div>
                                    </div>
                                )
                            })}
                    </div>
                </div>
            }
            <Modal
                open={modal}
                onClose={() => setModal(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className="absolute top-1/2 left-1/2 bg-transparent shadow-lg focus:outline-none -translate-x-1/2 -translate-y-1/2 w-[90%] md:min-w-[65%] lg:w-auto md:max-w-[80%]">
                    <div className=" flex">
                        <Image
                            src={imgpopup.imglink}
                            priority={true}
                            width={300}
                            height={300}
                            className="flex justify-center items-center m-auto w-full h-auto md:max-h-[500px] md:min-w-[500px]"
                        />

                        <div className="p-3 bg-white">
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
                    </div>
                </Box>
            </Modal>
        </div>
    )
};