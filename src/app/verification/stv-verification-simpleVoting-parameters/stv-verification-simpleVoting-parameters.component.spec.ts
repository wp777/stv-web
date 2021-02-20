import { ComponentFixture, TestBed } from "@angular/core/testing";

import { StvVerificationSimpleVotingParametersComponent } from "./stv-verification-simpleVoting-parameters.component";

describe("StvVerificationSimpleVotingParametersComponent", () => {
    let component: StvVerificationSimpleVotingParametersComponent;
    let fixture: ComponentFixture<StvVerificationSimpleVotingParametersComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [StvVerificationSimpleVotingParametersComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(StvVerificationSimpleVotingParametersComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
