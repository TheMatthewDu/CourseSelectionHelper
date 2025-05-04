import {hssList} from "./data/hss_list";

// Define the set of CS course headers as an array
const csHeaders = [
    "ABS", "ANT", "ARC", "CIN", "CLA", "DRM", "EAS", "ECO", "ECMA", "ENG", "EST", "ETH", "FAH",
    "FIN", "FRE", "FSL", "GER", "GRK", "HIS", "HPS", "HUM", "HUN", "IAS", "INI", "ITA", "JAL",
    "JEF", "JHP", "JLP", "JMC", "JPJ", "JPP", "JUP", "LAT", "LIN", "MEI", "MGT", "MGM", "MUS",
    "NEW", "NMC", "NML", "PHL", "POL", "PRT", "RLG", "SAS", "SLA", "SMC", "SOC", "SPA", "TRN",
    "TEP", "UNI", "USA", "VIC", "WDW"
];

// Define the set of CS courses
const csCourses = new Set([
    "AFR355H1", "APS330H1", "ARA212Y5", "CCT109H5", "COG250Y1", "CSC404H1", "CSE270H1", "ENT200H1", "IMC200H1",
    "ENV307H1", "ENV320H1", "ENV335H1", "ENV347H1", "ENV350H1", "ENV422H1", "ERI260H1", "ERI360H1", "ESS104H1",
    "FAS143H1", "FOR302H1", "FOR303H1", "FOR421H1", "GGR124H1", "GGR220H1", "GGR222H1", "GGR225H1", "GGR251H1",
    "GGR252H1", "GGR252H5", "GGR271H1", "GGR314H1", "GGR323H1", "GGR329H1", "GGR332H1", "GGR335H1", "GGR343H1",
    "GGR356H1", "GGR424H1", "IRE260H1", "JGE378H1", "JPE250Y1", "JPH441H1", "JGI346H1", "MGEA01H3", "MGEA02H3",
    "MGEA05H3", "MGEA06H3", "MGR101H1", "PMU299Y1", "PPG201H1", "RSM295Y1", "TMU130H1", "TMU131H1", "URD212Y5",
    "URD312Y5", "VPMA93H3", "WME271H1", "APS510H1", "APS511H1", "CHE488H1", "CIV488H1", "ECE488H1", "MIE488H1",
    "MSE488H1", "JRE300H1", "JRE410H1", "JRE420H1"
]);

// Function to check if a course is an HSS course.
// Note: Since fetching the HSS list is asynchronous, you'll need to wait for getHssList() to resolve.
function isHss(course, hssList) {
    return hssList.has(course);
}

// Function to check if a course is a CS course.
// This returns true if the course either starts with any of the csHeaders or is explicitly in csCourses.
export function isCs(course) {
    // Check if the course starts with any header from csHeaders
    const hasHeader = csHeaders.some(prefix => course.startsWith(prefix));
    return hasHeader || csCourses.has(course);
}


const electives = new Set([
    "AER307H1", "AER525H1", "BME440H1", "BME595H1", "ECE344H1", "MIE343H1", "MIE360H1", "MIE407H1",
    "MIE410H1", "MIE414H1", "MIE440H1", "MIE444H1", "MIE498H1", "MIE498Y1", "MIE504H1", "MIE507H1",
    "MIE516H1", "MIE523H1", "MIE563H1", "MSE401H1", "MSE443H1", "BME520H1", "CHE475H1", "CIV440H1",
    "ECE344H1", "FOR424H1", "MIE402H1", "MIE408H1", "MIE437H1", "MIE438H1", "MIE441H1", "MIE443H1",
    "MIE469H1", "MIE498H1", "MIE498Y1", "MIE505H1", "MIE506H1", "MIE517H1", "MIE519H1", "MIE520H1",
    "MIE533H1", "MIE540H1", "MIE550H1"
]);

const designCourses = new Set([
    "MIE410H1", "MIE414H1", "MIE440H1", "MIE444H1", "MIE408H1", "MIE441H1", "MIE443H1", "MIE506H1",
    "MIE519H1", "MIE540H1"
])

