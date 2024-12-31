export function validateForm({ name, email, password }) {
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  let errors = {};
  const loginAsAdmin = email === "admin@email.com";

  if (!name && !loginAsAdmin) errors.name = "*Name is required";

  if (!email) errors.email = "*Email is required";
  else if (!emailRegex.test(email)) errors.email = "*Not a valid email";

  if (!password) errors.password = "*Please enter password";
  else if (password.length < 6)
    errors.password = "*Password length must be greater or equal to 6";

  return errors;
}
