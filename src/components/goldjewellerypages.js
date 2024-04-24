'use client'

import { useState, useEffect } from "react";
import { GetCategories } from "@/api/product";

export const Main = ({ name }) => {

    const [data, setData] = useState([]);

    const getdata = async () => {

        const res = await GetCategories();

        if (res.success) {
            
            const a = res.success;

            a.map((i) => {
                if(i.category.toLowerCase().replace(/ /g, '-') == name) {
                    setData(i);
                }
            });
        }
    };

    useEffect(() => {
        getdata();
    }, []); 

    return (
        <div>
            {name}
        </div>
    )
};