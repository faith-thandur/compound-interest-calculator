let myChart = null;

// Calculate growth as soon as the page loads
window.onload = function() {
  calculateInterest();
};

function calculateInterest() {
  const principal = parseFloat(document.getElementById('principal').value);
  const rate = parseFloat(document.getElementById('rate').value) / 100;
  const years = parseInt(document.getElementById('years').value);

  if (isNaN(principal) || isNaN(rate) || isNaN(years)) {
    document.getElementById('result').innerHTML = "Please enter valid numbers in all fields.";
    return;
  }

  const labels = [];
  const dataPoints = [];

  for (let year = 0; year <= years; year++) {
    const currentBalance = principal * Math.pow((1 + rate), year);
    labels.push(`Yr ${year}`);
    dataPoints.push(currentBalance.toFixed(2));
  }

  const finalAmount = dataPoints[dataPoints.length - 1];
  const totalInterest = (finalAmount - principal).toFixed(2);

  document.getElementById('result').innerHTML = `
    <span>Future Value:</span> <strong>$${parseFloat(finalAmount).toLocaleString()}</strong><br>
    <span>Total Interest Earned:</span> <strong>$${parseFloat(totalInterest).toLocaleString()}</strong>
  `;

  renderChart(labels, dataPoints);
}

function renderChart(labels, dataPoints) {
  const ctx = document.getElementById('growthChart').getContext('2d');

  if (myChart) {
    myChart.destroy();
  }

  myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: 'Account Balance ($)',
        data: dataPoints,
        borderColor: '#4F6D8A',            /* Steel blue */
        backgroundColor: 'rgba(79, 109, 138, 0.2)', /* Soft steel blue fill */
        borderWidth: 2,
        fill: true,
        tension: 0.3
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          labels: { color: '#9BA3AD' }     /* Cool gray */
        }
      },
      scales: {
        x: {
          ticks: { color: '#9BA3AD' },
          grid: { color: '#24272B' }       /* Dark graphite gridlines */
        },
        y: {
          beginAtZero: true,
          ticks: {
            color: '#9BA3AD',
            callback: (value) => '$' + value.toLocaleString()
          },
          grid: { color: '#24272B' }       /* Dark graphite gridlines */
        }
      }
    }
  });
}