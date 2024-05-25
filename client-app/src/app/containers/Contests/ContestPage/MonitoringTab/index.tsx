import { Grid } from "@mui/material";
import Chart, { Props } from "react-apexcharts";
import { useGetContestStatisticById } from "../../../../queries/Contests/useGetContestStatisticById";
import { useParams } from "react-router-dom";
import { API_QUERIES, Contest } from "../../../../queries";
import { useEffect, useState } from "react";
import { ApexEmptyProp } from "../helpers";
import { getLanguageNameById } from "../../../Problems/ProblemDetails/SubmissionTab/helpers";

interface MonitoringProps {
  contest: Contest;
}
export default function MonitoringTab(props: Readonly<MonitoringProps>) {
  const { contest } = props;

  const { id } = useParams();
  const [submissionStatistic, setSubmissionStatistic] =
    useState<Props>(ApexEmptyProp);
  const [submissionACRate, setSubmissionACRate] =
    useState<Props>(ApexEmptyProp);
  const [submissionLanguageStatistic, setSubmissionLanguageStatistic] =
    useState<Props>(ApexEmptyProp);
  const [languageACRateStatistic, setLanguageACRateStatistic] =
    useState<Props>(ApexEmptyProp);

  const {
    contestStatistic,
    isFetching,
    onGetContestStatistic,
    handleInvalidateContestStatistic,
  } = useGetContestStatisticById({
    id,
    queryKey: [API_QUERIES.GET_CONTEST_STATISTIC_BY_ID, { id: id }],
  });

  function onSetSubmissionStatistic() {
    const problems = contestStatistic?.problemSubmissionsStatistic;
    function onGetSubmissionStatistic() {
      type Serie = {
        name: string;
        data: number[];
      };

      let extractedData: Serie[] = [];

      function createSerie(statusKey: string) {
        let name = "";
        switch (statusKey) {
          case "accepted":
            name = "AC";
            break;
          case "wrongAnswer":
            name = "WA";
            break;
          case "timeLimitExceeded":
            name = "TLE";
            break;
          case "compileError":
            name = "CE";
            break;
          case "internalError":
            name = "IE";
            break;
          case "execFormatError":
            name = "EFE";
            break;
          case "runtimeErrorSIGSEGV":
            name = "RE-SIGSEGV";
            break;
          case "runtimeErrorSIGXFSZ":
            name = "RE-SIGXFSZ";
            break;
          case "runtimeErrorSIGFPE":
            name = "RE-SIGFPE";
            break;
          case "runtimeErrorSIGABRT":
            name = "RE-SIGABRT";
            break;
          case "runtimeErrorNZEC":
            name = "RE-NZEC";
            break;
          case "runtimeErrorOther":
            name = "RE-Other";
            break;
        }
        return {
          name: name,
          data:
            problems &&
            problems.map((item) =>
              item.submissionStatus ? item.submissionStatus[statusKey] : 0
            ),
        };
      }
      extractedData = [
        createSerie("accepted"),
        createSerie("wrongAnswer"),
        createSerie("timeLimitExceeded"),
        createSerie("compileError"),
        createSerie("internalError"),
        createSerie("execFormatError"),
        createSerie("runtimeErrorSIGSEGV"),
        createSerie("runtimeErrorSIGXFSZ"),
        createSerie("runtimeErrorSIGFPE"),
        createSerie("runtimeErrorSIGABRT"),
        createSerie("runtimeErrorNZEC"),
        createSerie("runtimeErrorOther"),
      ];

      return extractedData;
    }
    const chart = {
      stacked: true,
    };
    const markers = {
      size: 4,
    };
    const dataLabels = {
      enabled: true,
    };
    const plotOptions = {
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
    };
    const stroke = {
      width: 1,
      colors: ["#fff"],
    };
    const title = {
      text: "Problem Status Distribution",
      align: "center",
      style: {
        fontSize: "25px",
        fontWeight: "bold",
      },
    };
    const xaxis = {
      categories: contest?.problems?.map((problem) => problem?.problem?.title),
      labels: {
        formatter: function (val) {
          return val.toFixed(2);
        },
      },
    };
    const yaxis = {
      labels: {
        style: {
          fontSize: "12px",
          fontWeight: "bold",
        },
      },
    };
    const series = onGetSubmissionStatistic();
    setSubmissionStatistic((prevState) => ({
      ...prevState,
      options: {
        ...prevState.options,
        chart,
        dataLabels,
        plotOptions,
        title,
        stroke,
        markers,
        xaxis,
        yaxis,
      },
      series,
    }));
  }

  function onSetSubmissionACRate() {
    const problems = contestStatistic?.problemSubmissionsStatistic;
    function onGetAcceptedRate() {
      type PropblemType = {
        problemId: string;
        totalSubmissions: number;
        acSubmission: number;
      };
      let series = [];
      let list: PropblemType[] = [];
      contest?.problems?.map((p) => {
        if (list.find((item) => item.problemId == p.problemId) == null) {
          list = [
            ...list,
            {
              problemId: p.problemId,
              totalSubmissions: 0,
              acSubmission: 0,
            },
          ];
        }
      });
      problems?.map((p) => {
        list.map((problem) => {
          if (problem.problemId == p.problemId) {
            problem.totalSubmissions = p?.totalSubmissions;
            problem.acSubmission = p?.submissionStatus
              ? p.submissionStatus.accepted
              : 0;
          }
        });
      });

      list.map((p) => {
        let acRate = 0;
        if (p.totalSubmissions > 0) {
          acRate = (p.acSubmission / p.totalSubmissions) * 100;
        }
        series = [...series, acRate];
      });

      return series;
    }
    const chart = {
      stacked: true,
    };
    const markers = {
      size: 4,
    };
    const dataLabels = {
      enabled: true,
    };
    const plotOptions = {
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
    };
    const stroke = {
      width: 1,
    };
    const title = {
      text: "Problem AC Rate",
      align: "center",
      style: {
        fontSize: "25px",
        fontWeight: "bold",
      },
    };
    const xaxis = {
      categories: contest?.problems?.map((problem) => problem?.problem?.title),
      labels: {
        formatter: function (val) {
          return val + "%";
        },
      },
      min: 0,
      max: 100,
    };
    const yaxis = {
      labels: {
        style: {
          fontSize: "12px",
          fontWeight: "bold",
        },
      },
    };
    const series = [
      {
        name: "Accepted Rate",
        data: onGetAcceptedRate(),
      },
    ];
    setSubmissionACRate((prevState) => ({
      ...prevState,
      options: {
        ...prevState.options,
        chart,
        dataLabels,
        plotOptions,
        title,
        stroke,
        markers,
        xaxis,
        yaxis,
      },
      series,
    }));
  }

  function onSetSubmissionLanguageStatistic() {
    const langs = contestStatistic?.languagesUsageStatistic;
    function onGetLabelsSeries() {
      type Lang = {
        languageId: number;
        languageName: string;
        totalSubmissions: number;
      };
      let labels = [];
      let series = [];
      let languages: Lang[] = [];

      contest?.problems?.map((p) => {
        p?.problem?.problemLanguages?.map((l) => {
          if (
            languages.find((item) => item.languageId == l.languageId) == null
          ) {
            languages = [
              ...languages,
              {
                languageId: l.languageId,
                languageName: getLanguageNameById(l.languageId),
                totalSubmissions: 0,
              },
            ];
          }
        });
      });

      langs?.map((language) => {
        languages.map((l) => {
          if (l.languageId == language.languageId) {
            l.totalSubmissions = language.totalSubmissions;
          }
        });
      });

      languages.map((l) => {
        labels = [...labels, l.languageName];
        series = [...series, l.totalSubmissions];
      });
      return { labels, series };
    }

    const chart = {
      width: 380,
    };
    const dataLabels = {
      enabled: true,
    };
    const { labels, series } = onGetLabelsSeries();

    const responsive = [
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
    ];
    const title = {
      text: "Submissions By Language",
      align: "center",
      style: {
        fontSize: "25px",
        fontWeight: "bold",
      },
    };

    setSubmissionLanguageStatistic((prevState) => ({
      ...prevState,
      options: {
        ...prevState.options,
        chart,
        dataLabels,
        title,
        responsive,
        labels,
      },
      series,
    }));
  }

  function onSetLanguageACRate() {
    const langs = contestStatistic?.languagesUsageStatistic;
    function onGetCatergogiesSeries() {
      type Lang = {
        languageId: number;
        languageName: string;
        totalSubmissions: number;
        acSubmission: number;
      };
      let categories = [];
      let data = [];
      let languages: Lang[] = [];

      contest?.problems?.map((p) => {
        p?.problem?.problemLanguages?.map((l) => {
          if (
            languages.find((item) => item.languageId == l.languageId) == null
          ) {
            languages = [
              ...languages,
              {
                languageId: l.languageId,
                languageName: getLanguageNameById(l.languageId),
                totalSubmissions: 0,
                acSubmission: 0,
              },
            ];
          }
        });
      });

      langs?.map((language) => {
        languages.map((l) => {
          if (l.languageId == language.languageId) {
            l.totalSubmissions += language.totalSubmissions;
            l.acSubmission += language?.submissionStatus
              ? language.submissionStatus.accepted
              : 0;
          }
        });
      });

      languages.map((l) => {
        let acRate = 0;
        if (l.totalSubmissions > 0) {
          acRate = (l.acSubmission / l.totalSubmissions) * 100;
        }
        categories = [...categories, l.languageName];
        data = [...data, acRate];
      });

      return { categories, data };
    }

    const { categories, data } = onGetCatergogiesSeries();
    const chart = {
      stacked: true,
    };
    const markers = {
      size: 4,
    };
    const dataLabels = {
      enabled: true,
    };
    const plotOptions = {
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
    };
    const stroke = {
      width: 1,
    };
    const title = {
      text: "Language AC Rate",
      align: "center",
      style: {
        fontSize: "25px",
        fontWeight: "bold",
      },
    };
    const xaxis = {
      categories: categories,
      labels: {
        formatter: function (val) {
          return val + "%";
        },
      },
      min: 0,
      max: 100,
    };
    const yaxis = {
      labels: {
        style: {
          fontSize: "12px",
          fontWeight: "bold",
        },
      },
    };

    const series = [
      {
        name: "Accepted Rate",
        data: data,
      },
    ];
    setLanguageACRateStatistic((prevState) => ({
      ...prevState,
      options: {
        ...prevState.options,
        chart,
        dataLabels,
        plotOptions,
        title,
        stroke,
        markers,
        xaxis,
        yaxis,
      },
      series,
    }));
  }

  useEffect(() => {
    onSetSubmissionStatistic();
    onSetSubmissionACRate();
    onSetSubmissionLanguageStatistic();
    onSetLanguageACRate();
  }, [contestStatistic]);

  useEffect(() => {
    const timerId = setTimeout(() => {
      handleInvalidateContestStatistic();
      onGetContestStatistic();
    }, 1000);

    return () => {
      clearTimeout(timerId);
    };
  }, [
    contestStatistic,
    handleInvalidateContestStatistic,
    isFetching,
    onGetContestStatistic,
  ]);

  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      spacing={10}
      paddingTop={5}
    >
      {/* Problem status Distribution */}
      <Grid item xs={12}>
        <Chart
          series={submissionStatistic.series}
          options={submissionStatistic.options}
          type="bar"
          height={400}
          width="100%"
        />
      </Grid>
      {/* Problem AC Rate */}
      <Grid item xs={12}>
        <Chart
          series={submissionACRate.series}
          options={submissionACRate.options}
          type="bar"
          height={400}
          width="100%"
        />
      </Grid>
      {/* Submission By Language */}
      <Grid item xs={12}>
        <Chart
          series={submissionLanguageStatistic.series}
          options={submissionLanguageStatistic.options}
          type="pie"
          height={400}
          width="50%"
        />
      </Grid>
      {/* Language AC Rate */}
      <Grid item xs={12}>
        <Chart
          series={languageACRateStatistic.series}
          options={languageACRateStatistic.options}
          type="bar"
          height={400}
          width="100%"
        />
      </Grid>
    </Grid>
  );
}
