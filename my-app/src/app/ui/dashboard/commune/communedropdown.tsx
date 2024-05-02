'use client';
import { fetchCommune } from "@/app/lib/data";
import Link from "next/link";
import { useRouter, useSearchParams } from 'next/navigation'
import router from "next/router";
import { useEffect, useState } from "react";
import useSWR, { Fetcher } from 'swr';


export default function CommuneDropdownItem({ onCommuneChange, selectedCommune }: { onCommuneChange: Function, selectedCommune: any }){
    const [kommuner, setKommuner] = useState([])
    const router = useRouter()
    const searchParams = useSearchParams()
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

    console.log(selectedCommune);

    return(
    <div className="flex justify-center">
    <select className="w-64	px-2 justify-center text-white text-center bg-gray-800 border border-gray-600 rounded-md focus:outline-none  focus:border-blue-300"
    onChange={handleCommuneChange}>
                {kommuner.map((item: any, index: any) => (
                <option key={index} value={item.commune_name} selected={item.display_name}>{item.display_name} </option>
            ))}
    
            
  
    </select>
    
    </div>
    )
}

