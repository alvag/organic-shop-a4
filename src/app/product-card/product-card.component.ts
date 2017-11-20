import { Component, Input, OnInit } from "@angular/core";
import { Product } from "../models/product";
import { ShoppingCartService } from "../shopping-cart.service";

@Component({
    selector: "product-card",
    templateUrl: "./product-card.component.html",
    styleUrls: [ "./product-card.component.css" ]
})
export class ProductCardComponent implements OnInit {

    @Input("product") product: Product;
    @Input("show-actions") showActions = true;
    @Input("shopping-cart") shoppingCart;

    constructor(private cartService: ShoppingCartService) { }

    ngOnInit() {
    }

    addToCart(product: Product) {
        this.cartService.addToCart(product);
    }

    getQuantity() {
        if (!this.shoppingCart) {
            return 0;
        }
        let item = this.shoppingCart.items[this.product.id];
        return item ? item.quantity : 0;
    }

}
