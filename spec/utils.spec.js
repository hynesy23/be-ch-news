const { expect } = require("chai");
const {
  formatDates,
  makeRefObj,
  formatComments
} = require("../db/utils/utils");

describe("formatDates", () => {
  it("Sould return an empty array when passed an empty object", () => {
    const input = [];
    const actualResult = formatDates(input);
    expectedResult = [];
    expect(actualResult).to.eql(expectedResult);
  });
  it("Should take a given property from object in array and reassign it to valid timestamp", () => {
    const input = [{ articleName: "Wise words", created_at: 1542284514171 }];
    const keyToChange = "created_at";
    const actualResult = formatDates(input, keyToChange);
    const dateVariable = new Date(1542284514171);
    expect(dateVariable).to.eql(actualResult[0].created_at);
  });
  it("Should not mutate oringal array", () => {
    const input = [{ articleName: "Wise words", created_at: 1542284514171 }];
    const keyToChange = "created_at";
    const actualResult = formatDates(input, keyToChange);
    expect(actualResult).to.not.equal(input);
    expect(input).to.eql([
      { articleName: "Wise words", created_at: 1542284514171 }
    ]);
  });
  it("Should be able to change given property on all objects in an array", () => {
    const input = [
      { articleName: "Wise words", created_at: 1542284514171 },
      { name: "The Little book of Calm", created_at: 1416140514171 },
      { name: "Love to Code", created_at: 1037708514171 }
    ];
    const keyToChange = "created_at";
    const actualResult = formatDates(input, keyToChange);
    const dateVariable1 = new Date(1542284514171);
    const dateVariable2 = new Date(1416140514171);
    const dateVariable3 = new Date(1037708514171);
    expect(dateVariable1).to.eql(actualResult[0].created_at);
    expect(dateVariable2).to.eql(actualResult[1].created_at);
    expect(dateVariable3).to.eql(actualResult[2].created_at);
  });
});

describe("makeRefObj", () => {
  it("If passed empty array then will return empty object", () => {
    const input = [];
    const actualResult = makeRefObj(input);
    const expectedResult = {};
    expect(actualResult).to.eql(expectedResult);
  });
  it("If passed array with one object will return reference object with key of title and vaue of id", () => {
    const input = [
      {
        article_id: 35,
        title: "Stone Soup",
        body: "This is a body",
        votes: 0,
        topic: "cooking",
        author: "cooljmessy"
      }
    ];
    const key = "title";
    const value = "article_id";
    const actualResult = makeRefObj(input, key, value);
    const expectedResult = { "Stone Soup": 35 };
    expect(actualResult).to.eql(expectedResult);
  });
  it("If passed multi-elemt array with return reference object with multiple key-value pairs", () => {
    const input = [
      {
        article_id: 35,
        title: "Stone Soup",
        body: "This is a body",
        votes: 0,
        topic: "cooking",
        author: "cooljmessy"
      },
      {
        article_id: 21,
        title: "Have a Nice Day",
        body: "This is another body",
        votes: 1,
        topic: "clean living",
        author: "mrJazz"
      },
      {
        article_id: 11,
        title: "Time to Go",
        body: "This is yet another body",
        votes: 3,
        topic: "time management",
        author: "cooli"
      }
    ];
    const key = "title";
    const value = "article_id";
    const actualResult = makeRefObj(input, key, value);
    const expectedResult = {
      "Stone Soup": 35,
      "Have a Nice Day": 21,
      "Time to Go": 11
    };
    expect(actualResult).to.eql(expectedResult);
  });
  it("Function does not mutate oringal array", () => {
    const input = [
      {
        article_id: 35,
        title: "Stone Soup",
        body: "This is a body",
        votes: 0,
        topic: "cooking",
        author: "cooljmessy"
      },
      {
        article_id: 21,
        title: "Have a Nice Day",
        body: "This is another body",
        votes: 1,
        topic: "clean living",
        author: "mrJazz"
      },
      {
        article_id: 11,
        title: "Time to Go",
        body: "This is yet another body",
        votes: 3,
        topic: "time management",
        author: "cooli"
      }
    ];
    const key = "article_id";
    const value = "title";
    const actualResult = makeRefObj(input, key, value);
    expect(input).to.eql([
      {
        article_id: 35,
        title: "Stone Soup",
        body: "This is a body",
        votes: 0,
        topic: "cooking",
        author: "cooljmessy"
      },
      {
        article_id: 21,
        title: "Have a Nice Day",
        body: "This is another body",
        votes: 1,
        topic: "clean living",
        author: "mrJazz"
      },
      {
        article_id: 11,
        title: "Time to Go",
        body: "This is yet another body",
        votes: 3,
        topic: "time management",
        author: "cooli"
      }
    ]);
  });
});

