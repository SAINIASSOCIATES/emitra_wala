import 'regenerator-runtime/runtime.js'; // Import the regenerator-runtime
import path from 'path';
import { PDFDocument, rgb } from 'pdf-lib';
import { readFile } from 'fs/promises';
import fontkit from '@pdf-lib/fontkit';
const fontPath = path.join(process.cwd(), "/public/NotoSansDevanagari.ttf");



export const EPFO15GForm = async (req, res) => {

    const {
        nameassessee = '',
        panassessee = '',
        status = '',
        previousyear = '',
        residentialstatus = '',
        flat = '',
        premises = '',
        road = '',
        area = '',
        district = '',
        state = '',
        pin = '',
        email = '',
        mobileno = '',
        yes = '',
        no = '',
        estimated = '',
        formfield = '',
        totalform = '',
        account = '',
        incometye = '',
        tax = '',
        amount = '',
        signature = '',
        verification = '',
        yearending = '',
        year = '',
        yearendingon = '',
        year2 = '',
        place = '',
        date = '',
        signature2 = ''
    } = req.body;



    const fontBytes = await readFile(fontPath);
    // Read the PDF template file
    const pdfPath = path.join(process.cwd(), "/public/EPFO15GForm.pdf");
    const existingPdfBytes = await readFile(pdfPath);
    console.log('PDF file loaded successfully.');

    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    pdfDoc.registerFontkit(fontkit);
    const customFont = await pdfDoc.embedFont(fontBytes, { subset: true });


    const pages = pdfDoc.getPages();
    const firstPage = pages[0];

    // Set font size, color, and text position
    const fontSize = 9;

    // Helper function to draw text on the first page
    const drawText = (page, text, x, y, font, size, color) => {
        page.drawText(text, {
            x: x,
            y: y,
            font: font,
            size: size,
            color: color,
        });
    };

    // Define the color and size once
    const blackColor = rgb(0, 0, 0);
    const coordinates = [
        { text: nameassessee, x: 140, y: 480 },
        { text: panassessee, x: 295, y: 480 },
        { text: status, x: 40, y: 457 },
        { text: previousyear, x: 230, y: 460 },
        { text: residentialstatus, x: 300, y: 458 },
        { text: flat, x: 106, y: 447 },
        { text: premises, x: 196, y: 447 },
        { text: road, x: 288, y: 447 },
        { text: area, x: 368, y: 447 },
        { text: district, x: 107, y: 432 },
        { text: state, x: 160, y: 432 },
        { text: pin, x: 250, y: 432 },
        { text: email, x: 350, y: 432 },
        { text: mobileno, x: 50, y: 396 },
        { text: yes, x: 304, y: 408 },
        { text: no, x: 336, y: 408 },
        { text: estimated, x: 66, y: 375 },
        { text: formfield, x: 250, y: 336 },
        { text: totalform, x: 70, y: 336 },
        { text: account, x: 80, y: 288 },
        { text: incometye, x: 165, y: 288 },
        { text: tax, x: 240, y: 288 },
        { text: amount, x: 336, y: 288 },
        { text: signature, x: 280, y: 276 },
        { text: verification, x: 60, y: 235 },
        { text: yearending, x: 343, y: 170 },
        { text: year, x: 160, y: 160 },
        { text: yearendingon, x: 270, y: 141 },
        { text: year2, x: 100, y: 130 },
        { text: place, x: 70, y: 100 },
        { text: date, x: 70, y: 86 },
        { text: signature2, x: 300, y: 100 },
    ];

    // Draw all the text using the helper function
    coordinates.forEach(({ text, x, y }) => drawText(firstPage, text, x, y, customFont, fontSize, blackColor));


    const pdfBytes = await pdfDoc.save();
    console.log('PDF document saved successfully.');

    // Set the response headers for downloading the file
    res.set({
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="EPFO15GForm.pdf"`,
        'Content-Length': pdfBytes.length,
    });


    // Send the PDF as binary data
    res.send(Buffer.from(pdfBytes));

};


export const AadharOnlineAddressCorrectionForm = async (req, res) => {
    try {
        const {
            adharnum = "",
            name = "",
            contact = "",
            design = "",
            careof = "",
            offadd = "",
            certifi = "",
            huseno = "",
            street = "",
            lndmark = "",
            arealoc = "",
            village = "",
            postofc = "",
            district = "",
            state = "",
            pincode = "",
            dob = "",
            doi = ""
        } = req.body;


        // Load an existing PDF form
        const fontBytes = await readFile(fontPath);
        const pdfPath = path.join(process.cwd(), "/public/AadharOnlineAddressCorrectionForm.pdf");
        const existingPdfBytes = await readFile(pdfPath);
        const pdfDoc = await PDFDocument.load(existingPdfBytes);

        pdfDoc.registerFontkit(fontkit);
        const customFont = await pdfDoc.embedFont(fontBytes, { subset: true });

        const pages = pdfDoc.getPages();
        const firstPage = pages[0];

        // Set font size
        const fontSize = 12;

        // Mapping fields and their positions
        const fields = {
            adharnum: { x: 135, y: 715 },
            name: { x: 135, y: 690 },
            careof: { x: 135, y: 643 },
            huseno: { x: 135, y: 620 },
            street: { x: 135, y: 593 },
            lndmark: { x: 135, y: 570 },
            arealoc: { x: 135, y: 545 },
            village: { x: 135, y: 522 },
            postofc: { x: 135, y: 497 },
            district: { x: 135, y: 474 },
            state: { x: 135, y: 450 },
            pincode: { x: 135, y: 396 },
            dob: { x: 135, y: 366 },
            doi: { x: 399, y: 778 },
            certifi: { x: 135, y: 317 },
            design: { x: 135, y: 293 },
            offadd: { x: 135, y: 269 },
            contact: { x: 135, y: 221 }
        };

        // Draw the text for each field
        for (const [field, position] of Object.entries(fields)) {
            firstPage.drawText(req.body[field], {
                x: position.x,
                y: position.y,
                size: fontSize,
                font: customFont,
            });
        }

        // Serialize the PDF document to bytes (binary data)
        const pdfBytes = await pdfDoc.save();

        // Set the response header for downloading the file
        res.set({
            'Content-Type': 'application/pdf',
            'Content-Disposition': `attachment; filename="AadharOnlineAddressCorrectionForm.pdf"`,
            'Content-Length': pdfBytes.length, // Set content length explicitly
        });

        // Send the PDF as binary data
        res.send(Buffer.from(pdfBytes));
    } catch (error) {
        console.error('Error generating PDF:', error);
        res.status(500).json({ message: 'An error occurred while generating the PDF.' });
    }
};


export const affedeivtforascholar = async (req, res) => {
    try {
        const {
            name = '', fname = '', caste = '', locality = '', tehsil = '',
            Jilla = '', shri = '', school = '', classs = '', yojna = '', age = ''
        } = req.body;

        // Load an existing PDF form
        const fontBytes = await readFile(fontPath);
        const pdfPath = path.join(process.cwd(), "/public/affedeivtforascholar.pdf");
        const existingPdfBytes = await readFile(pdfPath);
        const pdfDoc = await PDFDocument.load(existingPdfBytes);

        pdfDoc.registerFontkit(fontkit);
        const customFont = await pdfDoc.embedFont(fontBytes, { subset: true });
        const pages = pdfDoc.getPages();
        const firstPage = pages[0];

        // Set font size
        const fontSize = 9;

        // Map fields to positions
        const fields = {
            name: { text: name, x: 120, y: 560 },
            fname: { text: fname, x: 330, y: 560 },
            caste: { text: caste, x: 495, y: 560 },
            locality: { text: locality, x: 120, y: 540 },
            tehsil: { text: tehsil, x: 282, y: 540 },
            Jilla: { text: Jilla, x: 420, y: 540 },
            shri: { text: shri, x: 282, y: 460 },
            school: { text: school, x: 160, y: 440 },
            classs: { text: classs, x: 445, y: 440 },
            yojna: { text: yojna, x: 150, y: 390 },
            age: { text: age, x: 340, y: 390 }
        };

        // Draw text for each field
        for (const { text, x, y } of Object.values(fields)) {
            firstPage.drawText(text, {
                x, y, size: fontSize,
                font: customFont,
            });
        }

        // Serialize the PDF document to bytes (binary data)
        const pdfBytes = await pdfDoc.save();

        // Set the response header for downloading the file
        res.set({
            'Content-Type': 'application/pdf',
            'Content-Disposition': `attachment; filename="affedeivtforascholar.pdf"`,
            'Content-Length': pdfBytes.length, // Set content length explicitly
        });

        // Send the PDF as binary data
        res.send(Buffer.from(pdfBytes));
    } catch (error) {
        console.error('Error generating PDF:', error);
        res.status(500).json({ message: 'An error occurred while generating the PDF.' });
    }
};




export const ANNEXURE = async (req, res) => {
    try {
        const {
            name = '', father = '', dob = '', date = '', mobile = '', idc = '',
            depart = '', design = '', tlphne = '', flname = '', place = '',
            address = '', ofadrs = '', prvname = '', ofaddress = ''
        } = req.body;

        // Load an existing PDF form
        const pdfPath = path.join(process.cwd(), "/public/ANNEXURE.pdf");
        const existingPdfBytes = await readFile(pdfPath);
        const fontBytes = await readFile(fontPath);
        const pdfDoc = await PDFDocument.load(existingPdfBytes);
        pdfDoc.registerFontkit(fontkit);
        const customFont = await pdfDoc.embedFont(fontBytes, { subset: true });
        const pages = pdfDoc.getPages();
        const firstPage = pages[0];

        // Set font size
        const fontSize = 9;

        // Map fields to positions
        const fields = {
            name1: { text: name, x: 330, y: 499 },
            father1: { text: father, x: 160, y: 482 },
            name2: { text: name, x: 250, y: 421 },
            father2: { text: father, x: 250, y: 400 },
            dob: { text: dob, x: 250, y: 375 },
            address: { text: address, x: 250, y: 360 },
            ofaddress: { text: ofaddress, x: 250, y: 310 },
            prvname: { text: prvname, x: 250, y: 295 },
            ofadrs: { text: ofadrs, x: 80, y: 175 },
            date: { text: date, x: 118, y: 140 },
            place: { text: place, x: 115, y: 126 },
            flname: { text: flname, x: 430, y: 190 },
            design: { text: design, x: 430, y: 175 },
            depart: { text: depart, x: 560, y: 163 },
            idc: { text: idc, x: 450, y: 149 },
            tlphne: { text: tlphne, x: 430, y: 126 },
            mobile: { text: mobile, x: 420, y: 111 }
        };

        // Draw text for each field
        for (const { text, x, y } of Object.values(fields)) {
            firstPage.drawText(text, {
                x, y, size: fontSize,
                font: customFont,
            });
        }

        // Serialize the PDF document to bytes (binary data)
        const pdfBytes = await pdfDoc.save();

        // Set the response header for downloading the file
        res.set({
            'Content-Type': 'application/pdf',
            'Content-Disposition': `attachment; filename="ANNEXURE.pdf"`,
            'Content-Length': pdfBytes.length, // Set content length explicitly
        });

        // Send the PDF as binary data
        res.send(Buffer.from(pdfBytes));
    } catch (error) {
        console.error('Error generating PDF:', error);
        res.status(500).json({ message: 'An error occurred while generating the PDF.' });
    }
};




export const GeneralCasteForm = async (req, res) => {
    try {
        const {
            name = "",
            fathername = "",
            address = "",
            paddress = "",
            village = "",
            district = "",
            mobile = "",
            grandfathername = "",
            currdate = "",
            sdistrict = "",
            dob = "",
            rajres = "",
            birthplace = "",
            age = "",
            gender = "",
            marrstatus = "",
            subcat = "",
            religion = ""
        } = req.body;

        // Load an existing PDF form
        const pdfPath = (path.join(process.cwd(), "/public/GeneralCasteForm.pdf"))
        const existingPdfBytes = await readFile(pdfPath);
        const fontBytes = await readFile(fontPath);
        const pdfDoc = await PDFDocument.load(existingPdfBytes);
        pdfDoc.registerFontkit(fontkit);
        const customFont = await pdfDoc.embedFont(fontBytes, { subset: true });
        const pages = pdfDoc.getPages();
        const firstPage = pages[0];
        const secondPage = pages[1];
        const thirdPage = pages[2];

        // Set font size, color, and text position
        const fontSize = 12;
        function drawText(page, text, x, y, fontSize) {
            page.drawText(text, {
                x: x, // X coordinate on the PDF
                y: y, // Y coordinate on the PDF
                size: fontSize,
                font: customFont,
                color: rgb(0, 0, 0), // black color
            });
        }

        // Drawing text on the first page
        drawText(firstPage, name, 230, 846, fontSize);
        drawText(firstPage, fathername, 230, 818, fontSize);
        drawText(firstPage, address, 230, 780, fontSize);
        drawText(firstPage, paddress, 230, 738, fontSize);
        drawText(firstPage, village, 160, 690, fontSize);
        drawText(firstPage, district, 310, 690, fontSize);
        drawText(firstPage, sdistrict, 460, 690, fontSize);
        drawText(firstPage, dob, 160, 660, fontSize);
        drawText(firstPage, birthplace, 360, 660, fontSize);
        drawText(firstPage, age, 534, 660, fontSize);
        drawText(firstPage, gender, 215, 630, fontSize); // Female Coordination
        drawText(firstPage, marrstatus, 465, 630, fontSize); // Status Unmarried
        drawText(firstPage, religion, 150, 595, fontSize);
        drawText(firstPage, subcat, 460, 595, fontSize);
        drawText(firstPage, rajres, 370, 565, fontSize);
        drawText(firstPage, mobile, 170, 530, fontSize);
        drawText(firstPage, currdate, 105, 420, fontSize);

        // Drawing text on the second page
        drawText(secondPage, name, 130, 776, fontSize);
        drawText(secondPage, fathername, 385, 780, fontSize);
        drawText(secondPage, address, 80, 750, fontSize);
        drawText(secondPage, name, 130, 475, fontSize);
        drawText(secondPage, fathername, 385, 475, fontSize);
        drawText(secondPage, address, 80, 445, fontSize);

        // Drawing text on the third page
        drawText(thirdPage, grandfathername, 360, 905, fontSize);
        drawText(thirdPage, fathername, 60, 905, fontSize);
        drawText(thirdPage, address, 85, 877, fontSize);
        drawText(thirdPage, village, 110, 847, fontSize);
        drawText(thirdPage, district, 280, 847, fontSize);
        drawText(thirdPage, sdistrict, 450, 847, fontSize);


        // Serialize the PDF document to bytes (binary data)
        const pdfBytes = await pdfDoc.save();

        // Set the response header for downloading the file
        res.set({
            'Content-Type': 'application/pdf',
            'Content-Disposition': `attachment; filename="GeneralCasteForm.pdf`,
            'Content-Length': pdfBytes.length, // Set content length explicitly
        });

        // Send the PDF as binary data
        res.send(Buffer.from(pdfBytes));
    } catch (error) {
        console.error("Error generating General Caste Form:", error); // Log the error for debugging
        res.status(500).json({ message: "An error occurred while generating the PDF." }); // Send an error response
    }
};


