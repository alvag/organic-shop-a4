import { Component, OnDestroy, OnInit } from "@angular/core";
import { ProductService } from "../product.service";
import { Product } from "../models/product";
import { CategoryService } from "../category.service";
import { ActivatedRoute } from "@angular/router";
import "rxjs/add/operator/switchMap";
import { ShoppingCartService } from "../shopping-cart.service";
import { Subscription } from "rxjs/Subscription";

@Component({
    selector: "app-products",
    templateUrl: "./products.component.html",
    styleUrls: [ "./products.component.css" ]
})
export class ProductsComponent implements OnInit, OnDestroy {

    products: Product[] = [];
    filteredProducts: Product[] = [];
    category: string;
    cart: any;
    subscription: Subscription;

    constructor(private route: ActivatedRoute,
                private productService: ProductService,
                private shoppingCartService: ShoppingCartService) {
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

    async ngOnInit() {
        this.subscription = (await this.shoppingCartService.getCart()).valueChanges().subscribe(cart => this.cart = cart);
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    filter() {
        this.filteredProducts = (this.category) ?
            this.products.filter(p => p.category.toLowerCase() === this.category.toLowerCase()) :
            this.products;
    }

}
