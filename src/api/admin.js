const axios = require('axios');
const baseurl = process.env.NEXT_PUBLIC_SERVER_URL;

// ======== LOGIN =========
export const Login = async (email, pass) => {

    try {

        const res = await axios.post(`${baseurl}/admin/login`,
            {
                email: email,
                pass: pass
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
        console.log(err);
        return ({ error: 'Internal Server Error.' });
    }
};
