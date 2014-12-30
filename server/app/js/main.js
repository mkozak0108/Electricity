pointers.remove({});
Meteor.onConnection(function (connection) {
  pointers.insert({createdBy: connection.id});
  connection.onClose(function () {
    pointers.remove({createdBy: connection.id})
  });
});
Meteor.methods({
  mouseMove: function (x, y) {
    pointers.update({createdBy: this.connection.id}, {createdBy: this.connection.id, x: x, y: y})
  }
});
