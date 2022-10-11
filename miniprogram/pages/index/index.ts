// index.ts
// 获取应用实例
import { isNum } from '../../utils/util';
import Message from '../../miniprogram_npm/tdesign-miniprogram/message/index';

const app = getApp<IAppOption>()
const PICKER_KEY = {
    SCHOOL: 'school'
};

Component({
    data: {
        schoolValue: '',
        gpaValue: '',
        destinationsValue: [],
        PICKER_KEY,
        [`${PICKER_KEY.SCHOOL}Visible`]: false,
        pickerTitle: '',
        schools: [
            { label: '清北', value: '清北' },
            { label: 'C9', value: 'C9' },
            { label: '普通985', value: '985' },
            { label: '211', value: '211' },
            { label: '普通一本', value: '普通一本' },
            { label: '海本', value: '海本' },
            { label: '其他', value: '其他' },
        ],
        destinations: [
            { label: '全选', checkAll: true },
            { label: '北美', value: '北美' },
            { label: '英国', value: '英国' },
            { label: '澳洲', value: '澳洲' },
            { label: '香港/新加坡', value: '香港/新加坡' },
            { label: '北欧', value: '北欧' },
            { label: '其他', value: '其他' },
        ],
        [`${PICKER_KEY.SCHOOL}Value`]: [],
        checkAllValues: []
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
        onColumnChange(e: any) {
            console.log('picker pick:', e);
        },
        onPickerChange(e: any) {
            const { key } = e?.currentTarget?.dataset;
            console.log('picker change:', e.detail);
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
                gpaValue: e.detail.value
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
            // console.log(this.data.schoolValue);
            // console.log(this.data.gpaValue);
            // console.log(this.data.destinationsValue);
            let ready = this.formValidation();
            if (ready) {
                console.log('send data');
            } else {
                console.log('oops! sth went wrong...');
            }
        },
        formValidation() {
            let school = this.data.schoolValue;
            let gpa = this.data.gpaValue;
            let destinations = this.data.destinationsValue;
            let schoolValid = school.length === 1;
            let gpaValid = isNum(gpa) && parseInt(gpa) <= 100;
            let destinationValid = destinations.length !== 0;
            // console.log('schoolValid:', schoolValid);
            // console.log('gpaValid:', gpaValid);
            // console.log('destinationValid:', destinationValid);
            let isValid = schoolValid && gpaValid && destinationValid;
            if (isValid) {
                this.showSuccessMessage();
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
              content: '提交成功',
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
    },
});
