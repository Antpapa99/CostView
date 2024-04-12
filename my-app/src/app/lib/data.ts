import { unstable_noStore as noStore } from 'next/cache';
export async function fetchCommune() {
    // Add noStore() here to prevent the response from being cached.
    // This is equivalent to in fetch(..., {cache: 'no-store'}).
    noStore();
    try {
      // Artificially delay a response for demo purposes.
      // Don't do this in production :)
  
      console.log('Fetching revenue data...');
  
      const response = await fetch(`https://tig335-alternativkostnader.onrender.com/commune/`);
      const communeData = await response.json();
      console.log('Data fetch completed after 3 seconds.');
      console.log(communeData)
  
      return communeData;
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to fetch revenue data.');
    }
  }