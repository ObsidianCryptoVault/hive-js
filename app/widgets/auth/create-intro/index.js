'use strict';

var Ractive = require('../auth')
var Hive = require('hive-wallet')
var confirmPassphrasePage = require('../create-confirm')
var emitter = require('hive-emitter')

module.exports = function(prevPage){
  var ractive = new Ractive({
    partials: {
      header: require('./header.ract').template,
      actions: require('./actions.ract').template,
      footer: require('./footer.ract').template
    }
  })

  ractive.on('back', function(event){
    prevPage()
  })

  ractive.on('generate-phrase', function(){
    ractive.set('opening', true)
    ractive.set('progress', 'Generating passphrase...')
    ractive.loading()
    Hive.createWallet(null, this.getNetwork(), function(err, mnemonic){
      if(err) return emitter.emit('open-error', err);
      confirmPassphrasePage(mnemonic)
    })
  })

  return ractive
}

