import { ComponentFixture, TestBed } from "@angular/core/testing";

import { StvVerificationDronesParametersComponent } from "./stv-verification-drones-parameters.component";

describe("StvVerificationDronesParametersComponent", () => {
    let component: StvVerificationDronesParametersComponent;
    let fixture: ComponentFixture<StvVerificationDronesParametersComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [StvVerificationDronesParametersComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(StvVerificationDronesParametersComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
