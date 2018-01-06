import { Component } from "@angular/core";
import { AuthService } from "../../../shared/services/auth.service";
import { OrderService } from "../../../shared/services/order.service";

@Component({
    selector: "app-my-orders",
    templateUrl: "./my-orders.component.html",
    styleUrls: [ "./my-orders.component.css" ]
})
export class MyOrdersComponent {

    orders;

    constructor(private authService: AuthService,
                private orderService: OrderService) {

        // this.orders$ = authService.user$.switchMap(u => orderService.getOrdersByUser(u.uid));
        authService.user$.subscribe(u => {
            this.orderService.getOrdersByUser(u.uid).valueChanges().subscribe(orders => {
                this.orders = orders;
                // console.log(this.orders);
            });
        });
        // this.orders$ = authService.user$.subscribe(u => orderService.getOrdersByUser(u.uid));
    }

}
