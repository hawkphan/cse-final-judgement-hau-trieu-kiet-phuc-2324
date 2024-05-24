import { Props } from "react-apexcharts";

export const ProblemStatusDistributionChart: Props = {
  options: {
    chart: {
      type: "bar",
      height: 350,
      stacked: true,
    },
    markers: {
      size: 4,
    },
    dataLabels: {
      enabled: true,
    },
    plotOptions: {
      bar: {
        horizontal: true,
        dataLabels: {
          total: {
            enabled: true,
            offsetX: 0,
            style: {
              fontSize: "13px",
              fontWeight: 900,
            },
          },
        },
      },
    },
    stroke: {
      width: 1,
      colors: ["#fff"],
    },
    title: {
      text: "Problem Status Distribution",
      align: "center",
      style: {
        fontSize: "25px",
        fontWeight: "bold",
      },
    },
    xaxis: {
      categories: [
        "Dynamic Connectivity",
        "Line Query",
        "Files",
        "Minimum Distance",
      ],
      labels: {
        formatter: function (val) {
          return val + "K";
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          fontSize: "12px",
          fontWeight: "bold",
        },
      },
    },
  },
  series: [
    {
      name: "AC",
      data: [15, 20, 17, 5],
    },
    {
      name: "WA",
      data: [12, 23, 11, 5],
    },
    {
      name: "TLE",
      data: [12, 2, 7, 5],
    },
    {
      name: "MLE",
      data: [15, 23, 14, 31],
    },
    {
      name: "RE",
      data: [23, 50, 37, 15],
    },
    {
      name: "CE",
      data: [15, 20, 12, 15],
    },
    {
      name: "P-AC",
      data: [45, 22, 13, 56],
    },
    {
      name: "PE",
      data: [35, 23, 7, 25],
    },
    {
      name: "SE",
      data: [15, 23, 17, 52],
    },
  ],
};

export const ProblemACRateChart: Props = {
  options: {
    chart: {
      type: "bar",
      stacked: true,
    },
    markers: {
      size: 4,
    },
    dataLabels: {
      enabled: true,
    },
    plotOptions: {
      bar: {
        horizontal: true,
        dataLabels: {
          total: {
            enabled: true,
            offsetX: 0,
            style: {
              fontSize: "13px",
              fontWeight: 900,
            },
          },
        },
      },
    },
    stroke: {
      width: 1,
      colors: ["#fff"],
    },
    title: {
      text: "Problem AC Rate",
      align: "center",
      style: {
        fontSize: "25px",
        fontWeight: "bold",
      },
    },
    xaxis: {
      categories: [
        "Dynamic Connectivity",
        "Line Query",
        "Files",
        "Minimum Distance",
      ],
      labels: {
        formatter: function (val) {
          return val + "%";
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          fontSize: "12px",
          fontWeight: "bold",
        },
      },
    },
  },
  series: [
    {
      name: "AC",
      data: [15.4, 12.3, 29.7, 60.1],
    },
  ],
};

export const SubmissionByLanguages: Props = {
  options: {
    chart: {
      width: 380,
      type: "pie",
    },
    labels: ["Java", "Python", "C", "C#", "C++", "Ruby"],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
    title: {
      text: "Submissions By Language",
      align: "center",
      style: {
        fontSize: "25px",
        fontWeight: "bold",
      },
    },
  },
  series: [344, 355, 78, 28, 5, 3],
};

export const LanguageAcceptedRate: Props = {
  options: {
    chart: {
      type: "bar",
      stacked: true,
    },
    markers: {
      size: 4,
    },
    dataLabels: {
      enabled: true,
    },
    plotOptions: {
      bar: {
        horizontal: true,
        dataLabels: {
          total: {
            enabled: true,
            offsetX: 0,
            style: {
              fontSize: "13px",
              fontWeight: 900,
            },
          },
        },
      },
    },
    stroke: {
      width: 1,
      colors: ["#fff"],
    },
    title: {
      text: "Language AC Rate",
      align: "center",
      style: {
        fontSize: "25px",
        fontWeight: "bold",
      },
    },
    xaxis: {
      categories: ["Java", "Python", "C", "C#", "C++", "Ruby"],
      labels: {
        formatter: function (val) {
          return val + "%";
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          fontSize: "12px",
          fontWeight: "bold",
        },
      },
    },
  },
  series: [
    {
      name: "AC",
      data: [55.4, 52.3, 29.7, 10.1, 3, 0.1],
    },
  ],
};
