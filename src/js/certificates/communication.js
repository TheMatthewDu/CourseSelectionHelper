const electives = new Set([
    "TEP281H1", "TEP320H1", "TEP321H1", "TEP322H1", "TEP323H1", "TEP324H1", "TEP325H1", "TEP326H1", "TEP445H1",
    "TEP449H1", "WRR304H1", "WRR305H1", "WRR310H1"
]);


function commCertificate(courses, capstone, capstone_course) {
    const certificateCourses = new Set();
    let credits = 0;

    // Adding electives
    let num_electives = 0;

    for (const course of courses) {
        if (electives.has(course) && !certificateCourses.has(course) && num_electives < 3) {
            certificateCourses.add(course);
            num_electives++;
            credits ++;
        }
    }

    return [100 * credits / 3, certificateCourses];
}

export default commCertificate;