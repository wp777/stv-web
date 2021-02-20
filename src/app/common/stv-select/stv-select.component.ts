import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from "@angular/core";

@Component({
    selector: "stv-select",
    templateUrl: "./stv-select.component.html",
    styleUrls: ["./stv-select.component.less"],
})
export class StvSelectComponent implements OnInit, AfterViewInit {
    
    @ViewChild("container")
    container?: ElementRef;
    
    @Output()
    valueChanged = new EventEmitter<string>();
    
    private _value: string = "";
    
    get value(): string {
        return this._value;
    }
    
    @Input()
    set value(value: string) {
        if (this._value == value) {
            return;
        }
        this._value = value;
        this.selectItemByValue(value);
    }
    
    onDocumentClickBound = this.onDocumentMouseDown.bind(this);
    
    constructor() {}
    
    ngOnInit(): void {}
    
    ngAfterViewInit(): void {
        this.updateMainItem();
    }
    
    onMainItemClick(event: MouseEvent): void {
        if (!document.body.classList.contains("select-dropdown-open")) {
            event.stopPropagation();
        }
        const container = this.container!.nativeElement as HTMLElement;
        const isDropdownOpen = container.classList.contains("dropdown-open");
        if (isDropdownOpen) {
            this.closeDropdown();
        }
        else {
            setTimeout(() => {
                this.openDropdown();
            }, 0);
        }
    }
    
    onDropdownClick(event: MouseEvent): void {
        event.stopPropagation();
        const target = event.target as HTMLElement;
        let element: HTMLElement = target;
        while (element && !element?.parentElement?.classList.contains("dropdown")) {
            element = element.parentElement!;
        }
        if (!element || !element.parentElement?.classList.contains("dropdown")) {
            return;
        }
        const item = element;
        if (!item.classList.contains("selected")) {
            this.value = item.dataset.value!;
        }
        this.closeDropdown();
    }
    
    private emitValueChanged(value: string): void {
        this.valueChanged.emit(value);
    }
    
    private onDocumentMouseDown(event: MouseEvent): void {
        this.closeDropdown();
    }
    
    private openDropdown(): void {
        const container = this.container!.nativeElement as HTMLElement;
        container.classList.add("dropdown-open");
        document.body.classList.add("select-dropdown-open");
        document.addEventListener("click", this.onDocumentClickBound);
    }
    
    private closeDropdown(): void {
        const container = this.container!.nativeElement as HTMLElement;
        container.classList.remove("dropdown-open");
        document.body.classList.remove("select-dropdown-open");
        document.removeEventListener("click", this.onDocumentClickBound);
    }
    
    private updateMainItem(): void {
        this.ensureAnyItemSelected();
        const container = this.container!.nativeElement as HTMLElement;
        const selectedItem = this.getSelectedItem();
        if (selectedItem !== null) {
            const mainItemContent = container.querySelector(".main-item-content")!;
            mainItemContent.innerHTML = "";
            mainItemContent.appendChild(selectedItem.cloneNode(true));
        }
    }
    
    private ensureAnyItemSelected(): void {
        const container = this.container!.nativeElement as HTMLElement;
        const items = container.querySelector(".dropdown")!.children;
        const selectedItem = this.getSelectedItem();
        if (selectedItem === null && items.length > 0) {
            const matchingItem = this.getItemByValue(this.value) ?? items[0];
            matchingItem.classList.add("selected");
        }
    }
    
    private getSelectedItem(): HTMLElement | null {
        return this.getItemByCallback(item => item.classList.contains("selected"));
    }
    
    private getItemByValue(value: string | undefined): HTMLElement | null {
        if (value) {
            return this.getItemByCallback(item => item.dataset.value == value);
        }
        return null;
    }
    
    private getItemByCallback(callback: (item: HTMLElement) => boolean): HTMLElement | null {
        const container = this.container?.nativeElement as HTMLElement;
        if (!container) {
            return null;
        }
        const items = container.querySelector(".dropdown")!.children;
        let item: HTMLElement | null = null;
        for (let i = 0; i < items.length; ++i) {
            if (callback(items[i] as HTMLElement)) {
                item = items[i] as HTMLElement;
                break;
            }
        }
        return item;
    }
    
    private selectItemByValue(value: string): void {
        const container = this.container?.nativeElement as HTMLElement;
        if (!container) {
            return;
        }
        const currentSelectedItem = this.getSelectedItem();
        const newSelectedItem = this.getItemByValue(value);
        if (currentSelectedItem && currentSelectedItem.dataset.value != value) {
            currentSelectedItem.classList.remove("selected");
        }
        if (newSelectedItem) {
            newSelectedItem.classList.add("selected");
            this.updateMainItem();
            this.emitValueChanged(newSelectedItem.dataset.value!);
        }
    }
    
}
