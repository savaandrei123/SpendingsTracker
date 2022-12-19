function reverseDayMonth(date) {
    list = date.split('/')
    return list[1] + "/" + list[0] + "/" + list[2]
}

function functionMinDate() {
    string_date = document.getElementById('date_start').value
    reversed_string = reverseDayMonth(string_date)
    start_date = new Date(reversed_string)
    end_date = new Date(start_date)
    end_date.setDate(end_date.getDate() + 30)
    calendarDateEnd()
}

function calendarDateStart() {
    $('input[id="date_start"]').daterangepicker({
        locale: {
            format: "DD/MM/YYYY",
            firstDay: 1
        },
        opens: 'center',
        showDropdowns: true,
        minYear: 2000,
        maxYear: 2040,
        singleDatePicker: true,
        autoApply: true,
    });
};

function calendarDateEnd() {
    $('input[id="date_end"]').daterangepicker({
        minDate: start_date,
        maxDate: end_date,
        locale: {
            format: "DD/MM/YYYY",
            firstDay: 1,
        },
        opens: 'center',
        showDropdowns: true,
        minYear: 2000,
        maxYear: 2040,
        singleDatePicker: true,
        autoApply: true,

    });
};