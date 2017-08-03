import { TestBed, inject } from '@angular/core/testing';

import { MyGoodsService } from './my-goods.service';

describe('MyGoodsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MyGoodsService]
    });
  });

  it('should be created', inject([MyGoodsService], (service: MyGoodsService) => {
    expect(service).toBeTruthy();
  }));
});
