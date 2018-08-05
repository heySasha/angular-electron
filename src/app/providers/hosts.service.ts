import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UsersModel {
  public apiUrl = 'https://my.api.mockaroo.com/users.json?key=455b8cb0';

  constructor(private http: HttpClient) {
  }

  public get() {
    return this.http.get(this.apiUrl);
  }
}
