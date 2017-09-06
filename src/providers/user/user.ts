import { ServerProvider } from './../server/server';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';

/*
  Generated class for the UserProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class UserProvider {

  private url;
  private user = new BehaviorSubject<any>(null);
  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor(public http: Http, private serverProvider: ServerProvider) {
    this.url = this.serverProvider.getUrl();
  }

  registerUser(data) {
    return this.http.post(this.url + "/usuario", data).map(response => response.json());
  }

  login(data) {
    return this.http.post(this.url + "/login", data).map(response => response.json());    
  }

  isLoggedIn() {
    return this.loggedIn;
  }

  setLoggedIn(state) {
    this.loggedIn.next(state);
  }

  setUser(user) {
    this.user.next(user);
  }

  getUser() {
    return this.user;
  }

}
