import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-tab',
    templateUrl: './content-tab.component.html'
})
export class ContentTabComponent implements OnInit {
    @Input() title: string;
    active = false;
    name: string;

    ngOnInit() {
    }
}
