
function calendarPopup() {
  date = new Date()
  let day = currentSelectedDay;
  let month = document.querySelector('input[name="month"]:checked').id;
  let year = document.getElementById("timeframe").innerText;
  let currentDate = `${day}/${month}/${year}`;

  $('input[id="datePopup"]').daterangepicker({
      startDate: currentDate,
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
function calendarEditPopup(date) {
  $('input[id="dateEditPopup"]').daterangepicker({
      startDate: date,
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

