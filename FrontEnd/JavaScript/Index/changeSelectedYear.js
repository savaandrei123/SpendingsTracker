function setCurrentYear() {
    var currentTime = new Date()
    var year = currentTime.getFullYear()
    document.getElementById("timeframe").innerText = year
}

function increaseYearNr() {
    currentNr = document.getElementById("timeframe").innerText
    if (currentNr < 2040) {
        currentNr = parseInt(currentNr) + 1
        document.getElementById("timeframe").innerText = currentNr
        if (document.querySelector('input[name="month"]:checked') != null) {
            generateDays()
            totalSpendingMonth()
            fetchSpendings(currentSelectedDay)
        }
    }
}

function decreaseYearNr() {
    currentNr = document.getElementById("timeframe").innerText
    if (currentNr > 2000) {
        currentNr = parseInt(currentNr) - 1
        document.getElementById("timeframe").innerText = currentNr
        if (document.querySelector('input[name="month"]:checked') != null) {
            generateDays()
            totalSpendingMonth()
            fetchSpendings(currentSelectedDay)
        }
    }
}