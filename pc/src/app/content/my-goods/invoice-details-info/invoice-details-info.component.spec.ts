import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceDetailsInfoComponent } from './invoice-details-info.component';

describe('InvoiceDetailsInfoComponent', () => {
  let component: InvoiceDetailsInfoComponent;
  let fixture: ComponentFixture<InvoiceDetailsInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoiceDetailsInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceDetailsInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
