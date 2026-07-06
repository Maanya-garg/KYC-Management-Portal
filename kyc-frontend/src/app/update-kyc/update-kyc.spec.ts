import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateKyc } from './update-kyc';

describe('UpdateKyc', () => {
  let component: UpdateKyc;
  let fixture: ComponentFixture<UpdateKyc>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateKyc],
    }).compileComponents();

    fixture = TestBed.createComponent(UpdateKyc);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
