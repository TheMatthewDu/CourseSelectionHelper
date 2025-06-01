const electives = new Set([
    "TEP322H1", "TEP343H1", "TEP440H1", "TEP442H1", "TEP444H1", "TEP445H1", "TEP447H1", "TEP448H1", "TEP449H1"
]);

function leadershipCertificate(courses, capstone, capstone_course) {
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

export default leadershipCertificate;