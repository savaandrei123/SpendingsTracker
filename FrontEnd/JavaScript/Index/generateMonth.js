const months = { "January": 31, "February": 28, "March": 31, "April": 30, "May": 31, "June": 30, "July": 31, "August": 31, "September": 30, "October": 31, "November": 30, "December": 31 };

var currentSelectedMonth = 0

function getMonth() {
    d = new Date()
    return d.getMonth()
}

function setCurrentMonth(month) {
    currentSelectedMonth = month
}

function selectCurrentMonth(month) {
    var radios = document.getElementsByName('month');
    for (var b = 0; b < radios.length; b++) {
        if (b == month) {
            radios[b].checked = true;
        }
    }
    highlight()
    totalSpendingMonth()
    fetchSpendings(currentSelectedDay)
}

function generateMonths() {
    data = ``
    contor = 0
    for (const [key, value] of Object.entries(months)) {
        contor++
        data += `
      <div id="${key}" class="card-month">
        <label class="labelMonthContainer" for="${contor}"><span class="monthKey">${key}</span>
          <input type="radio" name="month" id="${contor}" value="${value}" onchange="setCurrentMonth(${value}),setCurrentdDay(${1}),generateDays(),totalSpendingMonth(),highlight(),fetchSpendings(${currentSelectedDay})">
        </label>
      </div> 
  `
    }
    document.getElementById('cards-month').innerHTML = data
}

function highlight() {
    var radios = document.getElementsByName('month');
    for (var b = 0; b < radios.length; b++) {
        if (radios[b].checked) {
            document.getElementById(Object.keys(months)[b]).setAttribute("style", getBackground(1, b))
        } else document.getElementById(Object.keys(months)[b]).setAttribute("style", getBackground(0, b))
    }
}

function getBackground(status, number) {
    if (number == currentSelectedMonth)
        return "background: purple;"
    if (status == 0) {
        if (number % 2 == 1)
            return "background: var(--secondary-color);"
        else
            return "background:var(--primary-color);"
    } else if (status == 1)
        return "background:purple;"
}