// Grid component renders each column and cell using AutoCompleteInput for editable cells.
import AutoCompleteInput from "./autocomplete_input";
import AutoCompleteDropdown from "./autocomplete_dropdown";
import pre_reqs_and_exclusions from "./data/enrollment_controls";
import { React, useState } from "react";

function getAllBefore(data, gridId, colIndex, rowIndex) {
    let running = true;
    // Build an array of all courses
    const allCourses = [];
    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].length; j++) {
            for (let k = 0; k < data[i][j].length; k++) {
                let curr = data[i][j][k];

                if (i === gridId && j === colIndex && k === rowIndex) {
                    running = false;
                    break;
                }
                if (curr.content.includes(":")) {
                    allCourses.push(curr.content.split(":")[0].trim());
                } else {
                    allCourses.push(curr.content);
                }
            }

            if (!running) {
                break;
            }
        }

        if (!running) {
            break;
        }
    }

    return allCourses;
}

// Validates the condition recursively.
function validateConditions(condition, lst) {
    const temp = [];
    for (const item of condition.DATA) {
        if (typeof item === "string") {
            // Check if the string exists in the list.
            temp.push(lst.includes(item));
        } else {
            // If the item is an object, check the operator.
            if (item.OP === "OR") {
                // Use some() to simulate Python's any()
                temp.push(validateConditions(item, lst).some(Boolean));
            } else {
                // Otherwise, treat it as AND: every() simulates Python's all()
                temp.push(validateConditions(item, lst).every(Boolean));
            }
        }
    }
    return temp;
}

// Validates the condition recursively.
function validateExclusions(condition, lst) {
    const temp = [];
    for (const item of condition.DATA) {
        if (typeof item === "string") {
            // Check if the string exists in the list.
            temp.push(!lst.includes(item));
        } else {
            // If the item is an object, check the operator.
            if (item.OP === "OR") {
                // Use some() to simulate Python's any()
                temp.push(validateExclusions(item, lst).every(Boolean));
            } else {
                // Otherwise, treat it as AND: every() simulates Python's all()
                temp.push(validateExclusions(item, lst).some(Boolean));
            }
        }
    }
    return temp;
}

// Reconstructs the condition string recursively.
function reconstruct(condition) {
    if (typeof condition === "string") {
        return condition;
    }

    const temp = [];
    for (const cond of condition.DATA) {
        if (typeof cond === "string") {
            temp.push(cond);
        } else {
            temp.push(reconstruct(cond));
        }
    }
    if (condition.OP === "AND") {
        return `(${temp.join(", ")})`;
    } else if (condition.OP === "OR") {
        return `(${temp.join(" / ")})`;
    } else {
        throw new Error(`Unknown condition type ${condition.OP}.`);
    }
}

// Returns an array of reconstructed condition strings based on the boolean flags in pos.
export function toString(conditions, pos) {
    const result = [];
    conditions.DATA.forEach((val, idx) => {
        if (val && !pos[idx]) {
            result.push(reconstruct(val));
        }
    });
    return result;
}


function ErrorModal({ errorDetails, errorType, onClose }) {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>{errorType === "P" ? "Missing Prerequisites": "Excluded courses"}</h2>
                <ul>
                    {errorDetails.map(item => {
                        return <li>{item}</li>
                    })}
                </ul>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
}

function Grid({gridId, data, allData, onCellChange }) {
    const [errorModalOpen, setErrorModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState([]);

    const handleShowMore = (text, title) => {
        // You can customize the additional information as needed.
        setModalContent([text, title]);
        setErrorModalOpen(true);
    };

    // A simple validation: the input is valid if it exactly matches one of the suggestions.
    const validateInput = (value, allCourses) => {
        let header;
        if (value.includes(":")) {
            header = value.split(":")[0].trim();
        } else {
            header = value.trim();
        }

        if (pre_reqs_and_exclusions.has(header)) {
            let pre_reqs_check = validateConditions(pre_reqs_and_exclusions.get(header)[0], allCourses);
            let pre_reqs_check_str = toString(pre_reqs_and_exclusions.get(header)[0], pre_reqs_check);

            let exclusion_check = validateExclusions(pre_reqs_and_exclusions.get(header)[1], allCourses);
            let exclusion_check_str = toString(pre_reqs_and_exclusions.get(header)[1], exclusion_check);

            if (pre_reqs_check_str.length !== 0) {
                return ["You are missing pre-requisites for this course!", pre_reqs_check_str, "P"];
            }
            if (exclusion_check_str.length !== 0) {
                return ["This course is excluded from a course you have taken", exclusion_check_str, "E"];
            }
            return [];
        }
        return [];
    };

    return (
        <div className="grid">
            {data.map((column, colIndex) => (
                <div key={colIndex} className="grid-column">
                    {column.map((cell, rowIndex) => {
                        const errorText = validateInput(cell.content, getAllBefore(allData, gridId, colIndex, rowIndex));

                        return (
                            <div key={rowIndex} className="grid-cell">
                                {cell.editable ? (
                                    <AutoCompleteInput
                                        cell={cell}
                                        onChange={(newData) => onCellChange(colIndex, rowIndex, newData)}
                                    />
                                ) : cell.dropdown ? (
                                    <AutoCompleteDropdown
                                        cell={cell}
                                        onChange={(newData) => onCellChange(colIndex, rowIndex, newData)}
                                    />
                                ) : (
                                    <div className="cell-text">{cell.content}</div>
                                )}

                                {errorText.length !== 0 && (
                                    <div className={errorText[2] === "P" ? "error-message-red": "error-message-blue"}>
                                        <span>{errorText[0]}</span> &nbsp;
                                        <button
                                            className="show-more-btn"
                                            onClick={() => handleShowMore(errorText[1], errorText[2])}
                                        >
                                             Show More
                                        </button>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            ))}

            {errorModalOpen && (
                <ErrorModal
                    errorDetails={modalContent[0]}
                    errorType={modalContent[1]}
                    onClose={() => setErrorModalOpen(false)}
                    onDismiss={() => setErrorModalOpen(false)}
                />
            )}
        </div>
    );
}

export default Grid;