import { Component, OnInit } from "@angular/core";
import { ProductService } from "../../../shared/services/product.service";
import { Product } from "../../../shared/models/product";
import { ActivatedRoute } from "@angular/router";
import "rxjs/add/operator/switchMap";
import { ShoppingCartService } from "../../../shared/services/shopping-cart.service";
import { Observable } from "rxjs/Observable";
import { ShoppingCart } from "../../../shared/models/shopping-cart";

@Component({
    selector: "app-products",
    templateUrl: "./products.component.html",
    styleUrls: [ "./products.component.css" ]
})
export class ProductsComponent implements OnInit {

    products: Product[] = [];
    filteredProducts: Product[] = [];
    category: string;
    cart$: Observable<ShoppingCart>;

    constructor(private route: ActivatedRoute,
                private productService: ProductService,
                private shoppingCartService: ShoppingCartService) {
    }

    async ngOnInit() {
        this.cart$ = await this.shoppingCartService.getCart();
        this.populateProducts();
    }

    private populateProducts() {
        this.productService.getAll()
            .switchMap(products => {
                products.forEach(p => {
                    let prod: Product;
                    prod = p.payload.val();
                    prod.id = p.key;
                    this.products.push(prod);
                });
                return this.route.queryParamMap;
            }).subscribe(params => {
            this.category = params.get("categoria");
            this.filter();
        });
    }

    private filter() {
        this.filteredProducts = (this.category) ?
            this.products.filter(p => p.category.toLowerCase() === this.category.toLowerCase()) :
            this.products;
    }

}
