import { Injectable } from "@angular/core";
import { AngularFireDatabase, AngularFireObject } from "angularfire2/database";
import { Product } from "../models/product";
import "rxjs/add/operator/take";
import { Observable } from "rxjs/Observable";
import { ShoppingCart } from "../models/shopping-cart";

@Injectable()
export class ShoppingCartService {

    constructor(private db: AngularFireDatabase) { }

    async addToCart(product: Product) {
        this.updateItem(product, 1);
    }

    async removeFromCart(product: Product) {
        this.updateItem(product, -1);
    }

    async getCart(): Promise<Observable<ShoppingCart>> {
        let cartId = await this.getOrCreateCartId();
        return this.db.object("/shopping-carts/" + cartId)
            .valueChanges().map(cart => new ShoppingCart(cart));
    }

    async clearCart() {
        let cartId = await this.getOrCreateCartId();
        this.db.object("/shopping-carts/" + cartId + "/items").remove();
    }


    private async updateItem(product: Product, change: number) {
        let cartId = await this.getOrCreateCartId();
        let item$ = this.getItem(cartId, product.id);
        item$.snapshotChanges().take(1).subscribe(item => {

            let quantity = (item.payload.val() ? item.payload.val().quantity + change : 1);

            if (quantity === 0){
                item$.remove();
            } else {
                item$.update({
                    title: product.title,
                    price: product.price,
                    imageUrl: product.imageUrl,
                    quantity: quantity
                });
            }

        });
    }

    private create() {
        return this.db.list("/shopping-carts").push({
            dateCreated: new Date().getTime()
        });
    }

    private getItem(cartId: string, productId: string) {
        return this.db.object("/shopping-carts/" + cartId + "/items/" + productId);
    }

    private async getOrCreateCartId(): Promise<string> {
        let cartId = localStorage.getItem("cartId");
        if (!cartId) {
            let result = await this.create();
            localStorage.setItem("cartId", result.key);
            return result.key;
        }
        return cartId;
    }

}
