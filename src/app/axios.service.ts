import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class AxiosService {

  constructor() { 
    console.log("Auth Token:", this.getAuthToken());
    axios.defaults.baseURL = "http://localhost:8080"
    axios.defaults.headers.post["Content-type"] = "application/json"
  }

  getAuthToken(): string | null {
    return window.localStorage.getItem("auth_token");
  }

  setAuthToken(token: string | null): void {
    console.log("Setting auth token:", token);
    if (token !== null){
      window.localStorage.setItem("auth_token", token)
    } else {
      window.localStorage.removeItem("auth_token");
    }
  }

  request(method: string, url: string, data: any): Promise<any> {
    let headers: any = {};
    const authToken = this.getAuthToken();
    console.log("Auth Token:", authToken);
    //add an authorization header into request if the token present in the localStorage.
    if (authToken !== null){
     headers = {"Authorization": "Bearer " + this.getAuthToken()}
    }

    return axios({
      method: method,
      url: url,
      data: data,
      headers: headers
    });
  }
}
