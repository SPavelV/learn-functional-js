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

const princetonZip = zipCode('08544', '3345');
console.log('princetonZip.toString:', princetonZip.toString());

function coordinate(lat, long) {
  let _lat = lat;
  let _long = long;

  return {
    latitude: function() {
      return _lat;
    },
    longitude: function() {
      return _long;
    }, 
    translate: function(dx, dy) {
      return coordinate(_lat + dx, _long + dy);
    },
    toString: function() {
      return '(' + _lat + ',' +  _long + ')';
    }
  }
}

const greenwich = coordinate(51.4778, 0.0015);
console.log('greenwich.toString():', greenwich.toString());

console.log('greenwich.translate(10, 10).toString():', greenwich.translate(10, 10).toString());
