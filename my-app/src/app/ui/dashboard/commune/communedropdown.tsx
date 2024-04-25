'use client';
import { fetchCommune } from "@/app/lib/data";
import { useEffect, useState } from "react";
import useSWR, { Fetcher } from 'swr';


export default function CommuneDropdownItem({ onCommuneChange }: { onCommuneChange: Function }){
    const [kommuner, setKommuner] = useState([]);
    useEffect(() => {
        const getCommuneList = async () => {
            const data = await fetchCommune()
            setKommuner(data)
        }
        getCommuneList()
    }, [])

    const handleCommuneChange = (event: any) => {
        const selectedKommun = event.target.value;
        onCommuneChange(selectedKommun);
    }
 

    return(
    <div className="flex justify-center">
    <select className="w-64	px-2 justify-center text-white text-center bg-gray-800 border border-gray-600 rounded-md focus:outline-none  focus:border-blue-300"
    onChange={handleCommuneChange}>
                {kommuner.map((item: any, index: any) => (
                <option key={index} value={item.commune_name}>{item.display_name}</option>
            ))}
            
    </select>
    </div>
    )
}

