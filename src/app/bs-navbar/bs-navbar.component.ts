import { Component } from "@angular/core";
import { AuthService } from "../auth.service";
import { User } from "../models/user";

@Component({
    selector: "bs-navbar",
    templateUrl: "./bs-navbar.component.html",
    styleUrls: [ "./bs-navbar.component.css" ]
})
export class BsNavbarComponent {

    appUser: User;

    constructor(private auth: AuthService) {
        this.auth.appUser$.subscribe(appUser => this.appUser = appUser);
    }

    logout() {
        this.auth.logout();
    }

}
