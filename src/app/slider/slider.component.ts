import {
  Component,
  ViewChild,
  Input,
  Output,
  SimpleChanges,
  EventEmitter,
  HostListener,
  ElementRef,
  OnChanges
} from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnChanges {
  @Input() min: number;
  @Input() max: number;
  @Input() value: number;
  @Output() valueChange: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('pointer') pointer: ElementRef;
  @ViewChild('progress') progress: ElementRef;
  @ViewChild('container') container: ElementRef;
  onSliderDrag: boolean;
  dragOffset: number;
  constructor () {
    this.min = 0;
    this.max = 100;
    this.value = 0;
    this.onSliderDrag = false;
  }

  onPointerMouseDown(event: MouseEvent): void {
    this.onSliderDrag = true;
    this.dragOffset = event.clientX - parseInt(this.pointer.nativeElement.style.left, 10);
    console.log('within pointer mouse down');
    console.log(this.dragOffset);
    
    
  }

  onPointerTouchStart(event: any): void {
    this.onSliderDrag = true;
    this.dragOffset = event.touches[0].clientX - parseInt(this.pointer.nativeElement.style.left, 10);
  }

  @HostListener('document:mouseup')
  onDocumentMouseUp(): void {
    this.onSliderDrag = false;
  }

  @HostListener('document:mousemove', ['$event'])
  onDocumentMouseMove(event: MouseEvent): void {
    if (this.onSliderDrag) {
      // Check bounds
      let newX = event.clientX - this.dragOffset;
      if (newX < 0 ) {
        newX = 0;
      }
      if (newX > this.container.nativeElement.clientWidth - this.pointer.nativeElement.clientWidth) {
        newX = this.container.nativeElement.clientWidth - this.pointer.nativeElement.clientWidth;
      }
      if (parseFloat(this.pointer.nativeElement.style.left) != newX) {
        this.value = newX  / (this.container.nativeElement.clientWidth - this.pointer.nativeElement.clientWidth)
         * (this.max - this.min) + this.min;
        this.valueChange.emit(this.value);
      }
    }
  }

  @HostListener('document:touchend')
  onDocumentTouchUp(): void {
    this.onSliderDrag = false;
  }

  @HostListener('document:touchmove', ['$event'])
  onDocumentTouchMove(event: any): void {
    if (this.onSliderDrag) {
      // Check bounds
      let newX = event.touches[0].clientX - this.dragOffset;
      if (newX < 0 ) {
        newX = 0;
      }
      if (newX > this.container.nativeElement.clientWidth - this.pointer.nativeElement.clientWidth) {
        newX = this.container.nativeElement.clientWidth - this.pointer.nativeElement.clientWidth;
      }
      if (parseFloat(this.pointer.nativeElement.style.left) != newX) {
        this.value = newX  / (this.container.nativeElement.clientWidth - this.pointer.nativeElement.clientWidth)
         * (this.max - this.min) + this.min;
        this.valueChange.emit(this.value);
      }
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.redrawSlider();
  }

  public redrawSlider(): void {
    let totalWidth = this.container.nativeElement.clientWidth;
    let pointerLeft = Math.floor((this.value - this.min) / (this.max - this.min)
     * (totalWidth - this.pointer.nativeElement.clientWidth));
    this.pointer.nativeElement.style.left = (pointerLeft || 0) + 'px';
    this.progress.nativeElement.style.width = (pointerLeft || 0) + this.pointer.nativeElement.clientWidth / 2 + 'px';
  }

  clickSeek(event: MouseEvent): void {
    if (event.offsetX) {
      this.value = (event.offsetX - this.pointer.nativeElement.clientWidth / 2)
       / (this.container.nativeElement.clientWidth - this.pointer.nativeElement.clientWidth)
       * (this.max - this.min) + this.min;
       if (this.value < 0) {
         this.value = 0;
       }
       this.onSliderDrag = true;
       this.dragOffset = event.clientX - event.offsetX + this.pointer.nativeElement.clientWidth / 2;
       this.valueChange.emit(this.value);
    }
  }
}
