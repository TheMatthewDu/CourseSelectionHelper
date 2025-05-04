import React, { useState } from 'react';
import roboticsMinor from "./minors/robotics_and_mechatronics";
import aiMinor from "./minors/artificial_intelligence";
import bioMinor from "./minors/bioengineering";
import businessMinor from "./minors/business";
import environmentalMinor from "./minors/environmental";
import manufacturingMinor from "./minors/manufacturing";
import musicPerformanceMinor from "./minors/music_performance";
import nanoengineeringMinor from "./minors/nanoengineering";
import sustainabilityMinor from "./minors/sustainability";

const capstone_thesis = new Set([
    "MIE490Y1", "MIE491Y1", "MIE498H1", "CHE499Y1", "CME499H1", "CIV498H1",
    "ECE496Y1", "ECE499H1", "ESC499H1", "BME498Y1", "ESC472H1", "ESC471H1",
    "MIE429H1", "ROB498H1", "MSE498Y1", "MSE492H1", "MIN466H1"
]);

function MinorProgressBar({ grids, capstone }) {
    // Extract all courses
    const allCourses = [];
    let capstone_course = "";
    for (let col of grids) {
        for (let row of col) {
            for (let cell of row) {
                const course = cell.content.includes(":")
                    ? cell.content.split(":")[0].trim()
                    : cell.content;
                allCourses.push(course);
                if (capstone_thesis.has(course)) capstone_course = course;
            }
        }
    }

    // Compute progress values and course lists
    const [ai, aiCourses] = aiMinor(allCourses, capstone === "AI", capstone_course);
    const [bio, bioCourses] = bioMinor(allCourses, capstone === "Bioengineering", capstone_course);
    const [business, businessCourses] = businessMinor(allCourses, capstone === "Business", capstone_course);
    const [environmental, environmentalCourses] = environmentalMinor(allCourses, capstone === "Environmental", capstone_course);
    const [manufacturing, manufacturingCourses] = manufacturingMinor(allCourses, capstone === "Manufacturing", capstone_course);
    const [musicPerformance, musicPerformanceCourses] = musicPerformanceMinor(allCourses, capstone === "Music", capstone_course);
    const [nanoengineering, nanoengineeringCourses] = nanoengineeringMinor(allCourses, capstone === "Nanoengineering", capstone_course);
    const [sustainability, sustainableCourses] = sustainabilityMinor(allCourses, capstone === "Sustainability", capstone_course);
    const [robotics, roboticsCourses] = roboticsMinor(allCourses, capstone === "Robotics", capstone_course);

    const progressData = [
        { label: "Artificial Intelligence", value: ai, courses: aiCourses },
        { label: "Bioengineering", value: bio, courses: bioCourses },
        { label: "Business", value: business, courses: businessCourses },
        { label: "Environmental", value: environmental, courses: environmentalCourses },
        { label: "Advanced Manufacturing", value: manufacturing, courses: manufacturingCourses },
        { label: "Music Performance", value: musicPerformance, courses: musicPerformanceCourses },
        { label: "Nanoengineering", value: nanoengineering, courses: nanoengineeringCourses },
        { label: "Sustainability", value: sustainability, courses: sustainableCourses },
        { label: "Robotics & Mechatronics", value: robotics, courses: roboticsCourses },
    ];

    // State array to control each accordion's open/closed status
    const [openStates, setOpenStates] = useState(
        () => progressData.map(() => true)
    );

    const expandAll = () => setOpenStates(progressData.map(() => true));
    const collapseAll = () => setOpenStates(progressData.map(() => false));

    const toggleIndex = (index) => {
        const newStates = [...openStates];
        newStates[index] = !newStates[index];
        setOpenStates(newStates);
    };

    return (
        <div className="accordion-container">
            <div className="controls">
                <button onClick={expandAll}>Expand All</button>
                <button onClick={collapseAll}>Collapse All</button>
            </div>
            {progressData.map((minor, idx) => (
                <details
                    key={minor.label}
                    className="accordion"
                    open={openStates[idx]}
                >
                    <summary
                        className="accordion-summary"
                        onClick={(e) => {
                            e.preventDefault();
                            toggleIndex(idx);
                        }}
                    >
                        {minor.label}: {Math.round(minor.value * 100) / 100}%
                    </summary>
                    <div className="accordion-content">
                        <div className="progress-bar">
                            <div
                                className="progress-bar-fill"
                                style={{ width: `${minor.value}%` }}
                            />
                        </div>
                        <ul className="label-list">
                            {[...minor.courses].map((course) => (
                                <li key={course}>{course}</li>
                            ))}
                        </ul>
                    </div>
                </details>
            ))}
        </div>
    );
}

export default MinorProgressBar;