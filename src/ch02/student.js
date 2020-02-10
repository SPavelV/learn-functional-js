class Person {
  constructor(firsname, lastname, ssn) {
    this._firstname = firsname;
    this._lastname = lastname;
    this._ssn = ssn;
    this._address = null;
    this._birthYear = null;
  }

  get ssn() {
    return this._ssn;
  }

  get firsname() {
    return this._firstname;
  }

  get lastname() {
    return this._lastname;
  }

  get address() {
    return this._address;
  }

  get birthYear() {
    return this._birthYear;
  }

  set birthYear(year) {
    this._birthYear = year;
  }

  set address(addr) {
    this._address = addr;
  }

  toString() {
    return `Person(${this._firstname}, ${this._lastname})`;
  }

  peopleInSameCountry(friends) {
    const result = [];
    for(let idx in friends) {
      const friend = friends[idx];
      if(this.address.country === friend.address.country) {
        result.push(friend);
      }
    }

    return result;
  }
}

class Student extends Person {
  constructor(firsname, lastname, ssn, school) {
    super(firsname, lastname, ssn);
    this._school = school;
  }

  get school() {
    return this._school;
  }

  studentsInSameCountryAndSchool(friends) {
    const closeFriends = super.peopleInSameCountry(friends);
    const result=[];

    for (let idx in closeFriends) {
      const friend = closeFriends[idx];
      if (friend.school === this.school){
        result.push(friend);
      }
    }

    return result;
  }
}

class Address {
  constructor(country, state, city, zip, street) {
    this._country = country;
    this._state = state;
    this._city = city;
    this._zip = zip;
    this._street = street;
  }

  get street() {
    return this._street;
  }

  get city() {
    return this._city;
  }

  get state() {
    return this._street;
  }

  get zip() {
    return this._zip;
  }

  get country() {
    return this._country;
  }
}

function zipCode(code, location) {
  let _code = code;
  let _location = location;

  return {
    code: function() {
      return _code;
    },
    location: function() {
      return _location;
    },
    fromString: function(str) {
      let parts = str.split('-');
      return zipCode(parts[0], parts[1]);
    },
    toString: function() {
      return _code + '-' + _location;
    }
  }
}

const curry = new Student('Haskell', 'Curry', '111-11-1111', 'Penn State');
curry.address = new Address('US');

const turing = new Student('Alan', 'Turing', '222-22-2222', 'Princeton');
turing.address = new Address('England');

const church = new Student('Alonzo', 'Crunch', '333-33-3333', 'Princeton');
church.address = new Address('US');

const kleene = new Student('Stephen', 'Kleene', '444-44-4444', 'Princeton');
kleene.address = new Address('US');

church.studentsInSameCountryAndSchool([curry, turing, kleene]);
// console.log('church.studentsInSameCountryAndSchool([curry, turing, kleene])', church.studentsInSameCountryAndSchool([curry, turing, kleene]));

function selector(country, school) {
  return function(student) {
    return student.address.country === country && student.school === school;
  }
}

const findStudentBy = function(friends, selector) {
  return friends.filter(selector);
}
// console.log(" findStudentBy([curry, turing, kleene], selector('US', 'Princeton')):", findStudentBy([curry, turing, kleene], selector('US', 'Princeton')));


// if use meta property writabel = fales
const person = Object.freeze(new Person('Haskell', 'Curry', '444-44-4444'));
person.firsname = 'Bob'; // error: Cannot assign to read only property '_firstname'

const personSecond = new Person('Haskell', 'Curry', '444-44-4444');
personSecond.address = new Address('US', 'NJ', 'Princeton', zipCode('08544', '1234'), 'Alexander St.');

personSecond = Object.freeze(person);

person.address._country = 'France'; // -> allowed!
person.address.country; // -> 'France's

const isObject = val => val && typeof val === 'object';

function deepFreeze(obj) {
  if(isObject(obj) && !Object.isFrozen(obj)) {
    Object.keys(obj).forEach(name => deepFreeze(obj[name]));
    Object.freeze(obj);
  }

  return obj;
}