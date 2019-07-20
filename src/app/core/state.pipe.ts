import { Pipe } from '@angular/core';
import { SharedState, MODES } from './sharedState.model';
import { Model } from '../model/repository.model';

@Pipe({
    name: 'formatState',
    pure: true
})
export class StatePipe {

    constructor(
        private model: Model
    ) { }

    transform(value: any): string {
        if (value instanceof SharedState) {
            // const state = value as SharedState;
            return MODES[value.mode] + (value.id !== undefined
                ? ` ${this.model.getProduct(value.id).name}` : '');
        } else {
            return '<No Data>';
        }
    }
}
