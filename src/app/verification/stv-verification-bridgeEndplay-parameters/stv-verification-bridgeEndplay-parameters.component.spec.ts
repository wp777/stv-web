import { ComponentFixture, TestBed } from "@angular/core/testing";

import { StvVerificationBridgeEndplayParametersComponent } from "./stv-verification-bridgeEndplay-parameters.component";

describe("StvVerificationBridgeEndplayParametersComponent", () => {
    let component: StvVerificationBridgeEndplayParametersComponent;
    let fixture: ComponentFixture<StvVerificationBridgeEndplayParametersComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [StvVerificationBridgeEndplayParametersComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(StvVerificationBridgeEndplayParametersComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
