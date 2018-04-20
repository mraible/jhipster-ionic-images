import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

@IonicPage({
  defaultHistory: ['HomePage']
})
@Component({
  selector: 'page-entity',
  templateUrl: 'entity.html'
})
export class EntityPage {

  entities: Array<any> = [
      {name: 'Product', component: 'page-product'},
      /* jhipster-needle-add-entity-page - JHipster will add entity pages here */
  ];

  constructor(public nav: NavController) {

  }

  ionViewWillLoad() {
      let page = location.hash.substring(location.hash.lastIndexOf('/') + 1);
      let urlParts = location.hash.split('/');
      console.log('urlParts', urlParts);
      page = 'page' + '-' + urlParts[3];
      let destination;
      this.entities.forEach(entity => {
        if (entity.component === page) {
          destination = entity.component;
        }
      });
      console.log('destination', destination);
      if (destination) {
        this.nav.push(destination);
      } else if (urlParts.length === 5) {
        console.log('push to ', urlParts[3])
        this.nav.push(urlParts[3], {id: urlParts[4]})
      }
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.push(page.component);
  }
}
