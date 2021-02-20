import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from "@angular/core";

@Component({
    selector: "stv-file-input",
    templateUrl: "./stv-file-input.component.html",
    styleUrls: ["./stv-file-input.component.less"],
})
export class StvFileInputComponent implements OnInit {
    
    static readonly EMPTY_VALUE_INFO = "Choose a file...";
    
    @ViewChild("nativeInput")
    nativeInputRef?: ElementRef;
    
    @Output()
    fileListChanged = new EventEmitter<FileList>();
    
    private _value: string = "";
    
    get value(): string {
        return this._value;
    }
    
    @Input()
    set value(value: string) {
        this._value = value;
    }
    
    displayedValue: string = StvFileInputComponent.EMPTY_VALUE_INFO;
    hasValue: boolean = false;
    
    constructor() {}
    
    ngOnInit(): void {}
    
    private emitFileListChanged(fileList: FileList): void {
        this.fileListChanged.emit(fileList);
    }
    
    onNativeInputValueChanged(event: Event): void {
        const input = event.target as HTMLInputElement;
        this.setValue(input.value);
    }
    
    setValue(value: string): void {
        this.value = value;
        if (value == "") {
            this.displayedValue = StvFileInputComponent.EMPTY_VALUE_INFO;
            this.hasValue = false;
        }
        else {
            const pathElements = value.replace(/\\/g, "/").split("/");
            this.displayedValue = pathElements[pathElements.length - 1];
            this.hasValue = true;
        }
        const input = this.nativeInputRef?.nativeElement as HTMLInputElement;
        this.emitFileListChanged(input.files!);
    }
    
    onClearValueClick(event: MouseEvent): void {
        event.stopPropagation();
        event.preventDefault();
        const input = this.nativeInputRef?.nativeElement as HTMLInputElement;
        input.value = "";
        this.setValue("");
    }
    
}
