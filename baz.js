// import the entire "foo" and "bar" modules
module foo from "foo";
module bar from "bar";

console.log(
  bar.hello("rhino")
); // Let me introduce: rhino

foo.awesome(); // LET ME INTRODUCE: HIPPO