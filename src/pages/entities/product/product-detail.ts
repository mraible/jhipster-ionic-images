import { Component } from '@angular/core';
import { IonicPage, ModalController, NavParams, ToastController } from 'ionic-angular';
import { Product } from './product.model';
import { ProductService } from './product.provider';

@IonicPage({
    segment: 'product-detail/:id'
})
@Component({
    selector: 'page-product-detail',
    templateUrl: 'product-detail.html'
})
export class ProductDetailPage {
    product: Product;

    constructor(private modalCtrl: ModalController, params: NavParams,
                private productService: ProductService, private toastCtrl: ToastController) {
        this.product = new Product();
        this.product.id = params.get('id');
    }

    ionViewDidLoad() {
        this.productService.find(this.product.id).subscribe(data => this.product = data);
    }

    open(item: Product) {
        let modal = this.modalCtrl.create('ProductDialogPage', {item: item});
        modal.onDidDismiss(product => {
            if (product) {
                this.productService.update(product).subscribe(data => {
                    this.product = data;
                    let toast = this.toastCtrl.create(
                        {message: 'Product updated successfully.', duration: 3000, position: 'middle'});
                    toast.present();
                }, (error) => console.error(error));
            }
        });
        modal.present();
    }
}
