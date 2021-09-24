import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IHotel } from '../shared/models/hotel';
import { HotelListService } from '../shared/services/hotel-list.service';

@Component({
  selector: 'app-hotel-edit',
  templateUrl: './hotel-edit.component.html',
  styleUrls: ['./hotel-edit.component.css'],
})
export class HotelEditComponent implements OnInit {
  public hotelForm: FormGroup;
  public hotel: IHotel;
  public pageTitle: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private hotelListService: HotelListService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.hotelForm = this.fb.group({
      hotelName: ['', Validators.required],
      price: ['', Validators.required],
      rating: [''],
      description: [''],
    });

    this.route.paramMap.subscribe((params) => {
      const id = +params.get('id');

      this.getSelectedHotel(id);
    });
  }

  public getSelectedHotel(id: number): void {
    this.hotelListService
      .getHotelById(id)
      .subscribe((hotel: IHotel) => this.displayHotel(hotel));
  }
  public displayHotel(hotel: IHotel): void {
    this.hotel = hotel;
    if (this.hotel.id == 0) {
      this.pageTitle = 'Créer un hotel';
    } else {
      this.pageTitle = `Modifier l\'hotel ${this.hotel.hotelName}`;
    }
    this.hotelForm.patchValue({
      hotelName: this.hotel.hotelName,
      price: this.hotel.price,
      rating: this.hotel.rating,
      description: this.hotel.description,
    });
  }
  saveHotel() {
    if (this.hotelForm.valid) {  
      if (this.hotelForm.dirty) {
        const hotel: IHotel = {
          ...this.hotel,
          ...this.hotelForm.value,
        };
        if (hotel.id == 0) {
          this.hotelListService
            .creatHotel(hotel)
            .subscribe({ next: () => this.saveCompleted() });
        } else {
          this.hotelListService.updateHotel(hotel).subscribe({
            next: () => this.saveCompleted(),
          });
        }
      }
    }
    console.log(this.hotelForm.value);
  }
  public saveCompleted(): void {
    this.hotelForm.reset();
    this.router.navigate(['/hotels']);
  }

  public deleteHotel():void{
    if(confirm(`Voulez-vous réelement supprimer ${this.hotel.hotelName} ?`)){
     this.hotelListService.deleteHotel(this.hotel.id).subscribe({
       next : () => this.saveCompleted()
      });
    } 
  }
}
