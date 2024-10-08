export async function loginUser(username, data) {
  try {
    const res = await fetch(`http://localhost:3000/users/${username}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    return result;
  } catch (err) {
    console.log("e");
  }
}

export async function createUser(data) {
  try {
    const res = await fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    return result;
  } catch (error) {
    console.log("e");
  }
}

export async function deleteLink({ id }) {
  try {
    const res = await fetch(`http://localhost:3000/links/${id}`, {
      method: "DELETE",
    });
    const result = await res.json();

    return result;
  } catch (error) {
    console.log("error");
  }
}

export async function createLink({ data }) {
  try {
    const res = await fetch(`http://localhost:3000/links`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    return result;
  } catch (error) {
    console.log("error", error);
  }
}

export async function getLinks(userId) {
  try {
    const res = await fetch(`http://localhost:3000/links/${userId}`);

    const links = await res.json();

    return links;
  } catch (error) {
    console.log("Se produjo un error", error);
  }
}

export async function updateLink({ data, id }) {
  try {
    const res = await fetch(`http://localhost:3000/links/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    return result;
  } catch (error) {
    console.log("error");
  }
}

export async function deleteUser(userId) {
  try {
    const res = await fetch(`http://localhost:3000/users/${userId}`, {
      method: "DELETE",
    });

    const result = await res.json();

    return result;
  } catch (error) {
    console.log("error");
  }
}

export async function editUser({ data, userId }) {
  try {
    const res = await fetch(`http://localhost:3000/users/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    return result;
  } catch (error) {
    console.log("error");
  }
}

export async function createGroup({ data, user_id }) {
  try {
    const res = await fetch(`http://localhost:3000/groups/${user_id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    return result;
  } catch (error) {
    console.log("error: ", error);
  }
}

export async function getGroups(userId) {
  try {
    const res = await fetch(`http://localhost:3000/groups/${userId}`);

    const groups = await res.json();

    return groups;
  } catch (error) {
    console.log("Se produjo un error", error);
  }
}

export async function getGroupsLinks({ data }) {
  try {
    const res = await fetch(`http://localhost:3000/groups`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    return result;
  } catch (error) {
    console.log("error: ", error);
  }
}

export async function insertLinkInGroup({ data }) {
  try {
    const res = await fetch("http://localhost:3000/groups", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    return result;
  } catch (error) {
    console.log("error: ", error);
  }
}

export async function deleteLinkFromGroup(id) {
  try {
    const res = await fetch(`http://localhost:3000/groups/${id}`, {
      method: "DELETE",
    });

    const result = await res.json();

    return result;
  } catch (error) {
    console.log(error);
  }
}
