const electives1 = new Set([
    "CHE469H1", "ECE314H1", "ECE349H1", "MIE346H1", "MIE366H1", "MIE535H1", "MSE458H1"
]);

const electives2 = new Set([
    "AER525H1", "CHE507H1", "ECE311H1", "ECE342H1", "ECE463H1", "ECE520H1", "MIE304H1", "MIE363H1", "MIE404H1",
    "MIE443H1", "MIE444H1", "MIE515H1", "ROB521H1", "MIE519H1", "MSE443H1"
]);

function evCertificate(courses, capstone, capstone_course) {
    const certificateCourses = new Set();
    let credits = 0;

    if (courses.includes("APS380H1") && !certificateCourses.has("APS380H1")) {
        certificateCourses.add("APS380H1");
        credits++;
    }

    // Adding electives
    for (const course of courses) {
        if (electives1.has(course) && !certificateCourses.has(course)) {
            certificateCourses.add(course);
            credits ++;
            break;
        }
    }

    for (const course of courses) {
        if (electives2.has(course) && !certificateCourses.has(course)) {
            certificateCourses.add(course);
            credits ++;
            break;
        }
    }

    return [100 * credits / 3, certificateCourses];
}

export default evCertificate;