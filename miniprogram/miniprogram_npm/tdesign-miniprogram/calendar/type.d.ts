export interface TdCalendarProps {
    cell?: {
        type: ArrayConstructor;
        value?: DateCellDescription[] | ((data: Date) => string);
    };
    confirmBtn?: {
        type: StringConstructor;
        value?: string;
    };
    firstDayOfWeek?: {
        type: NumberConstructor;
        value?: number;
    };
    head?: {
        type: StringConstructor;
        value?: string;
    };
    value?: {
        type: StringConstructor;
        value?: CalendarValue;
    };
}
export interface DateCellDescription {
    date: Date;
    label: string;
}
export declare type CalendarValue = string | Date;
