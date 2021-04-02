import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from "@angular/core";

@Component({
  selector: 'stv-expansion-panel',
  templateUrl: './stv-expansion-panel.component.html',
  styleUrls: ['./stv-expansion-panel.component.less']
})
export class StvExpansionPanelComponent implements OnInit {
  @Input("headerText") headerText: any;

  @ViewChild("container") container?: ElementRef;

  private collapsed: Boolean = true;

  constructor() { }

  onToggleClick(){
    this.collapsed = !this.collapsed;
    console.log(`panel is ${this.collapsed} now`);
    
  }

  ngOnInit(): void {
  }

}
