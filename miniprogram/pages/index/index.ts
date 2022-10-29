// index.ts
// 获取应用实例
import { isPercentage, isGpa, isPercentageAndGpa, getGrade, SUBJECTS, REGIONS, schools } from '../../utils/util';
import Message from '../../miniprogram_npm/tdesign-miniprogram/message/index';

const app = getApp<IAppOption>();

const PICKER_KEY = {
    SCHOOL: 'school',
    SUBJECT: 'subject'
};
const REGION_LABELS = Object.keys(REGIONS).map((key) => {
    return { label: key, value: (REGIONS as any)[key] }
});

Component({
    data: {
        schoolValue: '',
        subjectValue: '',
        gradeValue: '',
        destinationsValue: [],
        formValue: {},
        PICKER_KEY,
        [`${PICKER_KEY.SCHOOL}Visible`]: false,
        [`${PICKER_KEY.SUBJECT}Visible`]: false,
        pickerTitle: '',
        schools: [
            { label: '985/211', value: '985/211' },
            { label: '双非', value: '双非' },
            { label: '二本', value: '二本' },
            { label: '海本', value: '海本' },
            { label: '其他', value: '其他' },
        ],
        subjects: Object.keys(SUBJECTS).map((key: string) => {
            return { label: key, value: key }
        }),
        destinations: [
            { label: '全选', checkAll: true },
            ...REGION_LABELS
        ],
        [`${PICKER_KEY.SCHOOL}Value`]: [],
        [`${PICKER_KEY.SUBJECT}Value`]: [],
        checkAllValues: [],
        visible: false
        // checkResultsDisabled: true,
        // checkResultIcon: 'close-circle'
    },
    
    methods: {
        joinArray(array: Array<string>) {
            return array.join('-');
        },
        onClickPicker(e: any) {
            const { key } = e?.currentTarget?.dataset;
            this.setData({
                [`${key}Visible`]: true,
            });
        },
        onColumnChange(_e: any) {
            // console.log('picker pick:', e);
        },
        onPickerChange(e: any) {
            const { key } = e?.currentTarget?.dataset;
            // console.log('picker change:', e.detail);
            this.setData({
                [`${key}Visible`]: false,
                [`${key}Value`]: e.detail.value,
                [`${key}CurrentValue`]: this.joinArray(e.detail.value),
            });
        },
        onPickerCancel(e: any) {
            const { key } = e?.currentTarget?.dataset;
            // console.log(e, '取消');
            // console.log('picker1 cancel:');
            this.setData({
                [`${key}Visible`]: false,
            });
        },
        onInput(e: any) {
            // console.log(e.detail.value);
            this.setData({
                gradeValue: e.detail.value
            });
        },
        onCheckAllChange(e: any) {
            // console.log('checkbox', e.detail.value);
            this.setData({
                checkAllValues: e.detail,
                destinationsValue: e.detail.value
            });
        },
        onFormSubmit() {
            let ready = this.formValidation();
            if (ready) {
                // this.setData({
                //     checkResultsDisabled: false,
                //     checkResultIcon: 'check-circle'
                // });
                // console.log('send data');
                this.setData({
                  visible: true
                });
                this.postRequest();
                // wx.setStorageSync('data', schools);
                // setTimeout(() => {
                //     wx.navigateTo({
                //         url: '../results/results'
                //     });
                //     this.setData({
                //         visible: false
                //     });
                // }, 1000);
            } else {
                console.log('oops! sth went wrong...');
            }
        },
        formValidation() {
            let school = this.data.schoolValue;
            let subject = this.data.subjectValue;
            let grade = this.data.gradeValue;
            let destinations = this.data.destinationsValue;
            let schoolValid = school.length === 1;
            let subjectValid = subject.length === 1;
            let { type, gradeValid } = this.isGradeValid(grade);
            let destinationValid = destinations.length !== 0;
            // console.log('schoolValid:', schoolValid);
            // console.log('gradeValid:', gradeValid);
            // console.log('destinationValid:', destinationValid);
            let isValid = schoolValid && subjectValid && gradeValid && destinationValid;
            if (isValid) {
            // if (true) {
                this.showSuccessMessage();
                const grade = getGrade(type, this.data.gradeValue);
                console.log(grade);
                this.setData({
                    formValue: {
                        school_name: school[0],
                        subject: SUBJECTS[subject[0]],
                        grade: grade,
                        destination_region: destinations
                    }
                });
                // wx.setStorageSync('grade', { percentage_score: 85, gpa_score: 3.76 });
                wx.setStorageSync('grade', grade);
                return true;
            } else {
                this.showErrorMessage();
                return false;
            }
        },
        showSuccessMessage() {
            Message.success({
              context: this,
              offset: [20, 32],
              duration: 3000,
              content: '提交成功！请等待跳转至结果页面',
            });
        },
        showErrorMessage() {
            Message.error({
                context: this,
                offset: [20, 32],
                duration: 3000,
                content: '请按要求选择填写对应信息',
            });
        },
        isGradeValid(grade: string) {
            let type = 'wrong';
            let gradeValid = false;
            if (isPercentage(grade)) {
                type = 'percentage';
                gradeValid = true;
            } else if (!isPercentage(grade) && isGpa(grade)) {
                type = 'gpa'
                gradeValid = true;
            } else if (!isPercentage(grade) && !isGpa(grade) &&isPercentageAndGpa(grade)){
                type = 'both';
                gradeValid = true;
            }
            console.log(type);
            return { type, gradeValid };
        },
        bindResultTap() {
          wx.navigateTo({
            url: '../results/results',
          });
        },
        onShow: function() {
          console.log('loaded');
          wx.setStorageSync('data', []);
        },
        onVisibleChange(e: any) {
            this.setData({
                visible: e.detail.visible,
            });
        },
        postRequest() {
            // console.log("form data:", this.data.formValue);
            let that = this;
            wx.request({
                url: 'http://120.79.13.214:8080/get_filter_school',
                data: this.data.formValue,
                header: {
                    "Content-Type": "application/json"
                    //"Content-Type": "application/x-www-form-urlencoded"
                },
                method: 'POST',
                dataType:'json',
                success: function (res: any) {
                    const response = res.data;
                    // console.log(response['msg']);
                    const results = JSON.parse(response['result']).apply_results;         
                    wx.setStorageSync('data', results)
                    wx.navigateTo({
                        url: '../results/results'
                    });
                    that.setData({
                        visible: false
                    });
                },
                fail: function (err: any) {
                    console.log(err)
                },
                complete: function () { }//请求完成后执行的函数
            });
        }
    },
});
