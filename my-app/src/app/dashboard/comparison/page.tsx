'use client';
import ChartBox from '@/app/ui/dashboard/commune/communeoverlay';
import { useState, useEffect, Suspense } from 'react';
import CommuneDropdownItem from '@/app/ui/dashboard/commune/communedropdown';
import "@/app/globals.css";
import PenGradeTopChart from '@/app/ui/dashboard/charts/comparison/pengradetopchart';
import ComparisonOverlay from '@/app/ui/dashboard/comparison/comparisonoverlay';
import { getCommuneAvg } from '@/app/lib/utils';
import { ComparisonCommuneData } from '@/app/ui/dashboard/comparison/comparisonbuttons';

interface PageProps {
  children: React.ReactNode;
}

export default function Page({ children }: PageProps) {
    const [alternativCost, setAlternativCost] = useState<any[]>([]);
    

    useEffect(() => {
        const fetchCommuneAlternativCost = async () => {
            try {
                const communePlot = await getCommuneAvg()
                setAlternativCost(communePlot);
            } catch (error) {
                console.error('Error fetching national average:', error);
            }
        }

        fetchCommuneAlternativCost();
    }, []); // Empty dependency array to run the effect only once when the component mounts

    
    return (
        <Suspense fallback={<p>Loading dashboard...</p>}>
        <div className="flex h-screen flex-col md:flex-col md:overflow-hidden">
            <div className="h-full flex flex-col pt-4 pb-4 md:pt-8 md:pb-8"> {/* Size of boxes */}
            <ComparisonOverlay alternativCost={alternativCost}/>
            </div>
            <div className="grow p-1 md:overflow-hidden md:p-1">{children}</div>
        </div>
        </Suspense>
    );
};