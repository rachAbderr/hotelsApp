import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IHotel } from '../shared/models/hotel';
import { HotelListService } from '../shared/services/hotel-list.service';
@Component({
  selector: 'app-hotel-detail',
  templateUrl: './hotel-detail.component.html',
  styleUrls: ['./hotel-detail.component.css'],
})
export class HotelDetailComponent implements OnInit {
  hotel: IHotel = <IHotel>{};

  constructor(
    private route: ActivatedRoute,
    private listHotelService: HotelListService,
    private router: Router
  ) {}
  ngOnInit(): void {
    const id: number = +this.route.snapshot.paramMap.get('hotelId');
    this.listHotelService.getHotels().subscribe((hotels: IHotel[]) => {
      this.hotel = hotels.find((hotel) => hotel.id == id);
      console.log('hotel : ', this.hotel);
    });
  }
  public returnToList() {
    this.router.navigate(['/hotels']);
  }
}
