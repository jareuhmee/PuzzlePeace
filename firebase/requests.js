import {app, auth} from "./firebase/firebase.js"
import {getDatabase, onValue, ref, set, remove, get, push, update} from "firebase/database"

/*##################### USER REQUESTS ###################*/
export function createUser(userID, email, firstName, lastName, children){
  //Future update: connect to user auth account; reference register.js
  //add updates to parent/child entries
  const db = getDatabase(app);
  const listRef = ref(db, '/Users');
  const userRef = push(listRef, userID);
  const user = {
    email: email,
    firstName: firstName,
    lastName: lastName,
    children: children
  };
  set(userRef, user);
}
export function updateUser(userID, email, firstName, lastName, children){
  const db = getDatabase(app);
  const userRef = ref(db, "/Users/" + userID);
  const user = {
    email: email,
    firstName: firstName,
    lastName: lastName,
    children: children
  };
  set(userRef, user)
}
export function getUser(userID){
  const db = getDatabase(app);
  const userRef = ref(db, '/Users/' + userID);
  onValue(userRef, (snapshot) => {
    return snapshot.val();  //handle later; why do we not have to catch for errors here?
  })
}
// export function deleteUser(userID){
//   const db = getDatabase(app);
//   remove(ref(db, '/Users' + userID));
// }

/*##################### CHILD REQUESTS #####################*/
export function createChild(childName, age, commonTriggers, 
  commonBehaviors, commonResolutions, entries, parentID){
  const db = getDatabase(app);
  var child = {
    childName: childName,
    age: age,
    commonTriggers: commonTriggers,
    commonBehaviors: commonBehaviors, 
    commonResolutions: commonResolutions,
    entries: entries,
    parentID: parentID
  };
  const listRef = ref(db, '/Children/');
  const childRef = push(listRef);
  set(childRef, child);
  //add to parent list;
  const parentChildrenRef = ref(db, '/Users/' + parentID + "/children");
  const childLink = push(parentChildrenRef, childRef);
  set(childLink, true);
  }
export function updateChild(childID, childName, age, commonTriggers, 
  commonBehaviors, commonResolutions, entries, parentID){
  const db = getDatabase(app);
  const childRef = ref(db, "/Children/" + childID);
  var child = {
    childName: childName,
    age: age,
    commonTriggers: commonTriggers,
    commonBehaviors: commonBehaviors, 
    commonResolutions: commonResolutions,
    entries: entries,
    parentID: parentID
  };
  set(childRef, child);
}
export function getChild(childID){
  const db = getDatabase(app);
  const childRef = ref(db, '/Entries/' + childID);
  onValue(childRef, (snapshot) => {
    return snapshot.val();
  })
}
/*##################### ENTRY REQUESTS ################### */
export function createEntry(date, time_entry, time_experience, duration,
  severity, location, triggers, behaviors, resolutions, notes, childID){
  const db = getDatabase(app);
  const listRef = ref(db, '/Entries/');
  const entryRef = push(listRef);
  const entry = {
    date: date,
    time_entry: time_entry,
    time_experience: time_experience, 
    duration: duration,
    severity: severity,
    location: location,
    triggers: triggers,
    behaviors: behaviors,
    resolutions: resolutions,
    notes: notes,
    childID: childID
  }
  set(entryRef, entry);
  //add to child entry list
  const childEntryRef = ref(db, '/Children/' + childID + "/entries");
  const entryLink = push(childEntryRef, entryRef);
  set(entryLink, true); 
}
export function updateEntry(entryID, date, time_entry, time_experience, duration,
  severity, location, triggers, behaviors, resolutions, notes, childID){
  const db = getDatabase(app);
  const entryRef = ref(db, "/Entries/" + entryID);
  const entry = {
    date: date,
    time_entry: time_entry,
    time_experience: time_experience, 
    duration: duration,
    severity: severity,
    location: location,
    triggers: triggers,
    behaviors: behaviors,
    resolutions: resolutions,
    notes: notes,
    childID: childID
  };
  set(entryRef, entry);
}
export function getEntry(entryID){
  const db = getDatabase(app);
  const entryRef = ref(db, '/Entries/' + entryID);
  onValue(entryRef, (snapshot) => {
    return snapshot.val();
  })
}
// export function removeEntry(entryID){
//   const db = getDatabase(app);
//   //detach from child entry
//   //get child id,
//   var childID = get(ref(db, '/Entries' + entryID)).childID;
//   const childRef = ref(db, '/Children' + childID);

// }



