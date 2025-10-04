import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MealTypeFormComponent } from './meal-type-form.component';

describe('MealTypeFormComponent', () => {
  let component: MealTypeFormComponent;
  let fixture: ComponentFixture<MealTypeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MealTypeFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MealTypeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
