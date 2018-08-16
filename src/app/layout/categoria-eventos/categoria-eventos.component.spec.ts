import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriaEventosComponent } from './categoria-eventos.component';

describe('BlankPageComponent', () => {
    let component: CategoriaEventosComponent;
    let fixture: ComponentFixture<CategoriaEventosComponent>;

    beforeEach(
        async(() => {
            TestBed.configureTestingModule({
                declarations: [CategoriaEventosComponent]
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(CategoriaEventosComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
