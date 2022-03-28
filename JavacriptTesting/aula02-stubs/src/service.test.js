const Service = require("./service");
const sinon = require("sinon");
const { deepStrictEqual } = require("assert");

const BASE_URL_1 = "https://swapi.dev/api/planets/1/";
const BASE_URL_2 = "https://swapi.dev/api/planets/2/";

const mocks = {
  tatooine: require("./mocks/tatooine.json"),
  alderaan: require("./mocks/alderaan.json"),
};

(async () => {
  {
    // const service = new Service();
    // const withoutStub = await service.makeRequest(BASE_URL_1);
    // console.log(JSON.stringify(withoutStub));
  }
  const service = new Service();
  const stub = sinon.stub(service, service.makeRequest.name);
  stub.withArgs(BASE_URL_1).resolves(mocks.tatooine);
  stub.withArgs(BASE_URL_2).resolves(mocks.alderaan);

  {
    const expected = {
      name: "Tatooine",
      surfaceWater: "1",
    };

    const actual = await service.getPlanets(BASE_URL_1);
    deepStrictEqual(actual, expected);
  }
  {
    const expected = {
      name: "Alderaan",
      surfaceWater: "40",
    };

    const actual = await service.getPlanets(BASE_URL_2);
    deepStrictEqual(actual, expected);
  }
})();
