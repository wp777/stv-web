import { ComponentFixture, TestBed } from "@angular/core/testing";

import { StvReductionSidebarComponent } from "./stv-reduction-sidebar.component";

describe("StvReductionSidebarComponent", () => {
    let component: StvReductionSidebarComponent;
    let fixture: ComponentFixture<StvReductionSidebarComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [StvReductionSidebarComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(StvReductionSidebarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
