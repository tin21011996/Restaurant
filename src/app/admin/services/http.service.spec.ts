import { TestBed, inject } from '@angular/core/testing';

import { HttpService } from './http.service';
import { Observable} from 'rxjs/Rx';
import { ProductModel } from '../productModel';
// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

describe('HttpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpService]
    });
  });

  it('should be created', inject([HttpService], (service: HttpService) => {
    expect(service).toBeTruthy();
  }));
});
