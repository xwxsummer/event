import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyGoodsComponent } from './my-goods.component';

describe('MyGoodsComponent', () => {
  let component: MyGoodsComponent;
  let fixture: ComponentFixture<MyGoodsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyGoodsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyGoodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
