import {AfterViewInit, Component, ComponentFactoryResolver, OnInit, TemplateRef, ViewChild, ViewContainerRef} from '@angular/core';
import { AnotherComponent } from './another/another.component';


// Difference between embedded and host view is that embedded views are linked to a template,
// while host views are linked to a component
@Component({
  selector: 'app-page-two',
  templateUrl: './page-two.component.html',
  styleUrls: ['./page-two.component.scss'],
  entryComponents: [ AnotherComponent ]
})
export class PageTwoComponent implements OnInit, AfterViewInit {
  // View child queries for the template variable #template. This provides a temlate reference
  // of type TemplateRef. TemplateRef holds the createEmbeddedView function. It instatiate the template
  // as an embedded view.
  // Embedded view only attach to other views, never the DOM.
  @ViewChild('template', { read: TemplateRef }) tmpl: TemplateRef<any>;
  @ViewChild('container', { read: ViewContainerRef }) ctr: ViewContainerRef;

  constructor(
      private resolve: ComponentFactoryResolver
  ) { }

  ngOnInit() {
  }


  // fires after @ViewChild queries complete
  // ViewContainerRef is the type of reference for view containers(views)
  // ViewContainerRef references a view that supports the insertion of other views
  ngAfterViewInit() {
      // using host view
      const factory = this.resolve.resolveComponentFactory(AnotherComponent);
      this.ctr.createComponent(factory);

      // using embedded view
      const emFactory = this.tmpl.createEmbeddedView(null);
      this.ctr.insert(emFactory);
  }

}
