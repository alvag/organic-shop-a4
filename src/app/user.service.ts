import { Injectable } from "@angular/core";
import * as firebase from "firebase";
import { User } from "./models/user";
import { AngularFireDatabase } from "angularfire2/database";
import { Observable } from "rxjs/Observable";

@Injectable()
export class UserService {

    // user: Observable<User>;

    constructor(private db: AngularFireDatabase) { }

    save(user: firebase.User) {
        this.db.object("/users/" + user.uid).update({
            name: user.displayName,
            email: user.email
        });
    }

    get(uid: string): Observable<User> {
        return this.db.object("/users/" + uid).valueChanges();
    }

}
