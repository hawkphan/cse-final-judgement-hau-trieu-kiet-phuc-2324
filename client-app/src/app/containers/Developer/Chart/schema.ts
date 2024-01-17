import { Props } from 'react-apexcharts';

export const series = {
  monthDataSeries1: {
    prices: [
      8107.85, 8128.0, 8122.9, 8165.5, 8340.7, 8423.7, 8423.5, 8514.3, 8481.85, 8487.7, 8506.9,
      8626.2,
    ],
    dates: ['Jan', 'Feb'],
  },
};

export const schema: Props = {
  options: {
    chart: {
      height: 100,
      type: 'line',
      id: 'areachart-2',
      toolbar: {
        show: false,
      },
      selection: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'straight',
      width: 2,
    },
    grid: {
      padding: {
        right: 30,
        left: 20,
      },
    },

    title: {
      text: 'Line Chart',
      align: 'left',
      style: {
        fontSize: '20px',
        fontFamily: 'Roboto',
      },
    },
    // labels: series.monthDataSeries1.dates,
    xaxis: {
      // type: 'datetime',
      categories: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ],
    },
    legend: {
      markers: {
        radius: 0,
      },
    },
  },
  series: [{ data: series.monthDataSeries1.prices }],
};

export const state: Props = {
  options: {
    chart: {
      width: 380,
      type: 'pie',
    },
    labels: ['Team A', 'Team B', 'Team C', 'Team D'],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: 'bottom',
          },
        },
      },
    ],
  },
  series: [10, 20, 30, 40],
};
