/* Task Description */
/* 
    Create a function constructor for Person. Each Person must have:
    *   properties `firstname`, `lastname` and `age`
        *   firstname and lastname must always be strings between 3 and 20 characters, containing only Latin letters
        *   age must always be a number in the range 0 150
            *   the setter of age can receive a convertible-to-number value
        *   if any of the above is not met, throw Error         
    *   property `fullname`
        *   the getter returns a string in the format 'FIRST_NAME LAST_NAME'
        *   the setter receives a string is the format 'FIRST_NAME LAST_NAME'
            *   it must parse it and set `firstname` and `lastname`
    *   method `introduce()` that returns a string in the format 'Hello! My name is FULL_NAME and I am AGE-years-old'
    *   all methods and properties must be attached to the prototype of the Person
    *   all methods and property setters must return this, if they are not supposed to return other value
        *   enables method-chaining
*/
function solve() {
    var Person = (function() {
        function Person(firstname, lastname, age) {
            if (typeof firstname !== 'string' || isNaN(age)) {
                throw 'Invalid arguments';
            }

            if (!validateName(firstname) || !validateName(lastname)) {
                throw 'Invalid name';
            }

            if (age * 1 < 0 || age * 1 > 150) {
                throw 'Invalid age';
            }

            this.age = age * 1;
            this.firstname = firstname;
            this.lastname = lastname;
            // this.__defineGetter__('fullname', function() {
            //     return this.firstname + ' ' + this.lastname;
            // });

            // this.__defineSetter__('fullname', function(val) {
            //     if (!validateName(val.split(' ')[0]) ||
            //         !validateName(val.split(' ')[1])) {
            //         throw 'Invalid name';
            //     }
            //     this.firstname = val.split(' ')[0];
            //     this.lastname = val.split(' ')[1];
            // });

        }

        Object.defineProperty(Person.prototype, 'fullname', {
            get: function() {
                return this.firstname + ' ' + this.lastname;
            },
            set: function(value) {
                if (!validateName(value.split(' ')[0]) ||
                    !validateName(value.split(' ')[1])) {
                    throw 'Invalid name';
                }
                this.firstname = value.split(' ')[0];
                this.lastname = value.split(' ')[1];
            },
            enumerable: true,
            configurable: true
        });

        Person.prototype.introduce = function() {
            return 'Hello! My name is ' +
                this.fullname + ' and I am ' +
                this.age +
                '-years-old';
        };

        function validateName(name) {
            if (name.length < 3 || name.length > 20) {
                return false;
            }
            if (name.split('').some(function(item) {
                    return (item < 'A' ||
                        (item > 'Z' && item < 'a') ||
                        (item > 'z'));
                })) {
                return false;
            }
            return true;
        }

        return Person;
    }());
    return Person;
}
module.exports = solve;

// var Person = solve();
// var test = new Person('Ivan', 'Ivanov', 25);
// test.fullname = 'Pesho Gosho';
// console.log(test.lastname);
