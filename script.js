let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
let chart;

// Add expense
function addExpense() {
    let amount = document.getElementById("amount").value;
    let category = document.getElementById("category").value;

    if (amount === "") return;

    expenses.push({ amount, category });

    localStorage.setItem("expenses", JSON.stringify(expenses));

    document.getElementById("amount").value = "";

    displayExpenses();
}

// Display expenses
function displayExpenses() {
    let list = document.getElementById("list");
    let total = 0;
    let categoryTotals = {};

    list.innerHTML = "";

    expenses.forEach((e) => {
        total += Number(e.amount);

        if (categoryTotals[e.category]) {
            categoryTotals[e.category] += Number(e.amount);
        } else {
            categoryTotals[e.category] = Number(e.amount);
        }
    });

    for (let category in categoryTotals) {
        let li = document.createElement("li");
        li.innerText = `${category}: ₹${categoryTotals[category]}`;
        list.appendChild(li);
    }

    document.getElementById("total").innerText = total;

    renderChart(categoryTotals);
}

// Chart
function renderChart(categoryTotals) {
    let ctx = document.getElementById('chart').getContext('2d');

    if (chart) {
        chart.destroy();
    }

    chart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: Object.keys(categoryTotals),
            datasets: [{
                data: Object.values(categoryTotals),
                backgroundColor: ['#ff6384', '#36a2eb', '#ffce56']
            }]
        }
    });
}

// Load on start
displayExpenses();
