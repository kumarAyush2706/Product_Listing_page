export const decodeJWT = (token) => {
  if (token) {
    try {
      const payload = token.split(".")[1];
      const decoded = JSON.parse(atob(payload));
      return decoded;
    } catch (err) {
      console.error("Failed to decode token", err);
      return null;
    }
  }
  return null;
};

export const decodeAndValidateJWT = (token) => {
    if (!token) return { valid: false, reason: 'Token missing' };
  
    try {
      const base64Url = token.split('.')[1];
      if (!base64Url) return { valid: false, reason: 'Invalid token format' };
  
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`)
          .join('')
      );
  
      const payload = JSON.parse(jsonPayload);
  
      const currentTime = Date.now() / 1000; // in seconds
      const isExpired = payload.exp && payload.exp < currentTime;
  
      return {
        valid: !isExpired,
        expired: isExpired,
        payload,
      };
    } catch (error) {
      return { valid: false, reason: 'Token decoding failed', error };
    }
  };
  
