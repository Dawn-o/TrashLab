import axios from '../api/AxiosInstance.jsx';

export const getUserProfile = async () => {
    const res = await axios.get('/profile');
    
    return res.data;
};

// Login
export const loginUser = async (email, password) => {
    const res = await axios.post('/login', { email, password });
    return res.data;
};

// Register
export const RegisterUser = async (name, email, password, rePassword) => {
    const res = await axios.post('/register', {name, email, password, rePassword});
    return res.data;
};

export const logoutUser = async () => {
    const res = await axios.post('/logout');
    return res.data;
};

// Tukar poin
export const redeemPoints = async (id) => {
    const res = await axios.post(`/exchange/${id}`);
    return res.data;
};
