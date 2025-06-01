const electives1 = new Set([
    "HST209H1", "HST211H1", "HST330H1", "GGR433H1", "GGR434H1"
]);

const electives2 = new Set([
    "CHE416H1", "CHE561H1", "CHE460H1", "CIV536H1", "CIV577H1", "CIV550H1", "MIE368H1", "MIE542H1", "MIE561H1"
]);

function healthCertificate(courses, capstone, capstone_course) {
    const certificateCourses = new Set();
    let credits = 0;

    if (courses.includes("APS470H1") && !certificateCourses.has("APS470H1")) {
        certificateCourses.add("APS470H1");
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

export default healthCertificate;