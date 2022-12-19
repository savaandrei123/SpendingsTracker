function checkSession() {
    const url = 'http://127.0.0.1:5000/verifysession'
    fetch(url, { credentials: 'include' })
        .then(function(response) {
            return response.json()
        })
        .then(function(complete_response) {
            if (complete_response.response == 'notok')
                location.href = '/FrontEnd/HTML/login_register.html';
        })
        .catch((err) => {
            console.log(err)
        })
}

function goToSignIn() {
    document.getElementById("errorLoginMessage").setAttribute("style", "display:none")
    location.href = '/FrontEnd/HTML/login_register.html';
}