const naturalScience = new Set([
    "ANA300Y1", "ANA301H1", "AST121H1", "AST221H1", "AST251H1", "BCH210H1", "BCH242Y1", "BCH299Y1",
    "BCH310H1", "BCH311H1", "BCH340H1", "BCH370H1", "BCH371H1", "BCH372Y1", "BCH373H1", "BCH375H1",
    "BCH377H1", "BCH378H1", "BCH422H1", "BCH425H1", "BCH426H1", "BCH427H1", "BCH440H1", "BCH444H1",
    "BCH445H1", "BCH446H1", "BCH447H1", "BCH448H1", "BCH471Y1", "BCH472Y1", "BCH473Y1", "BCH479H1",
    "BIO120H1", "BIO230H1", "CHE353H1", "CHM138H1", "CHM151Y1", "CHM210H1", "CHM325H1", "CIV220H1",
    "CIV300H1", "CSB200Y1", "EEB202H1", "EEB216H1", "EEB255H1", "EEB384H1", "ESS103H1", "ESS102H1",
    "ESS103H1", "ESS105H1", "ESS110H1", "ESS205H1", "ENV234H1", "ENV235H1", "ENV299Y1", "FOR300H1",
    "FOR301H1", "FOR305H1", "FOR307H1", "GGR100H1", "GGR101H1", "GGR201H1", "GGR203H1", "GGR205H1",
    "GGR206H1", "GGR303H1", "GGR305H1", "GGR307H1", "GGR308H1", "GGR333H1", "GGR337H1", "GLG130H1",
    "GLG202H1", "GLG206H1", "GLG207H1", "GLG216H1", "GLG217H1", "HMB200H1", "HMB201H1", "HMB202H1",
    "HMB203H1", "HMB205H1", "HMB220H1", "HMB265H1", "IMM250H1", "JEP100H1", "JGE236H1", "JOP210H1",
    "MGY441H1", "MSE219H1", "NFS284H1", "NFS484H1", "PHY224H1", "PHY231H1", "PHY252H1", "PHY256H1",
    "PSL190H1", "PSL201Y1", "PSL280H1", "PSY100H1"
])

// Basic correctness checks (example)
function checkRequirements(grids, setMessages) {
    if (grids[0] === undefined){
        return;
    }

    const newMessages = [];

    const allCourses = [];
    for (let cols of grids) {
        for (let row of cols) {
            for (let cell of row) {
                if (cell.content.includes(":")) {
                    allCourses.push(cell.content.split(":")[0].trim());
                } else {
                    allCourses.push(cell.content);
                }
            }
        }
    }


    let cs_list = [];
    let hss_list = [];
    let ns_list = [];
    let design_course_list = [];
    let technical_elective_list = [];
    for (const course_full of allCourses) {
        const [course] = course_full.split(':');
        if (isHss(course, hssList) && hss_list.length < 2) {
            hss_list.push(course);
        } else if (naturalScience.has(course) && ns_list.length < 1) {
            ns_list.push(course);
        } else if (isCs(course) && cs_list.length < 2) {
            cs_list.push(course);
        }

        if (designCourses.has(course) && design_course_list.length < 1) {
            design_course_list.push(course);
        }

        if (electives.has(course)) {
            technical_elective_list.push(course);
        }
    }

    if (hss_list.length === 0) {
        newMessages.push(`You need ${2 - hss_list.length} more HSS course.`);
    } else if (hss_list.length === 1) {
        newMessages.push(`You need ${2 - hss_list.length} more HSS course. Current HSS courses: ${hss_list[0]}`);
    }

    if (cs_list.length === 0){
        newMessages.push(`You need ${2 - cs_list.length} more CS courses.`);
    } else if (cs_list.length === 1){
        newMessages.push(`You need ${2 - cs_list.length} more CS courses. Current CS courses: ${cs_list[0]}`);
    }

    if (ns_list.length < 1){
        newMessages.push(`You need a Natural Science Elective!`);
    }

    if (design_course_list.length < 1){
        newMessages.push(`You need a design course! A design course has a '*' in its course name`);
    }

    if (technical_elective_list.length === 0){
        newMessages.push(`You are missing ${4 - technical_elective_list.length} technical electives!`);
    } else if (technical_elective_list.length < 4){
        newMessages.push(`You are missing ${4 - technical_elective_list.length} technical electives! Current technical 
        electives: ${technical_elective_list}`);
    }

    setMessages(newMessages);
}

export default checkRequirements;