// Generated by CoffeeScript 1.9.3
(function() {
  var EventEmitter, ObjectsRegistry, v8Util,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  EventEmitter = require('events').EventEmitter;

  v8Util = process.atomBinding('v8_util');

  ObjectsRegistry = (function(superClass) {
    extend(ObjectsRegistry, superClass);

    function ObjectsRegistry() {
      this.setMaxListeners(Number.MAX_VALUE);
      this.nextId = 0;
      this.storage = {};
      this.owners = {};
    }

    ObjectsRegistry.prototype.add = function(webContentsId, obj) {
      var base, base1, id;
      id = this.saveToStorage(obj);
      if ((base = this.owners)[webContentsId] == null) {
        base[webContentsId] = {};
      }
      if ((base1 = this.owners[webContentsId])[id] == null) {
        base1[id] = 0;
      }
      this.owners[webContentsId][id]++;
      return id;
    };

    ObjectsRegistry.prototype.get = function(id) {
      var ref;
      return (ref = this.storage[id]) != null ? ref.object : void 0;
    };

    ObjectsRegistry.prototype.remove = function(webContentsId, id) {
      var pointer;
      this.dereference(id, 1);
      pointer = this.owners[webContentsId];
      --pointer[id];
      if (pointer[id] === 0) {
        return delete pointer[id];
      }
    };

    ObjectsRegistry.prototype.clear = function(webContentsId) {
      var count, id, ref;
      this.emit("clear-" + webContentsId);
      if (this.owners[webContentsId] == null) {
        return;
      }
      ref = this.owners[webContentsId];
      for (id in ref) {
        count = ref[id];
        this.dereference(id, count);
      }
      return delete this.owners[webContentsId];
    };

    ObjectsRegistry.prototype.saveToStorage = function(object) {
      var id;
      id = v8Util.getHiddenValue(object, 'atomId');
      if (!id) {
        id = ++this.nextId;
        this.storage[id] = {
          count: 0,
          object: object
        };
        v8Util.setHiddenValue(object, 'atomId', id);
      }
      ++this.storage[id].count;
      return id;
    };

    ObjectsRegistry.prototype.dereference = function(id, count) {
      var pointer;
      pointer = this.storage[id];
      pointer.count -= count;
      if (pointer.count === 0) {
        v8Util.deleteHiddenValue(pointer.object, 'atomId');
        return delete this.storage[id];
      }
    };

    return ObjectsRegistry;

  })(EventEmitter);

  module.exports = new ObjectsRegistry;

}).call(this);