async function getUserDetails() {
    const url = 'http://127.0.0.1:5000/userdetails'
    try {
        const response = await fetch(url, { credentials: "include" })
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}

async function setUserDataText() {
    user_details = await getUserDetails()
    document.getElementById('email-text-account').innerText = user_details.email
    document.getElementById('name-text-account').innerText = user_details.name
}