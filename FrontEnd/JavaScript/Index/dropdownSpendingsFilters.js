var current_category_filter = "All"
var current_order_filter = "Default"

function showCategoriesDropdown() {
    document.getElementById("myDropdownCategoryFilter").classList.toggle("showCategoryFilter");
}

function showOrderDropdown() {
    document.getElementById("myDropdownOrderFilter").classList.toggle("showOrderFilter");
}

function getTextFilter(selectedText) {
    document.getElementById("dropbtnCategoryFilter").innerText = selectedText
    current_category_filter = selectedText
    generateSpendingCards(spendings_list)
}

window.addEventListener("click", function(event) {
    if (!event.target.matches('.dropbtnCategoryFilter')) {
        var dropdowns = document.getElementsByClassName("dropdownCategoryFilter-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('showCategoryFilter')) {
                openDropdown.classList.remove('showCategoryFilter');
            }
        }
    }
})

window.addEventListener("click", function(event) {
    if (!event.target.matches('.dropbtnOrderFilter')) {
        var dropdowns = document.getElementsByClassName("dropdownOrderFilter-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('showOrderFilter')) {
                openDropdown.classList.remove('showOrderFilter');
            }
        }
    }
})

$(document).ready(function() {
    $("#myDropdownOrderFilter a").click(function() {
        filterSelected = $(this).text()
        document.getElementById("dropbtnOrderFilter").innerText = filterSelected
        current_order_filter=filterSelected
        generateSpendingCards(spendings_list)
    })
})