const introElectives = new Set([
    "CME259H1", "CHE260H1", "CHE323H1", "CHE467H1", "CIV375H1", "ECE313H1", "ECE314H1", "ECE349H1",
    "GGR347H1", "CHE460H1", "CIV440H1", "FOR310H1", "GGR348H1", "MIE311H1", "MIE313H1", "MSE355H1",
    "JPE395H1"
]);

const advElectives = new Set([
    "AER507H1", "CHE451H1", "CHE566H1", "CIV531H1", "CIV501H1", "ECE520H1", "MIE407H1", "MIE507H1",
    "MIE515H1", "MIE516H1", "APS510H1", "APS530H1", "CHE469H1", "CHE568H1", "CIV576H1", "CIV577H1",
    "ECE463H1", "ECE526H1", "FOR425H1", "MIE408H1", "MIE517H1", "MIE550H1", "MSE458H1"
]);

const core = new Set([
    "APS100H1", "APS110H1", "APS111H1", "CIV100H1", "MAT186H1", "MAT188H1", "APS106H1", "APS112H1",
    "ECE110H1", "MAT187H1", "MIE100H1", "MIE191H1", "MIE230H1", "MIE231H1", "MIE243H1", "MIE270H1",
    "MAT234H1", "MIE210H1", "MIE221H1", "MIE222H1", "MIE358H1", "MIE301H1", "MIE312H1", "MIE342H1",
    "MIE313H1", "MIE315H1", "MIE334H1", "MIE491Y1"
]);

function sustainabilityMinor(courses, capstone, capstone_course) {
    const minorCourses = new Set();
    let credits = 0;

    let hasCore = false;
    if (courses.includes("CIV300H1") && !minorCourses.has("CIV300H1")) {
        minorCourses.add("CIV300H1");
        credits ++;
        if (core.has("CIV300H1")) {
            hasCore = true;
        }
    }

    // Checking for lst1 courses
    for (const course of ["APS305H1", "ENV350H1"]) {
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

    let numElectives = 0;
    if (capstone) {
        numElectives += 2;
        credits += 2;
        minorCourses.add(capstone_course);
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

export default sustainabilityMinor;