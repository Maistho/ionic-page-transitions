import { Animation } from 'ionic-angular/animations/animation';
import { isPresent } from 'ionic-angular/util/util';
import { PageTransition } from 'ionic-angular/transitions/page-transition';

const MOVE_DISTANCE = '40px';
const SHOW_BACK_BTN_CSS = 'show-back-button';
const CENTER = '0px';
const DECELERATION_CURVE = 'cubic-bezier(0.0, 0.0, 0.2, 1)';
const ACCELERATION_CURVE = 'cubic-bezier(0.4, 0.0, 1, 1)'

export class MDTransition extends PageTransition {
  init() {
    super.init();

    const plt = this.plt;
    const enteringView = this.enteringView;
    const leavingView = this.leavingView;
    const opts = this.opts;
    //opts.duration = 5000;

    // what direction is the transition going
    const backDirection = (opts.direction === 'back');

    if (enteringView) {
      if (backDirection) {
        this.duration(isPresent(opts.duration) ? opts.duration : 200).easing(ACCELERATION_CURVE);
        this.enteringPage
          .fromTo('translateX', '-' + MOVE_DISTANCE, CENTER, true)
          .fromTo('opacity', .5, 1, true);
      } else {
        this.duration(isPresent(opts.duration) ? opts.duration : 280).easing(DECELERATION_CURVE);
        this.enteringPage
          .fromTo('translateX', '100%', CENTER, true)
          .fromTo('opacity', 1, 1, true);
      }

      if (enteringView.hasNavbar()) {
        const enteringPageEle: Element = enteringView.pageRef().nativeElement;
        const enteringNavbarEle: Element = enteringPageEle.querySelector('ion-navbar');

        const enteringNavBar = new Animation(plt, enteringNavbarEle);
        this.add(enteringNavBar);

        const enteringBackButton = new Animation(plt, enteringNavbarEle.querySelector('.back-button'));
        this.add(enteringBackButton);
        if (enteringView.enableBack()) {
          enteringBackButton.beforeAddClass(SHOW_BACK_BTN_CSS);
        } else {
          enteringBackButton.beforeRemoveClass(SHOW_BACK_BTN_CSS);
        }
      }
    }

    // setup leaving view
    if (leavingView) {
      const leavingPage = new Animation(plt, leavingView.pageRef());
      if (backDirection) {
        // leaving content
        this.duration(opts.duration || 200).easing(ACCELERATION_CURVE);
        this.add(
          leavingPage
            .fromTo('translateX', CENTER, '100%')
            .fromTo('opacity', 1, 1, true)
            .easing(ACCELERATION_CURVE)
        );
      } else {
        this.add(
          leavingPage
            .fromTo('translateX', CENTER, '-' + MOVE_DISTANCE, true)
            .fromTo('opacity', 1, .5, true)
            .easing(ACCELERATION_CURVE)
          );
      }
    }
  }
}
