import { ComponentFixture, TestBed } from "@angular/core/testing";

import { StvBisimulationSidebarComponent } from "./stv-bisimulation-sidebar.component";

describe("StvBisimulationSidebarComponent", () => {
    let component: StvBisimulationSidebarComponent;
    let fixture: ComponentFixture<StvBisimulationSidebarComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [StvBisimulationSidebarComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(StvBisimulationSidebarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
