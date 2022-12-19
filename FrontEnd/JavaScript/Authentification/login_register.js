function registerLinkBtn() {
    $("#login-box").hide();
    $("#register-box").show();
    clearRegisterInput()
    document.getElementById("errorRegisterMessage").setAttribute("style", "display:none")
}

function registerBtn() {
    $("#register-box").hide();
    $("#forgot-box").show();
    sendVerificationMail()
}

function loginLinkBtn() {
    $("#register-box").hide();
    $("#login-box").show();
    clearLoginInput()
    document.getElementById("errorLoginMessage").setAttribute("style", "display:none")
    if (document.getElementById("togglePass").checked == true) {
        document.getElementById("togglePass").checked = false
        togglePasswordLogin()
    }
}

function goToIndex() {
    location.href = '/FrontEnd/HTML/index.html';
}


function togglePasswordLogin() {
    if (document.getElementById("password").type === "password") {
        document.getElementById("password").type = "text";
    } else {
        document.getElementById("password").type = "password";
    }
}

function clearRegisterInput() {
    document.getElementById("registerName").value = ""
    document.getElementById("registerEmail").value = ""
    document.getElementById("registerPassword").value = ""
    document.getElementById("cpassword").value = ""
}

function clearLoginInput() {
    document.getElementById("email").value = ""
    document.getElementById("password").value = ""
}