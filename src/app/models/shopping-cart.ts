import { ShoppingCartItem } from "./shopping-cart-item";
import { Product } from "./product";

export class ShoppingCart {
    items: ShoppingCartItem[]= [];

    constructor(public cart) {
        for (let productId in this.cart.items) {
            let item = this.cart.items[productId];
            this.items.push(new ShoppingCartItem(item.product, item.quantity));
        }
    }

    getQuantity(product: Product) {
        let item = this.cart.items[product.id];
        return item ? item.quantity : 0;
    }

    get totalItemsCount() {
        let count = 0;
        for (let productId in this.items) {
            count += this.items[ productId ].quantity;
        }
        return count;
    }

    get totalPrice() {
        let sum = 0;
        for (let productId in this.items) {
            sum += this.items[productId].totalPrice;
        }
        return sum;
    }
}
