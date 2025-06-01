const electives1 = new Set([
    "CDN268H1", "POL208H1", "POL201H1", "JGU216H1", "GGR112H1", "ENV333H1", "ANT204H1", "APS330H1"
]);

const electives2 = new Set([
    "TEP435H1", "APS530H1", "APS510H1", "APS420H1", "APS299Y0"
]);

function globalCertificate(courses, capstone, capstone_course) {
    const certificateCourses = new Set();
    let credits = 0;

    // Adding electives
    for (const course of courses) {
        if (electives1.has(course) && !certificateCourses.has(course)) {
            certificateCourses.add(course);
            credits ++;
            break;
        }
    }

    let num_electives2 = 0;
    for (const course of courses) {
        if (electives2.has(course) && !certificateCourses.has(course) && num_electives2 < 2) {
            certificateCourses.add(course);
            num_electives2 ++;
            credits ++;
        }
    }

    return [100 * credits / 3, certificateCourses];
}

export default globalCertificate;