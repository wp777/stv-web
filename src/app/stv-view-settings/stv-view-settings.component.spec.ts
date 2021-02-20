import { ComponentFixture, TestBed } from "@angular/core/testing";

import { StvViewSettingsComponent } from "./stv-view-settings.component";

describe("StvViewSettingsComponent", () => {
    let component: StvViewSettingsComponent;
    let fixture: ComponentFixture<StvViewSettingsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [StvViewSettingsComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(StvViewSettingsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
