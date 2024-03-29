// Generated by CoffeeScript 1.9.3
(function() {
  var binding, ipc, v8Util,
    slice = [].slice;

  binding = process.atomBinding('ipc');

  v8Util = process.atomBinding('v8_util');

  ipc = v8Util.getHiddenValue(global, 'ipc');

  ipc.send = function() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    return binding.send('ipc-message', slice.call(args));
  };

  ipc.sendSync = function() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    return JSON.parse(binding.sendSync('ipc-message-sync', slice.call(args)));
  };

  ipc.sendToHost = function() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    return binding.send('ipc-message-host', slice.call(args));
  };

  ipc.sendChannel = ipc.send;

  ipc.sendChannelSync = ipc.sendSync;

  module.exports = ipc;

}).call(this);
