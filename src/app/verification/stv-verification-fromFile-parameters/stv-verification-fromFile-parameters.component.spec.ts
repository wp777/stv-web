import { ComponentFixture, TestBed } from "@angular/core/testing";

import { StvVerificationFromFileParametersComponent } from "./stv-verification-fromFile-parameters.component";

describe("StvVerificationFromFileParametersComponent", () => {
    let component: StvVerificationFromFileParametersComponent;
    let fixture: ComponentFixture<StvVerificationFromFileParametersComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [StvVerificationFromFileParametersComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(StvVerificationFromFileParametersComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
