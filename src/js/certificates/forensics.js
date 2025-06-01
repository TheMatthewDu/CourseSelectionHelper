const electives = new Set([
    "AER373H1", "APS440H1", "APS441H1", "CHE441H1", "CHE467H1", "CHE561H1", "CIV440H1", "CIV510H1", "MIE304H1",
    "MIE320H1", "MIE442H1", "MIE469H1", "MSE401H1", "MSE415H1", "MSE419H1"
]);


function forensicsCertificate(courses, capstone, capstone_course) {
    const certificateCourses = new Set();
    let credits = 0;

    if (courses.includes("MSE431H1") && !certificateCourses.has("MSE431H1")) {
        certificateCourses.add("MSE431H1");
        credits++;
    }

    let num_electives = 0;
    // Adding electives
    for (const course of courses) {
        if (electives.has(course) && !certificateCourses.has(course) && num_electives < 2) {
            certificateCourses.add(course);
            num_electives++;
            credits ++;
        }
    }

    return [100 * credits / 3, certificateCourses];
}

export default forensicsCertificate;