var pako = require("pako");
var zipbase64 = require("./zipbase64.js");

export const unGzip = (gzipData: string) => {
  // const gezipedData = zipbase64.atob(b64data);
  // console.log("gezipedData:", gezipedData);
  // const gzipedDataArray = Uint8Array.from(gezipedData, (c) => c.charCodeAt(0));
  // console.log("gzipedDataArray:", gzipedDataArray);
  // const ungzipedData = pako.inflate(gzipedDataArray);
  // console.log("ungzipedData:", ungzipedData);
  // const strData = new TextDecoder().decode(ungzipedData);
  // //解决中文乱码的问题
  // return zipbase64.toChinese(strData);
  var strData = zipbase64.atob(gzipData);
  // Convert binary string to character-number array
  var charData = strData.split("").map(function (x: string) {
    return x.charCodeAt(0);
  });
  // Turn number array into byte-array
  var binData = new Uint8Array(charData);
  // unzip
  var data = pako.inflate(binData);
  // Convert gunzipped byteArray back to ascii string:
  var array = new Uint16Array(data);
  var res = "";
  var chunk = 8 * 1024;
  var i;
  for (i = 0; i < array.length / chunk; i++) {
    res += String.fromCharCode.apply(
      null,
      //@ts-ignore
      array.slice(i * chunk, (i + 1) * chunk)
    );
  }
  //@ts-ignore
  res += String.fromCharCode.apply(null, array.slice(i * chunk));
  strData = res;
  //解决中文乱码的问题
  return zipbase64.toChinese(strData);
};

export const formatTime = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  return (
    [year, month, day].map(formatNumber).join("/") +
    " " +
    [hour, minute, second].map(formatNumber).join(":")
  );
};

export const isNumeric = (value: any) => {
  return !isNaN(parseFloat(value)) && isFinite(value);
};

export const isPercentage = (value: string) => {
  return isNumeric(value) && parseFloat(value) > 4 && parseFloat(value) <= 100;
};

export const isGpa = (value: string) => {
  const [gpa, fullGPA] = value.split("/");
  return (
    [gpa, fullGPA].every((item) => isNumeric(item)) &&
    parseFloat(gpa) <= parseFloat(fullGPA)
  );
};

export const isPercentageAndGpa = (value: string) => {
  if (value.includes("+")) {
    const [percentage, gpa] = value.split("+");
    return parseFloat(percentage) <= 100 && isGpa(gpa);
  } else {
    return false;
  }
};

export const getGrade = (type: string, grade: string) => {
  switch (type) {
    case "percentage":
      return {
        percentage_score: parseFloat(grade),
        gpa_score: 0,
      };
    case "gpa":
      return {
        percentage_score: 0,
        gpa_score: parseFloat(grade.split("/")[0]),
      };
    case "both":
      const [percentage, gpa] = grade.split("+");
      return {
        percentage_score: parseFloat(percentage),
        gpa_score: parseFloat(gpa.split("/")[0]),
      };
    default:
      return {
        percentage_score: 0,
        gpa_score: 0,
      };
  }
};

const formatNumber = (n: number) => {
  const s = n.toString();
  return s[1] ? s : "0" + s;
};
export const MAJORS: Object = {
  经济: 535,
  人文社科: 876,
  自然科学: 877,
  工程科学: 878,
  计算机科学: 957,
  商学: 969,
  数学统计: 970,
  生农医药: 971,
  法律: 997,
  "设计/建筑": 1010,
  电子电气: 1046,
};

export const REGIONS: Object = {
  北美: "North America",
  欧洲: "Europe",
  亚洲: "Asia",
  大洋洲: "Oceania",
  其他: "Others",
};

export const REGIONS_ZH: Object = {
  "North America": "北美",
  Europe: "欧洲",
  Asia: "亚洲",
  Oceania: "大洋洲",
  Others: "其他",
};

