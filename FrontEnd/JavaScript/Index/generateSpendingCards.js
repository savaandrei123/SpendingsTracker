function filterSpendings(spendings) {
    let filtered_spendings = []
    if (current_category_filter == "All")
        return spendings
    spendings.forEach(spending => {
        if (spending.category == current_category_filter)
            filtered_spendings.push(spending)
    })
    return filtered_spendings
}
function selectValue(spending){
    switch (selectedCurrency){
        case "EUR":
            return spending.value_eur
        case "USD":
            return spending.value_usd
        case "GBP":
            return spending.value_gbp
        case "RON":
            return spending.value_ron
        }
}
function generateSpendingCards(spendings) {
    let total = 0
    data = ``
    let filtered_spendings = filterSpendings(spendings)
    sortedSpendings=sortSpendings(filtered_spendings)
    sortedSpendings.forEach(spending => {
        value=selectValue(spending)
        total += value
        data += `<div class="dayCards">
        <ul>
            <li>${spending.name}</li>
            <li>${spending.date}</li>
            <li>${spending.category}</li>
        </ul>
        <div id="spendText">
            <h1>-${value} ${selectedCurrency}</h1>
        </div>
        <div class="deleteEditButton">
            <button onclick="setCurrentEditId(${spending.id}),openPopupEditSpending(),calendarEditPopup('${spending.date}'),popupEditAtributes('${spending.name}','${spending.category}',${value})"><i class="fas fa-edit fa-3x edit" ></i></button>
            <button onclick="deleteSpending(${spending.id})"><i class="fa-solid fa-trash fa-3x delete"></i></button>
        </div>
    </div>`
    });
    document.getElementById("cards").innerHTML = data
    document.getElementById("dayTotal").innerHTML = "<h1>Total " + parseFloat(total).toFixed(2) + " " + selectedCurrency
}

function sortSpendings(spendings){
    switch(current_order_filter){
        case "Default":
            spendings.sort(function(a,b) {
                return a.id - b.id
            });
            break
        case "Low To High":
            spendings.sort(function(a,b) {
                return a.value_eur - b.value_eur
            });
            break
        case "High To Low":
            spendings.sort(function(a,b) {
                return b.value_eur - a.value_eur
            });
            break
}
return spendings
}