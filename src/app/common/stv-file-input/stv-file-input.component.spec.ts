import { ComponentFixture, TestBed } from "@angular/core/testing";

import { StvFileInputComponent } from "./stv-file-input.component";

describe("StvFileInputComponent", () => {
    let component: StvFileInputComponent;
    let fixture: ComponentFixture<StvFileInputComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [StvFileInputComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(StvFileInputComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
