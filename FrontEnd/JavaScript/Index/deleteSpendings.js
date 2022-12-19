function deleteSpending(id) {
    const url = 'http://127.0.0.1:5000/deletespending?' + new URLSearchParams({
        id: id
    })
    fetch(url, { method: 'DELETE' })
        .then(function(response) {
            return response.json()
        })
        .then(function(complete_response) {
            fetchSpendings(currentSelectedDay)
            totalSpendingMonth()
            console.log(complete_response.response)
        })
        .catch((err) => {
            console.log(err)
        })
}