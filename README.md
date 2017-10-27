# ionic-page-transitions
Better page transitions for Ionic 3.x

## Installation

```
yarn add ionic-page-transitions
# or
npm install --save ionic-page-transitions
```


```
// in app.component.ts

import { MDTransition } from 'ionic-page-transitions'

@Component({
  templateUrl: 'app.html',
})
export class MyApp {
  rootPage:any = 'HomePage'

  constructor(config: Config) {
    config.setTransition('md-transition', MDTransition)
  }
}
```
