// logs.ts
import { REGIONS_ZH } from "../../utils/util";
const app = getApp<IAppOption>();

Page({
  data: {
    results: [] as Array<object>,
    regions: [] as Array<string>,
    schools: {},
    REGIONS_ZH: REGIONS_ZH,
    countryOptions: {},
    selectedCountry: {},
    curRegion: "",
  },
  handlePanelChange(_e: any) {
    if (_e.detail.value[0] != undefined) {
      const curRegion = _e.detail.value[0];
      this.setData({
        curRegion: curRegion,
        results: app["data"].apply_results[curRegion],
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
  dataProcessing(results: object, regions: Array<string>) {
    const countriesInRegions = results["region_country_list"];
    const schoolsInCountries = results["country_school_ist"];
    const selectedCountry = {};
    regions.forEach((region) => {
      selectedCountry[region] = countriesInRegions[region][0];
      countriesInRegions[region] = countriesInRegions[region].map(
        (country: string) => {
          return {
            label: country,
            value: country,
            disabled: false,
          };
        }
      );
    });
    return {
      countriesInRegions,
      schoolsInCountries,
      selectedCountry,
    };
  },
  onLoad: function (_options: any) {
    const regions = wx.getStorageSync("regions");
    const {
      countriesInRegions,
      schoolsInCountries,
      selectedCountry,
    } = this.dataProcessing({ ...app["data"] }, regions);
    this.setData({
      regions: regions,
      schools: schoolsInCountries,
      countryOptions: countriesInRegions,
      selectedCountry: selectedCountry,
    });
  },
  onUnload: function () {
    this.setData({
      regions: [],
      schools: {},
      countryOptions: [],
      selectedCountry: "",
    });
  },
});
