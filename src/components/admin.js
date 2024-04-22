'use client'
import { MdOutlineLock } from "react-icons/md";
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Oval } from "react-loader-spinner";
import { FaUser, FaRegUserCircle } from "react-icons/fa";
import jwt from 'jsonwebtoken';
import {
    Login
} from "@/api/admin"
import {
    CreateCategory,
    GetCategories,
    CreateProduct
} from "@/api/product";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { IoIosSearch, IoMdExit } from "react-icons/io";

export const Loader = () => {
    return (
        <div>
            <Oval
                visible={true}
                height="80"
                width="80"
                color="#71074F"
                secondaryColor="#daa520"
                ariaLabel="oval-loading"
                wrapperStyle={{}}
                wrapperClass=""
            />
        </div>
    )
};

export const LoaderComp = () => {

    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const path = usePathname();

    useEffect(() => {

        const token = localStorage.getItem('Kanakdhara');
        if (!token) {
            router.push('/admin/login');
        } else {
            setTimeout(() => {
                setLoading(false);
            }, 1500);
        }
    }, []);

    return (
        <div className={`${loading ? '' : 'hidden'} absolute top-0 left-0 bg-white z-50 h-screen flex justify-center items-center m-auto w-full`}>
            <Loader />
        </div>
    )
};

export const MessageShow = ({ load, error, success }) => {

    return (
        <div>
            {load ?
                <Snackbar
                    open={load}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                >
                    <Alert variant="filled" severity="info">Loading...</Alert>
                </Snackbar> :
                success ?
                    <Snackbar
                        open={Boolean(success)}
                        autoHideDuration={3000}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}
                    >
                        <Alert variant="filled" severity="success">{success}</Alert>

                    </Snackbar> :
                    error ?
                        <Snackbar
                            open={Boolean(error)}
                            autoHideDuration={3000}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'center',
                            }}
                        >
                            <Alert variant="filled" severity="error">{error}</Alert>

                        </Snackbar> : ''}
        </div>
    )
};

export const LoginComp = () => {

    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [msg, setMsg] = useState({
        load: false,
        error: '',
        success: ''
    });
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        setMsg({ load: true, error: '', success: '' });
        const res = await Login(email, pass);

        if (res.success) {
            setMsg({ load: false, error: '', success: res.success });
            setEmail('');
            setPass('');
            setTimeout(() => {
                setMsg({ load: false, error: '', success: '' });
                localStorage.setItem('Kanakdhara', res.token);
                router.push('/admin/dashboard');
            }, 2000);
        } else {
            setMsg({ load: false, error: `${res.error || 'Internal Server Error..'}`, success: '' });
            setEmail('');
            setPass('');
            setTimeout(() => {
                setMsg({ load: false, error: '', success: '' });
            }, 2500);
        }
    };

    useEffect(() => {

        const token = localStorage.getItem('Kanakdhara');
        if (token) {
            router.push('/admin/dashboard');
        }
    }, []);

    return (
        <div className="min-h-[100vh] flex justify-center items-center m-auto w-full">
            <div>
                <div className="font-semibold text-center text-4xl">
                    Login
                </div>
                <form onSubmit={handleSubmit} className="mt-8 grid grid-cols-1 gap-3">
                    <input
                        type="email"
                        className="px-3 py-2 border border-gray-500 focus:outline-none w-full focus:border focus:border-[#71074F]"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <input
                        type="password"
                        className="px-3 py-2 border border-gray-500 focus:outline-none w-full focus:border focus:border-[#71074F]"
                        placeholder="Password"
                        value={pass}
                        onChange={(e) => setPass(e.target.value)}
                        required
                    />

                    <button type="submit" className="flex justify-center items-center m-auto focus:outline-none px-5 py-2 border border-black hover:bg-black hover:text-white duration-300 hover:shadow-lg">
                        <MdOutlineLock className="mr-2" />
                        Sign In
                    </button>
                </form>
            </div>
            <MessageShow load={msg.load} error={msg.error} success={msg.success} />
        </div>
    )
};

