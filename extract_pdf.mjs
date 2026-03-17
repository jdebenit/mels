import { PDFDocument } from 'pdf-lib';
import fs from 'fs';
import path from 'path';

async function extractFields() {
    try {
        const filePath = path.join(process.cwd(), 'public', 'Ficha_Mutant3s_Editable.pdf');
        const pdfBytes = fs.readFileSync(filePath);
        const pdfDoc = await PDFDocument.load(pdfBytes);
        const form = pdfDoc.getForm();
        const fields = form.getFields();
        
        const fieldData = fields.map(f => ({ name: f.getName(), type: f.constructor.name }));
        fs.writeFileSync('pdf_fields.json', JSON.stringify(fieldData, null, 2));
    } catch (e) {
        console.error('Error extracting fields:', e);
    }
}

extractFields();
