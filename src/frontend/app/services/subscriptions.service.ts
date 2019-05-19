import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionsService {

  constructor(
    private httpClient: HttpClient
  ) {}

  public addMail(mail: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const o = this.httpClient.post('http://localhost:3000/' + mail, {test: 'test'});

      o.subscribe(
        res => resolve(res['message']),
        err => reject(err.error)
      );
    });
  }
}
