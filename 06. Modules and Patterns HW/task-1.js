/* Task Description */
/* 
 * Create a module for a Telerik Academy course
 * The course has a title and presentations
 * Each presentation also has a title
 * There is a homework for each presentation
 * There is a set of students listed for the course
 * Each student has firstname, lastname and an ID
 * IDs must be unique integer numbers which are at least 1
 * Each student can submit a homework for each presentation in the course
 * Create method init
 * Accepts a string - course title
 * Accepts an array of strings - presentation titles
 * Throws if there is an invalid title
 * Titles do not start or end with spaces
 * Titles do not have consecutive spaces
 * Titles have at least one character
 * Throws if there are no presentations
 * Create method addStudent which lists a student for the course
 * Accepts a string in the format 'Firstname Lastname'
 * Throws if any of the names are not valid
 * Names start with an upper case letter
 * All other symbols in the name (if any) are lowercase letters
 * Generates a unique student ID and returns it
 * Create method getAllStudents that returns an array of students in the format:
 * {firstname: 'string', lastname: 'string', id: StudentID}
 * Create method submitHomework
 * Accepts studentID and homeworkID
 * homeworkID 1 is for the first presentation
 * homeworkID 2 is for the second one
 * ...
 * Throws if any of the IDs are invalid
 * Create method pushExamResults
 * Accepts an array of items in the format {StudentID: ..., Score: ...}
 * StudentIDs which are not listed get 0 points
 * Throw if there is an invalid StudentID
 * Throw if same StudentID is given more than once ( he tried to cheat (: )
 * Throw if Score is not a number
 * Create method getTopStudents which returns an array of the top 10 performing students
 * Array must be sorted from best to worst
 * If there are less than 10, return them all
 * The final score that is used to calculate the top performing students is done as follows:
 * 75% of the exam result
 * 25% the submitted homework (count of submitted homeworks / count of all homeworks) for the course
 */

function solve() {
    var Course = {
            init: function(title, presentations) {
                this.title = title;
                this.presentations = presentations;
                presentationsCount = presentations.length;
                this.students = [];
                studentIDs = 0;
                return this;
            },
            addStudent: function(name) {
                var names = name.split(' ');
                studentIDs += 1;
                if (!isNameValid(name)) {
                    throw 'Invalid name';
                }
                this.students.push({
                    firstname: names[0],
                    lastname: names[1],
                    id: studentIDs
                });

                return studentIDs;
            },
            getAllStudents: function() {
                return this.students.slice();
            },
            submitHomework: function(studentID, homeworkID) {
                if (!isStudentIdValid(studentID) || !isHomeworkIdValid(homeworkID)) {
                    throw 'Invalid ID';
                }
            },
            pushExamResults: function(results) {
                if (!isExamResultsValid(results)) {
                    throw 'Invalid results';
                }
            },
            getTopStudents: function() {}
        },
        studentIDs = 0,
        presentationsCount = 0,
        examResults = [];


    Object.defineProperty(Course, 'title', {
        get: function() {
            return Course._title;
        },
        set: function(value) {
            if (!isTitleValid(value)) {
                throw 'Invalid title';
            }
            Course._title = value;
        }
    });

    Object.defineProperty(Course, 'presentations', {
        get: function() {
            return Course._presentations;
        },
        set: function(value) {
            if (!isPresentationsArrayValid(value)) {
                throw 'Invalid presentations';
            }
            Course._presentations = value;
        }
    });

    function isExamResultsValid(results) {
        var i,
            j,
            len;
        if (!(results instanceof Array)) {
            return false;
        }
        if (results.some(function(item) {
                return (isNaN(item.StudentID) || isNaN(item.score) || item.StudentID < 1 || item.StudentID > studentIDs);
            })) {
            return false;
        }

        for (i = 0, len = results.length; i < len; i += 1) {
            for (j = i + 1; j < len; j += 1) {
                if (results[i].StudentID === results[j].StudentID) {
                    return false;
                }
            }
        }

        return true;
    }

    function isTitleValid(title) {
        if (title.length === 0 || (title !== title.trim()) || title.match(/\s{2,}/)) {
            return false;
        }
        return true;
    }

    function isPresentationsArrayValid(array) {
        if (array.length === 0 || array.some(function(item) {
                return !isTitleValid(item);
            })) {
            return false;
        }
        return true;
    }

    function isNameValid(name) {
        var nameArray;
        if (typeof name !== 'string') {
            return false;
        }
        nameArray = name.split(' ');
        if (nameArray.length !== 2) {
            return false;
        }

        if (nameArray.some(function(item) {
                if (item.length > 1) {
                    return !(/[A-Z]/.test(item[0]) && /^[a-z]/.test(item.substring(1)));
                } else {
                    return !(/[A-Z]/.test(item));
                }

            })) {
            return false;
        }
        return true;
    }

    function isStudentIdValid(studentID) {
        if (isNaN(studentID) || studentID < 1 || studentID > studentIDs || (studentID !== (studentID | 0))) {
            return false;
        }
        return true;
    }

    function isHomeworkIdValid(homeworkID) {
        if (isNaN(homeworkID) || homeworkID < 1 || homeworkID > presentationsCount || (homeworkID !== (homeworkID | 0))) {
            return false;
        }
        return true;
    }

    return Course;
}


var test = solve();
var testCourse = test.init('Course title', ['p1', 'p2', 'p3']);
testCourse.addStudent('Ivan Ivanov');
console.log(testCourse.students);
console.log(testCourse.getAllStudents());


module.exports = solve;
