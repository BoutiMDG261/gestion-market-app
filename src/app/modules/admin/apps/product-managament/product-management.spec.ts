import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductManagamentComponent } from './product-management.component';

describe('ProductManagamentComponent', () => {
  let component: ProductManagamentComponent;
  let fixture: ComponentFixture<ProductManagamentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductManagamentComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ProductManagamentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
