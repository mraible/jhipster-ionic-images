import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductDetailPage } from './product-detail';
import { ProductService } from './product.provider';

@NgModule({
    declarations: [
        ProductDetailPage
    ],
    imports: [
        IonicPageModule.forChild(ProductDetailPage),
        TranslateModule.forChild()
    ],
    exports: [
        ProductDetailPage
    ],
    providers: [ProductService]
})
export class ProductDetailPageModule {
}
