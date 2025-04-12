import axios from '../api/AxiosInstance.jsx';

// Ambil profil user
export const getUserProfile = async () => {
    const res = await axios.get('/profile');
    return res.data;
};

// Login
export const loginUser = async (email, password) => {
    const res = await axios.post('/login', { email, password });
    return res.data;
};

// Tukar poin
export const redeemPoints = async (id) => {
    const res = await axios.post(`/exchange/${id}`);
    return res.data;
};
