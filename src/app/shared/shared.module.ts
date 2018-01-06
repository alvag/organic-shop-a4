import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProductCardComponent } from "./components/product-card/product-card.component";
import { ProductQuantityComponent } from "./components/product-quantity/product-quantity.component";
import { UserService } from "./services/user.service";
import { AuthGuard } from "./services/auth-guard.service";
import { AuthService } from "./services/auth.service";
import { ProductService } from "./services/product.service";
import { OrderService } from "./services/order.service";
import { CategoryService } from "./services/category.service";
import { ShoppingCartService } from "./services/shopping-cart.service";
import { FormsModule } from "@angular/forms";
import { CustomFormsModule } from "ng2-validation";
import { DataTableModule } from "angular-4-data-table";
import { AngularFireDatabaseModule } from "angularfire2/database";
import { AngularFireAuthModule } from "angularfire2/auth";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        CustomFormsModule,
        DataTableModule,
        AngularFireDatabaseModule,
        AngularFireAuthModule,
        NgbModule.forRoot()
    ],
    declarations: [
        ProductCardComponent,
        ProductQuantityComponent
    ],
    exports: [
        CommonModule,
        ProductCardComponent,
        ProductQuantityComponent,
        FormsModule,
        CustomFormsModule,
        DataTableModule,
        AngularFireDatabaseModule,
        AngularFireAuthModule,
        NgbModule.forRoot().ngModule
    ],
    providers: [
        AuthService,
        AuthGuard,
        UserService,
        CategoryService,
        ProductService,
        ShoppingCartService,
        OrderService
    ]
})
export class SharedModule {
}
