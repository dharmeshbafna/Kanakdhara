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
}

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

        if(res.data) {
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
}