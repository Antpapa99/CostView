'use server';
import { unstable_noStore as noStore } from 'next/cache';

export async function fetchCommune() {
    // Tar bor caching
    noStore();
    try {
  
      const response = await fetch(`https://tig335-alternativkostnader.onrender.com/commune/`);
      const communeData = await response.json();
      
  
      return communeData;
    } catch (error) {
      console.error('API Error:', error);
      throw new Error('Inhämtning av datan från datafångaren misslyckades');
    }
  }



