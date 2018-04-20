import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams, ToastController, ViewController } from 'ionic-angular';
import { Product } from './product.model';
import { ProductService } from './product.provider';
import { JhiDataUtils } from 'ng-jhipster';
import { Camera } from '@ionic-native/camera';

@IonicPage()
@Component({
    selector: 'page-product-dialog',
    templateUrl: 'product-dialog.html'
})
export class ProductDialogPage {
    @ViewChild('fileInput') fileInput;
    product: Product;
    isReadyToSave: boolean;
    form: FormGroup;

    constructor(public navCtrl: NavController, public viewCtrl: ViewController, public toastCtrl: ToastController,
                formBuilder: FormBuilder, params: NavParams,
                private dataUtils: JhiDataUtils, private elementRef: ElementRef, private camera: Camera,
                private productService: ProductService) {
        this.product = params.get('item');
        if (this.product && this.product.id) {
            this.productService.find(this.product.id).subscribe(data => {
                this.product = data;
            });
        } else {
          this.product = new Product();
        }

        this.form = formBuilder.group({
            id: [params.get('item') ? this.product.id : null],
            name: [params.get('item') ? this.product.name : '',  Validators.required],
            price: [params.get('item') ? this.product.price : '',  Validators.required],
            image: [params.get('item') ? this.product.image : '', ],
            imageContentType: [params.get('item') ? this.product.imageContentType : '', ],
        });

        // Watch the form for changes, and
        this.form.valueChanges.subscribe((v) => {
            this.isReadyToSave = this.form.valid;
        });
    }

    ionViewDidLoad() {}

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

    byteSize(field) {
      return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
      return this.dataUtils.openFile(contentType, field);
    }

    getPicture() {
      if (Camera['installed']()) {
        this.camera.getPicture({
          destinationType: this.camera.DestinationType.DATA_URL,
          targetWidth: 96,
          targetHeight: 96
        }).then((data) => {
          this.form.patchValue({ 'image': 'data:image/jpg;base64,' + data });
        }, (err) => {
          alert('Unable to take photo');
        })
      } else {
        this.fileInput.nativeElement.click();
      }
    }

    processWebImage(event, fieldName) {
      let reader = new FileReader();
      reader.onload = (readerEvent) => {

        let imageData = (readerEvent.target as any).result;
        const imageType = event.target.files[0].type;
        imageData = imageData.substring(imageData.indexOf(',') + 1);

        this.form.patchValue({ [fieldName]: imageData });
        this.form.patchValue({ [fieldName + 'ContentType']: imageType });
      };

      reader.readAsDataURL(event.target.files[0]);
    }

    setFileData(event, entity, field, isImage) {
      this.dataUtils.setFileData(event, entity, field, isImage);
      this.processWebImage(event, field);
    }

    clearInputImage(field: string, fieldContentType: string, idInput: string) {
      this.dataUtils.clearInputImage(this.product, this.elementRef, field, fieldContentType, idInput);
      this.form.patchValue({image: ''});
    }
}
