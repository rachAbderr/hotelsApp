import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { IHotel } from '../models/hotel';
import {catchError, tap, map} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class HotelListService {

  private readonly HOTEL_API_URL = 'api/hotels.json';

  constructor(private http : HttpClient) { }
 

  public getHotels():Observable<IHotel[]>{
    return this.http.get<IHotel[]>(this.HOTEL_API_URL)
                    .pipe(tap(hotels=>console.log('hotels :',hotels)),
                    catchError(this.handleError));                 
    }
    
  public getHotelById( id : number):Observable<IHotel>{
      if(id == 0){
        return of(this.getDefaultHotel());
      }
      return this.getHotels().pipe(
        map(hotels=>hotels.find(hotel => hotel.hotelId == id))  
      );
  }  
  private getDefaultHotel():IHotel{
    return {
    hotelId: 0,
    hotelName: null,
    description: null ,
    price: null ,
    imageUrl: null,
    rating: null, 
    }
  }
  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }

}


