import { Component, OnDestroy, OnInit } from "@angular/core";
import { ShoppingCartService } from "../shopping-cart.service";
import { ISubscription } from "rxjs/Subscription";
import { ShoppingCart } from "../models/shopping-cart";

@Component({
    selector: "app-shopping-cart",
    templateUrl: "./shopping-cart.component.html",
    styleUrls: [ "./shopping-cart.component.css" ]
})
export class ShoppingCartComponent implements OnInit, OnDestroy {

    subscription: ISubscription;
    cart: ShoppingCart;

    constructor(private shoppingCartService: ShoppingCartService) { }

    async ngOnInit() {
        this.subscription = (await this.shoppingCartService.getCart()).subscribe(cart => {
            this.cart = cart;
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
