export async function loginUser(username, data) {
  try {
    const res = await fetch(`http://localhost:3000/users/${username}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    return result;
  } catch (err) {
    console.log('error');
  }
}
