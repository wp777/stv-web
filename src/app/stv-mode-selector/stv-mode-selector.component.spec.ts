import { ComponentFixture, TestBed } from "@angular/core/testing";

import { StvModeSelectorComponent } from "./stv-mode-selector.component";

describe("StvModeSelectorComponent", () => {
    let component: StvModeSelectorComponent;
    let fixture: ComponentFixture<StvModeSelectorComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [StvModeSelectorComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(StvModeSelectorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
