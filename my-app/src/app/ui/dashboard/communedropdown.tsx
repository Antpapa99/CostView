import { useState } from "react";

export default function CommuneDropdownItem(){

    let kommuner = [
        {label: "test", value: "display test"},
    ];

    let [kommun, setkommun] = useState('Välj en kommun')

    let handleKommunChange = (e: any) => {
        setkommun(e.target.value)
    }

    return(
    <select className="text-white bg-gray-800 border border-gray-600 rounded-md focus:outline-none focus:ring focus:border-blue-300"
    onChange ={handleKommunChange}>
    <option value ='Välj en kommun' ></option>
    {kommuner.map((kommun: any) => (
        <option value = {kommun.value} > {kommun.label} </option>
    ))}
    </select>)
}

