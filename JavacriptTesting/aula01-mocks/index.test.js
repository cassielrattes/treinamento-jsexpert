const { error } = require("./src/constants");
const { rejects, deepStrictEqual } = require("assert");
const File = require("./src/file");

(async () => {
  {
    const filePath = "./mocks/emptyFile-invalid.csv";
    const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE);
    const result = File.csvToJson(filePath);

    await rejects(result, rejection);
  }
  {
    const filePath = "./mocks/fourItems-invalid.csv";
    const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE);
    const result = File.csvToJson(filePath);

    await rejects(result, rejection);
  }
  {
    Date.prototype.getFullYear = () => 2020;
    const filePath = "./mocks/threeItems-valid.csv";
    const result = await File.csvToJson(filePath);
    const expected = [
      {
        id: 123,
        name: "Erick Wendel",
        profession: "Javascript Instructor",
        birthDay: 1995,
      },
      {
        id: 321,
        name: "Xuxa da Silva",
        profession: "Javascript Instructor",
        birthDay: 1940,
      },
      {
        id: 231,
        name: "Joaozinho",
        profession: "Java Developer",
        birthDay: 1990,
      },
    ];

    deepStrictEqual(JSON.stringify(result), JSON.stringify(expected));
  }
})();
