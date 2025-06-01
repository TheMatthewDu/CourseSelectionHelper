const electives1 = new Set([
    "CHE249H1", "CHE374H1", "CME368H1", "ECE472H1", "MIE358H1"
]);

const electives2 = new Set([
    "JRE300H1", "JRE410H1", "JRE420H1", "CHE488H1"
]);

function businessCertificate(courses, capstone, capstone_course) {
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

export default businessCertificate;