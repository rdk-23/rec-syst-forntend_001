import { Component } from '@angular/core';
import { AxiosService } from '../axios.service';

@Component({
  selector: 'app-auth-content',
  templateUrl: './auth-content.component.html',
  styleUrls: ['./auth-content.component.css']
})
export class AuthContentComponent {
  data: string[] = [];

  constructor(private axiosService: AxiosService){}

  ngOnInit(): void {
    this.axiosService.request(
      "GET",
      "/messages",
      {}
    ).then(
      (response) => {
        console.log('Response:', response);
        this.data = response.data;
      },
      (error) => {
        console.error('Error', error);
      }
    );
  }

}
