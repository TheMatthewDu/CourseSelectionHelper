const electives = new Set([
    "BME330H1", "BME350H1", "BME395H1", "BME445H1", "BME530H1", "BME595H1", "CHE416H1", "CHE450H1",
    "CHE462H1", "CHE471H1", "CHE475H1", "CHE564H1", "CIV342H1", "CIV541H1", "ECE331H1", "ECE335H1",
    "ECE431H1", "ECE441H1", "ECE446H1", "ECE448H1", "ECE516H1", "FOR308H1", "FOR421H1", "FOR424H1",
    "FOR425H1", "MIE242H1", "MIE343H1", "MIE437H1", "MIE439H1", "MIE458H1", "MIE520H1", "MIE523H1",
    "MIE561H1", "MSE343H1", "MSE440H1", "BCB420H1", "CHM456H1", "HMB201H1", "HMB265H1", "HPS318H1",
    "HPS319H1", "HPS346H1", "IMM250H1", "MGY377H1", "MGY441H1", "PCL201H1", "PCL302H1", "PHL281H1",
    "PSL300H1"
]);


function bioMinor(courses, capstone, capstone_course) {
    const minorCourses = new Set();
    let credits = 0;

    // Checking for lst1 courses
    for (const course of ["CHE353H1", "BME205H1"]) {
        if (courses.includes(course) && !minorCourses.has(course)) {
            minorCourses.add(course);
            credits++;
            break;
        }
    }

    // Checking for lst1 courses
    for (const course of ["BME412H1", "BME455H1", "BME331H1", "CHE354H1"]) {
        if (courses.includes(course) && !minorCourses.has(course)) {
            minorCourses.add(course);
            credits++;
            break;
        }
    }

    // Checking for lst2 courses
    for (const course of ["BME440H1", "CHE450H1"]) {
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
        if (electives.has(course) && !minorCourses.has(course) && num_electives < 3) {
            minorCourses.add(course);
            num_electives++;
            credits++;
        }
    }

    return [100 * credits / 6, minorCourses];
}

export default bioMinor;