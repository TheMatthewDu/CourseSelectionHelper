const electives = new Set([
    "PPG201H1", "PPG302H1", "PPG402H1"
]);


function policyCertificate(courses, capstone, capstone_course) {
    const certificateCourses = new Set();
    let credits = 0;

    for (const course of courses) {
        if (electives.has(course) && !certificateCourses.has(course)) {
            certificateCourses.add(course);
            credits ++;
        }
    }

    return [100 * credits / 3, certificateCourses];
}

export default policyCertificate;