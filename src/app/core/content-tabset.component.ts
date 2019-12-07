import { AfterViewInit, Component, ContentChildren, QueryList } from '@angular/core';
import { ContentTabComponent } from './content-tab.component';

@Component({
    selector: 'app-set-tab',
    templateUrl: './content-tabset.component.html',
    styleUrls: [ './content-tabset.component.scss' ]
})
export class ContentTabsetComponent implements AfterViewInit{
    @ContentChildren(ContentTabComponent) tabs: QueryList<ContentTabComponent>;

    ngAfterViewInit() {
        console.log('View init');
        this.tabs.toArray()[0].active = true;
    }

    setActive(tab: ContentTabComponent) {
        this.tabs.toArray().forEach(t => t.active = false);
        tab.active = true;
    }
}
