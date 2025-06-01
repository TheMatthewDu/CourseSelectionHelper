const electives1 = new Set([
    "APS521H1", "TEP432H1"
]);

const electives2 = new Set([
    "MIE358H1", "ECE472H1", "CME368H1", "CHE374H1", "CHE249H1"
]);

function entrepreneurshipCertificate(courses, capstone, capstone_course) {
    const certificateCourses = new Set();
    let credits = 0;

    if (courses.includes("TEP234H1") && !certificateCourses.has("TEP234H1")) {
        certificateCourses.add("TEP234H1");
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

export default entrepreneurshipCertificate;