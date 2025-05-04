import React, { useState, useEffect } from 'react';
import './App.css';
import Grid from "./js/grid";
import MinorProgressBar from "./js/minor_progress_bar";
import checkRequirements from "./js/requirement_validation_tab";
import {getInitialData} from "./js/data/course_grid"
import {CapstoneDropDown} from "./js/capstone_topic_tab";
import {handleExport} from "./js/handle_export";
import {update_streams} from "./js/update_streams";

function App() {
    const [grids, setGrids] = useState([]);
    const [messages, setMessages] = useState([]);
    const [selectedOption, setSelectedOption] = useState('Select');

    const streamFunc = (input, targetCell) => {
        return update_streams(input, targetCell);
    };

    useEffect(() => {
        setGrids(getInitialData(streamFunc));
    }, []);

    const handleCellChange = (gridIndex, colIndex, rowIndex, newData) => {
        setGrids(prevGrids => {
            // Make a copy of the grids state.
            const newGrids = prevGrids.map((grid, gIdx) => {
                // If this is not the grid we are modifying, return it unchanged.
                if (gIdx !== gridIndex) return grid;
                // Otherwise, update the grid:
                return grid.map((col, cIdx) => {
                    // If this is not the column we are modifying, return it unchanged.
                    if (cIdx !== colIndex) return col;
                    // Otherwise, update the specific row:
                    return col.map((cell, rIdx) =>
                        rIdx === rowIndex ? { ...cell, ...newData } : cell
                    );
                });
            });

            // Get the source cell (the one that was just updated)
            const sourceCell = newGrids[gridIndex][colIndex][rowIndex];

            // Handle watchers!
            if (sourceCell.watch !== undefined) {

                // The watch property should be a string key like "3,1,0"
                const [targetGridStr, targetColStr, targetRowStr] = sourceCell.watch.split(',');
                const targetGridIndex = parseInt(targetGridStr, 10);
                const targetColIndex = parseInt(targetColStr, 10);
                const targetRowIndex = parseInt(targetRowStr, 10);

                // Get the matching function from the source cell (if any)
                // This function transforms the input from the source cell for the target cell.
                const matchFunction = sourceCell.matchCond;
                const targetCell = newGrids[targetGridIndex][targetColIndex][targetRowIndex];
                const newContent = matchFunction ? matchFunction(newData.content, targetCell) : newData.content;

                // Update the target cell with the new content.
                newGrids[targetGridIndex] = newGrids[targetGridIndex].map((col, cIdx) => {
                    if (cIdx === targetColIndex) {
                        return col.map((cell, rIdx) => {
                            if (rIdx === targetRowIndex) {
                                return { ...cell, content: newContent, show: true };
                            }
                            return cell;
                        });
                    }
                    return col;
                });
            }

            return newGrids;
        });
    };

    useEffect(() => {
        checkRequirements(grids, setMessages);
    }, [grids, setMessages]);

    return (
        <div className="dashboard">
            <h1>Mechanical Engineering Degree Explorer</h1>
            <p>Please note this is an unofficial tool that is currently still in development. Please refer to the <a href="https://engineering.calendar.utoronto.ca/">Engineering Academic Calendar</a> for
                official program requirements</p>
            <p>If you find an issue or bug, or would like to suggest a new feature, please send an email to
                matthew [dot] du [at] mail.utoronto.ca. Please check <a href="https://docs.google.com/document/d/1jSp2kRMLBUIHAByMg1pX9_lP01Y2zGK0HjqxS0RA2qQ/edit?usp=sharing">here</a> to see if the issue/feature
                has been identified</p>

            <div className="main-content">
                <div className="grids-section">
                    {grids.map((grid, idx) => (
                        <div key={idx} className="grid-wrapper">
                            {
                                idx === grids.length - 1 ? (
                                    <h2>Extra Courses</h2>
                                ) : (
                                    <h2>Year {idx + 1}</h2>
                                )
                            }
                            <Grid
                                gridId={idx}
                                data={grid}
                                allData={grids}
                                onCellChange={(colIndex, rowIndex, newData) =>
                                    handleCellChange(idx, colIndex, rowIndex, newData)
                                }
                            />
                        </div>
                    ))}
                </div>

                <div className="sidebar">
                    <div className="sidebar-inner">
                        <div className="messages-container">
                            <h2>Program Requirements</h2>
                            {messages.length > 0 ? (
                                <ul>
                                    {messages.map((msg, index) => (
                                        <li key={index}>{msg}</li>
                                    ))}
                                </ul>
                            ) : (
                                <p>All requirements met!</p>
                            )}
                        </div>
                        <div className="progress-container">
                            <h2>Minors</h2>
                            <MinorProgressBar
                                grids={grids}
                                capstone={selectedOption}
                            />
                        </div>
                        <div className="dropdown-container">
                            <CapstoneDropDown
                                selectedOption={selectedOption}
                                setSelectedOption={setSelectedOption}
                            />
                        </div>
                        <div className="export-container">
                            <h2>Export</h2>
                            <button onClick={handleExport}>Export as CSV</button>
                        </div>
                    </div>
                </div>
            </div>

            <footer className="footer">
                Matthew Du &copy; {new Date().getFullYear()}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Not Affiliated with the University of Toronto
            </footer>
        </div>
    );
}

export default App;
