import { Component, Input, OnChanges } from '@angular/core';

import { WineModel } from '../wineModel';
import { HttpService } from '../serviceswine/http.service';
import { EmitterService } from '../../services/emitter.service';

@Component({
  selector: 'app-add-wine',
  templateUrl: './add-wine.component.html',
  styleUrls: ['./add-wine.component.css'],
  providers: [HttpService]
})
export class AddWineComponent implements OnChanges {

  @Input() wineInfo: string;
  @Input() reset: string;
  @Input() wineList: string;

  private isInsert: Boolean = true;
  private wineModel: WineModel = new WineModel('', '', 0, '', '');

  constructor(
    private httpService: HttpService
  ) {}

  public addWine() {
    this.httpService.addWine(this.wineModel).subscribe(
      response =>  {
        if (response.error) {
          alert(`The wine could not be added, server Error.`);
        } else {
          EmitterService.get(this.wineList).emit(response.wines);
        }
      },
      error => {
        alert(`The wine could not be added, server Error.`);
      }
    );
  }

  public updateWine() {
    this.httpService.updateWine(this.wineModel).subscribe(
      response => {
        if (response.error) {
          alert(`The wine could not be updated, server Error.`);
        } else {
          EmitterService.get(this.wineList).emit(response.wines);
        }
      },
      error => {
        alert(`The wine could not be updated, server Error.`);
      }
    );
  }

  public resetAddWine() {
    this.wineModel = new WineModel('', '', 0, '', '');
    EmitterService.get(this.reset).emit(true);
    this.isInsert = true;
  }

  ngOnChanges(changes: any) {
    EmitterService.get(this.wineInfo).subscribe( (value: WineModel) => {
      this.wineModel = new WineModel(value._id, value.name, value.price, value.description, value.urlimage);
      this.isInsert = false;
    });
  }
}
