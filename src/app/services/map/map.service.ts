import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor() { }

  private _isSidebarOpen = new BehaviorSubject<boolean>(false);
  isSidebarOpen$ = this._isSidebarOpen.asObservable();

  closeSidebar() {
    this._isSidebarOpen.next(false);
  }
}
