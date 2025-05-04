const introElectives = new Set([
    "CHM210H1", "CIV300H1", "CIV375H1", "ENV234H1", "ENV350H1", "FOR308H1", "APS330H1", "CHE230H1",
    "CHM310H1", "CIV250H1", "CIV300H1", "ENV222H1", "GGR314H1", "MIE315H1"
]);

const advElectives = new Set([
    "CHE565H1", "CIV531H1", "CIV536H1", "CIV541H1", "CIV550H1", "CIV575H1", "CIV578H1", "CME549H1",
    "FOR421H1", "MIE515H1", "MIN511H1", "MSE401H1", "MSE415H1", "APS530H1", "CHE471H1", "CHE475H1",
    "CHE564H1", "CHM410H1", "CHM415H1", "CIV576H1", "CIV577H1", "CME500H1", "FOR424H1", "MIN330H1",
    "APS420H1"
]);

const core = new Set([
    "APS100H1", "APS110H1", "APS111H1", "CIV100H1", "MAT186H1", "MAT188H1", "APS106H1", "APS112H1",
    "ECE110H1", "MAT187H1", "MIE100H1", "MIE191H1", "MIE230H1", "MIE231H1", "MIE243H1", "MIE270H1",
    "MAT234H1", "MIE210H1", "MIE221H1", "MIE222H1", "MIE358H1", "MIE301H1", "MIE312H1", "MIE342H1",
    "MIE313H1", "MIE315H1", "MIE334H1", "MIE491Y1"
]);

function environmentalMinor(courses, capstone, capstone_course) {
    const minorCourses = new Set();
    let credits = 0;

    let hasCore = false;

    // Checking for lst1 courses
    for (const course of ["CME259H1", "ESC203H1", "ENV221H1", "GGR223H1"]) {
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
    for (const course of ["CIV220H1", "CIV440H1", "CHE460H1", "CHE467H1"]) {
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
    if (capstone) {
        numElectives += 2;
        credits += 2;
        minorCourses.add(capstone_course);
    }

    for (const course of courses) {
        if (advElectives.has(course) && !minorCourses.has(course) && numElectives < 4) {
            if (core.has(course) && hasCore){
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
        if (introElectives.has(course) && !minorCourses.has(course) && (numElectives - numAdv) + Math.max(numAdv, 2) < 4) {
            if (core.has(course) && hasCore){
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

export default environmentalMinor;