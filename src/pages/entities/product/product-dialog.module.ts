import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductDialogPage } from './product-dialog';
import { ProductService } from './product.provider';

@NgModule({
    declarations: [
        ProductDialogPage
    ],
    imports: [
        IonicPageModule.forChild(ProductDialogPage),
        TranslateModule.forChild()
    ],
    exports: [
        ProductDialogPage
    ],
    providers: [
        ProductService
    ]
})
export class ProductDialogPageModule {
}
