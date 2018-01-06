import { Component, Input, OnInit } from "@angular/core";
import { Product } from "../../models/product";
import { ShoppingCart } from "../../models/shopping-cart";
import { ShoppingCartService } from "../../services/shopping-cart.service";

@Component({
    selector: "product-card",
    templateUrl: "./product-card.component.html",
    styleUrls: [ "./product-card.component.css" ]
})
export class ProductCardComponent implements OnInit {

    @Input("product") product: Product;
    @Input("showActions") showActions = true;
    @Input("shoppingCart") shoppingCart: ShoppingCart;

    constructor(private cartService: ShoppingCartService) { }

    ngOnInit() {
    }

    addToCart() {
        this.cartService.addToCart(this.product);
    }

}
