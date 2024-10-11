import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';


@Component({
  selector: 'app-api',
  templateUrl: './api.page.html',
  styleUrls: ['./api.page.scss'],
})
export class ApiPage implements OnInit {
  post: any = [{
    userId: '',
    id: '',
    title: '',
    body: ''
  }];
  constructor(private api: ApiService) { }

  ngOnInit() {
    this.api.getPosts().subscribe((res)=>{
      console.log(res[0]); 
      this.post =res;
    },(error)=>{console.log(error); 
    }); 

    
  }

  


}
