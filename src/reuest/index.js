export async function getCountry(querry = "") {
  const req = await fetch(`https://json-api.uz/api/project/fn37/travels?${querry}`);  
  if (req.status === 200) {
    const res = await req.json();
    return res.data;
  } else {
    throw new Error("Xatolik bo'ldi");
  }
  
}
