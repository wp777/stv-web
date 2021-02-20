import { ComponentFixture, TestBed } from "@angular/core/testing";

import { StvReductionMainComponent } from "./stv-reduction-main.component";

describe("StvReductionMainComponent", () => {
    let component: StvReductionMainComponent;
    let fixture: ComponentFixture<StvReductionMainComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [StvReductionMainComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(StvReductionMainComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