export const IncomeCertificate4PageFormat = async (req, res) => {
    try {
        // Destructure request body
        const {
            name = '',
            janaadhar = '',
            age = '',
            income = '',
            aayvavv = '',
            relwiown = '',
            memage = '',
            membername = '',
            village = '',
            birthplace = '',
            tinno = '',
            pancard = '',
            marrstatus = '',
            aaydaa = '',
            city = '',
            gender = '',
            guardian = '',
            paddress = '',
            dob = '',
            address = '',
            rajres = '',
            religion = '',
            caste = '',
            subcat = '',
            fathername = '',
            sdistrict = '',
            mothername = '',
            grandfathername = '',
            husbandname = '',
            mobile = '',
            district = '',
            date = ''
        } = req.body;


        // Load an existing PDF form
        const pdfPath = path.join(process.cwd(), "/public/IncomeCertificate4PageFormat.pdf");
        const existingPdfBytes = await readFile(pdfPath);
        const fontBytes = await readFile(fontPath);
        const pdfDoc = await PDFDocument.load(existingPdfBytes);
        pdfDoc.registerFontkit(fontkit);
        const customFont = await pdfDoc.embedFont(fontBytes, { subset: true });
        // Set font size
        const fontSize = 12;

        // Helper function to draw text on a specific page
        const drawText = (page, text, x, y, size) => {
            page.drawText(text, { x, y, size, font: customFont });
        };

        // Drawing text on the first page
        const firstPage = pdfDoc.getPages()[0];
        const firstPageCoordinates = [
            { text: name, x: 250, y: 627 },
            { text: fathername, x: 250, y: 601 },
            { text: address, x: 210, y: 559 },
            { text: paddress, x: 210, y: 531 },
            { text: village, x: 155, y: 491 },
            { text: district, x: 305, y: 491 },
            { text: sdistrict, x: 438, y: 491 },
            { text: dob, x: 155, y: 466 },
            { text: birthplace, x: 345, y: 466 },
            { text: age, x: 460, y: 466 },
            { text: gender, x: 127, y: 441 }, // Male
            { text: gender, x: 192, y: 441 }, // Female
            { text: marrstatus, x: 377, y: 441 }, // Married
            { text: marrstatus, x: 455, y: 441 }, // Unmarried
            { text: caste, x: 162, y: 416 },
            { text: religion, x: 282, y: 416 },
            { text: subcat, x: 434, y: 416 },
            { text: rajres, x: 415, y: 385 }, // Yes
            { text: rajres, x: 481, y: 385 }, // No
            { text: aaydaa, x: 415, y: 356 }, // Yes
            { text: aaydaa, x: 481, y: 356 }, // No
            { text: pancard, x: 305, y: 326 },
            { text: tinno, x: 274, y: 300 },
            { text: membername, x: 135, y: 225 },
            { text: memage, x: 240, y: 225 },
            { text: relwiown, x: 277, y: 225 },
            { text: aayvavv, x: 355, y: 225 },
            { text: income, x: 445, y: 225 },
            // Repeat member fields for different positions
            ...Array.from({ length: 3 }, (_, i) => [
                { text: membername, x: 135, y: 200 - i * 25 },
                { text: memage, x: 240, y: 200 - i * 25 },
                { text: relwiown, x: 277, y: 200 - i * 25 },
                { text: aayvavv, x: 355, y: 200 - i * 25 },
                { text: income, x: 445, y: 200 - i * 25 },
            ]).flat(),
            { text: date, x: 156, y: 83 },
            { text: district, x: 150, y: 55 },
        ];

        firstPageCoordinates.forEach(({ text, x, y }) => drawText(firstPage, text, x, y, fontSize));

        // Drawing text on the second page
        const secondPage = pdfDoc.getPages()[1];
        const secondPageCoordinates = [
            { text: name, x: 120, y: 585 },
            { text: fathername, x: 310, y: 595 },
            { text: age, x: 350, y: 585 },
            { text: village, x: 460, y: 587 },
            { text: district, x: 115, y: 567 },
            { text: age, x: 310, y: 540 },
            { text: age, x: 335, y: 523 },
            ...Array.from({ length: 4 }, (_, i) => [
                { text: membername, x: 135, y: 474 - i * 20 },
                { text: aayvavv, x: 275, y: 474 - i * 20 },
                { text: relwiown, x: 370, y: 474 - i * 20 },
                { text: income, x: 455, y: 474 - i * 20 },
            ]).flat(),
            { text: income, x: 144, y: 137 },
        ];

        secondPageCoordinates.forEach(({ text, x, y }) => drawText(secondPage, text, x, y, fontSize));

        // Drawing text on the third page
        const thirdPage = pdfDoc.getPages()[2];
        const thirdPageCoordinates = [
            { text: name, x: 220, y: 345 },
            { text: fathername, x: 365, y: 345 },
            { text: caste, x: 450, y: 345 },
            { text: age, x: 510, y: 345 },
            { text: address, x: 110, y: 320 },
            { text: caste, x: 453, y: 298 },
        ];

        thirdPageCoordinates.forEach(({ text, x, y }) => drawText(thirdPage, text, x, y, fontSize));

        // Drawing text on the fourth page
        const fourthPage = pdfDoc.getPages()[3];
        const fourthPageCoordinates = [
            { text: name, x: 150, y: 535 },
            { text: fathername, x: 400, y: 535 },
            { text: address, x: 120, y: 510 },
            { text: income, x: 335, y: 483 },
            { text: name, x: 150, y: 235 },
            { text: fathername, x: 400, y: 235 },
            { text: address, x: 120, y: 210 },
            { text: income, x: 335, y: 183 },
        ];

        fourthPageCoordinates.forEach(({ text, x, y }) => drawText(fourthPage, text, x, y, fontSize));

        // Serialize the PDF document to bytes (binary data)
        const pdfBytes = await pdfDoc.save();

        // Set the response header for downloading the file
        res.set({
            'Content-Type': 'application/pdf',
            'Content-Disposition': `attachment; filename="IncomeCertificate4PageFormat.pdf"`,
            'Content-Length': pdfBytes.length,
        });

        // Send the PDF as binary data
        res.send(Buffer.from(pdfBytes));
    } catch (error) {
        console.error('Error generating PDF:', error);
        res.status(500).send('An error occurred while generating the PDF.');
    }
};


