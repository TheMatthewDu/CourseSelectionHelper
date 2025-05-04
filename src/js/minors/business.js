const electives = new Set([
    "APS500H1", "APS502H1", "APS521H1", "ECE488H1", "ECO101H1", "FOR308H1", "MIE488H1", "PHL295H1",
    "TEP234H1", "TEP343H1", "TEP444H1", "TEP445H1", "APS510H1", "APS420H1", "APS511H1", "CHE488H1",
    "CIV488H1", "ECO102H1", "GGR251H1", "GGR252H1", "HPS283H1", "MIE354H1", "MIE540H1", "TEP343H1",
    "TEP432H1", "TEP442H1", "TEP447H1", "TEP448H1"
]);


function businessMinor(courses, capstone, capstone_course) {
    const minorCourses = new Set();
    let credits = 0;

    for (const course of ["JRE300H1", "JRE410H1", "JRE420H1"]) {
        if (courses.includes(course) && !minorCourses.has(course)) {
            minorCourses.add(course);
            credits++;
        }
    }

    // Checking for lst1 courses
    for (const course of ["CHE249H1", "CHE374H1", "CME368H1", "ECE472H1", "MIE358H1", "MIE258H1"]) {
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
            credits++;
        }
    }

    return [100 * credits / 6, minorCourses];
}

export default businessMinor;