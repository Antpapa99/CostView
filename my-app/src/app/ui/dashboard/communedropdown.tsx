'use client';
import { fetchCommune } from "@/app/lib/data";
import { useEffect, useState } from "react";
import useSWR, { Fetcher } from 'swr';


export default function CommuneDropdownItem(){
    const [kommuner, setKommuner] = useState([]);
    useEffect(() => {
        const getCommuneList = async () => {
            const data = fetchCommune()
            setKommuner(await data)
        }
        getCommuneList()
    })
 

    return(
    <select className="text-white bg-gray-800 border border-gray-600 rounded-md focus:outline-none focus:ring focus:border-blue-300">
                {kommuner.map((item: any, index: any) => (
                <option key={index} value={item.commune_name}>{item.display_name}</option>
            ))}
    </select>)
}

