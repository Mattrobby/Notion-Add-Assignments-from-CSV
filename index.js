const fs = require('fs');
const createAssignmentPage = require('./notion'); 

//Read the CSV file
fs.readFile('assignments.csv', 'utf-8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    //Parse the CSV data into an array of objects
    const assignments = data.split('\n').map(row => {
        const columns = row.split(',');
        return {
            assignmentName: columns[0],
            dueDate: columns[1],
            doOn: columns[2],
            assignmentType: columns[3] 
        };
    });

    //For each assignment, execute the createAssignmentPage function
    assignments.forEach(assignment => {
        console.log(`Creating assignment page for "${assignment.assignmentName}" with due date ${assignment.dueDate} with action ${assignment.doOn} and assignment type "${assignment.assignmentType}"`);
        
        createAssignmentPage(assignment.assignmentName, assignment.dueDate, assignment.doOn, assignment.assignmentType);
    });

    return assignments; 
});




