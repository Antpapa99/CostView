'use server';
import { unstable_noStore as noStore } from 'next/cache';
import { revalidateTag } from 'next/cache'
import { unstable_serialize } from 'swr';

export async function fetchCommune() {
    try {
  
      const response = await fetch(`https://tig335-alternativkostnader.onrender.com/commune/`, { next: { revalidate: 3600 } });
      const communeData = await response.json();

      
      
  
      return communeData;
    } catch (error) {
      console.error('API Error:', error);
      throw new Error('Inhämtning av datan från datafångaren misslyckades');
    }
  }

  

  export async function fetchSpecificCommune(communeName: string) {Promise<string>
    try {
  
      const response = await fetch(`https://tig335-alternativkostnader.onrender.com/commune/${communeName}`, { next: { revalidate: 3600 } });
      const communeData = await response.json();
      
  
      return communeData;
    } catch (error) {
      console.error('API Error:', error);
      throw new Error('Inhämtning av datan från datafångaren misslyckades');
    }
  }

  export async function getServerSideOmslutningData(){
    const staticData = await import('../../../data/omslutning2022.json').then((res) => res.default);
    return staticData }
  
  export async function getServerSideKommunpopgruppData(){
    const staticData = await import('../../../data/kommunpopgrupp.json').then((res) => res.default);
    return staticData }