import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class IdentificationService {

  constructor(
    private httpClient: HttpClient
  ) {}

  public register(user: any): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const o = this.httpClient.post('http://localhost:3001/register', user);

      o.subscribe(
        res => resolve('inscription reussie'),
        err => reject(err.error)
      );
    });
  }

  public login(mail: string, password: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const o = this.httpClient.get('http://localhost:3001/connect/' + mail + '/' + password);

      o.subscribe(
        res => {
          localStorage.setItem('token', res['token']);
          resolve(res['token']);
        },
        err => reject(err.error)
      );
    });
  }

  public logout() {
    localStorage.setItem('token', undefined);
  }

  public isLegit(): Promise<boolean> {
    const token = localStorage.getItem('token');

    return new Promise<boolean>((resolve, reject) => {
      if (!token) {
        resolve(false);
      }

      console.log('islegit')
      console.log(token)
      const o = this.httpClient.get('http://localhost:3001/isLegit/' + token);

      o.subscribe(
        res => {
          console.log(res)
          resolve(true);
        },
        err => resolve(false)
      );
    });
  }
}
