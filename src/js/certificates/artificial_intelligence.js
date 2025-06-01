const electives = new Set([
    "CSC311H1", "CSC384H1", "ECE421H1", "MIE369H1", "MIE424H1", "ROB311H1", "ROB311H1"
]);


function aiCertificate(courses, capstone, capstone_course) {
    const certificateCourses = new Set();
    let credits = 0;

    if (courses.includes("APS360H1") && !certificateCourses.has("APS360H1")) {
        certificateCourses.add("APS360H1");
        credits++;
    }

    // Checking for lst1 courses
    for (const course of ["CSC263H1", "ECE345H1", "ECE358H1", "MIE245H1"]) {
        if (courses.includes(course) && !certificateCourses.has(course)) {
            certificateCourses.add(course);
            credits++;
            break;
        }
    }

    // Adding electives
    let num_electives = 0;

    for (const course of courses) {
        if (electives.has(course) && !certificateCourses.has(course) && num_electives < 1) {
            certificateCourses.add(course);
            num_electives++;
            credits ++;
        }
    }

    return [100 * credits / 3, certificateCourses];
}

export default aiCertificate;