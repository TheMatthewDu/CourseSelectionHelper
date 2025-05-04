const introElectives = new Set([
    "CHE441H1", "MIE243H1", "MIE304H1", "MIE342H1", "MIE354H1"
]);

const advElectives = new Set([
    "AER525H1", "CHE462H1", "CHE562H1", "CHE475H1", "CHE561H1", "ECE470H1", "FOR424H1", "MIE368H1",
    "MIE410H1", "MIE422H1", "MIE440H1", "MIE441H1", "MIE443H1", "MIE469H1", "MIE540H1", "MIE562H1",
    "MIE566H1", "MSE419H1", "MSE431H1", "MSE438H1", "MSE443H1", "MSE455H1", "MSE461H1"
]);

const core = new Set([
    "APS100H1", "APS110H1", "APS111H1", "CIV100H1", "MAT186H1", "MAT188H1", "APS106H1", "APS112H1",
    "ECE110H1", "MAT187H1", "MIE100H1", "MIE191H1", "MIE230H1", "MIE231H1", "MIE243H1", "MIE270H1",
    "MAT234H1", "MIE210H1", "MIE221H1", "MIE222H1", "MIE358H1", "MIE301H1", "MIE312H1", "MIE342H1",
    "MIE313H1", "MIE315H1", "MIE334H1", "MIE491Y1"
]);

function manufacturingMinor(courses, capstone, capstone_course) {
    const minorCourses = new Set();
    let credits = 0;

    let hasCore = false;

    // Checking for lst1 courses
    for (const course of ["CHE324H1", "MIE221H1", "MIE304H1", "MIE364H1", "MSE351H1"]) {
        if (courses.includes(course) && !minorCourses.has(course)) {
            if (core.has(course) && hasCore) {
                continue;
            }
            minorCourses.add(course);
            credits++;
            if (core.has(course)) {
                hasCore = true;
            }
            break;
        }
    }

    // Checking for lst2 courses
    for (const course of ["MIE464H1", "MIE519H1"]) {
        if (courses.includes(course) && !minorCourses.has(course)) {
            if (core.has(course) && hasCore) {
                continue;
            }
            minorCourses.add(course);
            credits++;
            if (core.has(course)) {
                hasCore = true;
            }
            break;
        }
    }

    // Checking for lst2 courses
    for (const course of ["TEP234H1", "TEP343H1", "TEP442H1", "CHE488H1", "CIV488H1", "ECE488H1", "MIE488H1", "JRE420H1"]) {
        if (courses.includes(course) && !minorCourses.has(course)) {
            if (core.has(course) && hasCore) {
                continue;
            }
            minorCourses.add(course);
            credits++;
            if (core.has(course)) {
                hasCore = true;
            }
            break;
        }
    }

    // Counting advanced electives
    let numElectives = 0;
    if (capstone){
        numElectives += 2;
        credits += 2;
        minorCourses.add(capstone_course);
    }

    for (const course of courses) {
        if (advElectives.has(course) && !minorCourses.has(course) && numElectives < 3) {
            if (core.has(course) && hasCore) {
                continue;
            }
            minorCourses.add(course);
            credits++;
            if (core.has(course)) {
                hasCore = true;
            }
            numElectives++;
        }
    }

    let numAdv = numElectives;
    // Adding intro electives
    for (const course of courses) {
        if (introElectives.has(course) && !minorCourses.has(course) && (numElectives - numAdv) + Math.max(numAdv, 2) < 3) {
            if (core.has(course) && hasCore) {
                continue;
            }
            minorCourses.add(course);
            credits++;
            if (core.has(course)) {
                hasCore = true;
            }
        }
    }

    return [100 * credits / 6, minorCourses];
}
export default manufacturingMinor;