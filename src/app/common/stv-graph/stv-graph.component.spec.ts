import { ComponentFixture, TestBed } from "@angular/core/testing";

import { StvGraphComponent } from "./stv-graph.component";

describe("StvGraphComponent", () => {
    let component: StvGraphComponent;
    let fixture: ComponentFixture<StvGraphComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [StvGraphComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(StvGraphComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
