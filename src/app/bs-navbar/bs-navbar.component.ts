import { Component, OnInit } from "@angular/core";
import { AuthService } from "../auth.service";
import { User } from "../models/user";
import { ShoppingCartService } from "../shopping-cart.service";
import { ShoppingCart } from "../models/shopping-cart";

@Component({
    selector: "bs-navbar",
    templateUrl: "./bs-navbar.component.html",
    styleUrls: [ "./bs-navbar.component.css" ]
})
export class BsNavbarComponent implements OnInit {

    appUser: User;
    shoppingCartItemCount: number;

    constructor(private auth: AuthService,
                private shoppingCartService: ShoppingCartService) {}

    async ngOnInit() {
        this.auth.appUser$.subscribe(appUser => this.appUser = appUser);
        let cart$ = await this.shoppingCartService.getCart();
        cart$.valueChanges().subscribe(cart => {
            this.countCartItems(cart);
        });
    }

    countCartItems(cart: any) {
        this.shoppingCartItemCount = 0;
        for (let productId in cart.items) {
            this.shoppingCartItemCount += cart.items[ productId ].quantity;
        }
    }

    logout() {
        this.auth.logout();
    }

}
