'use server';
import { unstable_noStore as noStore } from 'next/cache';
import { revalidateTag } from 'next/cache'
import { unstable_serialize } from 'swr';

export async function fetchCommune() {
    try {
  
      const response = await fetch(`https://tig335-alternativkostnader.onrender.com/commune/`, { next: { revalidate: 10 } });
      const communeData = await response.json();

      
      
  
      return communeData;
    } catch (error) {
      console.error('API Error:', error);
      throw new Error('Inhämtning av datan från datafångaren misslyckades');
    }
  }

  

  export async function fetchSpecificCommune(communeName: string) {Promise<string>
    try {
  
      const response = await fetch(`https://tig335-alternativkostnader.onrender.com/commune/${communeName}`, { next: { revalidate: 10 } });
      const communeData = await response.json();
      
  
      return communeData;
    } catch (error) {
      console.error('API Error:', error);
      throw new Error('Inhämtning av datan från datafångaren misslyckades');
    }
  }
