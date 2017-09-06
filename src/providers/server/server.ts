import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

/*
  Generated class for the ServerProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class ServerProvider {
  private url: string = '';

  constructor() {
    this.url = "http://vast-headland-44785.herokuapp.com";
  }

  getUrl() {
    return this.url;
  }

}
