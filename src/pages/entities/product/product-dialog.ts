import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams, ToastController, ViewController } from 'ionic-angular';
import { Product } from './product.model';
import { ProductService } from './product.provider';

@IonicPage()
@Component({
    selector: 'page-product-dialog',
    templateUrl: 'product-dialog.html'
})
export class ProductDialogPage {

    product: Product;
    isReadyToSave: boolean;

    form: FormGroup;

    constructor(public navCtrl: NavController, public viewCtrl: ViewController, public toastCtrl: ToastController,
                formBuilder: FormBuilder, params: NavParams,
                private productService: ProductService) {
        this.product = params.get('item');
        if (this.product && this.product.id) {
            this.productService.find(this.product.id).subscribe(data => {
                this.product = data;
            });
        }

        this.form = formBuilder.group({
            id: [params.get('item') ? this.product.id : null],
            name: [params.get('item') ? this.product.name : '',  Validators.required],
            price: [params.get('item') ? this.product.price : '',  Validators.required],
            image: [params.get('item') ? this.product.image : '', ],
        });

        // Watch the form for changes, and
        this.form.valueChanges.subscribe((v) => {
            this.isReadyToSave = this.form.valid;
        });
    }

    ionViewDidLoad() {
    }

    /**
     * The user cancelled, dismiss without sending data back.
     */
    cancel() {
        this.viewCtrl.dismiss();
    }

    /**
     * The user is done and wants to create the product, so return it
     * back to the presenter.
     */
    done() {
        if (!this.form.valid) { return; }
        this.viewCtrl.dismiss(this.form.value);
    }

    onError(error) {
        console.error(error);
        let toast = this.toastCtrl.create({message: 'Failed to load data', duration: 2000, position: 'middle'});
        toast.present();
    }

}
