import { jwtDecode } from 'jwt-decode';

export const getEmailFromToken = (token) => {
  if (!token) return null;
  try {
    const decoded = jwtDecode(token);
    // Spring Boot usually puts the username/email in the 'sub' (subject) field
    return decoded.sub; 
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
};

// You can also add other helpful token utilities here later!
export const isTokenExpired = (token) => {
  if (!token) return true;
  try {
    const decoded = jwtDecode(token);
    return decoded.exp * 1000 < Date.now();
  } catch (error) {
    return true;
  }
};