import { ComponentFixture, TestBed } from "@angular/core/testing";

import { StvVerificationSidebarComponent } from "./stv-verification-sidebar.component";

describe("StvVerificationSidebarComponent", () => {
    let component: StvVerificationSidebarComponent;
    let fixture: ComponentFixture<StvVerificationSidebarComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [StvVerificationSidebarComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(StvVerificationSidebarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
