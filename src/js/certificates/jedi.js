const electives1 = new Set([
    "TEP324H1", "WGS273H1", "WGS390H1", "CSE240H1"
]);
const electives2 = new Set([
    "CME259H1", "ESC203H1", "HPS202H1", "HPS205H1", "TEP440H1"
]);
const electives3 = new Set([
    "TEP447H1", "HPS200H1", "TEP449H1", "TEP445H1"
]);

function jediCertificate(courses, capstone, capstone_course) {
    const certificateCourses = new Set();
    let credits = 0;

    // Adding electives
    let is_fase = false;

    let current = null;
    for (const course of courses) {
        if (electives1.has(course) && !certificateCourses.has(course)) {
            current = course;
            if (course === "TEP324H1") {
                is_fase = true
                break;
            }
        }
    }

    if (current !== null) {
        certificateCourses.add(current);
        credits ++;
    }

    current = null;
    for (const course of courses) {
        if (electives2.has(course) && !certificateCourses.has(course)) {
            current = course;
            if (new Set(["CME259H1", "ESC203H1", "TEP440H1"]).has(course)) {
                is_fase = true
                break;
            }
        }
    }

    if (current !== null) {
        certificateCourses.add(current);
        credits ++;
    }

    for (const course of courses) {
        if (electives3.has(course) && !certificateCourses.has(course)) {
            if (course === "HPS200H1") {
                if (is_fase) {
                    certificateCourses.add(course);
                    credits++;
                    break;
                }
            } else {
                certificateCourses.add(course);
                credits++;
                break;
            }
        }
    }

    return [100 * credits / 3, certificateCourses];
}

export default jediCertificate;