const api = "http://localhost/php-backend";

export const loginAPI = async (email, password, isAdmin) => {
  const endpoint = isAdmin
    ? `${api}/auth/admin_signin.php`
    : `${api}/auth/signin.php`;
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      credentials: "include", // ✅ Include this!
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    return await response.json();
  } catch (error) {
    console.error(error.message);
  }
};

export const logoutAPI = async () => {
  try {
    const response = await fetch(`${api}/auth/logout.php`, {
      method: "POST",
      credentials: "include", // Include credentials for session management
    });
    return await response.json();
  } catch (error) {
    console.error(error.message);
  }
};

export const signupAPI = async (username, email, password) => {
  try {
    const response = await fetch(`${api}/auth/signup.php`, {
      method: "POST",
      credentials: "include", // ✅ Include this!
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    });
    return await response.json();
  } catch (error) {
    console.error(error.message);
  }
};

export const checkSession = async () => {
  try {
    const response = await fetch(`${api}/auth/status.php`, {
      method: "GET",
      credentials: "include", // ✅ This includes cookies like PHPSESSID
    }); // API endpoint to check session status
    return await response.json();
  } catch (error) {
    console.error("Error checking session:", error);
  }
};
