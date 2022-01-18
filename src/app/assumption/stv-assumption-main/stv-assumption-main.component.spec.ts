import { ComponentFixture, TestBed } from "@angular/core/testing";

import { StvAssumptionMainComponent } from "./stv-assumption-main.component";

describe("StvAssumptionMainComponent", () => {
    let component: StvAssumptionMainComponent;
    let fixture: ComponentFixture<StvAssumptionMainComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [StvAssumptionMainComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(StvAssumptionMainComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
