import People from '../models/people.model';
import { Observable } from 'rxjs/Rx';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {Response} from '@angular/http';
import { Injectable } from '@angular/core';


import 'rxjs/add/operator/map';

@Injectable()
export class PeopleService {

  api_url = 'http://localhost:3000';
  peopleUrl = `${this.api_url}/api/people`;

  constructor(
    private http: HttpClient
  ) { }


  createPeople(people: People): Observable<any>{
    return this.http.post(`${this.peopleUrl}`, people);
  }

  getPeople(): Observable<People[]>{
    return this.http.get(this.peopleUrl)
    .map(res  => {
      return res["data"].docs as People[];
    })
  }

  editPeople(people:People){
    let editUrl = `${this.peopleUrl}`
    return this.http.put(editUrl, people);
  }

  deletePeople(id:string):any{
    let deleteUrl = `${this.peopleUrl}/${id}`
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