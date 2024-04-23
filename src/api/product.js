const axios = require('axios');
const baseurl = `${process.env.NEXT_PUBLIC_SERVER_URL}/products`;


// ======== Create Category =======
export const CreateCategory = async (name) => {

    try {

        const res = await axios.post(`${baseurl}/createcategory`,
            {
                category: name
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        );

        if (res.data) {
            return res.data;
        }
    } catch (err) {
        console.log(err);
        return ({ error: 'Internal Server Error.' });
    }
};

// ========== Create Product ==========
export const CreateProduct = async (fd) => {

    try {

        const res = await axios.post(`${baseurl}/createproduct`,
            fd,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            }
        );

        if (res.data) {
            return res.data;
        }
    } catch (err) {
        return ({ error: 'Internal Server Error.' });
    }
};

// ======== Get Categories =======
export const GetCategories = async () => {

    try {

        const res = await axios.get(`${baseurl}/getallcategories`,
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        );

        if (res.data) {
            return res.data;
        }
    } catch (err) {
        return ({ error: 'Internal Server Error.' });
    }
};

// =========== Edit Category =========
export const EditCategory = async (id, name) => {

    try {

        const res = await axios.post(`${baseurl}/editcategory`,
            {
                cid: id,
                name: name
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        );

        if (res.data) {
            return res.data;
        }
    } catch (err) {
        return ({ error: 'Internal Server Error.' });
    }
};

// ========== Edit Product ==========
export const EditProduct = async (fd) => {

    try {

        const res = await axios.post(`${baseurl}/editproduct`,
            fd,
            {
                headers: {
                    'Content-type': 'multipart/form-data',
                }
            }
        );

        if (res.data) {
            return res.data;
        }
    } catch (err) {
        return ({ error: 'Internal Server error.' });
    }
};

// =========== Get Items ==========
export const getItems = async (cid) => {

    try {

        const res = await axios.post(`${baseurl}/getitems`,
            {
                cid: cid
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        );

        if(res.data) {
            return res.data;
        }

    } catch (err) {
        return ({ error: 'Internal Server Error.' });
    }
};

// ========== Delete Item =========
export const DeleteItem = async (cid, id) => {

    try {

        const res = await axios.post(`${baseurl}/deleteproduct`,
            {
                cid: cid,
                id: id
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        );

        if(res.data) {
            return res.data;
        }

    } catch (err) {
        return ({ error: 'Internal Server Error.' });
    }
};

// ========== Delete Category =========
export const DeleteCategory = async (id) => {

    try {

        const res = await axios.post(`${baseurl}/deletecategory`,
            {
                cid: id
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        );

        if(res.data) {
            return res.data;
        }
    } catch (err) {
        return ({ error: err });
    }
};