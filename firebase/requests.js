import { app, auth } from "./firebase.js";
import {
  getDatabase,
  onValue,
  ref,
  set,
  remove,
  get,
  push,
  update,
  query,
  isEqual,
  orderByChild,
  child,
} from "firebase/database";
/*##################### USER REQUESTS ###################*/
export function createUser(userID, email, firstName, children) {
  const db = getDatabase(app);
  const userRef = ref(db, `/Users/${userID}`);
  const user = {
    email: email,
    firstName: firstName,
    children: children,
  };

  try {
    set(userRef, user);
    console.log("User created successfully");
  } catch (error) {
    console.error("Error creating user:", error);
  }
}

export function updateUser(userID, email, firstName, lastName, children) {
  const db = getDatabase(app);
  const userRef = ref(db, "/Users/" + userID);
  const user = {
    email: email,
    firstName: firstName,
    lastName: lastName,
    children: children,
  };
  set(userRef, user);
}
export function getUser(userID) {
  const db = getDatabase(app);
  const userRef = ref(db, "/Users/" + userID);

  return new Promise((resolve, reject) => {
    onValue(
      userRef,
      (snapshot) => {
        if (snapshot.exists()) {
          resolve(snapshot.val());
        } else {
          reject(new Error("User not found"));
        }
      },
      (error) => {
        reject(error);
      }
    );
  });
}
// export function deleteUser(userID){
//   const db = getDatabase(app);
//   remove(ref(db, '/Users' + userID));
// }

/*##################### CHILD REQUESTS #####################*/
export function createChild(
  childName,
  age,
  commonTriggers,
  commonBehaviors,
  commonResolutions,
  entries,
  parentID
) {
  const db = getDatabase(app);
  var child = {
    childName: childName,
    age: age,
    commonTriggers: commonTriggers,
    commonBehaviors: commonBehaviors,
    commonResolutions: commonResolutions,
    entries: entries,
    parentID: parentID,
  };
  const listRef = ref(db, "/Children/");
  const childRef = push(listRef);
  set(childRef, child);

  // add to parent list;
  const parentChildrenRef = ref(
    db,
    "/Users/" + parentID[0] + "/children/" + childRef.key
  );
  set(parentChildrenRef, true); // true indicates primary caregiver
}
export function updateChild(
  childID,
  childName,
  age,
  commonTriggers,
  commonBehaviors,
  commonResolutions,
  entries,
  parentID
) {
  const db = getDatabase(app);
  const childRef = ref(db, "/Children/" + childID);
  var child = {
    childName: childName,
    age: age,
    commonTriggers: commonTriggers,
    commonBehaviors: commonBehaviors,
    commonResolutions: commonResolutions,
    entries: entries,
    parentID: parentID,
  };
  set(childRef, child);
}
export function getChild(childID) {
  const db = getDatabase(app);
  const childRef = ref(db, "/Children/" + childID);

  return new Promise((resolve, reject) => {
    onValue(
      childRef,
      (snapshot) => {
        if (snapshot.exists()) {
          resolve(snapshot.val());
        } else {
          reject(new Error("Child not found"));
        }
      },
      (error) => {
        reject(error);
      }
    );
  });
}

/*##################### ENTRY REQUESTS ################### */
export function createEntry(
  date,
  time_entry,
  time_experience,
  severity,
  location,
  triggers,
  behaviors,
  resolutions,
  notes,
  childID
) {
  const db = getDatabase(app);
  const listRef = ref(db, "/Entries/");
  const entryRef = push(listRef);
  const entry = {
    date: date,
    time_entry: time_entry,
    time_experience: time_experience,
    severity: severity,
    location: location,
    triggers: triggers,
    behaviors: behaviors,
    resolutions: resolutions,
    notes: notes,
    childID: childID,
  };
  set(entryRef, entry);
  // add to child entry list
  const childEntryRef = ref(db, "/Children/" + childID + "/entries");
  push(childEntryRef, entryRef.key);
}
export function updateEntry(
  entryID,
  date,
  time_entry,
  time_experience,
  duration,
  severity,
  location,
  triggers,
  behaviors,
  resolutions,
  notes,
  childID
) {
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
    childID: childID,
  };
  set(entryRef, entry);
}
export function getEntry(entryID) {
  const db = getDatabase(app);
  const entryRef = ref(db, "/Entries/" + entryID);
  onValue(entryRef, (snapshot) => {
    return snapshot.val();
  });
}
/**
 *
 * @param {int}    childID  ID of child whos entries are returned
 * @returns {JSON} queried children's entries
 */
export function getEntriesByChild(childID) {
  const db = getDatabase(app);
  const childEntriesRef = query(
    ref(db, "/Entries/"),
    orderByChild("childID"),
    equalTo(childID)
  );
  return get(childEntriesRef).val();
}

//notes: filtering may be harder
//idea: keep entries as a global variable, call request once
//take entries into statistics and filter based on date range
// export function removeEntry(entryID){
//   const db = getDatabase(app);
//   //detach from child entry
//   //get child id,
//   var childID = get(ref(db, '/Entries' + entryID)).childID;
//   const childRef = ref(db, '/Children' + childID);

// }
