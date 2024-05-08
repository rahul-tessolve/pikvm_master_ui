import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MastertwoComponent } from './mastertwo.component';

describe('MastertwoComponent', () => {
  let component: MastertwoComponent;
  let fixture: ComponentFixture<MastertwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MastertwoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MastertwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
