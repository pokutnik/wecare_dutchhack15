/* global malarkey:false, moment:false */

import { config } from './index.config';
import { routerConfig } from './index.route';
import { runBlock } from './index.run';
import { MainController } from './main/main.controller';
import { clientListController } from './main/clientlist.controller';
import { WebDevTecService } from '../app/components/webDevTec/webDevTec.service';
import { HealthService } from '../app/health.service';
import { GraphDirective } from '../app/components/graph/graph.directive';
import { EmotionDirective } from '../app/components/emotion/emotion.directive';

import { NavbarDirective } from '../app/components/navbar/navbar.directive';
import { MalarkeyDirective } from '../app/components/malarkey/malarkey.directive';

angular.module('public', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngMessages', 'ngAria', 'ui.router', 'ngMaterial', 'toastr'])
  .constant('malarkey', malarkey)
  .constant('moment', moment)
  .config(config)
  .config(routerConfig)
  .config(function($mdThemingProvider, $mdIconProvider) {
    'ngInject';
    $mdIconProvider
      .defaultIconSet("https://raw.githubusercontent.com/angular/material-start/master/app/assets/svg/avatars.svg", 128)
  })
  .run(runBlock)
  .service('healthService', HealthService)
  .service('webDevTec', WebDevTecService)
  .controller('MainController', MainController)
  .controller('clientListCtrl', clientListController)
  .directive('emotionGraph', GraphDirective)
  .directive('emotion', EmotionDirective)
  .directive('acmeNavbar', NavbarDirective)
  .directive('acmeMalarkey', MalarkeyDirective);
