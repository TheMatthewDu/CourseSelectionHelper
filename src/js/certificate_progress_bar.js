import React, { useState } from 'react';
import aiCertificate from "./certificates/artificial_intelligence";
import businessCertificate from "./certificates/business";
import commCertificate from "./certificates/communication";
import evCertificate from "./certificates/electric_vehicles";
import entrepreneurshipCertificate from "./certificates/entrepreneurship";
import forensicsCertificate from "./certificates/forensics";
import globalCertificate from "./certificates/global";
import healthCertificate from "./certificates/health";
import jediCertificate from "./certificates/jedi";
import leadershipCertificate from "./certificates/leadership";
import mineralCertificate from "./certificates/mineral";
import musicCertificate from "./certificates/music";
import nuclearCertificate from "./certificates/nuclear";
import policyCertificate from "./certificates/public_policy";
import sustainabilityCertificate from "./certificates/sustainability";

const capstone_thesis = new Set([
    "MIE490Y1", "MIE491Y1", "MIE498H1", "CHE499Y1", "CME499H1", "CIV498H1",
    "ECE496Y1", "ECE499H1", "ESC499H1", "BME498Y1", "ESC472H1", "ESC471H1",
    "MIE429H1", "ROB498H1", "MSE498Y1", "MSE492H1", "MIN466H1"
]);

function CertificateProgressBar({ grids, capstone }) {
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
    const [ai, aiCourses] = aiCertificate(allCourses, capstone === "AI", capstone_course);
    const [business, businessCourses] = businessCertificate(allCourses, capstone === "Business", capstone_course)
    const [comm, commCourses] = commCertificate(allCourses, capstone === "Communications", capstone_course);
    const [ev, evCourses] = evCertificate(allCourses, capstone === "Electric Vehicles", capstone_course);
    const [entrepreneurship, entrepreneurshipCourses] = entrepreneurshipCertificate(allCourses, capstone === "Entrepreneurship", capstone_course);
    const [forensics, forensicsCourses] = forensicsCertificate(allCourses, capstone === "Forensics", capstone_course);
    const [global, globalCourses] = globalCertificate(allCourses, capstone === "Global Engineering", capstone_course);
    const [health, healthCourses] = healthCertificate(allCourses, capstone === "Public Health", capstone_course);
    const [jedi, jediCourses] = jediCertificate(allCourses, capstone === "JEDI", capstone_course);
    const [leadership, leadershipCourses] = leadershipCertificate(allCourses, capstone === "Leadership", capstone_course);
    const [mineral, mineralCourses] = mineralCertificate(allCourses, capstone === "Mineral", capstone_course);
    const [music, musicCourses] = musicCertificate(allCourses, capstone === "Music Technology", capstone_course);
    const [nuclear, nuclearCourses] = nuclearCertificate(allCourses, capstone === "Nuclear", capstone_course);
    const [policy, policyCourses] = policyCertificate(allCourses, capstone === "Public Policy", capstone_course);
    const [sustainability, sustainabilityCourses] = sustainabilityCertificate(allCourses, capstone === "Sustainability", capstone_course);

    const progressData = [
        { label: "Artificial Intelligence", value: ai, courses: aiCourses },
        { label: "Business", value: business, courses: businessCourses },
        { label: "Communications", value: comm, courses: commCourses },
        { label: "Electric Vehicles", value: ev, courses: evCourses },
        { label: "Entrepreneurship, Innovation and Small Business", value: entrepreneurship, courses: entrepreneurshipCourses },
        { label: "Forensic Engineering", value: forensics, courses: forensicsCourses },
        { label: "Global Engineering", value: global, courses: globalCourses },
        { label: "Public Health and Engineering", value: health, courses: healthCourses },
        { label: "Justice, Equity, Diversity and Inclusion", value: jedi, courses: jediCourses },
        { label: "Engineering Leadership", value: leadership, courses: leadershipCourses },
        { label: "Mineral Resources", value: mineral, courses: mineralCourses },
        { label: "Music Technology", value: music, courses: musicCourses },
        { label: "Nuclear Engineering", value: nuclear, courses: nuclearCourses },
        { label: "Public Policy and Engineering", value: policy, courses: policyCourses },
        { label: "Renewable Resources Engineering", value: sustainability, courses: sustainabilityCourses },
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

export default CertificateProgressBar;