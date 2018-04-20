import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController, ToastController } from 'ionic-angular';
import { Product } from './product.model';
import { ProductService } from './product.provider';
import { JhiDataUtils } from 'ng-jhipster';

@IonicPage({
  defaultHistory: ['EntityPage'],
  name: 'page-product'
})
@Component({
    selector: 'page-product',
    templateUrl: 'product.html'
})
export class ProductPage {
    products: Product[];

    // todo: add pagination

    constructor(private navCtrl: NavController, private productService: ProductService,
                private modalCtrl: ModalController, private toastCtrl: ToastController,
                private dataUtils: JhiDataUtils) {
        this.products = [];
    }

    ionViewDidLoad() {
        this.loadAll();
    }

    loadAll(refresher?) {
        this.productService.query().subscribe(
            (response) => {
                this.products = response;
                if (typeof(refresher) !== 'undefined') {
                    refresher.complete();
                }
            },
            (error) => {
                console.error(error);
                let toast = this.toastCtrl.create({message: 'Failed to load data', duration: 2000, position: 'middle'});
                toast.present();
            });
    }

    trackId(index: number, item: Product) {
        return item.id;
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    open(slidingItem: any, item: Product) {
        let modal = this.modalCtrl.create('ProductDialogPage', {item: item});
        modal.onDidDismiss(product => {
            if (product) {
                if (product.id) {
                    this.productService.update(product).subscribe(data => {
                        this.loadAll();
                        let toast = this.toastCtrl.create(
                            {message: 'Product updated successfully.', duration: 3000, position: 'middle'});
                        toast.present();
                        slidingItem.close();
                    }, (error) => console.error(error));
                } else {
                    this.productService.create(product).subscribe(data => {
                        this.products.push(data);
                        let toast = this.toastCtrl.create(
                            {message: 'Product added successfully.', duration: 3000, position: 'middle'});
                        toast.present();
                    }, (error) => console.error(error));
                }
            }
        });
        modal.present();
    }

    delete(product) {
        this.productService.delete(product.id).subscribe(() => {
            let toast = this.toastCtrl.create(
                {message: 'Product deleted successfully.', duration: 3000, position: 'middle'});
            toast.present();
            this.loadAll();
        }, (error) => console.error(error));
    }

    detail(product: Product) {
        this.navCtrl.push('product-detail', {id: product.id});
    }
}
