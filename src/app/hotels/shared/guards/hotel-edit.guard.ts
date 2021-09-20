import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { HotelEditComponent } from '../../hotel-edit/hotel-edit.component';

@Injectable({
  providedIn: 'root'
})
export class HotelEditGuard implements CanDeactivate<HotelEditComponent> {
  canDeactivate(component: HotelEditComponent): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(component.hotelForm.dirty){
      const hotelName = component.hotelForm.get('hotelName').value || 'Nouveau hotel';
      return confirm(`Voulez-vous annuler les changements effectées sur ${hotelName}`);
    }
    return true;
  }
  
}
