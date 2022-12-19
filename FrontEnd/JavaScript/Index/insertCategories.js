function getCategories() {
    const url = 'http://127.0.0.1:5000/readcategories?'
    fetch(url)
        .then(function(response) {
            return response.json()
        })
        .then(function(complete_response) {
            insertCategories(complete_response.categories)
        })
        .catch((err) => {
            console.log(err)
        })
}

function insertCategories(categories) {
    select = document.getElementById('categoryAddSpending');
    selectEdit = document.getElementById('categoryEditSpending');
    data = ``
    categories.forEach(element => {
        data += `<a onclick="getTextFilter('${element}')" href="#">${element}</a>`
        option = document.createElement('option');
        if(element != "All"){
            option.value = option.text = element;
            select.add(option);
        }
    });
    categories.forEach(element => {
        optionEdit = document.createElement('option');
        if(element != "All"){
            optionEdit.value = optionEdit.text = element;
            selectEdit.add(optionEdit);
        }
    });
    document.getElementById("myDropdownCategoryFilter").innerHTML = data
}