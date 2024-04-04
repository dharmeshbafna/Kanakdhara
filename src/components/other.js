'use client'
import Logo from "../../public/logo.png"
import Image from "next/image"
import Icon from "../../public/icon.png"

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
        <div>
            Footer
        </div>
    )
}