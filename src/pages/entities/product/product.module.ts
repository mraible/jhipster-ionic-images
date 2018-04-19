import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductPage } from './product';
import { ProductService } from './product.provider';

@NgModule({
    declarations: [
        ProductPage
    ],
    imports: [
        IonicPageModule.forChild(ProductPage),
        TranslateModule.forChild()
    ],
    exports: [
        ProductPage
    ],
    providers: [ProductService]
})
export class ProductPageModule {
}
