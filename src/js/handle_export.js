export function handleExport(grids, messages) {
    // Create CSV data from the grid
    const csvData = grids.map(grid => {
        // For each grid, map over the columns and rows and get the content or placeholder
        return grid[0].map((_, rowIndex) => {
            return grid.map((col, colIndex) => {
                const cell = col[rowIndex];
                return `"${cell.content || cell.placeholder}"`; // Include content or placeholder in CSV
            }).join(','); // Join columns by commas
        }).join('\n'); // Join rows by new lines
    }).join('\n\n'); // Separate different grids with new lines

    // Add the messages (if needed) at the bottom of the CSV export (or wherever necessary)
    const fullExportData = `${csvData}\n\nMessages:\n${messages.join('\n')}`;

    // Convert the CSV data into a Blob to be downloaded
    const dataStr = "data:text/csv;charset=utf-8," + encodeURIComponent(fullExportData);

    // Create a download link for the CSV file
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "dashboard_data.csv");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
}
