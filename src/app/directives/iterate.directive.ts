import {Directive, DoCheck, IterableDiffer, IterableDiffers, TemplateRef, ViewContainerRef, ViewRef} from '@angular/core';

@Directive({
    selector: '[appIterate]'
})
export class IterateDirective implements DoCheck {

    // will hold the collection we are iterating on
    private items: any;
    // an Iterable Differ will be used got change detection purposes
    private differ: IterableDiffer<any>;
    // a Map that will link a given item on the collection with the view that contains it
    private views: Map<any, ViewRef> = new Map<any, ViewRef>();


    constructor(
        private viewContainer: ViewContainerRef,
        private template: TemplateRef<any>,
        private differs: IterableDiffers
    ) {
    }
    // keeping the collection on the directive's items property. If the collection
    // is valid and no differ yet - create one
    set ngIterateForOf(items) {
        this.items = items;
        if (this.items && !this.differ) {
            this.differ = this.differs.find(items).create();
        }
    }

    ngDoCheck(): void {
        // first verifying if the differ have been instantiated
        if (this.differ) {
            // then ask the differ what changed
            const changes = this.differ.diff(this.items);
            // if there are changes, we iterate over items that were added using changes.forEachItemAdded (this method
            // receives CollectionChangeRecord object for every element that was added)
            if (changes) {
                changes.forEachAddedItem(change => {
                    // then for each element we create new embedded view using view container's createEmbeddedView method
                    // second argument is a view context. Here we are setting $implicit local variable to change.item
                    // This will allow to reference the variable we declared in *AppIterate="let var of collection" as var on that view.
                    // Using $implicit because we don't know what name the user will assign to it when writing the component
                   const view = this.viewContainer.createEmbeddedView(this.template, { $implicit: change.item });
                   // final thing is connecting the item with the collection to its view
                   this.views.set(change.item, view);
                });
                // finally if the item gets removed from the collection, getting rid of the correct view
                // for each item that was removed, using the item-to-view map to find the view.
                changes.forEachRemovedItem(change => {
                   const view = this.views.get(change.item);
                    // Then asking the view container for the index of that view
                    // because the view container's remove method needs an index
                   const idx = this.viewContainer.indexOf(view);
                   this.viewContainer.remove(idx);
                   this.views.delete(change.item);
                });
            }
        }
    }
}
