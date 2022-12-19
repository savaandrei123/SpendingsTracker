selectedChart = 'pie'

function updateSelectedChart(newChart) {
    selectedChart = newChart
    if (newChart == 'pie')
        getPieBarChartData('pie')
    if (newChart == 'bar')
        getPieBarChartData('bar')
    if (newChart == 'line')
        getLineChartData()
    if (newChart == '-')
        console.log("No chart selected")
}

function updateLineChart(new_data) {
    let dates = []
    let values = []
    for (i = 0; i < new_data.length; i++) {
        dates.push(new_data[i][0])
        values.push(new_data[i][1])
    }
    line_chart.data.datasets[0].data = values
    line_chart.data.labels = dates
    line_chart.update()
}

function updatePieChart(new_data) {
    let categories = []
    let values = []
    for (i = 0; i < new_data.length; i++) {
        values.push(new_data[i][0])
        categories.push(new_data[i][1])
    }
    pie_chart.data.datasets[0].data = values
    pie_chart.data.labels = categories
    pie_chart.update()
}

function updateBarChart(new_data) {
    let categories = []
    let values = []
    for (i = 0; i < new_data.length; i++) {
        values.push(new_data[i][0])
        categories.push(new_data[i][1])
    }
    bar_chart.data.datasets[0].data = values
    bar_chart.data.labels = categories
    bar_chart.update()
}