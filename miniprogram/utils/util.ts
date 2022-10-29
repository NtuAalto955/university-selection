export const formatTime = (date: Date) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return (
    [year, month, day].map(formatNumber).join('/') +
    ' ' +
    [hour, minute, second].map(formatNumber).join(':')
  )
}

export const isNumeric = (value: any) => {
    return !isNaN(parseFloat(value)) && isFinite(value);
}

export const isPercentage = (value: string) => {
    return isNumeric(value) && parseFloat(value) <= 100;
}

export const isGpa = (value: string) => {
    const [gpa, fullGPA] = value.split('/');
    return [gpa, fullGPA].every(item => isNumeric(item)) && parseFloat(gpa) <= parseFloat(fullGPA);
}

export const isPercentageAndGpa = (value: string) => {
    if (value.includes('+')) {
        const [percentage, gpa] = value.split('+');
        return parseFloat(percentage) <= 100 && isGpa(gpa);
    } else {
        return false;
    }
}

export const getGrade = (type: string, grade: string) => {
    switch (type) {
        case 'percentage':
            return {
                percentage_score: parseFloat(grade),
                gpa_score: 0
            };
        case 'gpa':
            return {
                percentage_score: 0,
                gpa_score: parseFloat(grade.split('/')[0])
            };
        case 'both':
            const [percentage, gpa] = grade.split('+');
            return {
                percentage_score: parseFloat(percentage),
                gpa_score: parseFloat(gpa.split('/')[0])
            };
        default:
            return {
                percentage_score: 0,
                gpa_score: 0
            };
    }
}

const formatNumber = (n: number) => {
  const s = n.toString()
  return s[1] ? s : '0' + s
}
export const SUBJECTS: Object = {
  "经济": 535,
  "人文社科": 876,
  "自然科学": 877,
  "工程科学": 878,
  "计算机科学": 957,
  "商学": 969,
  "数学统计": 970,
  "生农医药": 971,
  "法律": 997,
  "设计/建筑": 1010,
  "电子电气": 1046
};

export const REGIONS: Object = {
    "北美": "North America",
    "欧洲": "Europe",
    "亚洲": "Asia",
    "大洋洲": "Oceania",
    "其他": "Others"
};

export const REGIONS_ZH: Object = {
    "North America": "北美",
    "Europe": "欧洲",
    "Asia": "亚洲",
    "Oceania": "大洋洲",
    "Others": "其他"
};

