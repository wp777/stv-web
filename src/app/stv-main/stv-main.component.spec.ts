import { ComponentFixture, TestBed } from "@angular/core/testing";

import { StvMainComponent } from "./stv-main.component";

describe("StvMainComponent", () => {
    let component: StvMainComponent;
    let fixture: ComponentFixture<StvMainComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [StvMainComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(StvMainComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
