const API_URL = "http://localhost:4000";
const getToken = () => localStorage.getItem("token");

export async function getRegister(newUser) {
  try {
    const res = await fetch(API_URL + "/register", {
      method: "POST",
      body: JSON.stringify(newUser),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error.message);
  }
}

export async function getLogin(user) {
  try {
    const res = await fetch(API_URL + "/login", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await res.json();
    return result;
  } catch (error) {
    console.error(error.message);
  }
}

export async function getCourses() {
  try {
    const res = await fetch(`${API_URL}/courses/all`);
    const result = await res.json();
    if (!result.successful) throw new Error("Invalid Request");
    return result?.result;
  } catch (error) {
    console.error(error.message);
  }
}

export async function getAuthors() {
  try {
    const res = await fetch(`${API_URL}/authors/all`);
    const result = await res.json();
    if (!result.successful) throw new Error("Invalid Request");
    return result?.result;
  } catch (error) {
    console.error(error.message);
  }
}

export async function getLogout() {
  const token = getToken();
  try {
    const res = await fetch(`${API_URL}/logout`, {
      method: "DELETE",
      headers: {
        "Authorization": token,
      },
    });
    return res?.ok;
  } catch (error) {
    console.error(error.message);
  }
}

export async function getUser() {
  const token = getToken();
  try {
    const res = await fetch(API_URL + "/users/me", {
      method: "GET",
      headers: {
        "Authorization": token,
      },
    });
    if (!res.ok) throw new Error("failed to fetch the user");
    const user = await res.json();
    return user;
  } catch (error) {
    console.log(error.message);
  }
}

export async function getDeleteCourse(courseId) {
  const token = getToken();
  try {
    const res = await fetch(API_URL + `/courses/${courseId}`, {
      method: "DELETE",
      headers: {
        "Authorization": token,
      },
    });
    const result = await res.json();
    return result;
  } catch (error) {
    console.log(error);
  }
}

export async function getAddAuthor(authorName) {
  const token = getToken();
  try {
    const res = await fetch(API_URL + "/authors/add", {
      method: "POST",
      body: JSON.stringify({ name: authorName }),
      headers: {
        "Authorization": token,
        "Content-Type": "application/json",
      },
    });
    const result = await res.json();
    if (result.successful) return result.result;
  } catch (error) {
    console.log(error);
  }
}

export async function getRemoveAuthor(authorId) {
  const token = getToken();

  try {
    const res = await fetch(API_URL + `/authors/${authorId}`, {
      method: "DELETE",
      headers: {
        "Authorization": token,
      },
    });

    const result = await res.json();
    if (result.successful) return result;
  } catch (error) {
    console.log(error);
  }
}

export async function getUpdateCourse(courseData) {
  const token = getToken();
  const course = {
    title: courseData.title,
    duration: Number(courseData.duration),
    description: courseData.description,
    authors: JSON.parse(courseData.authors),
  };

  try {
    const res = await fetch(API_URL + `/courses/${courseData.id}`, {
      method: "PUT",
      body: JSON.stringify(course),
      headers: {
        "Authorization": token,
        "Content-Type": "application/json",
      },
    });
    const result = await res.json();
    if (result.successful) return result;
  } catch (error) {
    console.log(error.message);
  }
}

export async function getNewCourse(courseData) {
  const token = getToken();
  const course = {
    title: courseData.title,
    duration: Number(courseData.duration),
    description: courseData.description,
    authors: JSON.parse(courseData.authors),
  };

  try {
    const res = await fetch(API_URL + `/courses/add`, {
      method: "POST",
      body: JSON.stringify(course),
      headers: {
        "Authorization": token,
        "Content-Type": "application/json",
      },
    });
    const result = await res.json();
    console.log(result);
    if (result.successful) return result;
  } catch (error) {
    console.log(error.message);
  }
}
