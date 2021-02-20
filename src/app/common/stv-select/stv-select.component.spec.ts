import { ComponentFixture, TestBed } from "@angular/core/testing";

import { StvSelectComponent } from "./stv-select.component";

describe("StvSelectComponent", () => {
    let component: StvSelectComponent;
    let fixture: ComponentFixture<StvSelectComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [StvSelectComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(StvSelectComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
