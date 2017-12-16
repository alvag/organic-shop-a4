import { Injectable } from "@angular/core";
import { AngularFireDatabase, AngularFireObject } from "angularfire2/database";
import { Product } from "./models/product";
import "rxjs/add/operator/take";
import { ShoppingCart } from "./models/shopping-cart";

@Injectable()
export class ShoppingCartService {

    constructor(private db: AngularFireDatabase) { }

    async addToCart(product: Product) {
        this.updateItemQuantity(product, 1);
    }

    async removeFromCart(product: Product) {
        this.updateItemQuantity(product, -1);
    }

    private async updateItemQuantity(product: Product, change: number) {
        let cartId = await this.getOrCreateCartId();
        let item$ = this.getItem(cartId, product.id);
        item$.snapshotChanges().take(1).subscribe(item => {
            item$.update({
                product: {
                    title: product.title,
                    price: product.price,
                    category: product.category,
                    imageUrl: product.imageUrl
                }, quantity: (item.payload.val() ? item.payload.val().quantity + change : 1)
            });
        });
    }

    private create() {
        return this.db.list("/shopping-carts").push({
            dateCreated: new Date().getTime()
        });
    }

    async getCart() {
        let cartId = await this.getOrCreateCartId();
        return this.db.object("/shopping-carts/" + cartId);
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
