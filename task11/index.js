const array = [
    8,
    "55",
    [
      2,
      "Hello World",
      {
        a: 2,
        b: 5,
      },
    ],
    false,
    {
      arr: [true, 1, NaN, new Array(2, 33)],
      test: null,
      obj: { d: "Moha", last: [2, false, undefined] },
    },
  ];
  
  const  [a , b , c , d , { arr: [ n0, n1, n2, [c0,number]], test , obj: { d: name ,last: [v0,v1,v2] } }] = array;
 
 // console.log(v0);
  console.log(number); 
  console.log(name); 