export const lab = async (req, res) => {
    try {
        const {
            name = '',
            father = '',
            age = '',
            place = '',
            name2 = '',
            labourrs = '',
            frmdate = '',
            date02end = '',
            labourrl = '',
            labour = '',
            nivassi = '',
            date02 = '',
            address = '',
            careof = '',
            ward = '',
            adhar = '',
            mobile = '',
            datewe = '',
            ward2 = '',
            village = '',
            moneyde = '',
            villagepct = '',
            npward = '',
            datews = '',
            tehsil = '',
            jila = '',
            plsize = ''
        } = req.body;

        // Load an existing PDF form
        const pdfPath = path.join(process.cwd(), "/public/lab.pdf");
        const existingPdfBytes = await readFile(pdfPath);
        const fontBytes = await readFile(fontPath);
        const pdfDoc = await PDFDocument.load(existingPdfBytes);
        pdfDoc.registerFontkit(fontkit);
        const customFont = await pdfDoc.embedFont(fontBytes, { subset: true });
        const pages = pdfDoc.getPages();
        const firstPage = pages[0];

        // Set font size
        const fontSize = 9;

        // Mapping fields and their positions
        const fields = {
            name: { x: 125, y: 698 },
            father: { x: 420, y: 698 },
            age: { x: 110, y: 678 },
            nivassi: { x: 220, y: 678 },
            ward: { x: 380, y: 661 },
            adhar: { x: 268, y: 644 },
            mobile: { x: 460, y: 644 },
            ward2: { x: 255, y: 594 },
            village: { x: 310, y: 594 },
            villagepct: { x: 470, y: 594 },
            npward: { x: 253, y: 577 },
            tehsil: { x: 325, y: 577 },
            jila: { x: 470, y: 577 },
            plsize: { x: 180, y: 493 },
            datews: { x: 380, y: 493 },
            datewe: { x: 490, y: 493 },
            moneyde: { x: 405, y: 476 },
            name2: { x: 115, y: 411 },
            careof: { x: 260, y: 411 },
            address: { x: 410, y: 411 },
            date02: { x: 138, y: 394 },
            date02end: { x: 275, y: 394 },
            labour: { x: 392, y: 394 },
            labourrl: { x: 490, y: 394 },
            labourrs: { x: 460, y: 360 },
            frmdate: { x: 110, y: 124 },
            place: { x: 450, y: 125 }
        };

        // Draw the text for each field, defaulting to an empty string if undefined
        for (const [field, position] of Object.entries(fields)) {
            const text = req.body[field] || ''; // Default to empty string if undefined
            firstPage.drawText(text, {
                x: position.x,
                y: position.y,
                size: fontSize,
                font: customFont,
            });
        }

        // Serialize the PDF document to bytes (binary data)
        const pdfBytes = await pdfDoc.save();

        // Set the response header for downloading the file
        res.set({
            'Content-Type': 'application/pdf',
            'Content-Disposition': `attachment; filename="lab.pdf"`, // Default filename if name is undefined
            'Content-Length': pdfBytes.length, // Set content length explicitly
        });

        // Send the PDF as binary data
        res.send(Buffer.from(pdfBytes));
    } catch (error) {
        console.error('Error generating PDF:', error);
        res.status(500).json({ message: 'An error occurred while generating the PDF.' });
    }
};



