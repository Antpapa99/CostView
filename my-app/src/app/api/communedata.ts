async function getCommune(commune_name: string) {
    const res = await fetch(`https://tig335-alternativkostnader.onrender.com/commune/${commune_name}`)
    return res.json()
  }

console.log(getCommune('Ale-kommun'));