'use client'

export const Banner = () => {
    return (
        <div className="t1 text-white h-[100vh] w-full flex justify-center items-center m-auto">
            Banner
        </div>
    )
}

export const First = () => {
    return (
        <div className="p-10 flex w-full bg-gray-200">
            <div className="lg:w-[65%] lg:pr-10">
                <div className="text-yellow-500 font-semibold text-[40px]">
                    Dummy Title
                </div>
                <div className="my-4 text-lg">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    <br /><br />
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </div>
                <button className="bg-amber-300 text-gray-600 px-5 py-2 shadow-lg hover:shadow-none duration-300">
                    Read More
                </button>
            </div>
            <div className="lg:w-[30%] h-full relative flex-col items-center my-auto">
                <div className="h-72 w-full bg-white shadow-lg flex justify-center mx-auto border-2 border-yellow-400">
                    <div className="flex justify-center items-center m-auto h-full">Image</div>
                </div>
                <div className="absolute h-44 w-44 bottom-0 bg-white -right-14 border-2 border-pink-700">
                    <div className="flex justify-center items-center m-auto h-full">Image</div>
                </div>
            </div>
        </div>
    )
}

export const Products = () => {
    return (
        <div className="p-10">
            Products
        </div>
    )
}