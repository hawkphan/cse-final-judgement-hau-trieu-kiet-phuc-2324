import { Props } from "react-apexcharts";

export const profileInfo = {
  succeeded: true,
  errors: ["string"],

  user: {
    displayName: "Le Thai Van Hoang",
    userName: "hoang.van.thai@gmail.com",
    token: "token",
    imageUrl: "",
    userProfile: {
      rank: "5166",
      views: "341",
      solutions: "32",
      discuss: "42",
      reputation: "12",
      languages: ["Java", "C#", "Python", "Javascript"],
      languagesUsage: [
        { Java: 40 },
        { "C#": 30 },
        { Python: 20 },
        { Javascript: 10 },
      ],
    },
    activityRecord: {
      easyProblemSolved: "12",
      easyProblemSubmitted: "15",

      mediumProblemSolved: "0",
      mediumProblemSubmitted: "0",

      hardProblemSolved: "0",
      hardProblemSubmitted: "0",
      badges: [],
      totalSubmissions: 15,
      submissions: [],
      totalActiveDays: "13",
      maxStreak: "3",
    },
  },
};

export const series = {
  monthDataSeries1: {
    prices: [0, 3, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    dates: ["Jan", "Feb"],
  },
};

export const schema: Props = {
  options: {
    chart: {
      height: 300,
      type: "line",
      id: "areachart-2",
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
      curve: "straight",
      width: 2,
    },
    grid: {
      padding: {
        right: 30,
        left: 20,
      },
    },

    title: {
      text: "Activity History",
      align: "left",
      style: {
        fontSize: "20px",
        fontFamily: "Roboto",
      },
    },
    // labels: series.monthDataSeries1.dates,
    xaxis: {
      // type: 'datetime',
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
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
      type: "pie",
    },
    labels: ["Java", "C#", "Python", "Javascript"],
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
  },
  series: [10, 20, 30, 40],
};
