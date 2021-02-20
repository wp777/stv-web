import { ComponentFixture, TestBed } from "@angular/core/testing";

import { StvVerificationMainComponent } from "./stv-verification-main.component";

describe("StvVerificationMainComponent", () => {
    let component: StvVerificationMainComponent;
    let fixture: ComponentFixture<StvVerificationMainComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [StvVerificationMainComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(StvVerificationMainComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
