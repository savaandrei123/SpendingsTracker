var verificationNumber

function sendVerificationMail() {
    verificationNumber = generate_number()
    emailjs.init("q2EXIgMbzcXJoG58n");

    var template_params = {
        "customer_name": document.getElementById("registerName").value,
        "customer_email": document.getElementById("registerEmail").value,
        "generate_number": verificationNumber
    }

    var service_id = "service_s8ik0zd"
    var template_id = "template_oay3ali"
    emailjs.send(service_id, template_id, template_params)
}

function generate_number() {
    return Math.floor(1000 + Math.random() * 9000);
}

function verifyCode() {
    if (document.getElementById("insertVerificationCode").value == verificationNumber) {
        $("#login-box").show();
        $("#register-box").hide();
        registerUser()
    } else {
        document.getElementById("errorValidationEmailMessage").setAttribute("style", "display:block")
        document.getElementById("insertValidationEmailError").innerHTML = "Invalid Code"
    }

}