export const schools = [
    {
      "school_name":"University of Saclay, Paris",
      "region": "Europe",
      "country": "法国",
      "gpa_range":[
        {"accepted_num":0,"rejected_num":0},
        {"accepted_num":3,"rejected_num":0},
        {"accepted_num":0,"rejected_num":0},
        {"accepted_num":4,"rejected_num":2},
        {"accepted_num":0,"rejected_num":0},
        {"accepted_num":0,"rejected_num":0},
        {"accepted_num":0,"rejected_num":4},
        {"accepted_num":0,"rejected_num":0}
      ],
      "percentage_range":[
        {"accepted_num":5,"rejected_num":4},
        {"accepted_num":4,"rejected_num":0},
        {"accepted_num":2,"rejected_num":0},
        {"accepted_num":7,"rejected_num":0},
        {"accepted_num":0,"rejected_num":4},
        {"accepted_num":0,"rejected_num":2},
        {"accepted_num":4,"rejected_num":0},
        {"accepted_num":3,"rejected_num":0},
        {"accepted_num":0,"rejected_num":0},
        {"accepted_num":2,"rejected_num":0},
        {"accepted_num":0,"rejected_num":0},
        {"accepted_num":0,"rejected_num":6},
        {"accepted_num":0,"rejected_num":0},
        {"accepted_num":0,"rejected_num":0}
      ],
      "total_result":
        {"accepted_num":40,"rejected_num":9},
      "avg_grade":
        {"percentage_score": 85.32324324233,"PercentageNum":0,"gpa_score":3.8423413241234,"GpaNum":4},
      "school_range":[
        {"accepted_num":5,"rejected_num":1},
        {"accepted_num":3,"rejected_num":0},
        {"accepted_num":0,"rejected_num":2},
        {"accepted_num":4,"rejected_num":2},
        {"accepted_num":0,"rejected_num":0},
      ]
    },
    {
      "school_name":"Sorbonne University",
      "region": "Europe",
      "country": "法国",
      "gpa_range":[
        {"accepted_num":0,"rejected_num":0},
        {"accepted_num":3,"rejected_num":0},
        {"accepted_num":0,"rejected_num":0},
        {"accepted_num":4,"rejected_num":2},
        {"accepted_num":0,"rejected_num":0},
        {"accepted_num":0,"rejected_num":0},
        {"accepted_num":0,"rejected_num":4},
        {"accepted_num":0,"rejected_num":0}
      ],
      "percentage_range":[
        {"accepted_num":5,"rejected_num":4},
        {"accepted_num":4,"rejected_num":0},
        {"accepted_num":2,"rejected_num":0},
        {"accepted_num":7,"rejected_num":0},
        {"accepted_num":0,"rejected_num":4},
        {"accepted_num":0,"rejected_num":2},
        {"accepted_num":4,"rejected_num":0},
        {"accepted_num":3,"rejected_num":0},
        {"accepted_num":0,"rejected_num":0},
        {"accepted_num":2,"rejected_num":0},
        {"accepted_num":0,"rejected_num":0},
        {"accepted_num":0,"rejected_num":6},
        {"accepted_num":0,"rejected_num":0},
        {"accepted_num":0,"rejected_num":0}
      ],
      "total_result":
        {"accepted_num":40,"rejected_num":9},
      "avg_grade":
        {"percentage_score": 85.32324324233,"PercentageNum":0,"gpa_score":3.8423413241234,"GpaNum":4},
      "school_range":[
        {"accepted_num":5,"rejected_num":1},
        {"accepted_num":3,"rejected_num":0},
        {"accepted_num":0,"rejected_num":2},
        {"accepted_num":4,"rejected_num":2},
        {"accepted_num":0,"rejected_num":0},
      ]
    },
    {
      "school_name":"KTH",
      "region": "Europe",
      "country": "瑞典",
      "gpa_range":[
        {"accepted_num":0,"rejected_num":0},
        {"accepted_num":3,"rejected_num":0},
        {"accepted_num":0,"rejected_num":0},
        {"accepted_num":4,"rejected_num":2},
        {"accepted_num":0,"rejected_num":0},
        {"accepted_num":0,"rejected_num":0},
        {"accepted_num":0,"rejected_num":4},
        {"accepted_num":0,"rejected_num":0}
      ],
      "percentage_range":[
        {"accepted_num":5,"rejected_num":4},
        {"accepted_num":4,"rejected_num":0},
        {"accepted_num":2,"rejected_num":0},
        {"accepted_num":7,"rejected_num":0},
        {"accepted_num":0,"rejected_num":4},
        {"accepted_num":0,"rejected_num":2},
        {"accepted_num":4,"rejected_num":0},
        {"accepted_num":3,"rejected_num":0},
        {"accepted_num":0,"rejected_num":0},
        {"accepted_num":2,"rejected_num":0},
        {"accepted_num":0,"rejected_num":0},
        {"accepted_num":0,"rejected_num":6},
        {"accepted_num":0,"rejected_num":0},
        {"accepted_num":0,"rejected_num":0}
      ],
      "total_result":
        {"accepted_num":40,"rejected_num":9},
      "avg_grade":
        {"percentage_score": 85.3,"PercentageNum":0,"gpa_score":3.84,"GpaNum":4},
      "school_range":[
        {"accepted_num":5,"rejected_num":1},
        {"accepted_num":3,"rejected_num":0},
        {"accepted_num":0,"rejected_num":2},
        {"accepted_num":4,"rejected_num":2},
        {"accepted_num":0,"rejected_num":0},
      ]
    },
    {
      "school_name":"UCB",
      "region": "North America",
      "country": "加拿大",
      "gpa_range":[
        {"accepted_num":0,"rejected_num":0},
        {"accepted_num":3,"rejected_num":0},
        {"accepted_num":0,"rejected_num":0},
        {"accepted_num":4,"rejected_num":2},
        {"accepted_num":0,"rejected_num":0},
        {"accepted_num":0,"rejected_num":0},
        {"accepted_num":0,"rejected_num":4},
        {"accepted_num":0,"rejected_num":0}
      ],
      "percentage_range":[
        {"accepted_num":5,"rejected_num":4},
        {"accepted_num":4,"rejected_num":0},
        {"accepted_num":2,"rejected_num":0},
        {"accepted_num":7,"rejected_num":0},
        {"accepted_num":0,"rejected_num":4},
        {"accepted_num":0,"rejected_num":2},
        {"accepted_num":4,"rejected_num":0},
        {"accepted_num":3,"rejected_num":0},
        {"accepted_num":0,"rejected_num":0},
        {"accepted_num":2,"rejected_num":0},
        {"accepted_num":0,"rejected_num":0},
        {"accepted_num":0,"rejected_num":6},
        {"accepted_num":0,"rejected_num":0},
        {"accepted_num":0,"rejected_num":0}
      ],
      "total_result":
        {"accepted_num":40,"rejected_num":9},
      "avg_grade":
        {"percentage_score": 85.3,"PercentageNum":0,"gpa_score":3.84,"GpaNum":4},
      "school_range":[
        {"accepted_num":5,"rejected_num":1},
        {"accepted_num":3,"rejected_num":0},
        {"accepted_num":0,"rejected_num":2},
        {"accepted_num":4,"rejected_num":2},
        {"accepted_num":0,"rejected_num":0},
      ]
    },
    {
      "school_name":"Harvard University",
      "region": "North America",
      "country": "美国",
      "gpa_range":[
        {"accepted_num":0,"rejected_num":0},
        {"accepted_num":3,"rejected_num":0},
        {"accepted_num":0,"rejected_num":0},
        {"accepted_num":4,"rejected_num":2},
        {"accepted_num":0,"rejected_num":0},
        {"accepted_num":0,"rejected_num":0},
        {"accepted_num":0,"rejected_num":4},
        {"accepted_num":0,"rejected_num":0}
      ],
      "percentage_range":[
        {"accepted_num":5,"rejected_num":4},
        {"accepted_num":4,"rejected_num":0},
        {"accepted_num":2,"rejected_num":0},
        {"accepted_num":7,"rejected_num":0},
        {"accepted_num":0,"rejected_num":4},
        {"accepted_num":0,"rejected_num":2},
        {"accepted_num":4,"rejected_num":0},
        {"accepted_num":3,"rejected_num":0},
        {"accepted_num":0,"rejected_num":0},
        {"accepted_num":2,"rejected_num":0},
        {"accepted_num":0,"rejected_num":0},
        {"accepted_num":0,"rejected_num":6},
        {"accepted_num":0,"rejected_num":0},
        {"accepted_num":0,"rejected_num":0}
      ],
      "total_result":
        {"accepted_num":40,"rejected_num":9},
      "avg_grade":
        {"percentage_score": 85.3,"PercentageNum":0,"gpa_score":3.84,"GpaNum":4},
      "school_range":[
        {"accepted_num":5,"rejected_num":1},
        {"accepted_num":3,"rejected_num":0},
        {"accepted_num":0,"rejected_num":2},
        {"accepted_num":4,"rejected_num":2},
        {"accepted_num":0,"rejected_num":0},
      ]
    }
  ];