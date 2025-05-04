import React from "react";

export function CapstoneDropDown(setSelectedOption, selectedOption){
    return (
        <div className="capstone-dropdown-container">
            <h2>Capstone/Thesis Topic</h2>
            <p>Use this tab to specify the topic of your capstone/thesis if you would like to use it to count
                towards a minor or certificate</p>
            <div className="dropdown-container">
                <label htmlFor="sidebar-dropdown">Capstone Topic: &nbsp; </label>
                <select id="sidebar-dropdown"
                        value={selectedOption}
                        onChange={(e) => setSelectedOption(e.target.value)}
                >
                    <option value="Select">-- Choose One --</option>
                    <option value="AI">Artificial Intelligence</option>
                    <option value="Bioengineering">Bioengineering</option>
                    <option value="Business">Business</option>
                    <option value="Environmental">Environment</option>
                    <option value="Manufacturing">Manufacturing</option>
                    <option value="Music">Music</option>
                    <option value="Nanoengineering">Nanoengineering</option>
                    <option value="Robotics">Robotics and/or Mechatronics</option>
                    <option value="Sustainability">Sustainability</option>
                </select>
            </div>
        </div>
    );
}
