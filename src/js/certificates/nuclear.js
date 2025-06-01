const electives = new Set([
    "AER507H1", "CHE568H1", "MIE407H1", "MIE408H1"
]);


function nuclearCertificate(courses, capstone, capstone_course) {
    const certificateCourses = new Set();
    let credits = 0;

    if (courses.includes("CHE566H1") && !certificateCourses.has("CHE566H1")) {
        certificateCourses.add("CHE566H1");
        credits++;
    }

    // Adding electives
    let num_electives = 0;

    for (const course of courses) {
        if (electives.has(course) && !certificateCourses.has(course) && num_electives < 2) {
            certificateCourses.add(course);
            num_electives++;
            credits ++;
        }
    }

    return [100 * credits / 3, certificateCourses];
}

export default nuclearCertificate;