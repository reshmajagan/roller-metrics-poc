import { Injectable } from '@angular/core';
import {
  Http,
  RequestOptionsArgs,
  RequestOptions,
  Headers
} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class LoadPathService {
  constructor(
    private http: Http
  ) {}

  loadPath() {
    let url = 'http://dev.aware.qburst.build/gps/log/150500029/';
    let options: RequestOptionsArgs = new RequestOptions();
    options.headers = new Headers();
    options.headers.append('Content-Type', 'application/json');
    return this.http.get(url, options)
      .map(res => res.json());
      // .catch(error => Observable.throw(error) );
  }
}
