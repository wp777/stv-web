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
    
    onNativeInputValueChanged(): void {
        const nativeInput = this.nativeInputRef?.nativeElement as HTMLInputElement;
        this.setValue(nativeInput.value, nativeInput.files!);
    }
    
    setValue(value: string, fileList: FileList): void {
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
        this.emitFileListChanged(fileList);
    }
    
    onClearValueClick(event: MouseEvent): void {
        event.stopPropagation();
        event.preventDefault();
        const input = this.nativeInputRef?.nativeElement as HTMLInputElement;
        input.value = "";
        this.setValue("", input.files!);
    }
    
}