export const Dashboard = () => {

    const [admin, setAdmin] = useState('');
    const [profilebox, setProfilebox] = useState(false);
    const [type, setType] = useState('');
    const [name, setName] = useState('');
    const [data, setData] = useState([]);
    const [searchcat, setSearchcat] = useState('');
    const [modal, setModal] = useState(false);
    const [cc, setCc] = useState('');
    const [msg, setMsg] = useState({
        load: false,
        error: '',
        success: ''
    });
    const [additem, setAdditem] = useState({
        cid: '',
        title: '',
        img: null
    });
    const router = useRouter();

    // ========= Create Category ============
    const handleCreatecategory = async (e) => {
        e.preventDefault();

        setMsg({ load: true, error: '', success: '' });
        const res = await CreateCategory(cc);

        if (res.success) {
            setMsg({ load: false, error: '', success: res.success });
            setCc('');
            setModal(false);
            handleGetCategories();
            setTimeout(() => {
                setMsg({ load: false, error: '', success: '' });
            }, 2000);
        } else {
            setMsg({ load: false, error: `${res.error || 'Internal Server Error..'}`, success: '' });
            setCc('');
            setModal(false);
            setTimeout(() => {
                setMsg({ load: false, error: '', success: '' });
            }, 2500);
        }
    };

    // ========= Get all categories =========
    const handleGetCategories = async () => {

        const res = await GetCategories();

        if (res.success) {
            setData(res.success);
        }
    };

    // ========= Create Product ============
    const handleCreateProduct = async (e) => {
        e.preventDefault();

        setMsg({ load: true, error: '', success: '' });

        const formdata = new FormData();
        formdata.append('cid', additem.cid);
        formdata.append('title', additem.title);
        formdata.append('img', additem.img);

        const res = await CreateProduct(formdata);

        if (res.success) {
            setMsg({ load: false, error: '', success: res.success });
            setAdditem({
                cid: '',
                title: '',
                img: null
            });
            setModal(false);
            handleGetCategories();
            setTimeout(() => {
                setMsg({ load: false, error: '', success: '' });
            }, 2000);
        } else {
            setMsg({ load: false, error: `${res.error || 'Internal Server Error..'}`, success: '' });
            setAdditem({
                cid: '',
                title: '',
                img: null
            });
            setModal(false);
            setTimeout(() => {
                setMsg({ load: false, error: '', success: '' });
            }, 2500);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('Kanakdhara');

        const handletoken = async () => {

            const decode = await jwt.decode(token);

            console.log(decode);
            if (decode && decode.name) {
                setName(decode.name);
                setAdmin(decode.id);
            }
        };

        handletoken();
        handleGetCategories();
    }, []);

    return (
        <div className="min-h-[100vh] lg:px-16 lg:pt-36">

            {/* Header */}
            <div className="flex items-center my-auto pt-8 w-full">
                <div className="flex items-center my-auto border border-black px-4 py-2 focus:outline-none">
                    <IoIosSearch className="text-gray-600 mr-2" />
                    <input
                        className="focus:outline-none"
                        type="name"
                        placeholder="Category"
                        value={searchcat}
                        onChange={(e) => setSearchcat(e.target.value)}
                    />
                </div>
                <button onClick={() => {
                    setModal(true);
                    setType('create-category');
                }} className="text-nowrap mx-3 px-4 py-2 border border-black hover:bg-black hover:text-white duration-300">
                    + New Category
                </button>
                <button onClick={() => {
                    setModal(true);
                    setType('add-item');
                }} className="text-nowrap px-4 py-2 border border-black hover:bg-black hover:text-white duration-300">
                    + Add Item
                </button>

                <div className="flex justify-end items-center my-auto w-full relative">
                    <button onClick={() => setProfilebox(!profilebox)} className="flex items-center my-auto w-fit">
                        <FaRegUserCircle className="text-3xl mr-2" /> {name ? name : '-'}
                    </button>
                    {profilebox ?
                        <div className="absolute bg-white right-0 top-8 p-3 shadow-lg">
                            <button
                                onClick={() => { localStorage.removeItem('Kanakdhara'); router.push('/admin/login') }}
                                className="hover:text-[#71074F] duration-300 flex items-center my-auto">
                                <IoMdExit className="mr-2" />
                                Sign out
                            </button>
                        </div> : ''}
                </div>
            </div>

            {/* List Categories */}
            <div className="mt-6">
                <table className="w-full">
                    <thead>
                        <tr className="font-semibold text-lg text-gray-700">
                            <th>No.</th>
                            <th>Category</th>
                            <th>No. of Items</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data
                            .filter((i) => searchcat ? i.category.toLowerCase().includes(searchcat.toLowerCase()) : i)
                            .map((i, index) => {
                                return (
                                    <tr key={index} className="border-b border-gray-200">
                                        <td className="w-1/4 text-center py-4 px-2">{index + 1}.</td>
                                        <td className="w-1/4 text-center py-4 px-2">{i.category}</td>
                                        <td className="w-1/4 text-center py-4 px-2">{i.products.length}</td>
                                        <td className="text-nowrap flex items-center m-auto justify-center py-4 px-2">
                                            <button className="text-nowrap px-4 py-2 border border-black hover:bg-black hover:text-white duration-300">
                                                View Items
                                            </button>
                                            <button className="mx-3 text-nowrap px-4 py-2 border border-black hover:bg-black hover:text-white duration-300">
                                                Edit
                                            </button>
                                            <button className="text-nowrap px-4 py-2 border border-black hover:bg-black hover:text-white duration-300">
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            <Modal
                open={modal}
                onClose={() => setModal(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className="absolute top-1/2 left-1/2 bg-white shadow-lg p-3 focus:outline-none -translate-x-1/2 -translate-y-1/2 w-[90%] md:w-[65%] lg:w-auto md:max-w-[80%]">
                    {type == 'create-category' ?
                        <div className="">
                            <div className="text-center font-semibold text-xl mb-3">
                                Create Category
                            </div>
                            <form onSubmit={handleCreatecategory}>
                                <input
                                    type="name"
                                    className="my-3 px-3 py-2 border border-gray-500 focus:outline-none w-full focus:border focus:border-[#71074F] mb-3"
                                    placeholder="Category Name"
                                    value={cc}
                                    onChange={(e) => setCc(e.target.value)}
                                    required
                                />
                                <button type="submit" className="flex justify-center items-center m-auto focus:outline-none px-4 py-2 border border-black hover:bg-black hover:text-white duration-300 hover:shadow-lg">
                                    Create
                                </button>
                            </form>
                        </div> :
                        type == 'add-item' ?
                            <div className="">
                                <div className="text-center font-semibold text-xl mb-3">
                                    Add Item
                                </div>
                                <form onSubmit={handleCreateProduct}>
                                    <select
                                        onChange={(e) => setAdditem({ ...additem, cid: e.target.value })}
                                        className="px-3 py-2 border border-gray-500 focus:outline-none w-full focus:border focus:border-[#71074F]"
                                        required
                                    >
                                        <option>--Select Category--</option>
                                        {data.map((i) => {
                                            return (
                                                <option value={i._id}>
                                                    {i.category}
                                                </option>
                                            )
                                        })}
                                    </select>
                                    <input
                                        type="name"
                                        className="my-3 px-3 py-2 border border-gray-500 focus:outline-none w-full focus:border focus:border-[#71074F]"
                                        placeholder="Item Title"
                                        value={additem.title}
                                        onChange={(e) => setAdditem({ ...additem, title: e.target.value })}
                                        required
                                    />
                                    <div className="flex items-center my-auto pb-5">
                                        <label htmlFor="img" className="mr-2">Choose Image (max: 1 mb): </label>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => {
                                                if (e.target.files[0].size > 1048576) {
                                                    setMsg({load: false, success: '', error:"The file is too large (1MB max)."});
                                                    setTimeout(() => {
                                                        setMsg({load: false, success: '', error:''});
                                                    }, 2000);
                                                    return;
                                                } else {
                                                    setAdditem({ ...additem, img: e.target.files[0] });
                                                }
                                            }}
                                            required
                                        />
                                    </div>
                                    <button type="submit" className="flex justify-center items-center m-auto focus:outline-none px-4 py-2 border border-black hover:bg-black hover:text-white duration-300 hover:shadow-lg">
                                        Create
                                    </button>
                                </form>
                            </div> : ''}
                </Box>
            </Modal>
            <MessageShow load={msg.load} error={msg.error} success={msg.success} />
        </div>
    )
}