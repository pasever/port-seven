import {Component, HostBinding, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-message-content',
  templateUrl: './message-content.component.html'
})
export class MessageContentComponent implements OnInit {
    @Input() header: string;
    @HostBinding('attr.class') cssClass = 'ui message';

    ngOnInit() {
        console.log(this.header);
    }
}
