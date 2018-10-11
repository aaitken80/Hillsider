import Garden from '../models/garden.model';
import { Observable } from 'rxjs/Rx';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';


import 'rxjs/add/operator/map';

@Injectable()
export class GardenService {

  api_url = 'http://localhost:3000';
  gardenUrl = `${this.api_url}/api/gardens`;

  constructor(
    private http: HttpClient
  ) { }


  createGarden(garden: Garden): Observable<any>{
    return this.http.post(`${this.gardenUrl}`, garden);
  }

  getGardens(): Observable<Garden[]>{
    return this.http.get(this.gardenUrl)
    .map(res  => {
      return res["data"].docs as Garden[];
    })
  }

  editGarden(garden:Garden){
    let editUrl = `${this.gardenUrl}`
    return this.http.put(editUrl, garden);
  }

  deleteGarden(id:string):any{
    let deleteUrl = `${this.gardenUrl}/${id}`
    return this.http.delete(deleteUrl)
    .map(res  => {
      return res;
    })
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}