import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchKyc } from './search-kyc';

describe('SearchKyc', () => {
  let component: SearchKyc;
  let fixture: ComponentFixture<SearchKyc>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchKyc],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchKyc);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
