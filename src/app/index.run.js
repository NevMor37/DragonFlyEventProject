(function() {
  'use strict';

  angular
    .module('dragonflyApp')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
