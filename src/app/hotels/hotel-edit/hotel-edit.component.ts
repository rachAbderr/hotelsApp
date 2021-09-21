import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IHotel } from '../shared/models/hotel';
import { HotelListService } from '../shared/services/hotel-list.service';

@Component({
  selector: 'app-hotel-edit',
  templateUrl: './hotel-edit.component.html',
  styleUrls: ['./hotel-edit.component.css']
})
export class HotelEditComponent implements OnInit {

  public hotelForm : FormGroup;
  public hotel : IHotel;
  public pageTitle: string;

  constructor(
    private fb : FormBuilder, private route : ActivatedRoute, private hotelListService : HotelListService) { }

  ngOnInit(): void {
    this.hotelForm = this.fb.group({
        hotelName :['',Validators.required],
        hotelPrice :['', Validators.required],
        starRating : [''],
        description : ['']
    });

    this.route.paramMap.subscribe(params =>{
      const id = +params.get('id');
      
      this.getSelectedHotel(id);
    })
  }
 
  public getSelectedHotel(id: number):void{
    this.hotelListService.getHotelById(id).subscribe(
      (hotel:IHotel)=>this.displayHotel(hotel));
  }
  public displayHotel(hotel : IHotel): void{
    this.hotel = hotel;
    if(this.hotel.id == 0){
      this.pageTitle = 'Créer un hotel'; 
    }else{
      this.pageTitle = `Modifier l\'hotel ${this.hotel.hotelName}`
    }
    this.hotelForm.patchValue({
      hotelName : this.hotel.hotelName,
      hotelPrice : this.hotel.price,
      starRating : this.hotel.rating,
      description : this.hotel.description 
    }
  )};
  saveHotel(){
    console.log(this.hotelForm.value);
  }
}
