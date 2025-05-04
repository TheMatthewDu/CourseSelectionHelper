const introElectives = new Set([
    "ECE335H1", "BME346H1", "ECE330H1", "ECE350H1", "PHY358H1"
]);

const advElectives = new Set([
    "CHE562H1", "CHM338H1", "ECE427H1", "ECE442H1", "MSE430H1", "MSE438H1", "MSE443H1", "MSE459H1",
    "PHY427H1", "PHY456H1", "PHY485H1", "PHY487H1", "BME440H1", "CHE475H1", "CHM328H1", "FOR424H1",
    "MSE462H1", "MSE458H1", "MIE506H1", "MIE517H1", "PHY427H1", "PHY450H1", "PHY452H1"
]);

const core = new Set([
    "APS100H1", "APS110H1", "APS111H1", "CIV100H1", "MAT186H1", "MAT188H1", "APS106H1", "APS112H1",
    "ECE110H1", "MAT187H1", "MIE100H1", "MIE191H1", "MIE230H1", "MIE231H1", "MIE243H1", "MIE270H1",
    "MAT234H1", "MIE210H1", "MIE221H1", "MIE222H1", "MIE258H1", "MIE358H1", "MIE301H1", "MIE312H1",
    "MIE342H1", "MIE313H1", "MIE315H1", "MIE334H1", "MIE491Y1"
]);

function nanoengineeringMinor(courses, capstone, capstone_course) {
    const minorCourses = new Set();
    let credits = 0;
    
    let hasCore = false;

    if (courses.includes("MSE219H1") && !minorCourses.has("MSE219H1")) {
        minorCourses.add("MSE219H1");
        credits ++;
        if (core.has("MSE219H1")) {
            hasCore = true;
        }
    }

    let capstone_thesis_requirement = 0;
    if (!capstone){
        capstone_thesis_requirement = 2;
    } else {
        minorCourses.add(capstone_course);
        credits += 2;
    }

    // Counting advanced electives
    let numElectives = 0;
    for (const course of courses) {
        if (advElectives.has(course) && !minorCourses.has(course) && numElectives < 6 - capstone_thesis_requirement) {
            if (core.has(course) && hasCore){
                continue;
            }
            minorCourses.add(course);
            credits++;
            numElectives++;
            if (core.has(course)) {
                hasCore = true;
            }
        }
    }

    let numAdv = numElectives;
    // Adding intro electives
    for (const course of courses) {
        if (introElectives.has(course) && !minorCourses.has(course) && (numElectives - numAdv) + Math.max(numAdv, 2) < 6 - credits) {
            if (core.has(course) && hasCore){
                continue;
            }
            minorCourses.add(course);
            numElectives++;
            if (core.has(course)) {
                hasCore = true;
            }
        }
    }


    return [100 * credits/ 6, minorCourses];
}

export default nanoengineeringMinor;