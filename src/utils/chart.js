/**
 * Create time watching movies vs series pie chart
 */
function createTvVsseriesTimeChart() {
  // Generates chart
  var ctx = document.getElementById('moviesVsTvTimeChart');
  var myChart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: [`${chrome.i18n.getMessage('movies')}`, `${chrome.i18n.getMessage('series')}`],
      datasets: [
        {
          data: [summary.moviesTime, summary.seriesTime],
          backgroundColor: ['rgb(178, 7, 16)', 'rgb(229, 9, 20)'],
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      tooltips: {
        callbacks: {
          label: function(tooltipItem, data) {
            return ` ${chrome.i18n.getMessage('timeWatching')} ${data.labels[tooltipItem.index].toLowerCase()}:`;
          },
          footer: function(tooltipItems, data) {
            return [`${secondsToYdhms(data.datasets[0].data[tooltipItems[0].index])}`];
          },
        },
      },
    },
  });
}

/**
 * Create mean time watching Netflix by week day bar chart
 */
function createMeanTimeByWeekDayChart() {
  var ctx = document.getElementById('meanTimeByWeekDayChart');
  var myBarChart = new Chart(ctx, {
    type: 'horizontalBar',
    data: {
      labels: [
        chrome.i18n.getMessage('Monday'),
        chrome.i18n.getMessage('Tuesday'),
        chrome.i18n.getMessage('Wednesday'),
        chrome.i18n.getMessage('Thursday'),
        chrome.i18n.getMessage('Friday'),
        chrome.i18n.getMessage('Saturday'),
        chrome.i18n.getMessage('Sunday'),
      ],
      datasets: [
        {
          label: chrome.i18n.getMessage('avgTimeWatchingNetflixPerDayOfTheWeek'),
          data: [
            summary.meanTimeByDayWeek['Monday'],
            summary.meanTimeByDayWeek['Tuesday'],
            summary.meanTimeByDayWeek['Wednesday'],
            summary.meanTimeByDayWeek['Thursday'],
            summary.meanTimeByDayWeek['Friday'],
            summary.meanTimeByDayWeek['Saturday'],
            summary.meanTimeByDayWeek['Sunday'],
          ],
          backgroundColor: '#e50914',
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      legend: {
        display: true,
      },
      tooltips: {
        callbacks: {
          label: function(tooltipItem, data) {
            return ` ${secondsToYdhms(tooltipItem.value)}`;
          },
        },
      },
      scales: {
        xAxes: [
          {
            ticks: {
              stepSize: 1800,
              callback: function(value) {
                return `${secondsToHoursMinutesSeconds(value, true)}`;
              },
            },
          },
        ],
      },
    },
  });
}
