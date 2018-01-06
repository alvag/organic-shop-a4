import { NgModule } from "@angular/core";
import { AdminProductsComponent } from "./components/admin-products/admin-products.component";
import { AdminOrdersComponent } from "./components/admin-orders/admin-orders.component";
import { AdminAuthGuard } from "./services/admin-auth-guard.service";
import { ProductFormComponent } from "./components/product-form/product-form.component";
import { SharedModule } from "../shared/shared.module";
import { AuthGuard } from "../shared/services/auth-guard.service";
import { RouterModule } from "@angular/router";

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild([
            { path: "admin/pedidos", component: AdminOrdersComponent, canActivate: [ AuthGuard, AdminAuthGuard ] },
            { path: "admin/productos", component: AdminProductsComponent, canActivate: [ AuthGuard, AdminAuthGuard ] },
            {
                path: "admin/productos/nuevo",
                component: ProductFormComponent,
                canActivate: [ AuthGuard, AdminAuthGuard ]
            },
            {
                path: "admin/productos/:id",
                component: ProductFormComponent,
                canActivate: [ AuthGuard, AdminAuthGuard ]
            }
        ])
    ],
    declarations: [
        AdminProductsComponent,
        AdminOrdersComponent,
        ProductFormComponent
    ],
    providers: [
        AdminAuthGuard
    ]
})
export class AdminModule {
}
