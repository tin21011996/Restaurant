import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { EmitterService } from '../admin/services/emitter.service';
import { HttpService } from '../admin/wine/serviceswine/http.service';
import { WineModel } from '../admin/wine/wineModel';

@Component({
  selector: 'app-winelist',
  templateUrl: './winelist.component.html',
  styleUrls: ['./winelist.component.css'],
  providers: [HttpService]
})
export class WinelistComponent implements OnInit, OnChanges {

  @Input() reset: string;
  @Input() wineInfo: string;
  @Input() wineList: string;

  private winesList;
  private currentWine: WineModel;
  private isReset: Boolean = true;

  constructor( private httpService: HttpService ) { }

  ngOnInit() {
    this.httpService.getAllWine().subscribe(
      response => this.winesList = response.wines,
      error =>  { alert(`Can't get wines.`); }
    );
  }

  public wineSelected(wine) {
    this.currentWine = wine;
    EmitterService.get(this.wineInfo).emit(this.currentWine);
    this.isReset = true;
  }
  public isSelected(wine): boolean {
    if (!this.currentWine) {
      return false;
    }
    return this.currentWine._id ===  wine._id ? true : false;
  }

  public deleteWine(wineId: String) {
    this.httpService.deleteWine(wineId).subscribe(
      response => {
        if (response.error) {
          alert(`The wine could not be deleted, server Error.`);
        } else {
          this.winesList = response.wines;
        }
      },
      error => {
        alert(`The wine could not be deleted, server Error.`);
      });
  }
  ngOnChanges(changes: any) {
      EmitterService.get(this.reset).subscribe( (reset: String) => {
        this.isReset = false;
      });
      EmitterService.get(this.wineList).subscribe( (wineList: String) => {
        this.winesList = wineList;
    });
  }

}
