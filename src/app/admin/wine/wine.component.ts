import { Component} from '@angular/core';
import { EmitterService } from '../services/emitter.service';

@Component({
  selector: 'app-wine',
  templateUrl: './wine.component.html',
  styleUrls: ['./wine.component.css'],
})
export class WineComponent {

  private wineInfo = 'CRUD_WINE_INFO';
  private reset = 'CRUD_RESET_FORM';
  private wineList = 'CRUD_WINE_LIST';

  constructor(private _emitterService: EmitterService) {}

}
