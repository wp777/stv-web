import { ComponentFixture, TestBed } from "@angular/core/testing";

import { StvVerificationTianJiParametersComponent } from "./stv-verification-tianJi-parameters.component";

describe("StvVerificationTianJiParametersComponent", () => {
    let component: StvVerificationTianJiParametersComponent;
    let fixture: ComponentFixture<StvVerificationTianJiParametersComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [StvVerificationTianJiParametersComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(StvVerificationTianJiParametersComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
