import {Pipe, PipeTransform} from '@angular/core';
import {IInfiniteItemsConfig} from 'projects/ngx-lightbox/src/lib/infinite-items.interface';

@Pipe({
    name: 'infiniteItems'
})
export class InfiniteItemsPipe implements PipeTransform {

    transform<T>(items: T[], config: IInfiniteItemsConfig): T[] {
        if (!config) {
            return items;
        }

        const result: T[] = [];
        const startIndex = config.currentIndex - config.radius;
        const endIndex = config.currentIndex + config.radius;

        for (let index = startIndex; index <= endIndex; index++) {
            const lastIndex = items.length - 1;

            if (index < 0) {
                console.log({index: lastIndex + index});
                result.push(items[lastIndex + index]);
                continue;
            }

            if (items[index]) {
                console.log({index});
                result.push(items[index]);
                continue;
            }

            if (index > lastIndex) {
                console.log({index: index - lastIndex});
                result.push(items[index - lastIndex]);
            }
        }

        return result;
    }

}
