const api = "http://localhost:3000";

export const loginAPI = async (email, password) => {
  try {
    const response = await fetch(`${api}/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    return await response.json();
  } catch (error) {
    console.error(error.message);
  }
};

export const signupAPI = async (username, email, password) => {
  try {
    const response = await fetch(`${api}/signup`, {
      method: "POST",
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
