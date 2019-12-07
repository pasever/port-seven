import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-tabs-demo',
    templateUrl: './content-tabs-demo.component.html'
})
export class ContentTabsDemoComponent implements OnInit {
  tabs: any;

  ngOnInit() {
    this.tabs = [
        { title: 'About', content: 'This is about tab'},
        { title: 'Blog', content: 'This is blog tab'},
        { title: 'Contact us', content: 'This is contact us tab'}
    ];
  }
}