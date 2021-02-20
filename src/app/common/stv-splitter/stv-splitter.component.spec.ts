import { ComponentFixture, TestBed } from "@angular/core/testing";

import { StvSplitterComponent } from "./stv-splitter.component";

describe("StvSplitterComponent", () => {
    let component: StvSplitterComponent;
    let fixture: ComponentFixture<StvSplitterComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [StvSplitterComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(StvSplitterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
