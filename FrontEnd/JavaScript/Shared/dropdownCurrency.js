let selectedCurrency = localStorage.getItem("currency")

function showCurrencyDropdown() {
    document.getElementById("myDropdown").classList.toggle("show");
}

window.addEventListener("click", function(event) {
    if (!event.target.matches('.dropbtn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        for (var i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
})

function changeCurrency(newCurrency) {
    selectedCurrency = newCurrency
    document.getElementById("dropbtn").innerText = selectedCurrency
    localStorage.setItem("currency", selectedCurrency)
}

function getCurrentCurrency() {
    selectedCurrency = localStorage.getItem("currency");
    if (selectedCurrency == null) {
        selectedCurrency = "EUR"
        document.getElementById("dropbtn").innerText = selectedCurrency
    } else
        document.getElementById("dropbtn").innerText = selectedCurrency
}

function updateValues(){
    setTotalMonth()
    generateSpendingCards(spendings_list)
}

function goToHome(){
    location.href = '/FrontEnd/HTML/index.html';
}