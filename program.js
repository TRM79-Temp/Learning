//  // **********
//  // Just Test.
//  //
//
//  document.writeln('Hello, world!');


//  // ********************
//  // The *method* Method.
//  //
//
//  Function.prototype.method = function (name, func) {
//      this.prototype[name] = func;
//      return this;
//  };
//
//  String.method('carramba', function() {
//      console.log(this);
//      console.log('** Carramba!');
//  });
//
//  Number.method('zumba', function() {
//      console.log(this);
//      console.log('** Zumba!');
//  });
//
//  (function(){
//      console.log('Testing the string\'s \'carramba\' method.');
//      var s = 'qwe';
//      s.carramba();
//
//      console.log('Testing the numbers\'s \'zumba\' method.');
//      var n = 1;
//      n.zumba();
//      2['zumba']();
//  })();


//  // ***************************
//  // Test numbers in E-notation.
//  //
//
//  (function() {
//      var n1 = 1.34e3;
//      var n2 = 2.56E-2;
//      console.log('1.34e3 :');
//      console.log(n1);
//      console.log('2.56E-2 :');
//      console.log(n2);
//  })();


//  //
//  // Prototypes.
//  //
//
//  function A() {
//  };
//
//  var b = {
//      c: 0
//  };
//
//  (function() {
//      console.log('Object');
//      console.log(Object);
//      
//      console.log('Object.create');
//      console.log(Object.create);
//      
//      console.log('Object.prototype');
//      console.log(Object.prototype);
//      
//      console.log('Function');
//      console.log(Function);
//      
//      console.log('A');
//      console.log(A);
//      console.log(A.prototype);
//      
//      console.log('b');
//      console.log(b);
//      console.log(b.prototype);
//      console.log(b.__proto__);
//      
//      console.log('String');
//      console.log(String);
//      
//      console.log('Number');
//      console.log(Number);
//      
//      console.log('Boolean');
//      console.log(Boolean);
//      
//      console.log('Array');
//      console.log(Array);
//  })();


//  Object.prototype.mmm = function() {
//      console.log('** mmm.');
//  };
//
//  String.prototype.sss = function(a) {
//      console.log('** sss:');
//      console.log(a);
//      console.log(this);
//      console.log('-------');
//  };
//
//  (function() {
//      'qwe'.mmm();
//
//      1['sss'];
//
//      true['sss']
//
//      'qwe'['sss']();
//      'qwe'.sss('q');
//  })();



//  var stooge = {};
//
//  if (typeof Object.create !== 'function') {
//      console.log('** Defining of Object.create.');
//      Object.create = function (o) {
//          var F = function () {};
//          F.prototype = o;
//          return new F();
//      };
//  }
//  else {
//      console.log('** Object.create is already defined.');
//  }
//
//  var another_stooge = Object.create(stooge);


//  var o = {
//      c: 1
//  };
//
//  var o2 = Object.create(o);
//
//  o2.c2 = 100500;
//
//  console.log(o2.c2);
//  console.log(o.c2);
//  console.log(o.c3);


//  function A() {};
//
//  console.log(typeof A);


//  var o = {
//      c: 1
//  };
//
//  for (var f in o) {
//      console.log(f);
//  }
//
//  console.log('**');
//  console.log(o.__proto__.constructor);
//
//  console.log('**');
//  for (var f in o.__proto__.constructor) {
//      console.log(f);
//  }


//  //
//  // Working with functions.
//  //
//
//  function outer(n) {
//      var c = 1;
//
//      return function(a, b) {
//          c++;
//          console.log('In the returned function: a = ' + a + ', b = ' + b + ', c = ' + c + ', n = ' + n + '.');
//      }
//  }
//
//  var f = outer(20);
//
//  f(1, 2);
//  f(3, 4);
//  f(5, 6);


//  function A() {
//      var that = this;
//      console.log(this);
//
//      B();
//
//      function B() {
//          console.log(this);
//          console.log(that === this); // true
//      }
//  }
//
//  A();


//  var o = {
//      A: function() {
//          console.log(this);
//
//          B();
//
//          function B() {
//              console.log(this);
//          }
//      }
//  }
//
//  o.A();


//  function Q(s) {
//      this.v = s;
//      this.f = function() {
//          console.log(this);
//          console.log(this.v);
//      }
//      return 7;
//  }
//  
//  (function testWithNew() {
//      console.log('With new:');
//  
//      var o = new Q('qwe');
//      o.f();
//      
//      console.log('-------');
//  })();
//  
//  (function testWithoutNew() {
//      console.log('Without new:');
//  
//      var o = Q('qwe');
//      o.f();
//      f();
//      
//      console.log('-------');
//  })();


//  var walk_the_DOM = function walk(node, func) {
//      func(node);
//      node = node.firstChild;
//      while (node) {
//          walk(node, func);
//          node = node.nextSibling;
//      }
//  };
//  
//  var getElementsByAttribute = function (att, value) {
//      var results = [];
//  
//      walk_the_DOM(document.body, function (node) {
//          var actual = node.nodeType === 1 && node.getAttribute(att);
//          if (typeof actual === 'string' &&
//                  (actual === value || typeof value !== 'string')) {
//              results.push(node);
//          }
//      });
//  
//      return results;
//  };
//  
//  var list = getElementsByAttribute('width', '150px');


//  var o = {};
//  var proto = Object.getPrototypeOf(o);
//  
//  console.log('Object');
//  console.log(Object);
//  
//  console.log('proto');
//  console.log(proto);
//  
//  console.log('proto.constructor');
//  console.log(proto.constructor);


//  var a = {
//      propA: null
//  };
//  
//  var b = Object.create(a);
//  b.propB = null;
//  
//  console.log('b');
//  console.log(b);
//  
//  var protoB = Object.getPrototypeOf(b);
//  
//  console.log('protoB');
//  console.log(protoB);
//  
//  showPrototype(b, '  b:');
//  showPrototype(Object, '  Object:');
//  
//  
//  function showPrototype(o, message) {
//      console.log('---------------------');
//      console.log('  Prorotype  chain.  ');
//      console.log(message)
//  
//      getPrototypeChain(o);
//  
//      function getPrototypeChain(obj) {
//          showOne(obj);
//          do {
//              console.log('[prototype] ▼ ');
//              obj = Object.getPrototypeOf(obj);
//              showOne(obj);
//          } while (obj !== Object.prototype);
//          
//          function showOne(o) {
//              console.log(o);
//          }
//      }
//  }


//  function f(message1, message2) {
//      console.log((this.name ? this.name : '(no name)') + ': ' + message1 + ', ' + message2 + '.');
//  }
//  
//  var o = {
//      name: 'Roman'
//  }
//  
//  f.apply(o, ['Q', 'q']);
//  f.call(o, 'W', 'w');
//  f.call(null, 'E', 'e');


//  function Person(first, last, age, gender, interests) {
//    this.name = {
//      first,
//      last
//    };
//    this.age = age;
//    this.gender = gender;
//    this.interests = interests;
//  };
//  
//  Person.prototype.greeting = function() {
//    alert('Hi! I\'m ' + this.name.first + '.');
//  };
//  
//  function Teacher(first, last, age, gender, interests, subject) {
//    Person.call(this, first, last, age, gender, interests);
//  
//    this.subject = subject;
//  }
//  
//  Teacher.prototype = Object.create(Person.prototype);
//  
//  Teacher.prototype.constructor = Teacher;


function A() {
}

console.log(A);
console.log('A');

console.log('A.prototype');
console.log(A.prototype);

console.log('A.prototype.constructor');
console.log(A.prototype.constructor);
