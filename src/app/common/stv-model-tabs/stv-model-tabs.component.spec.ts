import { ComponentFixture, TestBed } from "@angular/core/testing";

import { StvModelTabsComponent } from "./stv-model-tabs.component";

describe("StvModelTabsComponent", () => {
    let component: StvModelTabsComponent;
    let fixture: ComponentFixture<StvModelTabsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [StvModelTabsComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(StvModelTabsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
