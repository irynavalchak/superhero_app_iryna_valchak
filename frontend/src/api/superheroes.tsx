const API_URL = "http://localhost:5000/api/superheroes";

export const fetchSuperheroes = async (page = 1, limit = 5) => {
  const res = await fetch(`${API_URL}?page=${page}&limit=${limit}`);
  return res.json();
};

export const fetchSuperhero = async (id: string) => {
  const res = await fetch(`${API_URL}/${id}`);
  return res.json();
};

// export const createSuperhero = async (data: FormData) => {
//   const res = await fetch(API_URL, { method: "POST", body: data });
//   return res.json();
// };
export const createSuperhero = async (formData: FormData) => {
  const res = await fetch("http://localhost:5000/api/superheroes", {
    method: "POST",
    body: formData,
  });
  if (!res.ok) throw new Error("Failed to create superhero");
  return await res.json();
};

export const updateSuperhero = async (id: string, data: FormData) => {
  const res = await fetch(`${API_URL}/${id}`, { method: "PUT", body: data });
  if (!res.ok) throw new Error("Failed to update superhero");
  return res.json();
};

export const deleteSuperhero = async (id: string) => {
  const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  return res.json();
};
