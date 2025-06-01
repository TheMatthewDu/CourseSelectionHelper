let options = [
    ["MIN250H1", "MIN351H1"],
    ["MIN301H1", "MIN350H1"],
    ["MIN250H1", "MIN330H1"],
    ["MIN301H1", "MIN330H1"]
];

const electives = new Set([
    "MIN250H1", "MIN351H1", "MIN301H1", "MIN350H1", "MIN250H1", "MIN330H1", "MIN301H1", "MIN330H1"
])

function mineralCertificate(courses, capstone, capstone_course) {
    const certificateCourses = new Set();
    let credits = 0;

    if (courses.includes("MIN120H1") && !certificateCourses.has("MIN120H1")) {
        certificateCourses.add("MIN120H1");
        credits++;
    }

    // Adding electives
    let seen = new Set([]);

    for (const course of courses) {
        if (electives.has(course)) {
            seen.add(course);
        }
    }

    if (seen.size === 0) {
        return [100 * credits / 3, certificateCourses];
    }

    for (const option of options) {
        if (seen.has(option[0]) && seen.has(option[1])) {
            credits += 2;
            certificateCourses.add(option[0]);
            certificateCourses.add(option[1]);

            return [100 * credits / 3, certificateCourses];
        }
    }

    credits ++;
    certificateCourses.add(seen[0]);

    return [100 * credits / 3, certificateCourses];
}

export default mineralCertificate;