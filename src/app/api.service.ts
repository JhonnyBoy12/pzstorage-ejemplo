import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from
'@angular/common/http'; 
import { retry, catchError } from 'rxjs/operators'; 
import { Observable } from 'rxjs'; 

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  httpOptions = {     headers: new HttpHeaders({ 
    'Content-Type': 'application/json', 
    'Access-Control-Allow-Origin' :'*' 
  }) 
} 

// Se establece la base url del API a consumir   
  apiURL = 'https://jsonplaceholder.typicode.com/posts'; 


  // Se declara la variable http de tipo 
  constructor(private http:HttpClient) { }

  getPosts():Observable<any>{     return this.http.get(this.apiURL+'/posts/').pipe(       retry(3) 
    ); 
  } 
  getPost(id: string):Observable<any>{     return this.http.get(this.apiURL+'/posts/'+id).pipe(       retry(3) 
    ); 
  } 



}
