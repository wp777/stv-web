import { ComponentFixture, TestBed } from "@angular/core/testing";

import { StvSidebarComponent } from "./stv-sidebar.component";

describe("StvSidebarComponent", () => {
    let component: StvSidebarComponent;
    let fixture: ComponentFixture<StvSidebarComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [StvSidebarComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(StvSidebarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
