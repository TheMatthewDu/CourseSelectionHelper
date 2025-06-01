const electives = new Set([
    "CHE475H1", "CIV544H1", "FOR308H1", "FOR421H1", "FOR424H1", "FOR425H1"
]);

function sustainabilityCertificate(courses, capstone, capstone_course) {
    const certificateCourses = new Set();
    let credits = 0;

    for (const course of courses) {
        if (electives.has(course) && !certificateCourses.has(course) && credits < 3) {
            certificateCourses.add(course);
            credits ++;
        }
    }

    return [100 * credits / 3, certificateCourses];
}

export default sustainabilityCertificate;