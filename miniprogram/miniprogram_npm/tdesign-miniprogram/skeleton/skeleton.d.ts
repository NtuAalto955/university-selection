import { SuperComponent } from '../common/src/index';
import { SkeletonRowColObj } from './type';
import { ClassName, Styles } from '../common/common';
export default class Skeleton extends SuperComponent {
    externalClasses: string[];
    properties: import("./type").TdSkeletonProps;
    observers: {
        rowCol(): void;
    };
    lifetimes: {
        attached(): void;
    };
    methods: {
        init(): void;
        getColItemClass(obj: SkeletonRowColObj): ClassName;
        getColItemStyle(obj: SkeletonRowColObj): Styles;
    };
    data: {
        prefix: string;
        classPrefix: string;
        parsedRowcols: any[];
    };
}