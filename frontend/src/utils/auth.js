export const isAuthenticated = () => {
  try {
    const token = localStorage.getItem('authToken');
    const user = JSON.parse(localStorage.getItem('user'));
    
    return !!(token && user && user.name && user.email);
  } catch (error) {
    console.error('Auth validation failed:', error);
    return false;
  }
};