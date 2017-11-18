import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "angularfire2/database";
import { Product } from "./models/product";
import "rxjs/add/operator/take";

@Injectable()
export class ShoppingCartService {

    constructor(private db: AngularFireDatabase) { }

    async addToCart(product: Product) {
        let cartId = await this.getOrCreateCartId();
        let item$ = this.getItem(cartId, product.id);
        item$.snapshotChanges().take(1).subscribe(item => {
            // if (item.payload.exists()) {
            //     console.log("existe");
                item$.update({ product: {
                    title: product.title,
                    price: product.price,
                    category: product.category,
                    imageUrl: product.imageUrl
                }, quantity: (item.payload.val() ? item.payload.val().quantity + 1 : 1) });
            /*} else {
                console.log("no existe");
                item$.set({
                    product: {
                        title: product.title,
                        price: product.price,
                        category: product.category,
                        imageUrl: product.imageUrl
                    }, quantity: 1
                });
            }*/
        });

    }

    private create() {
        return this.db.list("/shopping-carts").push({
            dateCreated: new Date().getTime()
        });
    }

    private getCart(cartId: string) {
        return this.db.object("/shopping-carts/" + cartId);
    }

    private getItem(cartId: string, productId: string) {
        return this.db.object("/shopping-carts/" + cartId + "/items/" + productId);
    }

    private async getOrCreateCartId() {
        let cartId = localStorage.getItem("cartId");
        if (!cartId) {
            let result = await this.create();
            localStorage.setItem("cartId", result.key);
            return result.key;
        }
        return cartId;
    }

}
