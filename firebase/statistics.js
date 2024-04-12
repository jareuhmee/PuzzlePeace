import { getEntriesByChild } from "./requests";

const currentDate = new Date();
//takes global call for child's entry data, filters based on time frame
/**
 * 
 * @param {String} timeFrame 
 * @param {JSON} childEntries 
 * @returns {JSON}
 */
function filterByDate(timeFrame, childEntries){
    //calculate offset
    var dateOffset = 0;
    switch(timeFrame){
        case "1W":
            dateOffset = 7;
            break;
        case "1M":
            dateOffset = 30;
            break;
        case "3M":
            dateOffset = 91;
            break;
        case "6M":
            dateOffset = 182;
            break;
        case "1Y":
            dateOffset = 365;
            break;
        default:
            break;
    }
    var dateCutoff = new Date(currentDate);
    dateCutoff.setDate(currentDate.getDate() - dateOffset);
    filteredEntries = childEntries.filter(entry => {
        var date = new Date(entry.date);
        return date >= dateCutoff;
    });
    return filteredEntries;
}
/**
 * @summary     Computes necessary statistics for data visualization tab
 * @description analyzeData retrieves all entries for a particular child and computes necessary statistics
 * to be visualized in PuzzlePeace's "tab" section
 * @param {String} timeFrame 
 * @param {int} childID
 */
export function analyzeData(timeFrame, childID){
    var entries = getEntriesByChild(childID);
    entries = filterByDate(timeFrame, entries);
    var analyzedData = data;
    analyzedData.totalBreakdowns = filteredEntries.size();
    //get most common triggers, resolutions, behaviors
    //for each entry's tbr arrays:
        //
    var talliedTriggers = {};
    var talliedBehaviors = {};
    var talliedResolutions = {};
    entries.forEach((entry) => {
        var triggers = entries.triggers;
        var behaviors = entries.behaviors;
        var resolutions = entries.resolutions;
        triggers.forEach(trigger => {
            talliedTriggers[trigger] = (talliedTriggers[trigger] + 1) || 1;
        })
        behaviors.forEach(behavior => {
            talliedBehaviors[behavior] = (talliedBehaviors[behavior] + 1) || 1;
        })
        resolutions.forEach(resolution => {
            talliedResolutions[resolution] = (talliedResolutions[resolution] + 1) || 1;
        })
    })

}
//methods to:
/**
  - get entries within certain timeframe
  - compute total meltdowns across timeframes (No. entries)
  - computer total meltdowns across time intervals 
  - rank triggers
  - rank behaviors
  - rank resolutions
  - ^^^^^^ create key-value pairs, increment counts for each events

 */
/**
 * cases: 
 * 
 * 1W: -> numEntries per day(x axis - 3/22 to 3/27)
 * 1M: numEntries / week
 */
//required information
/**
 - time range
 - name of child
 - reports + info
 */

 //other cases:
 /*
 - limit based on acc creation
 - options for range beyond time user has existed, return smallest time frame
 */
//mockData

const timeFrames = ["1W", "1M", "3M", "6M", "1Y"];
export const statistics = { //example: 1 month

    child: "Jenna",
    timeRange: "1M",
    startDate: "Feb 22",
    endDate: "Mar 22",
    totalMeltdowns: 8,
    mostCommonTrigger: "Loud Environments",
    averageDuration: "30m",
    mostUsedResolution: "Fidget Toys",
    
    barGraph: {
        
    },
    pieChartTriggers: {

    },
    pieChartBehaviors: {

    },
    pieChartResolutions: {

    }

}