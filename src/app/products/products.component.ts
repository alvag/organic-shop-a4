import { Component } from "@angular/core";
import { ProductService } from "../product.service";
import { Product } from "../models/product";
import { CategoryService } from "../category.service";
import { ActivatedRoute } from "@angular/router";
import "rxjs/add/operator/switchMap";

@Component({
    selector: "app-products",
    templateUrl: "./products.component.html",
    styleUrls: [ "./products.component.css" ]
})
export class ProductsComponent {

    products: Product[] = [];
    filteredProducts: Product[] = [];
    category: string;

    constructor(private route: ActivatedRoute,
                private productService: ProductService) {

        this.productService.getAll()
            .switchMap(products => {
                products.forEach(p => {
                    let prod: Product;
                    prod = p.payload.val();
                    prod.id = p.key;
                    this.products.push(prod);
                });
                return route.queryParamMap;
            }).subscribe(params => {
            this.category = params.get("categoria");
            this.filter();
        });
    }

    filter() {
        this.filteredProducts = (this.category) ?
            this.products.filter(p => p.category.toLowerCase() === this.category.toLowerCase()) :
            this.products;
    }

}
