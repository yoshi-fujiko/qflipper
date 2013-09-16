/// <reference path="../../interface/iflip.ts" />
/// <reference path="../../data/item-size.ts" />
/// <reference path="../../data/point.ts" />

module Q {
    
    export class Flip implements IFlip {

        private point: Point;
        private $el: JQuery;
        private options: Options;
        private itemSize: ItemSize;

        constructor($el: JQuery, options: Options) {
            this.$el = $el;
            this.options = options;
            this.init();
        }

        refresh() {
            this.resetPoint();
            console.log(this.point.getNow())
        }

        toNext() {
            if(this.hasNext()) {
                this.point.setPoint(this.point.getNow() + 1);
                console.log(this.point.getNow())
            }
        }

        toPrev() {
            if(this.hasPrev()) {
                this.point.setPoint(this.point.getNow() - 1);
                console.log(this.point.getNow())
            }
        }

        moveToPoint(point: number) {
            if(point < this.itemSize.getTotalLength() - 1) {
                this.point.setPoint(point);
            } else if (point >= this.itemSize.getTotalLength()) {
                this.point.setPoint(this.itemSize.getTotalLength() - 1);
            }
            console.log(this.point.getNow())
        }

        private hasNext(): boolean {
            if(this.point.getNow() < this.itemSize.getTotalLength() - 1) {
                return true;
            }
            return false;
        }

        private hasPrev(): boolean {
            if(0 < this.point.getNow() && this.point.getNow() <= this.itemSize.getTotalLength() - 1) {
                return true;
            }
            return false;
        }

        private init() {
            this.point = new Point();
            this.resetPoint();
            this.itemSize = new ItemSize(this.$el, this.options);
            this.setFlipView();
        }

        private resetPoint() {
            this.point.setPoint(0);
        }

        private setFlipView() {
            this.$el.css({width: this.itemSize.getTotalWidth().toString() + 'px'});
        }
    }

}
