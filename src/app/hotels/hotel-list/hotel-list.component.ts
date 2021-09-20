import { Component, OnInit} from '@angular/core';
import { IHotel } from '../shared/models/hotel';
import { HotelListService } from '../shared/services/hotel-list.service';
@Component({
  selector: 'app-hotel-list',
  templateUrl: './hotel-list.component.html',
  styleUrls: ['./hotel-list.component.css']
})
export class HotelListComponent implements OnInit {

  public title = "Liste d'hotels";
  public showBadge: boolean = false;
  public filtredHotels : IHotel[] = [];
  private _hotelFilter: string = 'mot';
  public errorMsg : string;

  public hotels: IHotel[] = [];

  public receivedRating :string;

  constructor(private hotelListService :  HotelListService) { }

  ngOnInit(): void {
    this.hotelListService.getHotels().subscribe({
      next: results => {this.hotels = results;
      this.filtredHotels = this.hotels},
      error: err => this.errorMsg = err
    }); 

    
    this.hotelFilter = '';
   
  }
  
  showhotelNew():void{
    
    this.showBadge = !this.showBadge;
  }

  public get hotelFilter():string{
    return this._hotelFilter;
  }

  public set hotelFilter(filter : string){
    this._hotelFilter = filter;  
    this.filtredHotels=this.hotelFilter? this.filterHotel(this.hotelFilter) : this.hotels ; 
  }
  
  private filterHotel(criteria: string): IHotel[]{
      criteria  = criteria.toLocaleLowerCase();
      const hotelsFiltred = this.hotels.filter((hotel)=> hotel.hotelName.toLocaleLowerCase().indexOf(criteria) !== -1); 
      return hotelsFiltred;
  }
  receiveRatingClicked(message : any){
      this.receivedRating = message;
  }

}