export const obcstatecentercasteCertificateForm = async (req, res) => {
    try {
        // Destructuring with default values for empty strings
        const {
            name = '',
            janaadhar = '',
            dob = '',
            address = '',
            rajres = '',
            religion = '',
            caste = '',
            subcat = '',
            fathername = '',
            sdistrict = '',
            mothername = '',
            grandfathername = '',
            husbandname = '',
            mobile = '',
            district = '',
            date = '',
        } = req.body;

        // Load an existing PDF form
        const pdfPath = path.join(process.cwd(), '/public/obcstatecentercasteCertificateForm.pdf');
        const existingPdfBytes = await readFile(pdfPath);
        const fontBytes = await readFile(fontPath);
        const pdfDoc = await PDFDocument.load(existingPdfBytes);
        pdfDoc.registerFontkit(fontkit);
        const customFont = await pdfDoc.embedFont(fontBytes, { subset: true });

        const pages = pdfDoc.getPages();
        const firstPage = pages[0];
        const thirdPage = pages[3];
        const fourthPage = pages[4];

        // Set font size and text position
        const fontSize = 9;

        // Drawing text on the first page
        // Assuming customFont is already defined and loaded

        firstPage.drawText(name, { x: 235, y: 655, size: fontSize, color: rgb(0, 0, 0), font: customFont });
        firstPage.drawText(janaadhar, { x: 335, y: 675, size: fontSize, color: rgb(0, 0, 0), font: customFont });
        firstPage.drawText(dob, { x: 235, y: 630, size: fontSize, color: rgb(0, 0, 0), font: customFont });
        firstPage.drawText(address, { x: 225, y: 583, size: fontSize, font: customFont });
        firstPage.drawText(rajres, { x: 385, y: 503, size: fontSize, font: customFont });
        firstPage.drawText(religion, { x: 165, y: 455, size: fontSize, font: customFont });
        firstPage.drawText(caste, { x: 165, y: 430, size: fontSize, font: customFont });
        firstPage.drawText(subcat, { x: 165, y: 405, size: fontSize, font: customFont });
        firstPage.drawText(fathername, { x: 250, y: 285, size: fontSize, font: customFont });
        firstPage.drawText(mothername, { x: 250, y: 260, size: fontSize, font: customFont });
        firstPage.drawText(husbandname, { x: 250, y: 210, size: fontSize, font: customFont });
        firstPage.drawText(mobile, { x: 250, y: 182, size: fontSize, font: customFont });

        // Drawing text on the third page
        thirdPage.drawText(district, { x: 120, y: 175, size: fontSize, font: customFont });
        thirdPage.drawText(date, { x: 120, y: 125, size: fontSize, font: customFont });

        // Drawing text on the fourth page
        fourthPage.drawText(name, { x: 315, y: 760, size: fontSize, font: customFont });
        fourthPage.drawText(fathername, { x: 480, y: 760, size: fontSize, font: customFont });
        fourthPage.drawText(sdistrict, { x: 80, y: 745, size: fontSize, font: customFont });
        fourthPage.drawText(subcat, { x: 445, y: 745, size: fontSize, font: customFont });
        fourthPage.drawText(sdistrict, { x: 80, y: 632, size: fontSize, font: customFont });
        fourthPage.drawText(name, { x: 315, y: 646, size: fontSize, font: customFont });
        fourthPage.drawText(fathername, { x: 480, y: 647, size: fontSize, font: customFont });
        fourthPage.drawText(subcat, { x: 445, y: 632, size: fontSize, font: customFont });
        fourthPage.drawText(grandfathername, { x: 45, y: 540, size: 8, font: customFont });
        fourthPage.drawText(fathername, { x: 175, y: 540, size: 8, font: customFont });

        // Address divides: plotno, village, subdistrict, district
        fourthPage.drawText(district, { x: 280, y: 540, size: 8, font: customFont });
        fourthPage.drawText(district, { x: 390, y: 540, size: 8, font: customFont });
        fourthPage.drawText(district, { x: 480, y: 540, size: 8, font: customFont });
        fourthPage.drawText(district, { x: 550, y: 540, size: 8, font: customFont });
        fourthPage.drawText(subcat, { x: 390, y: 510, size: 8, font: customFont });


        // Serialize the PDF document to bytes (binary data)
        const pdfBytes = await pdfDoc.save();

        // Set the response header for downloading the file
        res.set({
            'Content-Type': 'application/pdf',
            'Content-Disposition': `attachment; filename="obcstatecentercasteCertificateForm.pdf"`,
            'Content-Length': pdfBytes.length, // Set content length explicitly
        });

        // Send the PDF as binary data
        res.send(Buffer.from(pdfBytes));

    } catch (error) {
        console.error('Error generating PDF:', error);
        res.status(500).json({ message: 'Failed to generate PDF', error: error.message });
    }
};

