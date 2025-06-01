const electives1 = new Set([
    "TMU130H1", "ECE446H1"
]);

const electives2 = new Set([
    "HMU111H1", "TMU131H1", "DMU313H1", "DMU319H1", "DMU330H1", "DMU406H1"
]);

function musicCertificate(courses, capstone, capstone_course) {
    const certificateCourses = new Set();
    let credits = 0;

    if (courses.includes("DMU111H1") && !certificateCourses.has("DMU111H1")) {
        certificateCourses.add("DMU111H1");
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

    let num_electives2 = 0;
    for (const course of courses) {
        if ((electives2.has(course) || course.includes("MUS")) && !certificateCourses.has(course) && num_electives2 < 2) {
            certificateCourses.add(course);
            num_electives2 ++;
            credits ++;
        }
    }

    return [100 * credits / 3, certificateCourses];
}

export default musicCertificate;