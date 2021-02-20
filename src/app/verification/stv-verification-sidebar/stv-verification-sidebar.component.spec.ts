import { ComponentFixture, TestBed } from "@angular/core/testing";

import { StvVerificationParametersComponent } from "./stv-verification-sidebar.component";

describe("StvVerificationParametersComponent", () => {
    let component: StvVerificationParametersComponent;
    let fixture: ComponentFixture<StvVerificationParametersComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [StvVerificationParametersComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(StvVerificationParametersComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