export const RGHSCARDLimitForm = async (req, res) => {
  const {
    name = '', 
    mobile = '',
    bkpk = '',
    rghs = '',
    dctrpst = '',
    dctrName = '',
    treatmentdat = '',
    price2 = '',
    price1 = ''
  } = req.body;

  try {
    // Load an existing PDF form
    const pdfPath = path.join(process.cwd(), "/public/RGHSCARDLimitForm.pdf");
    const existingPdfBytes = await readFile(pdfPath);
    const fontBytes = await readFile(fontPath);
    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    pdfDoc.registerFontkit(fontkit);
    const customFont = await pdfDoc.embedFont(fontBytes, { subset: true });

    const firstPage = pdfDoc.getPages()[0]; // Only use the first page as per your example

    // Set font size
    const fontSize = 12;

    // Define an array of text positions and values
    const textEntries = [
      { text: name, x: 255, y: 560 },
      { text: mobile, x: 255, y: 536 },
      { text: rghs, x: 255, y: 515 },
      { text: bkpk, x: 255, y: 494 },
      { text: dctrName, x: 340, y: 473 },
      { text: dctrpst, x: 280, y: 452 },
      { text: treatmentdat, x: 335, y: 431 },
      { text: price2, x: 380, y: 385 },
      { text: price1, x: 150, y: 385 }
    ];

    // Draw text on the PDF
    textEntries.forEach(entry => {
      firstPage.drawText(entry.text || ' ', { // Fallback to a blank string
        x: entry.x,
        y: entry.y,
        size: fontSize,
        font : customFont
      });
    });

    // Serialize the PDF document to bytes (binary data)
    const pdfBytes = await pdfDoc.save();

    // Set the response header for downloading the file
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="RGHSCARDLimitForm.pdf"`,
      'Content-Length': pdfBytes.length, // Set content length explicitly
    });

    // Send the PDF as binary data
    res.send(Buffer.from(pdfBytes));
  } catch (error) {
    console.error('Error generating PDF:', error); // Log the error for debugging
    res.status(500).send('An error occurred while generating the PDF.'); // Send a user-friendly error message
  }
};



export const SCSTCasteSTATECENTERCertificateForm = async (req, res) => {
    try {
      const {
        name = '',
        janaadhar = '',
        age = '',
        village = '',
        birthplace = '',
        marrstatus = '',
        city = '',
        gender = '',
        guardian = '',
        paddress = '',
        dob = '',
        address = '',
        rajres = '',
        religion = '',
        caste = '',
        subcat = '',
        fathername = '',
        sdistrict = '',
        mothername = '',
        grandfathername = '',
        husbandname = '',
        mobile = '',
        district = '',
        date = '',
      } = req.body;
  
      // Load an existing PDF form
      const pdfPath = path.join(process.cwd(), "/public/SCSTCasteSTATECENTERCertificateForm.pdf");
      const existingPdfBytes = await readFile(pdfPath);
      const fontBytes = await readFile(fontPath);
      const pdfDoc = await PDFDocument.load(existingPdfBytes);
      pdfDoc.registerFontkit(fontkit);
      const customFont = await pdfDoc.embedFont(fontBytes, { subset: true });

      const pages = pdfDoc.getPages();
      const firstPage = pages[0];
      const secondPage = pages[1];
  
      // Set font size and color
      const fontSize = 12;
      const textColor = rgb(0, 0, 0); // black color
  
      // Function to draw text on a page
      const drawText = (page, text, x, y, size = fontSize, color = textColor) => {
        if (text) {
          page.drawText(text, {
            x,
            y,
            size,
            font : customFont,
            color,
          });
        }
      };
  
      // Drawing text on the first page
      drawText(firstPage, janaadhar, 250, 678);
      drawText(firstPage, name, 195, 650);
      drawText(firstPage, fathername, 195, 625);
      drawText(firstPage, mothername, 195, 600);
      drawText(firstPage, guardian, 400, 578);
      drawText(firstPage, address, 173, 530);
      drawText(firstPage, paddress, 173, 488);
      drawText(firstPage, village, 130, 445);
      drawText(firstPage, district, 245, 445);
      drawText(firstPage, sdistrict, 355, 445);
      drawText(firstPage, city, 465, 445);
      drawText(firstPage, rajres, 340, 420);
      drawText(firstPage, district, 240, 395);
      drawText(firstPage, sdistrict, 315, 395);
      drawText(firstPage, district, 400, 395);
      drawText(firstPage, village, 470, 397);
      drawText(firstPage, dob, 135, 373);
      drawText(firstPage, birthplace, 308, 370);
      drawText(firstPage, age, 450, 370);
      drawText(firstPage, gender, 109, 345); // Assuming gender as male
      drawText(firstPage, gender, 178, 345); // Assuming gender as female
      drawText(firstPage, marrstatus, 355, 345); // Assuming married status
      drawText(firstPage, marrstatus, 435, 345); // Assuming unmarried status
      drawText(firstPage, religion, 138, 322);
      drawText(firstPage, subcat, 450, 322);
      drawText(firstPage, religion, 138, 297);
      drawText(firstPage, caste, 265, 297);
      drawText(firstPage, subcat, 450, 297);
      drawText(firstPage, mobile, 138, 245);
  
      // Drawing text on the second page
      drawText(secondPage, name, 315, 760);
      drawText(secondPage, fathername, 475, 760);
      drawText(secondPage, sdistrict, 80, 745);
      drawText(secondPage, subcat, 466, 745);
      drawText(secondPage, name, 315, 646);
      drawText(secondPage, fathername, 475, 647);
      drawText(secondPage, sdistrict, 80, 632);
      drawText(secondPage, subcat, 466, 632);
      drawText(secondPage, grandfathername, 45, 540, 8);
      drawText(secondPage, fathername, 175, 540, 8);
      
      // Address divides: plotno, village, subdistrict, district
      drawText(secondPage, district, 280, 540, 8);
      drawText(secondPage, district, 390, 540, 8);
      drawText(secondPage, district, 480, 540, 8);
      drawText(secondPage, district, 550, 540, 8);
      drawText(secondPage, subcat, 390, 510, 8);
  
      // Serialize the PDF document to bytes (binary data)
      const pdfBytes = await pdfDoc.save();
  
      // Set the response header for downloading the file
      res.set({
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${name}SCSTCasteSTATECENTERCertificateForm.pdf"`,
        'Content-Length': pdfBytes.length,
      });
      
      // Send the PDF as binary data
      res.send(Buffer.from(pdfBytes));
    } catch (error) {
      console.error('Error generating PDF:', error);
      res.status(500).json({ message: 'Failed to generate PDF', error: error.message });
    }
  };
  