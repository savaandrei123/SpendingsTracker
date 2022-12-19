var chartColors = ["#191970", "#0000CD", "#00BFFF", "#B0E0E6", "#00FFFF", "#00CED1", "#8A2BE2", "#7FFFD4","#66CDAA",];

let pie_chart = new Chart("pieChart", {
    type: "pie",
    labels: 'Data',
    data: {
        labels: "",
        datasets: [{
            backgroundColor: chartColors,
            data: "yPie",
            label: ""
        }]
    },

});

let bar_chart = new Chart("barChart", {
    type: "bar",
    labels: 'Data',
    data: {
        labels: "",
        datasets: [{
            backgroundColor: chartColors,
            data: "yBar",
            label: ""
        }]
    },
    options: {
        legend: { display: false },
    }
});


let line_chart = new Chart("lineChart", {
    type: "line",
    labels: 'Data',
    data: {
        labels: "",
        datasets: [{
            label: "Total Spendings",
            data: "Values",
            borderColor: "black",
            pointBackgroundColor: "red",
            pointBorderColor: "red",
            fill: false,
            pointRadius: 10,
            pointHoverRadius: 15,
            borderDash: [5, 25],
        },]
    },
    spanGaps: true,
    options: {
        plugins:
        {
            tooltip: {
                carretSize:29,
                titleFont: {
                    font: { 
                        size: 30 
                    }
                }
            },
            bodyFont: {
                font: { 
                    size: 30 
                }
            }
        },
        scales: {
            xAxes: [{

                ticks: {
                    fontSize: 20,
                    display: true,
                    autoskip: true,
                    maxRotation: 45
                }
            }],
            yAxes: [{
                ticks: {
                    fontSize: 20,
                    beginAtZero: true
                }
            }]
        },
        responsive: true,
        spanGaps: true,

    }
})