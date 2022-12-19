async function totalSpendingAccount() {
    user_details = await getUserDetails()
    const url = 'http://127.0.0.1:5000/accountdata?' + new URLSearchParams({
        email: user_details.email,
        start: "01/01/2000",
        end: "31/12/2040",
        currency: selectedCurrency,
    })
    showLoadingAccount()
    fetch(url)
        .then(function(response) {
            return response.json()
        })
        .then(function(complete_response) {
            values = chooseDataCurency(complete_response)
            document.getElementById("all_spendings").innerText = values.total + " " + selectedCurrency
            document.getElementById("biggest_spendings").innerText = values.biggest + " " + selectedCurrency
        })
        .catch((err) => {
            console.log(err)
        })
}

function chooseDataCurency(values) {
    switch (selectedCurrency) {
        case "EUR":
            return { "total": values.total_eur, "biggest": values.big_eur }
        case "USD":
            return { "total": values.total_usd, "biggest": values.big_usd }
        case "GBP":
            return { "total": values.total_gbp, "biggest": values.big_gbp }
        case "RON":
            return { "total": values.total_ron, "biggest": values.big_ron }
    }
}