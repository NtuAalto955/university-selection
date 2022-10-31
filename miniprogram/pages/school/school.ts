// logs.ts
import * as echarts from "../../ec-canvas/echarts";

let school: object;

let chart = null;

const gpaLabel = [
  "0-2.6",
  "2.6-2.8",
  "2.8-3.0",
  "3.0-3.2",
  "3.2-3.4",
  "3.4-3.6",
  "3.6-3.8",
  "3.8-4.0",
];

const percentageLabel = [
  "0-76",
  "76-78",
  "78-80",
  "80-82",
  "80-82",
  "82-84",
  "84-86",
  "86-88",
  "88-90",
  "90-100",
];

const schoolLabel = ["985/211", "双非", "二本", "海本", "其他"];

const labels = {
  gpa: {
    titleLabel: "GPA",
    yLabel: gpaLabel,
    dataLabel: "gpa_range",
    avgIndex: 0,
    yourIndex: 0,
  },
  percentage: {
    titleLabel: "百分制成绩",
    yLabel: percentageLabel,
    dataLabel: "percentage_range",
    avgIndex: 0,
    yourIndex: 0,
  },
  school: {
    titleLabel: "本科学校档次",
    yLabel: schoolLabel,
    dataLabel: "school_range",
    avgIndex: "",
    yourIndex: "",
  },
};

function getOptions(key: string) {
  const label = labels[key];
  const options = {
    title: {
      text: "各" + label.titleLabel + "录取情况",
      textStyle: {
        fontSize: 15,
      },
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        // 坐标轴指示器，坐标轴触发有效
        type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
      },
      confine: true,
      valueFormatter: function (value: number) {
        return Math.abs(value);
      },
    },
    legend: {
      data: ["录取", "被拒"],
      right: "20%",
    },
    grid: {
      left: 20,
      right: 20,
      bottom: 15,
      top: 40,
      containLabel: true,
    },
    xAxis: [
      {
        type: "value",
        axisLine: {
          lineStyle: {
            color: "#999",
            type: "dashed",
          },
        },
        axisLabel: {
          color: "#666",
          formatter: function (value: number) {
            return Math.abs(value);
          },
        },
        min: function (value: any) {
          return value.min - 1;
        },
        max: function (value: any) {
          return value.max + 1;
        },
      },
    ],
    yAxis: [
      {
        type: "category",
        scale: true,
        axisTick: { show: true },
        data: label.yLabel,
        axisLine: {
          lineStyle: {
            color: "#999",
          },
        },
        axisLabel: {
          show: true,
          color: "#666",
          interval: 0,
          padding: [0, 3],
        },
      },
    ],
    series: [
      {
        name: "被拒",
        type: "bar",
        stack: "总量",
        label: {
          show: false,
          position: "inside",
          formatter: function (value: any) {
            return Math.abs(value.data);
          },
        },
        data: school[label.dataLabel].map(
          (item: object) => -item["rejected_num"]
        ),
        itemStyle: {
          borderRadius: [5, 0, 0, 5],
        },
        markLine: {
          symbol: "none",
          data: [
            {
              yAxis: label.avgIndex,
              lineStyle: {
                color: "green",
              },
              label: {
                normal: {
                  show: true,
                  position: "insideStartTop",
                  lineHeight: 4,
                  formatter: "平均值",
                  color: "green",
                },
              },
            },
            {
              yAxis: label.yourIndex,
              label: {
                normal: {
                  show: true,
                  position: "insideEndTop",
                  lineHeight: 4,
                  formatter: "你的",
                  color: "darkblue",
                  padding: [8, 0, 0, 0],
                },
              },
            },
          ],
        },
      },
      {
        name: "录取",
        type: "bar",
        stack: "总量",
        label: {
          normal: {
            show: false,
            position: "insideLeft",
          },
        },
        data: school[label.dataLabel].map(
          (item: object) => item["accepted_num"]
        ),
        itemStyle: {
          borderRadius: [0, 5, 5, 0],
        },
      },
    ],
  };
  return options;
}

Page({
  data: {
    gpaEC: {
      onInit: function (canvas: any, width: any, height: any, dpr: any) {
        chart = echarts.init(canvas, null, {
          width: width,
          height: height,
          devicePixelRatio: dpr, // new
        });
        canvas.setChart(chart);
        chart.setOption(getOptions("gpa"));
        return chart;
      },
    },
    percentageEC: {
      onInit: function (canvas: any, width: any, height: any, dpr: any) {
        chart = echarts.init(canvas, null, {
          width: width,
          height: height,
          devicePixelRatio: dpr, // new
        });
        canvas.setChart(chart);
        chart.setOption(getOptions("percentage"));
        return chart;
      },
    },
    schoolEC: {
      onInit: function (canvas: any, width: any, height: any, dpr: any) {
        chart = echarts.init(canvas, null, {
          width: width,
          height: height,
          devicePixelRatio: dpr, // new
        });
        canvas.setChart(chart);
        chart.setOption(getOptions("school"));
        return chart;
      },
    },
    school: {},
    schoolName: '',
    yearOptions: [] as Array<object>,
    selectedYear: "全部",
  },
  calcIndex: function (type: string, value: number) {
    switch (type) {
      case "gpa":
        const gpaLowest = value - 2.6 <= 0;
        return gpaLowest ? 0 : Math.ceil((value - 2.6) / 0.2);
      case "percentage":
        const percentageLowest = value - 76 <= 0;
        return percentageLowest ? 0 : Math.ceil((value - 76) / 2) + 1;
      default:
        return 0;
    }
  },
  handleYearSelect(_e: any) {
    const selectedYear = _e.detail.value;
    const schoolData =
      selectedYear == "全部" ? school : school["admission_year"][selectedYear];
    this.setData({
      school: schoolData,
      selectedYear: selectedYear,
    });
  },
  processData(school: any) {
    const { percentage_score, gpa_score } = wx.getStorageSync("grade");
    const gpa = school["avg_grade"]["gpa_score"];
    const percentage = school["avg_grade"]["percentage_score"];
    labels["gpa"].avgIndex = this.calcIndex("gpa", gpa);
    labels["percentage"].avgIndex = this.calcIndex("percentage", percentage);
    labels["gpa"].yourIndex = this.calcIndex("gpa", gpa_score);
    labels["percentage"].yourIndex = this.calcIndex(
      "percentage",
      percentage_score
    );

    const yearData = school.admission_year;
    const yearOptions = [
      {
        label: "全部",
        value: "全部",
        disabled: false,
      },
      ...Object.keys(yearData).map((year: string) => ({
        label: year,
        value: year,
        disabled: false,
      })),
    ];
    return { yearOptions };
  },
  onLoad: function (options: object) {
    school = JSON.parse(options["school"]);
    const { yearOptions } = this.processData(school);
    this.setData({
      school: school,
      schoolName: school["school_name"],
      yearOptions: yearOptions,
    });
  },
});
