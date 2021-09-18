import SmartView from './smart.js';
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {formatDuration} from '../utils/common.js';
import {makeItemsUniq, countPricesByTypes, countPointsByTypes, countPointsByTime} from '../utils/stats.js';

const renderMoneyChart = (moneyCtx, points) => {
  const pointTypes = points.map((point) => point.type);
  const uniqTypes = makeItemsUniq(pointTypes);

  const pricesByTypes = uniqTypes.map((type) =>(
    {
      type,
      price: countPricesByTypes(points, type),
    }))
    .sort((a, b) => b.price - a.price);

  return new Chart(moneyCtx, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: pricesByTypes.map((obj) => obj.type.toUpperCase()),
      datasets: [{
        data: pricesByTypes.map((obj) => obj.price),
        backgroundColor: '#ffffff',
        hoverBackgroundColor: '#078ff0',
        barThickness: 44,
        minBarLength: 50,
      }],
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 14,
          },
          anchor: 'end',
          align: 'start',
          display: true,
          position: 'right',
          formatter: (value) => `€ ${value}`,
        },


      },
      title: {
        display: true,
        text: 'MONEY',
        fontSize: 20,
        position: 'left',
        fontColor: '#000000',
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: '#000000',
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        }],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  });
};


const renderTypeChart = (typeCtx, points) => {
  const pointTypes = points.map((point) => point.type);
  const uniqTypes = makeItemsUniq(pointTypes);

  const pointsByTypes = uniqTypes.map((type) =>(
    {
      type,
      amount: countPointsByTypes(points, type),
    }))
    .sort((a, b) => b.amount - a.amount);

  return new Chart(typeCtx, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: pointsByTypes.map((obj) => obj.type.toUpperCase()),
      datasets: [{
        data: pointsByTypes.map((obj) => obj.amount),
        backgroundColor: '#ffffff',
        hoverBackgroundColor: '#078ff0',
        barThickness: 44,
        minBarLength: 30,
      }],
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 14,
          },
          anchor: 'end',
          align: 'start',
          display: true,
          formatter: (value) => `${value}x`,
        },


      },
      title: {
        display: true,
        text: 'TYPE',
        fontSize: 20,
        position: 'left',
        fontColor: '#000000',
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: '#000000',
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        }],
        xAxes: [{
          ticks: {
            beginAtZero: true,
            display: false,
            drawBorder: false,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        }],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  });
};

const renderTimeChart = (timeCtx, points) => {
  const pointTypes = points.map((point) => point.type);
  const uniqTypes = makeItemsUniq(pointTypes);

  const pointsByTime = uniqTypes.map((type) =>(
    {
      type,
      time: countPointsByTime(points, type),
    }))
    .sort((a, b) => b.time - a.time);

  return new Chart(timeCtx, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: pointsByTime.map((obj) => obj.type.toUpperCase()),
      datasets: [{
        data: pointsByTime.map((obj) => obj.time),
        backgroundColor: '#ffffff',
        hoverBackgroundColor: '#078ff0',
        barThickness: 44,
        minBarLength: 30,
      }],
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 14,
          },
          anchor: 'end',
          align: 'start',
          display: true,
          formatter: (value) => `${formatDuration(value)}`,
        },


      },
      title: {
        display: true,
        text: 'TIME-SPEND',
        fontSize: 20,
        position: 'left',
        fontColor: '#000000',
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: '#000000',
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        }],
        xAxes: [{
          ticks: {
            display: false,
            drawBorder: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        }],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  });
};

const createStatsTemplate = () => (
  `<section class="statistics">
    <h2 class="visually-hidden">Trip statistics</h2>
    <div class="statistics__item">
      <canvas class="statistics__chart" id="money" width="900"></canvas>
    </div>
    <div class="statistics__item">
      <canvas class="statistics__chart" id="type" width="900"></canvas>
    </div>
    <div class="statistics__item">
      <canvas class="statistics__chart" id="time-spend" width="900"></canvas>
    </div>
  </section>
`);

export default class Stats extends SmartView {
  constructor(points) {
    super();

    this._points = points;
    this._moneyChart = null;
    this._typeChart = null;
    this._timeChart = null;

    this._setCharts();
  }

  removeElement() {
    super.removeElement();

    if (this._moneyChart !== null) {
      this._moneyChart = null;
    }

    if (this._typeChart !== null) {
      this._typeChart = null;
    }

    if (this._timeChart !== null) {
      this._timeChart = null;
    }
  }

  getTemplate() {
    return createStatsTemplate(this._points);
  }

  restoreHandler() {
    this._setCharts();
  }

  _setCharts() {
    if (this._moneyChart !== null) {
      this._moneyChart = null;
    }

    if (this._typeChart !== null) {
      this._typeChart = null;
    }

    if (this._timeChart !== null) {
      this._timeChart = null;
    }

    const moneyCtx = this.getElement().querySelector('#money');
    const typeCtx = this.getElement().querySelector('#type');
    const timeCtx = this.getElement().querySelector('#time-spend');
    this._moneyChart = renderMoneyChart(moneyCtx, this._points);
    this._typeChart = renderTypeChart(typeCtx, this._points);
    this._timeChart = renderTimeChart(timeCtx, this._points);
  }
}
