import { Component } from '@angular/core';
import { AxiosService } from '../axios.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent {
  componentToShow: string = "welcome";

  constructor(private axiosService: AxiosService) {}

  showComponent(componentToShow: string): void{
    this.componentToShow = componentToShow;
  }

  onLogin(input:any): void {
    this.axiosService.request(
      "POST",
      "/login",
      {
        login: input.login,
        password: input.password
      }
    ).then(response => {
      console.log("Login Response:", response);
      if (response.data && response.data.token){
        console.log("Received Token:", response.data.token);
        this.axiosService.setAuthToken(response.data.token);
        this.componentToShow = "messages";
      }else{
        console.error("Token not found in the response: ", response);
      }
    }).catch(error => {
      console.error("Login Error", error);
    });

  }

  onRegister(input: any): void {
    this.axiosService.request(
      "POST",
      "/register",
      {
        firstName: input.firstName,
        lastName: input.lastName,
        login: input.login,
        password: input.password,

      }
    ).then(response => {
      console.log("Register Response:", response);
      this.axiosService.setAuthToken(response.data.token);
      this.componentToShow = "messages";
    });
  }
}
