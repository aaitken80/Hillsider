import { Component, OnInit } from '@angular/core';
import Garden from '../models/garden.model';
import { GardenService } from '../services/garden.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-gardens',
  templateUrl: './gardens.component.html',
  styleUrls: ['./gardens.component.scss']
})
export class GardensComponent implements OnInit{


  constructor(
    //Private gardenservice will be injected into the component by Angular Dependency Injector
    private gardenService: GardenService,
    private modalService: NgbModal
  ) { }

  //Declaring the new garden Object and initilizing it
  public newGarden: Garden = new Garden()

  //An Empty list for the visible garden list
  gardenList: Garden[];
  editGardenList: Garden[] = [];
  format: 'dd/MM/yyyy';
  closeResult: string;

  ngOnInit(): void {

    //At component initialization the 
    this.gardenService.getGardens()
      .subscribe(garden => {
        //assign the gardenlist property to the proper http response
        
        var newGardens = garden.map(function(e) { 
          e = new Garden().deserialize(e);
          return e;
        });

        this.gardenList = newGardens;
        console.log(garden)
      })
  }

  //This method will get called on Create button event
  
  create() {
    this.gardenService.createGarden(this.newGarden)
      .subscribe((res) => {
        this.gardenList.push(res.data)
        this.newGarden = new Garden()
      })
  }

 editGarden(garden: Garden) {
    console.log(garden)
    if(this.gardenList.includes(garden)){
      if(!this.editGardenList.includes(garden)){
        this.editGardenList.push(garden)
      }else{
        this.editGardenList.splice(this.editGardenList.indexOf(garden), 1)
        this.gardenService.editGarden(garden).subscribe(res => {
          console.log('Update Succesful')
        }, err => {
          this.editGarden(garden)
          console.error('Update Unsuccesful')
        })
      }
    }
  }

  submitGarden(event, garden:Garden){
    if(event.keyCode ==13){
      this.editGarden(garden)
    }
  }

  deleteGarden(garden: Garden) {
    this.gardenService.deleteGarden(garden._id).subscribe(res => {
      this.gardenList.splice(this.gardenList.indexOf(garden), 1);
    })
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

}