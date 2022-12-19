var currentEditId
function editSpending() {
    const url = 'http://127.0.0.1:5000/updatespending?' + new URLSearchParams({
        id:currentEditId,
        name: document.getElementById("nameEditSpending").value,
        category: document.getElementById("categoryEditSpending").value,
        value: document.getElementById("valueEditSpending").value,
        date: document.getElementById("dateEditPopup").value,
        currency: selectedCurrency,
    })
    fetch(url, { method: 'PUT' })
        .then(function(response) {
            return response.json()
        })
        .then(function(complete_response) {
            fetchSpendings(currentSelectedDay)
            totalSpendingMonth()
        })
        .catch((err) => {
            console.log(err)
        })
}

function setCurrentEditId(id){
    currentEditId=id
}

function inputValidateEdit() {
  error=''
  errorInput=false

  if(document.getElementById("nameEditSpending").value === '') {
      error+="Name Empty!<br>"
      errorInput=true
  }
  if(document.getElementById("nameEditSpending").value.length >=20){
      error+="Too many characters!<br>"
      errorInput=true
  }

  if(document.getElementById("valueEditSpending").value === ''){
      error+="Value Empty!"
      errorInput=true
  }

  if (parseFloat(document.getElementById("valueEditSpending").value) === 0 || Math.sign(document.getElementById("valueEditSpending").value) === -1){
      error+="Value must be greater than 0!"
      errorInput=true
  }
  if (document.getElementById("valueEditSpending").value >=999999){
      error+="Value too big!"
      errorInput=true
  }
   if (errorInput==false){
      editSpending()
      closePopupEditSpending()
      document.getElementById("errorMessageEdit").setAttribute("style","display:none")
  }
      else
      errorMessageEdit(error)
}

function errorMessageEdit(message){
  document.getElementById("errorMessageEdit").setAttribute("style","display:block")
  document.getElementById("insertErrorEdit").innerHTML =message
}
