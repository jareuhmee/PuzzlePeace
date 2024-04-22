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
import { getStorage, ref as storageRef, uploadBytes } from "firebase/storage";
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

/*##################### CHILD REQUESTS #####################*/
export function createChild(
  childName,
  age,
  commonTriggers,
  commonBehaviors,
  commonResolutions,
  entries,
  parentID,
  profilePicture
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
    profilePicture: profilePicture,
    //initialize statistics
    totalMeltdowns: 0,
    mostCommonTrigger: "n/a",
    averageIntensity: 0,
    mostUsedResolution: "n/a",
    talliedTriggers: false,
    talliedBehaviors: false,
    talliedResolutions: false,
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
  return childRef.key;
}
export function updateChild(
  childID,
  childName,
  age,
  commonTriggers,
  commonBehaviors,
  commonResolutions,
  entries,
  parentID,
  profilePicture
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
    profilePicture: profilePicture,
  };
  set(childRef, child)
    .then(() => {
      console.log("child successfully updated");
    })
    .catch((error) => {
      console.error("child update not successful", error);
    });
}

export function updateChildOnNewEntry(updates, childID) {
  const db = getDatabase(app);
  const childRef = ref(db, "/Children/" + childID);
  console.log("in updateChildOnNewEntry");
  const {
    totalMeltdowns,
    averageIntensity,
    mostCommonTrigger,
    mostUsedResolution,
    talliedTriggers,
    talliedBehaviors,
    talliedResolutions,
  } = updates;
  update(childRef, updates)
    .then(() => {
      console.log("child successfully updated on new entry");
    })
    .catch((error) => {
      console.error("child update not successful", error);
    });
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
export async function createEntry(
  date,
  time_entry,
  time_experience,
  intensity,
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
    intensity: intensity,
    location: location,
    triggers: triggers,
    behaviors: behaviors,
    resolutions: resolutions,
    notes: notes,
    childID: childID,
  };
  await set(entryRef, entry);

  const childEntryRef = ref(db, "/Children/" + childID + "/entries");
  await push(childEntryRef, entryRef.key);

  await updateStatistics(entry, childID);
}
export function updateEntry(
  entryID,
  date,
  time_entry,
  time_experience,
  duration,
  intensity,
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
    intensity: intensity,
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

  return new Promise((resolve, reject) => {
    onValue(
      entryRef,
      (snapshot) => {
        if (snapshot.exists()) {
          resolve(snapshot.val());
        } else {
          reject(new Error("Entry not found"));
        }
      },
      (error) => {
        reject(error);
      }
    );
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

//
/**
 * @summary update child's general statistics upon creating a new entry
 * @param {Object} entry
 * @param {String} childID
 * @returns {JSON} updates
 */
export async function updateStatistics(entry, childID) {
  var updates = new Object();
  var { intensity, triggers, behaviors, resolutions } = entry;
  getChild(childID)
    .then((childData) => {
      if (childData) {
        console.log("getChild successful");
        var {
          totalMeltdowns,
          averageIntensity,
          mostCommonTrigger,
          mostUsedResolution,
          talliedTriggers,
          talliedBehaviors,
          talliedResolutions,
        } = childData;
        console.log("totalMeltdowns: " + totalMeltdowns);
        if (!talliedTriggers) {
          talliedTriggers = new Object();
        }
        if (!talliedBehaviors) talliedBehaviors = new Object();
        if (!talliedResolutions) {
          talliedResolutions = new Object();
        }
        //update both averageIntensity and total Meltdowns
        averageIntensity =
          (averageIntensity * totalMeltdowns + intensity) /
          (totalMeltdowns + 1);
        totalMeltdowns++;

        //tabulate entries
        triggers.forEach((trigger) => {
          talliedTriggers[trigger] = talliedTriggers[trigger]
            ? talliedTriggers[trigger] + 1
            : 1;
          //check for most common trigger change
          if (
            !talliedTriggers[mostCommonTrigger] ||
            talliedTriggers[trigger] > talliedTriggers[mostCommonTrigger]
          ) {
            mostCommonTrigger = trigger;
          }
        });
        behaviors.forEach((behavior) => {
          talliedBehaviors[behavior] = talliedBehaviors[behavior]
            ? talliedBehaviors[behavior] + 1
            : 1;
        });
        resolutions.forEach((resolution) => {
          talliedResolutions[resolution] = talliedResolutions[resolution]
            ? talliedResolutions[resolution] + 1
            : 1;
          //check for most used resolution change
          if (
            !talliedResolutions[mostUsedResolution] ||
            talliedResolutions[resolution] >
              talliedResolutions[mostUsedResolution]
          ) {
            mostUsedResolution = resolution;
          }
        });
        updates["totalMeltdowns"] = totalMeltdowns;
        updates["averageIntensity"] = averageIntensity;
        updates["mostCommonTrigger"] = mostCommonTrigger;
        updates["mostUsedResolution"] = mostUsedResolution;
        updates["talliedTriggers"] = talliedTriggers;
        updates["talliedBehaviors"] = talliedBehaviors;
        updates["talliedResolutions"] = talliedResolutions;
        console.log("updates: " + JSON.stringify(updates));
        return updates;
      } else {
        console.error((error) => ("getChild not successful: ", error));
      }
    })
    .then((updates) => {
      console.log("updates in second then chain: ", JSON.stringify(updates));
      updateChildOnNewEntry(updates, childID);
    })
    .catch((error) => {
      console.error("getChild not successful:", error);
    });
}
/*##################### PROFILE PHOTO(S) ###################*/
export async function uploadChildProfilePicture(childID, file) {
  const storage = getStorage(app);
  const picRef = storageRef(storage, `profile_pictures/children/${childID}`);
  await uploadBytes(picRef, file);
  console.log("Child profile picture uploaded successfully");
}
