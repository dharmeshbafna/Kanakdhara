const axios = require('axios');
const baseurl = process.env.NEXT_PUBLIC_SERVER_URL;

export const ContactForm = async (fd) => {

    const res = await axios.post(`${baseurl}/contact`,
        {
            fd: fd
        },
        {
            headers: {
                'Content-Type': 'application/json',
            }
        }
    );

    if(res.data) {
        return res.data;
    } else {
        return ({ error: 'Internal Server Error.' });
    }
};