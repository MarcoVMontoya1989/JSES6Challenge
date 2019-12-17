/////////////////////////////////
// CODING CHALLENGE

/*

Suppose that you're working in a small town administration, and you're in charge of two town elements:
1. Parks
2. Streets

It's a very small town, so right now there are only 3 parks and 4 streets. All parks and streets have a name and a build year.

At an end-of-year meeting, your boss wants a final report with the following:
1. Tree density of each park in the town (forumla: number of trees/park area)
2. Average age of each town's park (forumla: sum of all ages/number of parks)
3. The name of the park that has more than 1000 trees
4. Total and average length of the town's streets
5. Size classification of all streets: tiny/small/normal/big/huge. If the size is unknown, the default is normal

All the report data should be printed to the console.

HINT: Use some of the ES6 features: classes, subclasses, template strings, default parameters, maps, arrow functions, destructuring, etc.

*/

class Element {
    constructor(name, buildYear) {
        this.name = name;
        this.buildYear = buildYear;
    }
}

class Park extends Element{
    constructor(name, buildYear, area, numTrees) {
        super(name, buildYear);
        this.area = area;
        this.numTrees = numTrees;
    }

    treeDensity() {
        const density = this.numTrees / this.area;
        console.log(`The Park ${this.name} as a tree density of ${Math.round(density)} trees per square km`)
    }
}

class Street extends Element {
    constructor(name, buildYear, length, size = 3) {
        super(name, buildYear);
        this.length = length;
        this.size = size;
    }

    classifyStreet() {
        const classification = new Map();
        classification.set(1, 'Tiny');
        classification.set(2, 'Small');
        classification.set(3, 'Normal');
        classification.set(4, 'Big');
        classification.set(5, 'Huge');
        console.log(`This ${this.name} build in ${this.buildYear} is a ${classification.get(this.size)} street`)
    }
}

const allParks = [
    new Park('Green Park', 1950, 220, 2020),
    new Park('National Park', 1842, 3000, 8900),
    new Park('Oak Park', 1520, 340, 9020),
];

const allStreets = [
    new Street('Wall Street', 1920, 5, 5),
    new Street('Evergreen', 2008, 2.7, 2),
    new Street('Sunset Boulevard', 1982, 3.5, 4)
];

/*
    1. Tree density of each park in the town (forumla: number of trees/park area)
    2. Average age of each town's park (forumla: sum of all ages/number of parks)
    3. The name of the park that has more than 1000 trees
    4. Total and average length of the town's streets
    5. Size classification of all streets: tiny/small/normal/big/huge. If the size is unknown, the default is normal
*/

function calc(arr) {
    // console.log('========CALCULATOR============');
    const sum = arr.reduce((prev, curr, index) => prev + curr, 0);
    return [sum, (sum/arr.length)];
}

function reportParks(repPrk) {

    console.log('------------- PARK REPORT');
    // density tree
    repPrk.forEach(el => el.treeDensity());
    //average age from parks
    const ages = repPrk.map(el => new Date().getFullYear() - el.buildYear);
    const [totalAge, avgAge] = calc(ages);
    console.log(`In our parks they have in years total: ${totalAge}`);
    console.log(`Our ${repPrk.length} parks have an average of: ${avgAge} years`);

    // name from park that have more than 1000 trees
    const i = repPrk.map(el => el.numTrees).findIndex(el => el > 8999);
    console.log(`The park with more than 10K trees is ${repPrk[i].name}`)
}

function reportStreet(repStr) {
    console.log('------------- STREET REPORT');

    const [totalLength, avgLength] = calc(repStr.map(el => el.length));

    console.log(`Our total length is: ${Math.round(totalLength)} and the average is: ${Math.round(avgLength)}`);

    // size classification of all streets
    repStr.forEach(el => el.classifyStreet())

}

reportParks(allParks);
reportStreet(allStreets);