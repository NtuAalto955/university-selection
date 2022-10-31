// logs.ts
import { REGIONS_ZH } from "../../utils/util";
const app = getApp<IAppOption>();

Page({
  data: {
    regions: [] as Array<string>,
    schools: {},
    REGIONS_ZH: REGIONS_ZH,
    countryOptions: {},
    selectedCountry: {},
    filteredSchools: {},
    curRegion: "",
  },
  handlePanelChange(_e: any) {
    if (_e.detail.value[0] != undefined) {
      this.setData({
        curRegion: _e.detail.value[0],
      });
    }
  },
  handleCountrySelect(_e: any) {
    this.data.selectedCountry[this.data.curRegion] = _e.detail.value;
    this.setData({
      selectedCountry: this.data.selectedCountry,
    });
  },
  bindSchoolTap(e: any) {
    const currentSchool = e.currentTarget.dataset.school;
    wx.navigateTo({
      url: "../school/school?school=" + JSON.stringify(currentSchool),
    });
  },
  dataProcessing(schools: Array<object>) {
    const regions: Array<string> = schools.reduce((prev: Array<any>, cur) => {
      const curRegion = cur["region"];
      if (!prev.includes(curRegion)) {
        prev.push(curRegion);
      }
      return prev;
    }, []);

    const schoolsInRegions = {};
    regions.forEach((region) => {
      schoolsInRegions[region] = [];
      schools.forEach((school) => {
        if (school["region"] == region) {
          schoolsInRegions[region].push(school);
        }
      });
    });

    const countriesInRegions = {};
    regions.forEach((region) => {
      countriesInRegions[region] = schoolsInRegions[region]
        .reduce((prev: Array<any>, cur: any) => {
          const curCountry = cur["country"] == "nan" ? "其他" : cur["country"];
          if (!prev.includes(curCountry)) {
            prev.push(curCountry);
          }
          return prev;
        }, [])
        .map((country: string) => ({
          label: country,
          value: country,
          disabled: false,
        }));
    });

    const selectedCountry = {};
    const filteredSchools = {};
    regions.forEach((region) => {
      selectedCountry[region] = countriesInRegions[region][0].value;
      filteredSchools[region] = {};
      countriesInRegions[region].forEach((country: any) => {
        filteredSchools[region][country.value] = schoolsInRegions[
          region
        ].filter((school: any) => school["country"] == country.value);
      });
    });
    return {
      regions,
      schoolsInRegions,
      countriesInRegions,
      selectedCountry,
      filteredSchools,
    };
  },
  onLoad: function (_options: any) {
    const schools = wx.getStorageSync("data");
    const {
      regions,
      schoolsInRegions,
      countriesInRegions,
      selectedCountry,
      filteredSchools,
    } = this.dataProcessing(schools);
    this.setData({
      regions: regions,
      schools: schoolsInRegions,
      countryOptions: countriesInRegions,
      selectedCountry: selectedCountry,
      filteredSchools: filteredSchools,
    });
  },
  onUnload: function () {
    this.setData({
      regions: [],
      schools: {},
    });
  },
});
