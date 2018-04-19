import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Api } from '../../../providers/api/api';

import { Product } from './product.model';

@Injectable()
export class ProductService {
    private resourceUrl = Api.API_URL.replace('api', 'store/api') + '/products';

    constructor(private http: HttpClient) { }

    create(product: Product): Observable<Product> {
        return this.http.post(this.resourceUrl, product);
    }

    update(product: Product): Observable<Product> {
        return this.http.put(this.resourceUrl, product);
    }

    find(id: number): Observable<Product> {
        return this.http.get(`${this.resourceUrl}/${id}`);
    }

    query(req?: any): Observable<any> {
        return this.http.get(this.resourceUrl);
    }

    delete(id: number): Observable<any> {
        return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response', responseType: 'text' });
    }
}