describe.only("formatComments", () => {
  it("IF passed empty array will return empty array", () => {
    const input = [];
    const actualResult = formatComments(input);
    const expectedResult = [];
    expect(actualResult).to.eql(expectedResult);
  });
  it('Takes "created_by" property from object in array and changes it to "author"', () => {
    const input = [
      {
        body:
          "What do you see? I have no idea where this will lead us. This place I speak of, is known as the Black Lodge.",
        belongs_to: "UNCOVERED: catspiracy to bring down democracy",
        created_by: "icellusedkars",
        votes: 16,
        created_at: 1101386163389
      }
    ];
    const objRef = { "UNCOVERED: catspiracy to bring down democracy": 35 };
    const actualResult = formatComments(input, objRef);
    const expectedResult = [
      {
        body:
          "What do you see? I have no idea where this will lead us. This place I speak of, is known as the Black Lodge.",
        article_id: 35,
        author: "icellusedkars",
        votes: 16,
        created_at: new Date(1101386163389)
      }
    ];
    expect(actualResult).to.eql(expectedResult);
  });
  it('Takes "belongs_to" property and replaces it with "article_id"', () => {
    const input = [
      {
        body:
          "What do you see? I have no idea where this will lead us. This place I speak of, is known as the Black Lodge.",
        belongs_to: "UNCOVERED: catspiracy to bring down democracy",
        created_by: "icellusedkars",
        votes: 16,
        created_at: 1101386163389
      }
    ];
    const objRef = { "UNCOVERED: catspiracy to bring down democracy": 35 };
    const actualResult = formatComments(input, objRef);
    const expectedResult = [
      {
        body:
          "What do you see? I have no idea where this will lead us. This place I speak of, is known as the Black Lodge.",
        article_id: 35,
        author: "icellusedkars",
        votes: 16,
        created_at: new Date(1101386163389)
      }
    ];
    expect(actualResult).to.eql(expectedResult);
  });
  it("New value of article_id should be id corresponding to the original title value provided", () => {
    const input = [
      {
        body:
          "What do you see? I have no idea where this will lead us. This place I speak of, is known as the Black Lodge.",
        belongs_to: "UNCOVERED: catspiracy to bring down democracy",
        created_by: "icellusedkars",
        votes: 16,
        created_at: 1101386163389
      }
    ];
    const objRef = { "UNCOVERED: catspiracy to bring down democracy": 35 };
    const actualResult = formatComments(input, objRef);
    const expectedResult = [
      {
        body:
          "What do you see? I have no idea where this will lead us. This place I speak of, is known as the Black Lodge.",
        article_id: 35,
        author: "icellusedkars",
        votes: 16,
        created_at: new Date(1101386163389)
      }
    ];
    expect(actualResult).to.eql(expectedResult);
  });
  it('Converts "created_at" value into JS date object', () => {
    const input = [
      {
        body:
          "What do you see? I have no idea where this will lead us. This place I speak of, is known as the Black Lodge.",
        belongs_to: "UNCOVERED: catspiracy to bring down democracy",
        created_by: "icellusedkars",
        votes: 16,
        created_at: 1101386163389
      }
    ];
    const objRef = { "UNCOVERED: catspiracy to bring down democracy": 35 };
    const actualResult = formatComments(input, objRef);
    const dateVariable = new Date(1101386163389);
    expect(dateVariable).to.eql(actualResult[0].created_at);
  });
});
