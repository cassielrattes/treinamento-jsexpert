// # > true + 2
// 3

// # > true - 2
// -1

// # > '21' + true
// '21true'

// # > '21' - true
// 20

// # > 9999999999999999
// 10000000000000000

// # > 0.1 + 0.2 === 0.3
// false

// # > 3 > 2
// true

// # > 2 > 1
// true

// # > 3 > 2 > 1
// false

// # > '21' - - 1
// 22

// # > '1' == 1
// true

// # > '1' === 1
// false

// # > 3 > 2 >= 1
// true

// # > "B" + "a" + + "a" + "a"
// 'BaNaNa'

// --------------------

// # > String(123)
// '123'

// # > 123 + ''
// '123'

console.assert(String(123) === "123", "explicit convertion to string");
console.assert(123 + "" === "123", "implicit convertion to string");

const r = "hello" || 1;
console.log(r);
if (r) {
  console.log("Ae!");
}

console.assert(
  ("hello" || 123) === "hello",
  "|| returns the first element true!"
);

console.assert(
  ("hello" && 123) === 123,
  "&& returns the last element if first is true!"
);

// --------------------

const item = {
  name: "ErickWendel",
  age: 25,
  // string: 1 se não for primitivo, chama o valueOf
  toString() {
    console.log("hey");
    return `Name: ${this.name}, Age ${this.age}`;
  },
  // number: 1 se não for primitivo, chama o toString
  valueOf() {
    return { hey: "dude" };
  },
  // ele tem prioridade na parada!
  [Symbol.toPrimitive](coercionType) {
    console.log("trying to convert to", coercionType);
    const types = {
      string: JSON.stringify(this),
      number: "0007",
    };

    return types[coercionType] || types.string;
  },
};

// console.log("toString", String(item)); // Name: ErickWendel, Age 25
// // vai retornar um NaN pois o toString retornou a string
// console.log("valueOf", Number(item)); // 7

// // depois de adicionar o toPrimitive
// console.log("String", String(item)); // {"name":"ErickWendel","age":25}
// console.log("Number", Number(item)); // 7
// // chama a conversão default!
// console.log("Date", new Date(item));

console.assert(item + 0 === '{"name":"ErickWendel","age":25}0');

// console.log("!!item is true?", !!item);
console.assert(!!item);

// console.log("string.concat", "Ae".concat(item));
console.assert("Ae".concat(item) === 'Ae{"name":"ErickWendel","age":25}');

// console.log("implicit + explicit coercion (using ==)", item == String(item));
console.assert(item == String(item));

const item2 = { ...item, name: "Zezin", age: 20 };
console.log("New Object", item2);
