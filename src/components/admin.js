'use client'
import { MdOutlineLock } from "react-icons/md";
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Rings, Oval } from "react-loader-spinner";
import { FaUser, FaRegUserCircle } from "react-icons/fa";
import jwt from 'jsonwebtoken';
import {
    Login
} from "@/api/admin"
import {
    CreateCategory,
    GetCategories,
    CreateProduct,
    EditCategory,
    EditProduct,
    getItems,
    DeleteItem,
    DeleteCategory
} from "@/api/product";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { IoIosSearch, IoMdExit } from "react-icons/io";
import { IoArrowBackOutline } from "react-icons/io5";
import Image from "next/image";

export const Loader = () => {
    return (
        <div>
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
            <div className="bg-[#71074F] py-5 px-8 shadow-lg text-white">
                <div className="font-semibold text-center text-4xl">
                    Login
                </div>
                <form onSubmit={handleSubmit} className="mt-8 grid grid-cols-1 gap-3">
                    <input
                        type="email"
                        className="text-black bg-white px-3 py-2 border border-gray-500 focus:outline-none w-full focus:border focus:border-[#71074F]"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <input
                        type="password"
                        className="text-black bg-white px-3 py-2 border border-gray-500 focus:outline-none w-full focus:border focus:border-[#71074F]"
                        placeholder="Password"
                        value={pass}
                        onChange={(e) => setPass(e.target.value)}
                        required
                    />

                    <button type="submit" className="bg-[#EFCF77] text-black flex justify-center items-center m-auto focus:outline-none px-5 py-2 hover:bg-black hover:text-white duration-300 hover:shadow-lg">
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
    const [items, setItems] = useState([]);
    const [profilebox, setProfilebox] = useState(false);
    const [type, setType] = useState('');
    const [activecat, setActivecat] = useState({
        name: '',
        id: ''
    });
    const [deletecat, setDeletecat] = useState('');
    const [name, setName] = useState('');
    const [data, setData] = useState([]);
    const [imgpopup, setImgpopup] = useState('');
    const [searchcat, setSearchcat] = useState('');
    const [deleteitem, setDeleteitem] = useState('');
    const [searchitem, setSearchitem] = useState('');
    const [modal, setModal] = useState(false);
    const [cc, setCc] = useState('');
    const [editc, setEditc] = useState({
        id: '',
        name: '',
    });
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
    const [editItem, setEditItem] = useState({
        id: '',
        title: '',
        oldimg: '',
        newimg: null
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
            setItems([]);
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
            if (activecat.id) {
                handleGetItems();
            }
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

    // ========= Edit Category ============
    const handleEditCategory = async (e) => {
        e.preventDefault();

        setMsg({ load: true, error: '', success: '' });

        const res = await EditCategory(editc.id, editc.name);

        if (res.success) {
            setMsg({ load: false, error: '', success: res.success });
            setEditc({ id: '', name: '' });
            setModal(false);
            handleGetCategories();
            setTimeout(() => {
                setMsg({ load: false, error: '', success: '' });
            }, 2000);
        } else {
            setMsg({ load: false, error: `${res.error || 'Internal Server Error..'}`, success: '' });
            setEditc({ id: '', name: '' });
            setModal(false);
            setTimeout(() => {
                setMsg({ load: false, error: '', success: '' });
            }, 2500);
        }
    };

    // ========= Edit Item ===========
    const handleEditProduct = async (e) => {
        e.preventDefault();

        setMsg({ load: true, error: '', success: '' });

        const formdata = new FormData();
        formdata.append('cid', activecat.id);
        formdata.append('id', editItem.id);
        formdata.append('title', editItem.title);
        formdata.append('img', editItem.newimg);

        const res = await EditProduct(formdata);

        if (res.success) {
            setMsg({ load: false, error: '', success: res.success });
            setEditItem({
                id: '',
                title: '',
                newimg: null
            });
            setModal(false);
            handleGetItems();
            handleGetCategories();
            setTimeout(() => {
                setMsg({ load: false, error: '', success: '' });
            }, 2000);
        } else {
            setMsg({ load: false, error: `${res.error || 'Internal Server Error..'}`, success: '' });
            setEditItem({
                id: '',
                title: '',
                newimg: null
            });
            setModal(false);
            setTimeout(() => {
                setMsg({ load: false, error: '', success: '' });
            }, 2500);
        }
    };

    // ======== Get Items ==========
    const handleGetItems = async () => {

        const res = await getItems(activecat.id);

        if (res.success) {
            setItems(res.success);
        }
    };

    // ======= Delete Item =========
    const handledeleteitem = async () => {

        setMsg({ load: true, error: '', success: '' });

        const res = await DeleteItem(activecat.id, deleteitem);

        if (res.success) {
            setMsg({ load: false, error: '', success: res.success });
            setDeleteitem('');
            setModal(false);
            handleGetItems();
            handleGetCategories();
            setTimeout(() => {
                setMsg({ load: false, error: '', success: '' });
            }, 2000);
        } else {
            setMsg({ load: false, error: `${res.error || 'Internal Server Error..'}`, success: '' });
            setDeleteitem('');
            setModal(false);
            setTimeout(() => {
                setMsg({ load: false, error: '', success: '' });
            }, 2500);
        }
    };

    // ======= Delete Category =========
    const handledeletecategory = async () => {

        setMsg({ load: true, error: '', success: '' });

        const res = await DeleteCategory(deletecat);

        if (res.success) {
            setMsg({ load: false, error: '', success: res.success });
            setDeletecat('');
            setModal(false);
            handleGetItems();
            handleGetCategories();
            setTimeout(() => {
                setMsg({ load: false, error: '', success: '' });
            }, 2000);
        } else {
            setMsg({ load: false, error: `${res.error || 'Internal Server Error..'}`, success: '' });
            setDeletecat('');
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

            if (decode && decode.name) {
                setName(decode.name);
                setAdmin(decode.id);
            }
        };

        handletoken();
        handleGetCategories();
    }, []);

    return (
        <div className="min-h-[100vh] px-5 lg:px-16 pt-16 md:pt-28 pb-16">

            {/* Header */}
            <div className="grid grid-cols-1 gap-5 md:flex items-center my-auto pt-8 w-full">
                <div className="md:hidden flex justify-end items-center my-auto w-full relative">
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
                <div className="flex items-center my-auto border border-black px-4 py-2 focus:outline-none">
                    <IoIosSearch className="text-gray-600 mr-2" />
                    <input
                        className="focus:outline-none"
                        type="name"
                        placeholder={`${items.length != 0 ? 'Item Name' : 'Category'}`}
                        value={items.length != 0 ? searchitem : searchcat}
                        onChange={(e) => items.length != 0 ? setSearchitem(e.target.value) : setSearchcat(e.target.value)}
                    />
                </div>
                <button onClick={() => {
                    setModal(true);
                    setType('create-category');
                }} className="w-full md:w-fit text-nowrap md:mx-3 px-4 py-2 border border-black hover:bg-black hover:text-white duration-300">
                    + New Category
                </button>
                <button onClick={() => {
                    setModal(true);
                    setType('add-item');
                }} className="w-full md:w-fit text-nowrap px-4 py-2 border border-black hover:bg-black hover:text-white duration-300">
                    + Add Item
                </button>

                <div className="hidden md:flex justify-end items-center my-auto w-full relative">
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

            {items.length != 0 ?

                // ========= Items List ============
                <div className="mt-6">
                    <div className="mb-5 flex w-full md:grid grid-cols-2">
                        <div className="font-semibold text-xl text-nowrap flex items-center my-auto">
                            Category: {activecat.name}
                        </div>
                        <div className="flex justify-end w-full">
                            <button onClick={() => setItems([])} className="flex items-center y-auto text-nowrap px-4 py-2 border border-black hover:bg-black hover:text-white duration-300">
                                <IoArrowBackOutline className="mr-2" />
                                Back
                            </button>
                        </div>
                    </div>
                    <div className="overflow-x-auto w-full">
                        <table className="w-full">
                            <thead className="w-full">
                                <tr className="w-full font-semibold text-lg text-gray-700">
                                    <th>No.</th>
                                    <th>Title</th>
                                    <th>Image</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {items
                                    .filter((i) => searchitem ? i.title.toLowerCase().includes(searchitem.toLowerCase()) : i)
                                    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                                    .map((i, index) => {
                                        return (
                                            <tr key={index} className="border-b border-gray-200">
                                                <td className="w-1/4 text-center py-4 px-2">{index + 1}.</td>
                                                <td className="w-1/4 text-center py-4 px-2">{i.title}</td>
                                                <td className="w-1/4 text-center py-4 px-2">
                                                    <button
                                                        onClick={() => {
                                                            setImgpopup(i.imglink);
                                                            setModal(true);
                                                            setType('img-popup');
                                                        }}>
                                                        <Image
                                                            src={i.imglink}
                                                            width={50}
                                                            height={50}
                                                            priority={true}
                                                            className="flex justify-center items-center m-auto"
                                                        />
                                                    </button>
                                                </td>
                                                <td className="text-nowrap flex items-center m-auto justify-center py-4 px-2">
                                                    <button
                                                        onClick={() => {
                                                            setModal(true);
                                                            setType('edit-item');
                                                            setEditItem({ id: i._id, title: i.title, oldimg: i.imglink });
                                                        }}
                                                        className="mx-3 text-nowrap px-4 py-2 border border-black hover:bg-black hover:text-white duration-300">
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            setModal(true);
                                                            setType('delete-item');
                                                            setDeleteitem(i._id);
                                                        }}
                                                        className="text-nowrap px-4 py-2 border border-black hover:bg-black hover:text-white duration-300">
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    })}
                            </tbody>
                        </table>
                    </div>
                </div>
                :
                // ========== Categories List ============
                <div className="mt-6 overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="font-semibold text-lg text-gray-700">
                                <th>No.</th>
                                <th>Category</th>
                                <th className="text-nowrap">No. of Items</th>
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
                                                <button
                                                    onClick={() => {
                                                        setItems(i.products);
                                                        setActivecat({ name: i.category, id: i._id })
                                                    }}
                                                    className="text-nowrap px-4 py-2 border border-black hover:bg-black hover:text-white duration-300">
                                                    View Items
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        setModal(true);
                                                        setType('edit-category');
                                                        setEditc({ id: i._id, name: i.category });
                                                    }}
                                                    className="mx-3 text-nowrap px-4 py-2 border border-black hover:bg-black hover:text-white duration-300">
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        setModal(true);
                                                        setType('delete-category');
                                                        setDeletecat(i._id);
                                                    }}
                                                    className="text-nowrap px-4 py-2 border border-black hover:bg-black hover:text-white duration-300">
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })}
                        </tbody>
                    </table>
                </div>
            }

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
                                                    setMsg({ load: false, success: '', error: "The file is too large (1MB max)." });
                                                    setTimeout(() => {
                                                        setMsg({ load: false, success: '', error: '' });
                                                    }, 2500);
                                                    setAdditem({ cid: '', title: '', img: null });
                                                    setType('');
                                                    setModal(false);
                                                    return;
                                                } else if (e.target.files[0].size <= 1048576) {
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
                            </div> :
                            type == 'edit-category' ?
                                <div className="">
                                    <div className="text-center font-semibold text-xl mb-3">
                                        Edit Category
                                    </div>
                                    <form onSubmit={handleEditCategory}>
                                        <input
                                            type="name"
                                            className="my-3 px-3 py-2 border border-gray-500 focus:outline-none w-full focus:border focus:border-[#71074F] mb-3"
                                            placeholder="Category Name"
                                            value={editc.name}
                                            onChange={(e) => setEditc({ ...editc, name: e.target.value })}
                                            required
                                        />
                                        <button type="submit" className="flex justify-center items-center m-auto focus:outline-none px-4 py-2 border border-black hover:bg-black hover:text-white duration-300 hover:shadow-lg">
                                            Update
                                        </button>
                                    </form>
                                </div> :
                                type == 'img-popup' ?
                                    <div className="">
                                        <Image
                                            src={imgpopup}
                                            priority={true}
                                            width={300}
                                            height={300}
                                            className="flex justify-center items-center m-auto w-full h-auto md:max-h-96 md:w-auto"
                                        />
                                    </div> :
                                    type == 'edit-item' ?
                                        <div className="">
                                            <div className="text-center font-semibold text-xl mb-3">
                                                Edit Item
                                            </div>
                                            <form onSubmit={handleEditProduct}>
                                                <input
                                                    type="name"
                                                    className="my-3 px-3 py-2 border border-gray-500 focus:outline-none w-full focus:border focus:border-[#71074F]"
                                                    placeholder="Item Title"
                                                    value={editItem.title}
                                                    onChange={(e) => setEditItem({ ...editItem, title: e.target.value })}
                                                    required
                                                />
                                                <div className="py-3 flex">
                                                    Current Image:
                                                    <Image
                                                        src={editItem.oldimg}
                                                        width={50}
                                                        height={50}
                                                        priority={true}
                                                        className="ml-2"
                                                    />
                                                </div>
                                                <div className="flex items-center my-auto pb-5">
                                                    <label htmlFor="img" className="mr-2">Choose New Image (max: 1 mb): </label>
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={(e) => {
                                                            if (e.target.files[0].size > 1048576) {
                                                                setMsg({ load: false, success: '', error: "The file is too large (1MB max)." });
                                                                setTimeout(() => {
                                                                    setMsg({ load: false, success: '', error: '' });
                                                                }, 2500);
                                                                setModal(false);
                                                                setType('');
                                                                return;
                                                            } else {
                                                                setEditItem({ ...editItem, newimg: e.target.files[0] });
                                                            }
                                                        }}
                                                    />
                                                </div>
                                                <button type="submit" className="flex justify-center items-center m-auto focus:outline-none px-4 py-2 border border-black hover:bg-black hover:text-white duration-300 hover:shadow-lg">
                                                    Update
                                                </button>
                                            </form>
                                        </div> :
                                        type == 'delete-item' ?
                                            <div className="">
                                                <div className="text-center">
                                                    Are you sure you want to delete this item?
                                                </div>
                                                <div className="mt-3 flex justify-center items-center m-auto">
                                                    <button onClick={() => handledeleteitem()} className="text-nowrap px-4 py-2 border border-black hover:bg-black hover:text-white duration-300">
                                                        Yes
                                                    </button>
                                                    <button onClick={() => setModal(false)} className="ml-2 text-nowrap px-4 py-2 border border-black hover:bg-black hover:text-white duration-300">
                                                        No
                                                    </button>
                                                </div>
                                            </div> :
                                            type == 'delete-category' ?
                                                <div>
                                                    <div className="text-center">
                                                        Are you sure you want to delete this category? Also all items will be deleted of this category.
                                                    </div>
                                                    <div className="mt-3 flex justify-center items-center m-auto">
                                                        <button onClick={() => handledeletecategory()} className="text-nowrap px-4 py-2 border border-black hover:bg-black hover:text-white duration-300">
                                                            Yes
                                                        </button>
                                                        <button onClick={() => setModal(false)} className="ml-2 text-nowrap px-4 py-2 border border-black hover:bg-black hover:text-white duration-300">
                                                            No
                                                        </button>
                                                    </div>
                                                </div> : ''}
                </Box>
            </Modal>
            <MessageShow load={msg.load} error={msg.error} success={msg.success} />
        </div >
    )
}