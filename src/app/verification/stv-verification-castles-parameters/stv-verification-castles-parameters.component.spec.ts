import { ComponentFixture, TestBed } from "@angular/core/testing";

import { StvVerificationCastlesParametersComponent } from "./stv-verification-castles-parameters.component";

describe("StvVerificationCastlesParametersComponent", () => {
    let component: StvVerificationCastlesParametersComponent;
    let fixture: ComponentFixture<StvVerificationCastlesParametersComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [StvVerificationCastlesParametersComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(StvVerificationCastlesParametersComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
