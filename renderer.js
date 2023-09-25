const { dialog } = require('@electron/remote');
const fs = require('fs');


let selectedFilePath = null;

function chooseFile() {
    const files = dialog.showOpenDialogSync({
        properties: ['openFile'],
        filters: [
            { name: 'Career Files', extensions: ['CAR', 'car'] } // Added filter for .CAR files
        ]
    });
    if (files && files.length > 0) {
        selectedFilePath = files[0];
        document.getElementById('selectedFile').textContent = selectedFilePath;
    }
}


function editFile() {
    if (!selectedFilePath) {
        alert('Please select a file first.');
        return;
    }

    const offset = parseInt('D5DA', 16);
    const values = '05F5E100'; 

    const buffer = fs.readFileSync(selectedFilePath);
    const replacementBuffer = Buffer.from(values, 'hex');

    if (offset + replacementBuffer.length > buffer.length) {
        alert('Error: Offset and value length exceed file size.');
        return;
    }

    replacementBuffer.copy(buffer, offset);
    fs.writeFileSync(selectedFilePath, buffer);
    alert('File edited successfully.');
}
