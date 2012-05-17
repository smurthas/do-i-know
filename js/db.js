var DB = {};

var store = {
  names:{},
  emails:{}
};

DB.saveName = function(name) {
  store.names[name] = true;
}
DB.saveEmail = function(email) {
  store.emails[email] = true;
}

DB.lookupName = function(name) {
  return store.names[name];
}
DB.lookupEmail = function(email) {
  return store.emails[email];
}
