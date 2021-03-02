import { ComponentFixture, TestBed } from "@angular/core/testing";

import { StvTabsComponent } from "./stv-tabs.component";

describe("StvTabsComponent", () => {
    let component: StvTabsComponent;
    let fixture: ComponentFixture<StvTabsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [StvTabsComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(StvTabsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
