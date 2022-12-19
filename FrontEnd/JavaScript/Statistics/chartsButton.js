var pieChart = document.getElementById("pieChart");
var barChart = document.getElementById("barChart");
var lineChart = document.getElementById("lineChart");

function displayPieChart() {
    pieChart.style.display = "block";
    barChart.style.display = "none";
    lineChart.style.display = "none";
}

function displayBarChart() {
    pieChart.style.display = "none";
    barChart.style.display = "block";
    lineChart.style.display = "none";
}

function displayLineChart() {
    pieChart.style.display = "none";
    barChart.style.display = "none";
    lineChart.style.display = "block";
}