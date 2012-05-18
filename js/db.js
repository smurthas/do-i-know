if (typeof DB === 'undefined') DB = {};

var store = {
  names:{},
  emails:{}
};

DB.saveName = function(name) {
  if(!name) return;
  name = name.toLowerCase();
  store.names[name] = true;
}
DB.saveEmail = function(email) {
  if(!email) return;
  email = email.toLowerCase();
  store.emails[email] = true;
}

DB.lookupName = function(name) {
  if(!name) return false;
  name = name.toLowerCase();
  return store.names[name];
}
DB.lookupEmail = function(email) {
  if(!email) return false;
  email = email.toLowerCase();
  return store.emails[email];
}

DB.dump = function() {
  return store;
}