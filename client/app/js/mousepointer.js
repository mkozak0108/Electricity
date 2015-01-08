Template.bolt.helpers({
  pointers: function () {
    return pointers.find({}).map(function(el){
      el.x = el.x-40;
      el.y = el.y-40;
      return el;
    });
  }
});