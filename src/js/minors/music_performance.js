const electives = new Set([
    "TMU111H1", "TMU313H1", "TMU319H1", "TMU330H1", "TMU406H1", "HMU111H1", "TMU131H1"
]);


function musicPerformanceMinor(courses, capstone, capstone_course) {
    const minorCourses = new Set();
    let credits = 0;

    for (const course of ["PMU299Y1", "TMU130H1", "ECE446H1"]) {
        if (courses.includes(course) && !minorCourses.has(course)) {
            minorCourses.add(course);
            if (course.includes("H1")){
                credits++;
            } else {
                credits += 2;
            }
        }
    }

    // Adding electives
    let num_electives = 0;
    if (capstone){
        num_electives += 2;
        credits += 2;
        minorCourses.add(capstone_course);
    }

    for (const course of courses) {
        if ((electives.has(course) || course.startsWith("MUS")) && !minorCourses.has(course) && num_electives < 2) {
            minorCourses.add(course);
            num_electives++;
            credits++;
        }
    }

    return [100 * credits / 6, minorCourses];
}

export default musicPerformanceMinor;