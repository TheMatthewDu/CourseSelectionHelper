import {suggestion_array} from "./all_courses";

// Helper: Create a grid (array of columns) from a one-dimensional list (column-by-column)
// We now add a "placeholder" property, using the raw data.
function createGridFromColumnData(data, gridIdx, columns, rows, editableFn, dropdownFn, suggestions,
                                  watchArr, matchCond) {
    const grid = [];
    let index = 0;
    let suggest_idx = 0;
    for (let c = 0; c < columns; c++) {
        const col = [];
        for (let r = 0; r < rows; r++) {
            const cellData = data[index] !== undefined ? data[index] : "";
            if (editableFn(c, r)) {
                col.push({
                    content: "",
                    placeholder: cellData, // Store the original raw string as placeholder.
                    editable: true,
                    dropdown: false,
                    show: false,
                    watch: watchArr[`${gridIdx},${c},${r}`],
                    matchCond: matchCond[`${gridIdx},${c},${r}`],
                    suggested: suggestions[suggest_idx] !== undefined ? suggestions[suggest_idx]: [""]
                });
                suggest_idx++;
            } else if (dropdownFn(c, r)) {
                col.push({
                    content: cellData,
                    placeholder: "", // Store the original raw string as placeholder.
                    editable: false,
                    dropdown: true,
                    show: true,
                    watch: watchArr[`${gridIdx},${c},${r}`],
                    matchCond: matchCond[`${gridIdx},${c},${r}`],
                    suggested: suggestions[suggest_idx] !== undefined ? suggestions[suggest_idx]: [""]
                })
                suggest_idx++;
            } else {
                col.push({
                    content: cellData,
                    placeholder: cellData, // Store the original raw string as placeholder.
                    editable: false,
                    dropdown: false,
                    show: true,
                    watch: watchArr[`${gridIdx},${c},${r}`],
                    matchCond: matchCond[`${gridIdx},${c},${r}`],
                    suggested: []
                })
            }
            index++;
        }
        grid.push(col);
    }
    return grid;
};

// Raw data for each grid (list of strings provided column-by-column)
export const Y1Data = [
    "APS100H1: Orientation to Engineering",
    "APS110H1: Engineering Chemistry and Materials Science",
    "APS111H1: Engineering Strategies & Practice I",
    "CIV100H1: Mechanics",
    "MAT186H1: Calculus I",
    "MAT188H1: Linear Algebra",
    "APS106H1: Fundamentals of Computer Programming",
    "APS112H1: Engineering Strategies & Practice II",
    "ECE110H1: Electrical Fundamentals",
    "MAT187H1: Calculus II",
    "MIE100H1: Dynamics",
    "MIE191H1: Seminar Course: Introduction to Mechanical and Industrial Engineering"
];
export const Y2Data = [
    "MIE230H1: Engineering Analysis",
    "MIE231H1: Probability and Statistics with Engineering Applications",
    "MIE243H1: Mechanical Engineering Design",
    "MIE270H1: Materials Science",
    "CS/HSS Elective",
    "Other",
    "MAT234H1: Differential Equations",
    "MIE210H1: Thermodynamics",
    "MIE221H1: Manufacturing Engineering",
    "MIE222H1: Mechanics of Solids I",
    "CS/HSS Elective",
    "Other"
];
export const Y3Data = [
    "MIE258H1: Engineering Economics",
    "MIE301H1: Kinematics and Dynamics of Machines",
    "MIE312H1: Fluid Mechanics I",
    "MIE342H1: Circuits with Applications to Mechanical Engineering Systems",
    "NS Elective",
    "Other",
    "MIE313H1: Heat and Mass Transfer",
    "MIE315H1: Design for the Environment",
    "MIE334H1: Numerical Methods I",
    "Stream Course 1",
    "Stream Course 2",
    "Other"
];
export const Y4Data = [
    "MIE491Y1: Capstone Design",
    "Stream Course 1",
    "Stream Course 2",
    "CS/HSS or Technical Elective",
    "CS/HSS or Technical Elective",
    "Other",
    "MIE491Y1: Capstone Design",
    "CS/HSS or Technical Elective",
    "CS/HSS or Technical Elective",
    "CS/HSS or Technical Elective",
    "CS/HSS or Technical Elective",
    "Other",
];

const capstones = [
    "MIE491Y1: Capstone Design",
    "APS490Y1: Multi-Disciplinary Capstone Design",
    "BME498Y1: Biomedical Engineering Capstone Design"
];

const Y3Stream = [
    "MIE304H1: Introduction to Quality Control",
    "MIE346H1: Analog and Digital Electronics for Mechatronics",
    "MIE320H1: Mechanics of Solids II",
    "MIE311H1: Thermal Energy Conversion",
    "BME331H1: Physiological Control Systems",
    "CHE354H1: Cellular and Molecular Biology"
]

const Y4Stream = [
    "MIE422H1: Automated Manufacturing",
    "MIE404H1: Control Systems I",
    "MIE442H1: Machine Design",
    "MIE515H1: Alternative Energy Systems",
    "MIE439H1: Cellular and Tissue Biomechanics",
    "MIE458H1: Biofluid Mechanics",
];

const extras = new Array(12).fill("Other");

// Grid dimensions: 2 columns x 6 rows.
const NUM_COLUMNS = 2;
const NUM_ROWS = 6;

// Initialize 4 grids using the helper function.
// For Grid 1, cells at even positions (by column order) are fixed.
export function getInitialData (streamFunc) {
    return [
        createGridFromColumnData(Y1Data, 0, NUM_COLUMNS, NUM_ROWS, () => false,
            () => false, [], {}, {}
        ),
        createGridFromColumnData(Y2Data, 1, NUM_COLUMNS, NUM_ROWS, (row, col) => (col === 4 || col === 5),() => false,
            [suggestion_array, suggestion_array, suggestion_array, suggestion_array], {}, {}
        ),
        createGridFromColumnData(Y3Data, 2, NUM_COLUMNS, NUM_ROWS,
            (row, col) => ((col === 4 || col === 5) || (col === 3 && row === 1)), () => false,
            [suggestion_array, suggestion_array, Y3Stream, Y3Stream, suggestion_array], {
                "2,1,3": "3,0,1",
                "2,1,4": "3,0,2"
            },
            {
                "2,1,3": streamFunc,
                "2,1,4": streamFunc
            }
        ),
        createGridFromColumnData(Y4Data, 3, NUM_COLUMNS, NUM_ROWS, (row, col) => (col !== 0),
            (col, row) => row === 0,
            [capstones, Y4Stream, Y4Stream, suggestion_array, suggestion_array, suggestion_array,
                capstones, suggestion_array, suggestion_array, suggestion_array, suggestion_array, suggestion_array],
            {
                "3,0,0": "3,1,0",
                "3,1,0": "3,0,0",
                "3,0,1": "2,1,3",
                "3,0,2": "2,1,4"
            },
            {
                "3,0,0": (input) => input,
                "3,1,0": (input) => input,
                "3,0,1": streamFunc,
                "3,0,2": streamFunc
            }
        ),

        createGridFromColumnData(extras, 4, NUM_COLUMNS, NUM_ROWS, () => true, () => false,
            new Array(12).fill(suggestion_array), {}, {})
    ];
}