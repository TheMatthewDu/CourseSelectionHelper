
const introElectives = new Set([
    "AER301H1", "APS360H1", "BME350H1", "CSC263H1", "ECE316H1", "ECE334H1", "ECE345H1", "MIE243H1",
    "MIE301H1", "ROB310H1", "APS360H1", "CSC263H1", "ECE316H1", "ECE334H1", "ECE345H1", "ECE353H1",
    "ECE358H1", "ECE363H1", "BME331H1", "MIE346H1", "ROB311H1", "ROB313H1"
]);

const advElectives = new Set([
    "AER407H1", "CSC384H1", "CSC311H1", "ECE410H1", "ECE431H1", "BME445H1", "ECE557H1", "MIE442H1",
    "MIE444H1", "ROB521H1", "CHE507H1", "CSC384H1", "CSC428H1", "ECE411H1", "ECE516H1", "ECE421H1",
    "ECE532H1", "MAT363H1", "MIE438H1", "MIE443H1", "MIE505H1", "MIE506H1"
]);

const core = new Set([
    "APS100H1", "APS110H1", "APS111H1", "CIV100H1", "MAT186H1", "MAT188H1", "APS106H1", "APS112H1",
    "ECE110H1", "MAT187H1", "MIE100H1", "MIE191H1", "MIE230H1", "MIE231H1", "MIE243H1", "MIE270H1",
    "MAT234H1", "MIE210H1", "MIE221H1", "MIE222H1", "MIE358H1", "MIE301H1", "MIE312H1", "MIE342H1",
    "MIE313H1", "MIE315H1", "MIE334H1", "MIE491Y1"
]);

function roboticsMinor(courses, capstone, capstone_course) {
    const minorCourses = new Set();
    let credits = 0;

    let hasCore = false;
    // Checking for lst1 courses
    for (const course of ["CHE322H1", "ECE311H1", "ECE356H1", "MIE404H1", "AER372H1", "BME344H1"]) {
        if (courses.includes(course)) {
            minorCourses.add(course);
            credits ++;
            hasCore = core.has(course);
            break;
        }
    }

    // Checking for lst2 courses
    for (const course of ["AER525H1", "ECE470H1", "MIE422H1", "MIE443H1", "MIE444H1"]) {
        if (courses.includes(course)) {
            if (minorCourses.has(course) || (core.has(course) && hasCore)) {
                continue;
            }

            minorCourses.add(course);
            credits ++;
            if (core.has(course)) {
                hasCore = true;
            }
        }
    }

    let numElectives = 0;
    if (capstone) {
        minorCourses.add(capstone_course);
        credits += 2;
        numElectives += 2;
    }

    // Counting advanced electives
    for (const course of courses) {
        if (advElectives.has(course) && numElectives < 4) {
            if (minorCourses.has(course) || (core.has(course) && hasCore)) {
                continue;
            }

            if (numElectives === 3 &&
                ([...minorCourses].every(c => c.startsWith([...minorCourses][0].slice(0, 3))) && course.startsWith([...minorCourses][0].slice(0, 3)))) {
                continue;
            }
            minorCourses.add(course);
            credits ++;
            numElectives++;
            if (core.has(course)) {
                hasCore = true;
            }
        }
    }

    let numAdv = numElectives;
    // Adding intro electives
    for (const course of courses) {
        if (introElectives.has(course) && !minorCourses.has(course) && (numElectives - numAdv) + Math.max(numAdv, 2) < 4) {
            if (core.has(course) && hasCore){
                continue;
            }

            if (numElectives === 3 && (
                [...minorCourses].every(c => c.startsWith([...minorCourses][0].slice(0, 3)))) && course.startsWith([...minorCourses][0].slice(0, 3))
            ){
                continue;
            }
            minorCourses.add(course);
            credits ++;
            numElectives++;
            if (core.has(course)) {
                hasCore = true;
            }
        }
    }

    return [100 * credits / 6, minorCourses];
}

export default roboticsMinor;