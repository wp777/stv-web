import { ComponentFixture, TestBed } from "@angular/core/testing";

import { StvBisimulationMainComponent } from "./stv-bisimulation-main.component";

describe("StvBisimulationMainComponent", () => {
    let component: StvBisimulationMainComponent;
    let fixture: ComponentFixture<StvBisimulationMainComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [StvBisimulationMainComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(StvBisimulationMainComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
