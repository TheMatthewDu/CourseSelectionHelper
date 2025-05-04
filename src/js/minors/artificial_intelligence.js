const electives = new Set([
    "CHE408H1", "CHE507H1", "CME538H1", "CSC401H1", "CSC420H1", "CSC412H1", "CSC413H1", "CSC485H1",
    "CSC486H1", "ECE368H1", "HPS340H1", "HPS345H1", "HPS346H1", "MIE368H1", "MIE451H1", "MIE457H1",
    "MIE562H1", "MIE566H1", "MIE567H1", "MIE524H1", "MIE509H1", "MSE403H1", "MSE465H1", "ROB501H1",
    "AER336H1", "BME595H1", "CHE322H1", "CSC343H1", "CSC412H1", "ECE344H1", "ECE353H1", "ECE356H1",
    "ECE367H1", "ECE411H1", "ECE419H1", "ECE431H1", "ECE444H1", "ECE454H1", "ECE470H1", "ECE516H1",
    "ECE532H1", "ECE557H1", "ECE568H1", "MAT336H1", "MAT389H1", "STA302H1", "STA410H1"
]);


function aiMinor(courses, capstone, capstone_course) {
    const minorCourses = new Set();
    let credits = 0;

    if (courses.includes("APS360H1") && !minorCourses.has("APS360H1")) {
        minorCourses.add("APS360H1");
        credits++;
    }

    // Checking for lst1 courses
    for (const course of ["CSC263H1", "ECE345H1", "ECE358H1", "MIE245H1"]) {
        if (courses.includes(course) && !minorCourses.has(course)) {
            minorCourses.add(course);
            credits++;
            break;
        }
    }

    // Checking for lst2 courses
    for (const course of ["CSC384H1", "MIE369H1", "ROB311H1"]) {
        if (courses.includes(course) && !minorCourses.has(course)) {
            minorCourses.add(course);
            credits++;
            break;
        }
    }

    // Checking for lst3 courses
    for (const course of ["CSC311H1", "ECE421H1", "MIE424H1", "ROB313H1"]) {
        if (courses.includes(course) && !minorCourses.has(course)) {
            minorCourses.add(course);
            credits++;
            break;
        }
    }

    // Adding electives
    let num_electives = 0;
    if (capstone){
        num_electives += 2;
        credits += 2;
        minorCourses.add(capstone_course);
    }

    for (const course of courses) {
        if (electives.has(course) && !minorCourses.has(course) && num_electives < 2) {
            minorCourses.add(course);
            num_electives++;
            credits ++;
        }
    }

    return [100 * credits / 6, minorCourses];
}

export default aiMinor;