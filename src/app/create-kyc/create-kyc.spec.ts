import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateKyc } from './create-kyc';

describe('CreateKyc', () => {
  let component: CreateKyc;
  let fixture: ComponentFixture<CreateKyc>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateKyc],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateKyc);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
