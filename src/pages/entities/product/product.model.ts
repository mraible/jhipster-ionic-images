import { BaseEntity } from '../../../models';

export class Product implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public price?: number,
        public imageContentType?: string,
        public image?: any,
    ) {
    }
}
