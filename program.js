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


var o = {
    A: function() {
        console.log(this);
        
        B();
        
        function B() {
            console.log(this);
        }
    }
}

o.A();