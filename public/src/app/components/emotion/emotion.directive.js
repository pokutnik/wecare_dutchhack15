export function EmotionDirective() {
    'ngInject';

    let directive = {
        restrict: 'E',
        templateUrl: 'app/components/emotion/emotion.html',
        scope: {
            state: "@"
        },
        controller: EmotionController,
        controllerAs: 'e',
        bindToController: true
    };

    return directive;
}

class EmotionController {
    constructor(){
        'ngInject';

    }

}