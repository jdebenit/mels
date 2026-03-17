import { PDFDocument } from 'pdf-lib';
import type { CharacterState } from '../data/wizardConfig';

export async function exportCharacterToPDF(characterData: CharacterState, calculatedData: any) {
    try {
        // Fetch the empty PDF template from the public directory
        const response = await fetch('/Ficha_Mutant3s_Editable.pdf');
        if (!response.ok) {
            throw new Error(`Failed to fetch PDF template: ${response.statusText}`);
        }
        
        const existingPdfBytes = await response.arrayBuffer();
        
        // Load the PDFDocument
        const pdfDoc = await PDFDocument.load(existingPdfBytes);
        const form = pdfDoc.getForm();

        // Details
        setPdfTextField(form, 'SUJETO', characterData.name);
        setPdfTextField(form, 'ORGANIZACIÓN', characterData.organization);
        setPdfTextField(form, 'SEXO', characterData.sex);
        setPdfTextField(form, 'EDAD', characterData.age);
        // ALTURA doesn't exist on standard CharacterState, left out or mapped if needed
        
        // Attributes
        setPdfTextField(form, 'FUE', characterData.attributes.fuerza.toString());
        setPdfTextField(form, 'DES', characterData.attributes.destreza.toString());
        setPdfTextField(form, 'INT', characterData.attributes.inteligencia.toString());
        setPdfTextField(form, 'CAR', characterData.attributes.carisma.toString());
        setPdfTextField(form, 'MUT', characterData.attributes.mutacion.toString());
        setPdfTextField(form, 'PER', characterData.attributes.percepcion.toString());

        // Derived Combat Stats
        // PA depends on the specific rules, often fixed or base 3, but we haven't calculated it.
        // setPdfTextField(form, 'PA', ...);
        // setPdfTextField(form, 'PA ACTUALES', ...);
        setPdfTextField(form, 'INI', calculatedData.secondaryAttributes.iniciativa.toString());
        setPdfTextField(form, 'DEF', calculatedData.secondaryAttributes.defensa.toString());
        setPdfTextField(form, 'LET', calculatedData.secondaryAttributes.letalidad.toString());

        // Health Points (Orgullo and Resistencia)
        setPdfTextField(form, 'PO', calculatedData.secondaryAttributes.orgullo.toString());
        setPdfTextField(form, 'PO ACTUAL', calculatedData.secondaryAttributes.orgullo.toString());
        setPdfTextField(form, 'RESISTENCIA', calculatedData.secondaryAttributes.resistencia.toString());
        if (characterData.attributes.mutacion > 0) {
            setPdfTextField(form, 'BIOT', calculatedData.secondaryAttributes.bioTolerancia.toString());
        }

        // Skills (Specializations)
        Object.entries(characterData.specializations).forEach(([skillName, level]) => {
            if (level > 0) {
                // The skill levels might not be purely textual, but in this sheet it seems text fields
                // are used for skill levels next to the skill names.
                setPdfTextField(form, skillName, level.toString());
            }
        });

        // Advantages and Disadvantages
        let advIndex = 0;
        Object.entries(characterData.advantages).forEach(([advTitle, level]) => {
            if (level > 0 && advIndex <= 4) {
                const nameStr = `${advTitle} (Nivel ${level})`;
                setPdfTextField(form, `VENTAJA.${advIndex}`, nameStr);
                advIndex++;
            }
        });

        let disIndex = 0;
        Object.entries(characterData.disadvantages).forEach(([disTitle, level]) => {
            if (level > 0 && disIndex <= 4) {
                const nameStr = `${disTitle} (Nivel ${level})`;
                setPdfTextField(form, `DESVENTAJA.${disIndex}`, nameStr);
                disIndex++;
            }
        });

        // Fractals
        if (characterData.fractals.principal) {
            setPdfTextField(form, 'FRACTAL PRIMARIO', characterData.fractals.principal);
        }

        // Notes / Extra Details
        const detailsNotes = characterData.concept;
        if (detailsNotes) {
            setPdfTextField(form, 'NOTAS OPERATIVAS 1', detailsNotes.substring(0, 100)); // Just mapping first part as example
        }

        // Flatten the form so it is no longer editable. 
        // We might want to keep it editable for users to tweak, so we won't flatten by default.
        // form.flatten();

        // Serialize the PDFDocument to bytes
        const pdfBytes = await pdfDoc.save();

        // Trigger download
        const blob = new Blob([pdfBytes as any], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `ficha_${characterData.name || 'operativo'}.pdf`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

    } catch (error) {
        console.error('Error generating PDF:', error);
        alert('Hubo un error al generar el PDF. Revisa la consola para más detalles.');
    }
}

// Helper function to safely set text fields
function setPdfTextField(form: any, fieldName: string, value: string | undefined) {
    if (!value) return;
    try {
        const field = form.getTextField(fieldName);
        if (field) {
            field.setText(value);
        }
    } catch (e) {
        console.warn(`Could not set PDF field: ${fieldName}`);
    }
}
