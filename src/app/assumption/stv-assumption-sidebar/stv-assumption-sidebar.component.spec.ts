import { ComponentFixture, TestBed } from "@angular/core/testing";

import { StvAssumptionSidebarComponent } from "./stv-assumption-sidebar.component";

describe("StvAssumptionSidebarComponent", () => {
    let component: StvAssumptionSidebarComponent;
    let fixture: ComponentFixture<StvAssumptionSidebarComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [StvAssumptionSidebarComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(StvAssumptionSidebarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
