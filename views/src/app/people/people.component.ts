import { Response } from '@angular/http';
import { PeopleService } from '../services/people.service';
import People from '../models/people.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})
export class PeopleComponent implements OnInit {


  constructor(
    //Private peopleservice will be injected into the component by Angular Dependency Injector
    private peopleService: PeopleService
  ) { }

  //Declaring the new people Object and initilizing it
  public newPeople: People = new People()

  //An Empty list for the visible people list
  peopleList: People[];
  editPeopleList: People[] = [];

  ngOnInit(): void {

    //At component initialization the 
    this.peopleService.getPeople()
      .subscribe(people => {
        //assign the peoplelist property to the proper http response
        this.peopleList = people
        console.log(people)
      })
  }

  //This method will get called on Create button event
  
  create() {
    this.peopleService.createPeople(this.newPeople)
      .subscribe((res) => {
        this.peopleList.push(res.data)
        this.newPeople = new People()
      })
  }

 editPeople(people: People) {
    console.log(people)
    if(this.peopleList.includes(people)){
      if(!this.editPeopleList.includes(people)){
        this.editPeopleList.push(people)
      }else{
        this.editPeopleList.splice(this.editPeopleList.indexOf(people), 1)
        this.peopleService.editPeople(people).subscribe(res => {
          console.log('Update Succesful')
        }, err => {
          this.editPeople(people)
          console.error('Update Unsuccesful')
        })
      }
    }
  }

  submitPeople(event, people:People){
    if(event.keyCode ==13){
      this.editPeople(people)
    }
  }

  deletePeople(people: People) {
    this.peopleService.deletePeople(people._id).subscribe(res => {
      this.peopleList.splice(this.peopleList.indexOf(people), 1);
    })
  }

}
