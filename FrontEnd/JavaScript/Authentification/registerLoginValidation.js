var validEmailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

function registerValidate() {
    errorRegister = ''
    errorInputRegister = false

    if (document.getElementById("registerName").value === '') {
        errorRegister += "Name Empty!<br>"
        errorInputRegister = true
    }

    if (!document.getElementById("registerEmail").value.match(validEmailRegex)) {
        errorRegister += "Invalid email address!<br>";
        errorInputRegister = true
    }

    if (document.getElementById("registerPassword").value.length <= 6) {
        errorRegister += "Password is too short!"
        errorInputRegister = true
    } else if (document.getElementById("registerPassword").value != document.getElementById("cpassword").value) {
        errorRegister += "Passwords do not match!"
        errorInputRegister = true
    }

    if (errorInputRegister == false) {
        verifyEmail()
        document.getElementById("errorRegisterMessage").setAttribute("style", "display:none")
    } else
        errorMessageRegister(errorRegister)
}

function errorMessageRegister(message) {
    document.getElementById("errorRegisterMessage").setAttribute("style", "display:block")
    document.getElementById("insertRegisterError").innerHTML = message
}


function loginValidate(message) {
        document.getElementById("errorLoginMessage").setAttribute("style", "display:block")
        document.getElementById("insertLoginError").innerHTML = message
}