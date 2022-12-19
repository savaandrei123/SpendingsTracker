async function addSpending() {
    let name = document.getElementById("nameAddSpending").value
    let category = document.getElementById("categoryAddSpending").value
    let value = document.getElementById("valueAddSpending").value

    user_details = await getUserDetails()
    const url = 'http://127.0.0.1:5000/insertspending?' + new URLSearchParams({
        name: name,
        category: category,
        value: value,
        email: user_details.email,
        date: document.getElementById("datePopup").value,
        currency: selectedCurrency,
    })
    fetch(url, { method: 'POST' })
        .then(function(response) {
            return response.json()
        })
        .then(function(complete_response) {

            // console.log(complete_response)
            fetchSpendings(currentSelectedDay)
            totalSpendingMonth()
        })
        .catch((err) => {
            console.log(err)
        })
}


function inputValidate() {
    error = ''
    errorInput = false

    if (document.getElementById("nameAddSpending").value === '') {
        error += "Name Empty!<br>"
        errorInput = true
    }
    if (document.getElementById("nameAddSpending").value.length >= 20) {
        error += "Too many characters!<br>"
        errorInput = true
    }
    if (document.getElementById("valueAddSpending").value === '') {
        error += "Value Empty!"
        errorInput = true
    }
    if (parseFloat(document.getElementById("valueAddSpending").value) < 1 || Math.sign(document.getElementById("valueAddSpending").value) === -1) {
        error += "Value must be greater than 1!"
        errorInput = true
    }
    if (document.getElementById("valueAddSpending").value >= 999999) {
        error += "Value too big!"
        errorInput = true
    }
    if (errorInput == false) {
        addSpending()
        closePopupAddSpending()
        clearInput()
        document.getElementById("errorMessage").setAttribute("style", "display:none")
    } else
        errorMessage(error)
}

function errorMessage(message) {
    document.getElementById("errorMessage").setAttribute("style", "display:block")
    document.getElementById("insertError").innerHTML = message
}