export const results = {
  apply_results: {
    Europe: {
      法国: [
        {
          school_name: "Sorbonne University",
          admission_year: {
            2022: {
              apply_year: 2022,
              gpa_range: [
                { accepted_num: 0, rejected_num: 0 },
                { accepted_num: 3, rejected_num: 0 },
                { accepted_num: 0, rejected_num: 0 },
                { accepted_num: 2, rejected_num: 2 },
                { accepted_num: 0, rejected_num: 0 },
                { accepted_num: 0, rejected_num: 0 },
                { accepted_num: 1, rejected_num: 2 },
                { accepted_num: 0, rejected_num: 0 },
              ],
              percentage_range: [
                { accepted_num: 3, rejected_num: 1 },
                { accepted_num: 1, rejected_num: 0 },
                { accepted_num: 2, rejected_num: 0 },
                { accepted_num: 1, rejected_num: 0 },
                { accepted_num: 0, rejected_num: 4 },
                { accepted_num: 0, rejected_num: 2 },
                { accepted_num: 2, rejected_num: 0 },
                { accepted_num: 3, rejected_num: 0 },
                { accepted_num: 0, rejected_num: 0 },
                { accepted_num: 2, rejected_num: 0 },
                { accepted_num: 0, rejected_num: 0 },
                { accepted_num: 0, rejected_num: 3 },
                { accepted_num: 0, rejected_num: 0 },
                { accepted_num: 0, rejected_num: 0 },
              ],
              total_result: { accepted_num: 12, rejected_num: 3 },
              avg_grade: {
                percentage_score: 85.32,
                PercentageNum: 0,
                gpa_score: 3.84,
                GpaNum: 4,
              },
              school_range: [
                { accepted_num: 2, rejected_num: 1 },
                { accepted_num: 3, rejected_num: 0 },
                { accepted_num: 0, rejected_num: 2 },
                { accepted_num: 3, rejected_num: 2 },
                { accepted_num: 0, rejected_num: 0 },
              ],
            },
            2021: {
              apply_year: 2021,
              gpa_range: [
                { accepted_num: 0, rejected_num: 0 },
                { accepted_num: 3, rejected_num: 0 },
                { accepted_num: 0, rejected_num: 0 },
                { accepted_num: 4, rejected_num: 2 },
                { accepted_num: 0, rejected_num: 0 },
                { accepted_num: 1, rejected_num: 3 },
                { accepted_num: 0, rejected_num: 4 },
                { accepted_num: 0, rejected_num: 0 },
              ],
              percentage_range: [
                { accepted_num: 2, rejected_num: 1 },
                { accepted_num: 4, rejected_num: 0 },
                { accepted_num: 2, rejected_num: 0 },
                { accepted_num: 3, rejected_num: 0 },
                { accepted_num: 0, rejected_num: 2 },
                { accepted_num: 0, rejected_num: 2 },
                { accepted_num: 2, rejected_num: 0 },
                { accepted_num: 3, rejected_num: 0 },
                { accepted_num: 0, rejected_num: 0 },
                { accepted_num: 2, rejected_num: 0 },
                { accepted_num: 0, rejected_num: 0 },
                { accepted_num: 0, rejected_num: 1 },
                { accepted_num: 0, rejected_num: 0 },
                { accepted_num: 0, rejected_num: 0 },
              ],
              total_result: { accepted_num: 23, rejected_num: 4 },
              avg_grade: {
                percentage_score: 85.32,
                PercentageNum: 0,
                gpa_score: 3.84,
                GpaNum: 4,
              },
              school_range: [
                { accepted_num: 3, rejected_num: 1 },
                { accepted_num: 3, rejected_num: 0 },
                { accepted_num: 0, rejected_num: 2 },
                { accepted_num: 4, rejected_num: 2 },
                { accepted_num: 0, rejected_num: 0 },
              ],
            },
          },
          gpa_range: [
            { accepted_num: 0, rejected_num: 0 },
            { accepted_num: 3, rejected_num: 0 },
            { accepted_num: 0, rejected_num: 0 },
            { accepted_num: 4, rejected_num: 2 },
            { accepted_num: 0, rejected_num: 0 },
            { accepted_num: 0, rejected_num: 0 },
            { accepted_num: 0, rejected_num: 4 },
            { accepted_num: 0, rejected_num: 0 },
          ],
          percentage_range: [
            { accepted_num: 5, rejected_num: 4 },
            { accepted_num: 4, rejected_num: 0 },
            { accepted_num: 2, rejected_num: 0 },
            { accepted_num: 7, rejected_num: 0 },
            { accepted_num: 0, rejected_num: 4 },
            { accepted_num: 0, rejected_num: 2 },
            { accepted_num: 4, rejected_num: 0 },
            { accepted_num: 3, rejected_num: 0 },
            { accepted_num: 0, rejected_num: 0 },
            { accepted_num: 2, rejected_num: 0 },
            { accepted_num: 0, rejected_num: 0 },
            { accepted_num: 0, rejected_num: 6 },
            { accepted_num: 0, rejected_num: 0 },
            { accepted_num: 0, rejected_num: 0 },
          ],
          total_result: { accepted_num: 40, rejected_num: 9 },
          avg_grade: {
            percentage_score: 85.32,
            PercentageNum: 0,
            gpa_score: 3.8423413241234,
            GpaNum: 4,
          },
          school_range: [
            { accepted_num: 5, rejected_num: 1 },
            { accepted_num: 3, rejected_num: 0 },
            { accepted_num: 0, rejected_num: 2 },
            { accepted_num: 4, rejected_num: 2 },
            { accepted_num: 0, rejected_num: 0 },
          ],
        },
        {
          school_name: "University of Saclay, Paris",
          admission_year: {
            2022: {
              apply_year: 2022,
              gpa_range: [
                { accepted_num: 0, rejected_num: 0 },
                { accepted_num: 3, rejected_num: 0 },
                { accepted_num: 0, rejected_num: 0 },
                { accepted_num: 2, rejected_num: 2 },
                { accepted_num: 0, rejected_num: 0 },
                { accepted_num: 0, rejected_num: 0 },
                { accepted_num: 1, rejected_num: 2 },
                { accepted_num: 0, rejected_num: 0 },
              ],
              percentage_range: [
                { accepted_num: 3, rejected_num: 1 },
                { accepted_num: 1, rejected_num: 0 },
                { accepted_num: 2, rejected_num: 0 },
                { accepted_num: 1, rejected_num: 0 },
                { accepted_num: 0, rejected_num: 4 },
                { accepted_num: 0, rejected_num: 2 },
                { accepted_num: 2, rejected_num: 0 },
                { accepted_num: 3, rejected_num: 0 },
                { accepted_num: 0, rejected_num: 0 },
                { accepted_num: 2, rejected_num: 0 },
                { accepted_num: 0, rejected_num: 0 },
                { accepted_num: 0, rejected_num: 3 },
                { accepted_num: 0, rejected_num: 0 },
                { accepted_num: 0, rejected_num: 0 },
              ],
              total_result: { accepted_num: 12, rejected_num: 3 },
              avg_grade: {
                percentage_score: 85.32,
                PercentageNum: 0,
                gpa_score: 3.84,
                GpaNum: 4,
              },
              school_range: [
                { accepted_num: 2, rejected_num: 1 },
                { accepted_num: 3, rejected_num: 0 },
                { accepted_num: 0, rejected_num: 2 },
                { accepted_num: 3, rejected_num: 2 },
                { accepted_num: 0, rejected_num: 0 },
              ],
            },
            2021: {
              apply_year: 2021,
              gpa_range: [
                { accepted_num: 0, rejected_num: 0 },
                { accepted_num: 3, rejected_num: 0 },
                { accepted_num: 0, rejected_num: 0 },
                { accepted_num: 4, rejected_num: 2 },
                { accepted_num: 0, rejected_num: 0 },
                { accepted_num: 1, rejected_num: 3 },
                { accepted_num: 0, rejected_num: 4 },
                { accepted_num: 0, rejected_num: 0 },
              ],
              percentage_range: [
                { accepted_num: 2, rejected_num: 1 },
                { accepted_num: 4, rejected_num: 0 },
                { accepted_num: 2, rejected_num: 0 },
                { accepted_num: 3, rejected_num: 0 },
                { accepted_num: 0, rejected_num: 2 },
                { accepted_num: 0, rejected_num: 2 },
                { accepted_num: 2, rejected_num: 0 },
                { accepted_num: 3, rejected_num: 0 },
                { accepted_num: 0, rejected_num: 0 },
                { accepted_num: 2, rejected_num: 0 },
                { accepted_num: 0, rejected_num: 0 },
                { accepted_num: 0, rejected_num: 1 },
                { accepted_num: 0, rejected_num: 0 },
                { accepted_num: 0, rejected_num: 0 },
              ],
              total_result: { accepted_num: 23, rejected_num: 4 },
              avg_grade: {
                percentage_score: 85.32,
                PercentageNum: 0,
                gpa_score: 3.84,
                GpaNum: 4,
              },
              school_range: [
                { accepted_num: 3, rejected_num: 1 },
                { accepted_num: 3, rejected_num: 0 },
                { accepted_num: 0, rejected_num: 2 },
                { accepted_num: 4, rejected_num: 2 },
                { accepted_num: 0, rejected_num: 0 },
              ],
            },
          },
          gpa_range: [
            { accepted_num: 0, rejected_num: 0 },
            { accepted_num: 3, rejected_num: 0 },
            { accepted_num: 0, rejected_num: 0 },
            { accepted_num: 4, rejected_num: 2 },
            { accepted_num: 0, rejected_num: 0 },
            { accepted_num: 0, rejected_num: 0 },
            { accepted_num: 0, rejected_num: 4 },
            { accepted_num: 0, rejected_num: 0 },
          ],
          percentage_range: [
            { accepted_num: 5, rejected_num: 4 },
            { accepted_num: 4, rejected_num: 0 },
            { accepted_num: 2, rejected_num: 0 },
            { accepted_num: 7, rejected_num: 0 },
            { accepted_num: 0, rejected_num: 4 },
            { accepted_num: 0, rejected_num: 2 },
            { accepted_num: 4, rejected_num: 0 },
            { accepted_num: 3, rejected_num: 0 },
            { accepted_num: 0, rejected_num: 0 },
            { accepted_num: 2, rejected_num: 0 },
            { accepted_num: 0, rejected_num: 0 },
            { accepted_num: 0, rejected_num: 6 },
            { accepted_num: 0, rejected_num: 0 },
            { accepted_num: 0, rejected_num: 0 },
          ],
          total_result: { accepted_num: 40, rejected_num: 9 },
          avg_grade: {
            percentage_score: 85.3,
            PercentageNum: 0,
            gpa_score: 3.84,
            GpaNum: 4,
          },
          school_range: [
            { accepted_num: 5, rejected_num: 1 },
            { accepted_num: 3, rejected_num: 0 },
            { accepted_num: 0, rejected_num: 2 },
            { accepted_num: 4, rejected_num: 2 },
            { accepted_num: 0, rejected_num: 0 },
          ],
        },
      ],
      瑞典: [
        {
          school_name: "KTH",
          admission_year: {
            2022: {
              apply_year: 2022,
              gpa_range: [
                { accepted_num: 0, rejected_num: 0 },
                { accepted_num: 3, rejected_num: 0 },
                { accepted_num: 0, rejected_num: 0 },
                { accepted_num: 2, rejected_num: 2 },
                { accepted_num: 0, rejected_num: 0 },
                { accepted_num: 0, rejected_num: 0 },
                { accepted_num: 1, rejected_num: 2 },
                { accepted_num: 0, rejected_num: 0 },
              ],
              percentage_range: [
                { accepted_num: 3, rejected_num: 1 },
                { accepted_num: 1, rejected_num: 0 },
                { accepted_num: 2, rejected_num: 0 },
                { accepted_num: 1, rejected_num: 0 },
                { accepted_num: 0, rejected_num: 4 },
                { accepted_num: 0, rejected_num: 2 },
                { accepted_num: 2, rejected_num: 0 },
                { accepted_num: 3, rejected_num: 0 },
                { accepted_num: 0, rejected_num: 0 },
                { accepted_num: 2, rejected_num: 0 },
                { accepted_num: 0, rejected_num: 0 },
                { accepted_num: 0, rejected_num: 3 },
                { accepted_num: 0, rejected_num: 0 },
                { accepted_num: 0, rejected_num: 0 },
              ],
              total_result: { accepted_num: 12, rejected_num: 3 },
              avg_grade: {
                percentage_score: 85.32,
                PercentageNum: 0,
                gpa_score: 3.8423413241234,
                GpaNum: 4,
              },
              school_range: [
                { accepted_num: 2, rejected_num: 1 },
                { accepted_num: 3, rejected_num: 0 },
                { accepted_num: 0, rejected_num: 2 },
                { accepted_num: 3, rejected_num: 2 },
                { accepted_num: 0, rejected_num: 0 },
              ],
            },
            2021: {
              apply_year: 2021,
              gpa_range: [
                { accepted_num: 0, rejected_num: 0 },
                { accepted_num: 3, rejected_num: 0 },
                { accepted_num: 0, rejected_num: 0 },
                { accepted_num: 4, rejected_num: 2 },
                { accepted_num: 0, rejected_num: 0 },
                { accepted_num: 1, rejected_num: 3 },
                { accepted_num: 0, rejected_num: 4 },
                { accepted_num: 0, rejected_num: 0 },
              ],
              percentage_range: [
                { accepted_num: 2, rejected_num: 1 },
                { accepted_num: 4, rejected_num: 0 },
                { accepted_num: 2, rejected_num: 0 },
                { accepted_num: 3, rejected_num: 0 },
                { accepted_num: 0, rejected_num: 2 },
                { accepted_num: 0, rejected_num: 2 },
                { accepted_num: 2, rejected_num: 0 },
                { accepted_num: 3, rejected_num: 0 },
                { accepted_num: 0, rejected_num: 0 },
                { accepted_num: 2, rejected_num: 0 },
                { accepted_num: 0, rejected_num: 0 },
                { accepted_num: 0, rejected_num: 1 },
                { accepted_num: 0, rejected_num: 0 },
                { accepted_num: 0, rejected_num: 0 },
              ],
              total_result: { accepted_num: 23, rejected_num: 4 },
              avg_grade: {
                percentage_score: 85.32,
                PercentageNum: 0,
                gpa_score: 3.84,
                GpaNum: 4,
              },
              school_range: [
                { accepted_num: 3, rejected_num: 1 },
                { accepted_num: 3, rejected_num: 0 },
                { accepted_num: 0, rejected_num: 2 },
                { accepted_num: 4, rejected_num: 2 },
                { accepted_num: 0, rejected_num: 0 },
              ],
            },
          },
          gpa_range: [
            { accepted_num: 0, rejected_num: 0 },
            { accepted_num: 3, rejected_num: 0 },
            { accepted_num: 0, rejected_num: 0 },
            { accepted_num: 4, rejected_num: 2 },
            { accepted_num: 0, rejected_num: 0 },
            { accepted_num: 0, rejected_num: 0 },
            { accepted_num: 0, rejected_num: 4 },
            { accepted_num: 0, rejected_num: 0 },
          ],
          percentage_range: [
            { accepted_num: 5, rejected_num: 4 },
            { accepted_num: 4, rejected_num: 0 },
            { accepted_num: 2, rejected_num: 0 },
            { accepted_num: 7, rejected_num: 0 },
            { accepted_num: 0, rejected_num: 4 },
            { accepted_num: 0, rejected_num: 2 },
            { accepted_num: 4, rejected_num: 0 },
            { accepted_num: 3, rejected_num: 0 },
            { accepted_num: 0, rejected_num: 0 },
            { accepted_num: 2, rejected_num: 0 },
            { accepted_num: 0, rejected_num: 0 },
            { accepted_num: 0, rejected_num: 6 },
            { accepted_num: 0, rejected_num: 0 },
            { accepted_num: 0, rejected_num: 0 },
          ],
          total_result: { accepted_num: 40, rejected_num: 9 },
          avg_grade: {
            percentage_score: 85.3,
            PercentageNum: 0,
            gpa_score: 3.84,
            GpaNum: 4,
          },
          school_range: [
            { accepted_num: 5, rejected_num: 1 },
            { accepted_num: 3, rejected_num: 0 },
            { accepted_num: 0, rejected_num: 2 },
            { accepted_num: 4, rejected_num: 2 },
            { accepted_num: 0, rejected_num: 0 },
          ],
        },
      ],
    },
    "North America": {
      加拿大: [
        {
          school_name: "UCB",
          admission_year: {
            2022: {
              apply_year: 2022,
              gpa_range: [
                { accepted_num: 0, rejected_num: 0 },
                { accepted_num: 3, rejected_num: 0 },
                { accepted_num: 0, rejected_num: 0 },
                { accepted_num: 2, rejected_num: 2 },
                { accepted_num: 0, rejected_num: 0 },
                { accepted_num: 0, rejected_num: 0 },
                { accepted_num: 1, rejected_num: 2 },
                { accepted_num: 0, rejected_num: 0 },
              ],
              percentage_range: [
                { accepted_num: 3, rejected_num: 1 },
                { accepted_num: 1, rejected_num: 0 },
                { accepted_num: 2, rejected_num: 0 },
                { accepted_num: 1, rejected_num: 0 },
                { accepted_num: 0, rejected_num: 4 },
                { accepted_num: 0, rejected_num: 2 },
                { accepted_num: 2, rejected_num: 0 },
                { accepted_num: 3, rejected_num: 0 },
                { accepted_num: 0, rejected_num: 0 },
                { accepted_num: 2, rejected_num: 0 },
                { accepted_num: 0, rejected_num: 0 },
                { accepted_num: 0, rejected_num: 3 },
                { accepted_num: 0, rejected_num: 0 },
                { accepted_num: 0, rejected_num: 0 },
              ],
              total_result: { accepted_num: 12, rejected_num: 3 },
              avg_grade: {
                percentage_score: 85.32,
                PercentageNum: 0,
                gpa_score: 3.84,
                GpaNum: 4,
              },
              school_range: [
                { accepted_num: 2, rejected_num: 1 },
                { accepted_num: 3, rejected_num: 0 },
                { accepted_num: 0, rejected_num: 2 },
                { accepted_num: 3, rejected_num: 2 },
                { accepted_num: 0, rejected_num: 0 },
              ],
            },
            2021: {
              apply_year: 2021,
              gpa_range: [
                { accepted_num: 0, rejected_num: 0 },
                { accepted_num: 3, rejected_num: 0 },
                { accepted_num: 0, rejected_num: 0 },
                { accepted_num: 4, rejected_num: 2 },
                { accepted_num: 0, rejected_num: 0 },
                { accepted_num: 1, rejected_num: 3 },
                { accepted_num: 0, rejected_num: 4 },
                { accepted_num: 0, rejected_num: 0 },
              ],
              percentage_range: [
                { accepted_num: 2, rejected_num: 1 },
                { accepted_num: 4, rejected_num: 0 },
                { accepted_num: 2, rejected_num: 0 },
                { accepted_num: 3, rejected_num: 0 },
                { accepted_num: 0, rejected_num: 2 },
                { accepted_num: 0, rejected_num: 2 },
                { accepted_num: 2, rejected_num: 0 },
                { accepted_num: 3, rejected_num: 0 },
                { accepted_num: 0, rejected_num: 0 },
                { accepted_num: 2, rejected_num: 0 },
                { accepted_num: 0, rejected_num: 0 },
                { accepted_num: 0, rejected_num: 1 },
                { accepted_num: 0, rejected_num: 0 },
                { accepted_num: 0, rejected_num: 0 },
              ],
              total_result: { accepted_num: 23, rejected_num: 4 },
              avg_grade: {
                percentage_score: 85.32,
                PercentageNum: 0,
                gpa_score: 3.84,
                GpaNum: 4,
              },
              school_range: [
                { accepted_num: 3, rejected_num: 1 },
                { accepted_num: 3, rejected_num: 0 },
                { accepted_num: 0, rejected_num: 2 },
                { accepted_num: 4, rejected_num: 2 },
                { accepted_num: 0, rejected_num: 0 },
              ],
            },
          },
          gpa_range: [
            { accepted_num: 0, rejected_num: 0 },
            { accepted_num: 3, rejected_num: 0 },
            { accepted_num: 0, rejected_num: 0 },
            { accepted_num: 4, rejected_num: 2 },
            { accepted_num: 0, rejected_num: 0 },
            { accepted_num: 0, rejected_num: 0 },
            { accepted_num: 0, rejected_num: 4 },
            { accepted_num: 0, rejected_num: 0 },
          ],
          percentage_range: [
            { accepted_num: 5, rejected_num: 4 },
            { accepted_num: 4, rejected_num: 0 },
            { accepted_num: 2, rejected_num: 0 },
            { accepted_num: 7, rejected_num: 0 },
            { accepted_num: 0, rejected_num: 4 },
            { accepted_num: 0, rejected_num: 2 },
            { accepted_num: 4, rejected_num: 0 },
            { accepted_num: 3, rejected_num: 0 },
            { accepted_num: 0, rejected_num: 0 },
            { accepted_num: 2, rejected_num: 0 },
            { accepted_num: 0, rejected_num: 0 },
            { accepted_num: 0, rejected_num: 6 },
            { accepted_num: 0, rejected_num: 0 },
            { accepted_num: 0, rejected_num: 0 },
          ],
          total_result: { accepted_num: 40, rejected_num: 9 },
          avg_grade: {
            percentage_score: 85.3,
            PercentageNum: 0,
            gpa_score: 3.84,
            GpaNum: 4,
          },
          school_range: [
            { accepted_num: 5, rejected_num: 1 },
            { accepted_num: 3, rejected_num: 0 },
            { accepted_num: 0, rejected_num: 2 },
            { accepted_num: 4, rejected_num: 2 },
            { accepted_num: 0, rejected_num: 0 },
          ],
        },
      ],
      美国: [
        {
          school_name: "Harvard University",
          admission_year: {
            2022: {
              apply_year: 2022,
              gpa_range: [
                { accepted_num: 0, rejected_num: 0 },
                { accepted_num: 3, rejected_num: 0 },
                { accepted_num: 0, rejected_num: 0 },
                { accepted_num: 2, rejected_num: 2 },
                { accepted_num: 0, rejected_num: 0 },
                { accepted_num: 0, rejected_num: 0 },
                { accepted_num: 1, rejected_num: 2 },
                { accepted_num: 0, rejected_num: 0 },
              ],
              percentage_range: [
                { accepted_num: 3, rejected_num: 1 },
                { accepted_num: 1, rejected_num: 0 },
                { accepted_num: 2, rejected_num: 0 },
                { accepted_num: 1, rejected_num: 0 },
                { accepted_num: 0, rejected_num: 4 },
                { accepted_num: 0, rejected_num: 2 },
                { accepted_num: 2, rejected_num: 0 },
                { accepted_num: 3, rejected_num: 0 },
                { accepted_num: 0, rejected_num: 0 },
                { accepted_num: 2, rejected_num: 0 },
                { accepted_num: 0, rejected_num: 0 },
                { accepted_num: 0, rejected_num: 3 },
                { accepted_num: 0, rejected_num: 0 },
                { accepted_num: 0, rejected_num: 0 },
              ],
              total_result: { accepted_num: 12, rejected_num: 3 },
              avg_grade: {
                percentage_score: 85.32,
                PercentageNum: 0,
                gpa_score: 3.84,
                GpaNum: 4,
              },
              school_range: [
                { accepted_num: 2, rejected_num: 1 },
                { accepted_num: 3, rejected_num: 0 },
                { accepted_num: 0, rejected_num: 2 },
                { accepted_num: 3, rejected_num: 2 },
                { accepted_num: 0, rejected_num: 0 },
              ],
            },
            2021: {
              apply_year: 2021,
              gpa_range: [
                { accepted_num: 0, rejected_num: 0 },
                { accepted_num: 3, rejected_num: 0 },
                { accepted_num: 0, rejected_num: 0 },
                { accepted_num: 4, rejected_num: 2 },
                { accepted_num: 0, rejected_num: 0 },
                { accepted_num: 1, rejected_num: 3 },
                { accepted_num: 0, rejected_num: 4 },
                { accepted_num: 0, rejected_num: 0 },
              ],
              percentage_range: [
                { accepted_num: 2, rejected_num: 1 },
                { accepted_num: 4, rejected_num: 0 },
                { accepted_num: 2, rejected_num: 0 },
                { accepted_num: 3, rejected_num: 0 },
                { accepted_num: 0, rejected_num: 2 },
                { accepted_num: 0, rejected_num: 2 },
                { accepted_num: 2, rejected_num: 0 },
                { accepted_num: 3, rejected_num: 0 },
                { accepted_num: 0, rejected_num: 0 },
                { accepted_num: 2, rejected_num: 0 },
                { accepted_num: 0, rejected_num: 0 },
                { accepted_num: 0, rejected_num: 1 },
                { accepted_num: 0, rejected_num: 0 },
                { accepted_num: 0, rejected_num: 0 },
              ],
              total_result: { accepted_num: 23, rejected_num: 4 },
              avg_grade: {
                percentage_score: 85.32,
                PercentageNum: 0,
                gpa_score: 3.84,
                GpaNum: 4,
              },
              school_range: [
                { accepted_num: 3, rejected_num: 1 },
                { accepted_num: 3, rejected_num: 0 },
                { accepted_num: 0, rejected_num: 2 },
                { accepted_num: 4, rejected_num: 2 },
                { accepted_num: 0, rejected_num: 0 },
              ],
            },
          },
          gpa_range: [
            { accepted_num: 0, rejected_num: 0 },
            { accepted_num: 3, rejected_num: 0 },
            { accepted_num: 0, rejected_num: 0 },
            { accepted_num: 4, rejected_num: 2 },
            { accepted_num: 0, rejected_num: 0 },
            { accepted_num: 0, rejected_num: 0 },
            { accepted_num: 0, rejected_num: 4 },
            { accepted_num: 0, rejected_num: 0 },
          ],
          percentage_range: [
            { accepted_num: 5, rejected_num: 4 },
            { accepted_num: 4, rejected_num: 0 },
            { accepted_num: 2, rejected_num: 0 },
            { accepted_num: 7, rejected_num: 0 },
            { accepted_num: 0, rejected_num: 4 },
            { accepted_num: 0, rejected_num: 2 },
            { accepted_num: 4, rejected_num: 0 },
            { accepted_num: 3, rejected_num: 0 },
            { accepted_num: 0, rejected_num: 0 },
            { accepted_num: 2, rejected_num: 0 },
            { accepted_num: 0, rejected_num: 0 },
            { accepted_num: 0, rejected_num: 6 },
            { accepted_num: 0, rejected_num: 0 },
            { accepted_num: 0, rejected_num: 0 },
          ],
          total_result: { accepted_num: 40, rejected_num: 9 },
          avg_grade: {
            percentage_score: 85.3,
            PercentageNum: 0,
            gpa_score: 3.84,
            GpaNum: 4,
          },
          school_range: [
            { accepted_num: 5, rejected_num: 1 },
            { accepted_num: 3, rejected_num: 0 },
            { accepted_num: 0, rejected_num: 2 },
            { accepted_num: 4, rejected_num: 2 },
            { accepted_num: 0, rejected_num: 0 },
          ],
        },
      ],
    },
  },
  region_country_list: {
    Europe: ["法国", "瑞典"],
    "North America": ["加拿大", "美国"],
  },
  country_school_list: {
    法国: ["Sorbonne University", "University of Saclay, Paris"],
    瑞典: ["KTH"],
    加拿大: ["UCB"],
    美国: ["Harvard University"],
  },
};
