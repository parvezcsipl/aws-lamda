const API_BASE_URL = import.meta.env.VITE_API_URL

export const fetchCoffees = async () => {
    // alert(`API_BASE_URL: ${API_BASE_URL}`)
    const response = await fetch(`${API_BASE_URL}/getCoffee`);
    return response.json();
};

export const getCoffee = async (id) => {
    const response = await fetch(`${API_BASE_URL}/getCoffee/${id}`);
    return response.json();
};

export const createCoffee = async (coffee) => {
    const response = await fetch(`${API_BASE_URL}/createCoffee`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(coffee),
    });
    return response.json();
};

export const updateCoffee = async (id, coffee) => {
    const response = await fetch(`${API_BASE_URL}/putCoffee/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(coffee),
    });
    return response.json();
};

export const deleteCoffee = async (id) => {
    const response = await fetch(`${API_BASE_URL}/deleteCoffee/${id}`, {
        method: "DELETE",
    });
    return response.json();
};