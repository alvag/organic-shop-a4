import { NgModule } from "@angular/core";
import { HomeComponent } from "./components/home/home.component";
import { BsNavbarComponent } from "./components/bs-navbar/bs-navbar.component";
import { LoginComponent } from "./components/login/login.component";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild([])
    ],
    declarations: [
        BsNavbarComponent,
        HomeComponent,
        LoginComponent
    ],
    exports: [
        BsNavbarComponent
    ]
})
export class CoreModule {
}
