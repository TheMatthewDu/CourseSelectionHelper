
// Update the grid such that the 3rd year stream courses match with 4th year stream
export function update_streams(input, targetCell){
    // Define the two special sets.
    const setA = [
        "BME331H1: Physiological Control Systems",
        "CHE354H1: Cellular and Molecular Biology"
    ];
    const setB = [
        "MIE439H1: Cellular and Tissue Biomechanics",
        "MIE458H1: Biofluid Mechanics"
    ];

    // If input is in setA, then allowed target values are in setB.
    if (setA.includes(input)) {
        // If target already holds a valid value from setB, keep it.
        if (targetCell && setB.includes(targetCell.content)) {
            return targetCell.content;
        }
        // Otherwise, default to the first allowed option.
        return setB[0];
    }

    // If input is in setB, then allowed target values are in setA.
    if (setB.includes(input)) {
        if (targetCell && setA.includes(targetCell.content)) {
            return targetCell.content;
        }
        return setA[0];
    }

    // For all other courses, fall back to your original mapping.
    switch (input) {
        case "MIE304H1: Introduction to Quality Control":
            return "MIE422H1: Automated Manufacturing";
        case "MIE346H1: Analog and Digital Electronics for Mechatronics":
            return "MIE404H1: Control Systems I";
        case "MIE320H1: Mechanics of Solids II":
            return "MIE442H1: Machine Design";
        case "MIE311H1: Thermal Energy Conversion":
            return "MIE515H1: Alternative Energy Systems";
        case "MIE422H1: Automated Manufacturing":
            return "MIE304H1: Introduction to Quality Control";
        case "MIE404H1: Control Systems I":
            return "MIE346H1: Analog and Digital Electronics for Mechatronics";
        case "MIE442H1: Machine Design":
            return "MIE320H1: Mechanics of Solids II";
        case "MIE515H1: Alternative Energy Systems":
            return "MIE311H1: Thermal Energy Conversion";
        default:
            return input;
    }
}