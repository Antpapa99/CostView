'use client'
import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { fetchCommune } from '@/app/lib/data';
import { calculateNationalAverage } from '@/app/lib/utils';

/* WIP */

export default function NationalScatterPlt() {
    const [nationalAverage, setNationalAverage] = useState<any[]>([]); // State för att hålla det nationella genomsnittet

    useEffect(() => {
        const fetchNationalAverage = async () => {
            try {
                const communeData = await fetchCommune(); // Hämta datan för alla kommuner
                const nationalAvgData = await calculateNationalAverage(communeData); // Beräkna det nationella genomsnittet
                setNationalAverage(nationalAvgData); // Uppdatera state med det nationella genomsnittet
            } catch (error) {
                console.error('Error fetching national average:', error);
            }
        };
    
        fetchNationalAverage(); // Köra funktionen för att hämta det nationella genomsnittet
    }, []);

    const [data] = useState([
        [nationalAverage.map(kommun => kommun.alternativCost), nationalAverage.map(kommun => kommun.penCost)] // Använd alternativCost från det nationella genomsnittet för data
    ]);
    
    const svgRef = useRef<SVGSVGElement | null>(null);

    useEffect(() => {
        const w = 400;
        const h = 300;
        const svg = d3.select(svgRef.current)
        .attr('width', w)
        .attr('height', h)
        .style('overflow', 'visible')
        .style('margine-stop', '100px')
        /* scaling */
        const xScale = d3.scaleLinear().domain([0, 100]).range([0, w])
        const yScale = d3.scaleLinear().domain([0, 200]).range([h, 0])

        /* sätter upp axlarna */
        const xAxis = d3.axisBottom(xScale).tickArguments(data.length)
        const yAxis = d3.axisLeft(yScale).ticks(10);
        svg.append('penetrationsgrad').call(xAxis).attr('transform', `translate(0, ${h})`)
        svg.append('alternativkostnad').call(yAxis).attr('transform', `translate(0, ${h})`)

        /* sätter upp axlarna får namn */
        svg.append('text').attr('y', w/2).attr('y', h  + 50).text('y');
        svg.append('text').attr('x', h/2).attr('y', -50).text('y');

    }, [data])

    

    return (
       <div> className = "App"
        <svg ref={svgRef}></svg>
       </div>
    )
};
