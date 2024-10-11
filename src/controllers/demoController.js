import 'regenerator-runtime/runtime.js'; // Import the regenerator-runtime
import path from 'path';
import { PDFDocument, rgb } from 'pdf-lib';
import { readFile } from 'fs/promises';
import fontkit from '@pdf-lib/fontkit';
const fontPath = path.join(process.cwd(), "/public/NotoSansDevanagari.ttf");


export const BonafiedCertificateForm = async (req, res) => {
  try {

    // Load font and PDF template
    const fontBytes = await readFile(fontPath);
    const pdfPath = path.join(process.cwd(), '/public/BonafiedCertificateForm.pdf');
    const existingPdfBytes = await readFile(pdfPath);


    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    pdfDoc.registerFontkit(fontkit);
    const customFont = await pdfDoc.embedFont(fontBytes, { subset: true });


    const pages = pdfDoc.getPages();
    const fontSize = 9;
    const blackColor = rgb(0, 0, 0);

    const {
      name = '',
      father = '',
      premaAddress = '',
      dob = '',
      fatherAndHusbandworking = '',
      birthPlace = '',
      fatherAndHusbandWorkingAddress = '',
      district = '',
      manyYear = '',
      mobile = '',
      AreYouMarind = '',
      subdistrict = '',
      dada = '',
      age = '',
      gender= "",
      MarridBox = ""
    } = req.body;

    console.log(req.body);
    // Helper function to draw text on a page
    const drawText = (page, text, x, y, size = fontSize) => {
      if (text) {
        page.drawText(text, {
          x, y, size, font: customFont, color: blackColor
        });
      }
    };

    // Draw text on the first page
    const firstPage = pages[0];
    drawText(firstPage, name, 220, 890);
    drawText(firstPage, name, 220, 790);
    drawText(firstPage, father, 220, 860);
    drawText(firstPage, premaAddress, 220, 830);
    drawText(firstPage, fatherAndHusbandworking, 220, 765);
    drawText(firstPage, fatherAndHusbandWorkingAddress, 220, 740);
    drawText(firstPage, birthPlace, 220, 710);
    drawText(firstPage, dob, 220, 690);
    drawText(firstPage, district, 70, 515);
    drawText(firstPage, 'yes', 300, 470);
    drawText(firstPage, manyYear, 300, 412);
    drawText(firstPage, mobile, 270, 380);
    drawText(firstPage, AreYouMarind, 270, 328);
    drawText(firstPage, district, 80, 75);

    // Draw text on the second page
    const secondPage = pages[1];
    const data = `${subdistrict} ${district}`;
    drawText(secondPage, name, 220, 880);
    drawText(secondPage, name, 220, 727);
    drawText(secondPage, father, 450, 880);
    drawText(secondPage, father, 450, 727);
    drawText(secondPage, data, 120, 860);
    drawText(secondPage, data, 110, 703);
    drawText(secondPage, "10", 420, 860);
    drawText(secondPage, "10", 350, 703);
    drawText(secondPage, district, 90, 835);
    drawText(secondPage, district, 520, 703);

    // Draw text on the third page
    const thirdPage = pages[2]; 
    if (age >= 18) {
    drawText(thirdPage, name, 120, 885);
    drawText(thirdPage, father, 330, 885);
    drawText(thirdPage, data, 90, 865);
    drawText(thirdPage, "Rajasthan", 190, 845);
    }
    if (age < 18) {
      drawText(thirdPage, father, 170, 595);
      drawText(thirdPage, dada, 330, 650);
      drawText(thirdPage, father, 130, 650);
      drawText(thirdPage, "Rajasthan", 170, 610);
      drawText(thirdPage, data, 90, 630);
      drawText(thirdPage, district, 290, 565);
    }

    if(gender == "female" && MarridBox == "on"){
      drawText(thirdPage, name, 120, 385);
      drawText(thirdPage, name, 270, 330);
      drawText(thirdPage, father, 330, 385);
      drawText(thirdPage, data, 100, 365);
    }

    // Save the PDF and send the response
    const pdfBytes = await pdfDoc.save();
    console.log('PDF document saved successfully.');

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="Bonafied-Certificate-Form.pdf"',
      'Content-Length': pdfBytes.length,
    });

    res.send(Buffer.from(pdfBytes));
  } catch (error) {
    console.error('Error generating PDF:', error);
    res.status(500).send('Internal Server Error');
  }
};



export const MarriageCertificatecompleteform = async (req, res) => {
  try {
    console.log(req.body)
    const {
      ffather = '',
      mmother = '',
      mfather = '',
      fmother = '',
      maddress = '',
      faddress = '',
      mreligion = '',
      freligion = '',
      mcaste = '',
      fcaste = '',
      marriageplace = '',
      marriagedate = '',
      beforedate = '',
      mdob = '',
      fdob = '',
      mgawah = '',
      fgawah = '',
      mgawahfather = '',
      fgawahfather = '',
      mgawahaddress = '',
      fgawahaddress = '',
      pandit = '',
      pfather = '',
      paddress = '',
      pcaste = '',
      mname = '',
      fname = '',
      medu = '',
      fedu = '',
      mdistrict = '',
      fdistrict = '',
      mjanaadhar = '',
      fjanaadhar = '',
      maadhar = '',
      faadhar = '',
      emname = '',
      efname = '',
      emedu = '',
      efedu = '',
      effather = '',
      emfather = '',
      efmother = '',
      emmother = '',
      emdistrict = '',
      efdistrict = '',
      emarriageplace = '',
      emcaste = '',
      efcaste = '',
      emaddress = '',
      efaddress = '',
      citizen = '',
      ecitizen = '',
      mstate = '',
      mestate = '',
      mobilenumber = '',
      marrstate = '',
      marrdistrict = '',
      emarrstate = '',
      emarrdistrict = '',
      fstate = '',
      festate = '',
      presentdate = '',
      mage = '',
      fage = '',
      mgawahcaste = '',
      fgawahcaste = '',
      pdistrict = '',
      pstate = ''
    } = req.body;


    const fontBytes = await readFile(fontPath);
    // Read the PDF template file
    const pdfPath = path.join(process.cwd(), "/public/MarriageCertificatecompleteform.pdf");
    const existingPdfBytes = await readFile(pdfPath);
    console.log('PDF file loaded successfully.');

    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    pdfDoc.registerFontkit(fontkit);
    const customFont = await pdfDoc.embedFont(fontBytes, { subset: true });


    const pages = pdfDoc.getPages();
    const firstPage = pages[0];
    let secondPage = pages[1];
    let thirdpage = pages[2];
    let fourthpage = pages[3];
    let fifthPage = pages[4];
    let sixthPage = pages[5];
    let seventhPage = pages[6];
    let eighthPage = pages[7];
    // Set font size, color, and text position
    const fontSize = 9;

    // Utility function to draw text on the PDF
    function drawText(page, text, x, y, size, font = customFont, color = rgb(0, 0, 0)) {
      page.drawText(text, { x, y, size, font, color });
    }


    drawText(firstPage, ffather, 145, 153, fontSize);
    drawText(firstPage, emname, 110, 570, fontSize);
    drawText(firstPage, emfather, 145, 556, fontSize);
    drawText(firstPage, emmother, 145, 543, fontSize);
    drawText(firstPage, emcaste, 100, 530, fontSize);
    drawText(firstPage, emedu, 445, 530, fontSize);
    drawText(firstPage, emdistrict, 270, 505, fontSize);
    drawText(firstPage, mname, 120, 450, fontSize);
    drawText(firstPage, mfather, 160, 435, fontSize);
    drawText(firstPage, mmother, 160, 418, fontSize);
    drawText(firstPage, mcaste, 90, 400, fontSize);
    drawText(firstPage, ecitizen, 250, 530, fontSize);
    drawText(firstPage, mestate, 435, 505, fontSize);
    drawText(firstPage, mstate, 450, 367, fontSize);
    drawText(firstPage, citizen, 250, 400, fontSize);
    drawText(firstPage, emaddress, 120, 517, fontSize);
    drawText(firstPage, medu, 450, 400, fontSize);
    drawText(firstPage, maddress, 110, 385, fontSize);
    drawText(firstPage, mdistrict, 300, 367, fontSize);
    drawText(firstPage, mreligion, 60, 351, fontSize);
    drawText(firstPage, mobilenumber, 220, 351, fontSize);
    drawText(firstPage, maadhar, 250, 335, fontSize);
    drawText(firstPage, mdob, 90, 335, fontSize);
    drawText(firstPage, mjanaadhar, 465, 335, fontSize);
    drawText(firstPage, efname, 95, 289, fontSize);
    drawText(firstPage, efmother, 130, 262, fontSize);
    drawText(firstPage, efcaste, 80, 250, fontSize);
    drawText(firstPage, ecitizen, 240, 250, fontSize);
    drawText(firstPage, efedu, 430, 250, fontSize);
    drawText(firstPage, efaddress, 120, 237, fontSize);
    drawText(firstPage, efdistrict, 270, 223, fontSize);
    drawText(firstPage, festate, 440, 223, fontSize);
    drawText(firstPage, effather, 120, 275, fontSize);
    drawText(firstPage, fname, 110, 170, fontSize);
    drawText(firstPage, fmother, 150, 137, fontSize);
    drawText(firstPage, fcaste, 90, 120, fontSize);
    drawText(firstPage, citizen, 250, 120, fontSize);
    drawText(firstPage, fedu, 455, 120, fontSize);
    drawText(firstPage, faddress, 105, 105, fontSize);
    drawText(firstPage, fdistrict, 300, 86, fontSize);
    drawText(firstPage, fstate, 460, 86, fontSize);
    drawText(firstPage, freligion, 80, 70, fontSize);
    drawText(firstPage, fdob, 110, 53, fontSize);
    drawText(firstPage, faadhar, 260, 53, fontSize);
    drawText(firstPage, fjanaadhar, 460, 53, fontSize);


    // Usage of the helper function to reduce repetition
    drawText(secondPage, emarriageplace, 155, 748, fontSize);
    drawText(secondPage, emarrdistrict, 155, 733, fontSize);
    drawText(secondPage, emarrstate, 305, 733, fontSize);
    drawText(secondPage, marriagedate, 480, 733, fontSize);
    drawText(secondPage, marriageplace, 155, 674, fontSize);
    drawText(secondPage, marrdistrict, 165, 654, fontSize);
    drawText(secondPage, marrstate, 305, 654, fontSize);
    drawText(secondPage, marriagedate, 485, 654, fontSize);
    drawText(secondPage, mname, 90, 595, fontSize);
    drawText(secondPage, fname, 375, 595, fontSize);
    drawText(secondPage, mgawah, 90, 377, fontSize);
    drawText(secondPage, fgawah, 370, 377, fontSize);
    drawText(secondPage, mgawahfather, 100, 357, fontSize);
    drawText(secondPage, fgawahfather, 375, 357, fontSize);
    drawText(secondPage, mgawahaddress, 60, 340, fontSize);
    drawText(secondPage, fgawahaddress, 335, 340, fontSize);
    drawText(secondPage, mname, 50, 266, fontSize);
    drawText(secondPage, mfather, 245, 267, fontSize);
    drawText(secondPage, mage, 420, 267, fontSize);
    drawText(secondPage, maddress, 37, 253, fontSize);
    drawText(secondPage, mname, 160, 179, fontSize);
    drawText(secondPage, maadhar, 340, 164, fontSize);
    drawText(secondPage, mobilenumber, 150, 150, fontSize);



    // Usage of the helper function to reduce repetition
    drawText(thirdpage, mname, 145, 893, fontSize);
    drawText(thirdpage, mfather, 352, 893, fontSize);
    drawText(thirdpage, maddress, 300, 876, fontSize);
    drawText(thirdpage, mdistrict, 240, 860, fontSize);
    drawText(thirdpage, mstate, 325, 860, fontSize);
    drawText(thirdpage, fname, 325, 825, fontSize);
    drawText(thirdpage, ffather, 180, 808, fontSize);
    drawText(thirdpage, fage, 395, 808, fontSize);
    drawText(thirdpage, fcaste, 480, 808, fontSize);
    drawText(thirdpage, faddress, 220, 792, fontSize);
    drawText(thirdpage, fdistrict, 180, 775, fontSize);
    drawText(thirdpage, fstate, 270, 775, fontSize);
    drawText(thirdpage, marriageplace, 200, 760, fontSize);
    drawText(thirdpage, marriagedate, 240, 743, fontSize);
    drawText(thirdpage, presentdate, 435, 553, fontSize);
    drawText(thirdpage, fname, 465, 485, fontSize);
    drawText(thirdpage, beforedate, 210, 368, fontSize);
    drawText(thirdpage, mage, 127, 877, fontSize);
    drawText(thirdpage, mcaste, 205, 876, fontSize);


    // Usage of the helper function to reduce repetition
    drawText(fourthpage, fname, 150, 893, fontSize);
    drawText(fourthpage, ffather, 380, 893, fontSize);
    drawText(fourthpage, faddress, 337, 876, fontSize);
    drawText(fourthpage, fstate, 110, 860, fontSize);
    drawText(fourthpage, mname, 280, 825, fontSize);
    drawText(fourthpage, mfather, 460, 825, fontSize);
    drawText(fourthpage, mage, 310, 808, fontSize);
    drawText(fourthpage, mcaste, 390, 808, fontSize);
    drawText(fourthpage, maddress, 160, 792, fontSize);
    drawText(fourthpage, mstate, 360, 792, fontSize);
    drawText(fourthpage, marriageplace, 200, 777, fontSize);
    drawText(fourthpage, marriagedate, 240, 760, fontSize);
    drawText(fourthpage, presentdate, 370, 558, fontSize);
    drawText(fourthpage, mname, 295, 490, fontSize);
    drawText(fourthpage, beforedate, 170, 390, fontSize);
    drawText(fourthpage, fage, 155, 877, fontSize);
    drawText(fourthpage, fcaste, 235, 876, fontSize);


    // Usage of the helper function to reduce repetition
    drawText(fifthPage, mgawah, 145, 860, fontSize);
    drawText(fifthPage, mgawahfather, 350, 860, fontSize);
    drawText(fifthPage, mgawahaddress, 305, 843, fontSize);
    drawText(fifthPage, mgawahcaste, 205, 843, fontSize);
    drawText(fifthPage, mname, 225, 792, fontSize);
    drawText(fifthPage, mfather, 415, 792, fontSize);
    drawText(fifthPage, mage, 245, 775, fontSize);
    drawText(fifthPage, mcaste, 320, 775, fontSize);
    drawText(fifthPage, maddress, 400, 775, fontSize);
    drawText(fifthPage, mdistrict, 150, 758, fontSize);
    drawText(fifthPage, mstate, 225, 758, fontSize);
    drawText(fifthPage, fname, 400, 758, fontSize);
    drawText(fifthPage, ffather, 205, 742, fontSize);
    drawText(fifthPage, faddress, 390, 742, fontSize);
    drawText(fifthPage, fdistrict, 150, 725, fontSize);
    drawText(fifthPage, fstate, 225, 725, fontSize);
    drawText(fifthPage, marriagedate, 330, 675, fontSize);
    drawText(fifthPage, marriageplace, 370, 693, fontSize);

    // Usage of the helper function to reduce repetition
    drawText(sixthPage, fgawah, 150, 860, fontSize);
    drawText(sixthPage, fgawahfather, 350, 860, fontSize);
    drawText(sixthPage, fgawahaddress, 305, 843, fontSize);
    drawText(sixthPage, fgawahcaste, 205, 843, fontSize);
    drawText(sixthPage, fname, 245, 792, fontSize);
    drawText(sixthPage, ffather, 425, 792, fontSize);
    drawText(sixthPage, faddress, 255, 775, fontSize);
    drawText(sixthPage, fstate, 445, 775, fontSize);
    drawText(sixthPage, mname, 235, 758, fontSize);
    drawText(sixthPage, mfather, 410, 758, fontSize);
    drawText(sixthPage, maddress, 230, 742, fontSize);
    drawText(sixthPage, mstate, 430, 742, fontSize);
    drawText(sixthPage, marriagedate, 190, 675, fontSize);
    drawText(sixthPage, marriageplace, 230, 693, fontSize);

    // Usage of the helper function to reduce repetition
    drawText(seventhPage, mname, 150, 893, fontSize);
    drawText(seventhPage, mfather, 330, 893, fontSize);
    drawText(seventhPage, mage, 70, 868, fontSize);
    drawText(seventhPage, mcaste, 160, 868, fontSize);
    drawText(seventhPage, maddress, 270, 868, fontSize);
    drawText(seventhPage, fname, 240, 842, fontSize);
    drawText(seventhPage, ffather, 420, 842, fontSize);
    drawText(seventhPage, fage, 180, 818, fontSize);
    drawText(seventhPage, fcaste, 260, 818, fontSize);
    drawText(seventhPage, faddress, 365, 818, fontSize);
    drawText(seventhPage, fstate, 100, 792, fontSize);
    drawText(seventhPage, mstate, 90, 842, fontSize);

    // Usage of the helper function to reduce repetition
    drawText(eighthPage, pandit, 100, 778, fontSize);
    drawText(eighthPage, pfather, 335, 778, fontSize);
    drawText(eighthPage, paddress, 80, 728, fontSize);
    drawText(eighthPage, pcaste, 360, 750, fontSize);
    drawText(eighthPage, pdistrict, 110, 700, fontSize);
    drawText(eighthPage, pstate, 230, 700, fontSize);
    drawText(eighthPage, mname, 300, 670, fontSize);
    drawText(eighthPage, mfather, 75, 650, fontSize);
    drawText(eighthPage, maddress, 300, 650, fontSize);
    drawText(eighthPage, mname, 270, 630, fontSize);
    drawText(eighthPage, fname, 135, 610, fontSize);
    drawText(eighthPage, ffather, 320, 610, fontSize);
    drawText(eighthPage, faddress, 90, 592, fontSize);
    drawText(eighthPage, marriagedate, 420, 592, fontSize);
    drawText(eighthPage, marriageplace, 70, 552, fontSize);
    drawText(eighthPage, mname, 70, 505, fontSize);
    drawText(eighthPage, fname, 310, 505, fontSize);

    const pdfBytes = await pdfDoc.save();
    console.log('PDF document saved successfully.');

    // Set the response headers for downloading the file
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="MarriageCertificatecompleteform.pdf"`,
      'Content-Length': pdfBytes.length,
    });

    // Send the PDF as binary data
    res.send(Buffer.from(pdfBytes));

  } catch (error) {
    console.error('Error generating PDF:', error);

    res.status(500).send({
      message: 'An error occurred while generating the PDF document.',
      error: error.message,
    });
  }
}






export const berojgariform= async (req, res)=> {
  const {
    Applicant = '',
    Father = '',
    Address = '',
    Village = '',
    Tehsil = '',
    District = '',
    DOB = '',
    DobAddress = '',
    Age = '',
    Gender = '',
    Marrigestatus = '',
    Religs = '',
    Cast = '',
    SubCast = '',
    Moolnivasi = '',
    Taxpay = '',
    Mobile = '',
    PanNo = '',
    TinNo = '',
    Memberfirst = '',
    Agefirst = '',
    Relationfirst = '',
    Worktypefirst = '',
    Yearlyincomefirst = '',
    Membersecond = '',
    Agesecond = '',
    Relationsecond = '',
    Worktypesecond = '',
    Yearlyincomesecond = '',
    Memberthird = '',
    Agethird = '',
    Relationthird = '',
    Worktypethird = '',
    Yearlyincomethird = '',
    Memberfour = '',
    Agefour = '',
    Relationfour = '',
    Worktypefour = '',
    Yearlyincomefour = '',
    Memberfive = '',
    Agefive = '',
    Relationfive = '',
    Worktypefive = '',
    Yearlyincomefive = '',
    Membersix = '',
    Agesix = '',
    Relationsix = '',
    Worktypesix = '',
    Yearlyincomesix = '',
    Otherincome = '',
    TotalIncome = '',
    Date = '',
    AAddress = '',
    AvidanceFirst = '',
    Avidancefather = '',
    AvFirstAddress = '',
    Vibhagfirst = '',
    Rictifirst = '',
    KfApplicant = '',
    KfFather = '',
    KfAddress = '',
    Kfyearlyincome = '',
    AvidancesignName = '',
    AvidancesignDate = '',
    AvidancesignAddress = '',
    Avidancesecond = '',
    Avidancesecondfather = '',
    AsAddress = '',
    AsvibhagName = '',
    AsRikti = '',
    AsApplicant = '',
    AsApplicantfather = '',
    AsApplicantAddress = '',
    Asyearlyincome = '',
    AsavidancesignName = '',
    Asavidancedate = '',
    Asavidanceaddress = '',
    Annexurename = '',
    Annexurefather = '',
    AnnexureDob = '',
    AnnexureAddress = '',
    AnnexureDistrict = '',
    ownpromise = '',
    ownpromiseFather = ''
  } = req.body;
  
     const fontBytes = await readFile(fontPath);
    // Read the PDF template file
    const pdfPath = path.join(process.cwd(), "/public/berojgariform.pdf");
    const existingPdfBytes = await readFile(pdfPath);
    console.log('PDF file loaded successfully.');

    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    pdfDoc.registerFontkit(fontkit);
    const customFont = await pdfDoc.embedFont(fontBytes , { subset: true });

  
  const pages = pdfDoc.getPages();
  const firstPage = pages[0];
  let secondPage = pages[1];
  let thirdPage = pages[2];
  let fourPage = pages[3];


  // Set font size, color, and text position
  const fontSize = 9;

  
  firstPage.drawText(Applicant, {
    x: 130, // X coordinate on the PDF
    y: 680, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  firstPage.drawText(Father, {
    x: 125, // X coordinate on the PDF
    y: 660, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  firstPage.drawText(Address, {
    x: 125, // X coordinate on the PDF
    y: 630, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  firstPage.drawText(Village, {
    x: 100, // X coordinate on the PDF
    y: 580, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  firstPage.drawText(Tehsil, {
    x: 230, // X coordinate on the PDF
    y: 580, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  firstPage.drawText(District, {
    x: 356, // X coordinate on the PDF
    y: 580, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  firstPage.drawText(DOB, {
    x: 100, // X coordinate on the PDF
    y: 560, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  firstPage.drawText(DobAddress, {
    x: 250, // X coordinate on the PDF
    y: 560, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  firstPage.drawText(Age, {
    x: 376, // X coordinate on the PDF
    y: 560, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  firstPage.drawText(Gender, {
    x: 130, // X coordinate on the PDF
    y: 535, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  firstPage.drawText(Marrigestatus, {
    x: 376, // X coordinate on the PDF
    y: 535, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  firstPage.drawText(Religs, {
    x: 110, // X coordinate on the PDF
    y: 509, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  firstPage.drawText(Cast, {
    x: 230, // X coordinate on the PDF
    y: 509, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  firstPage.drawText(SubCast, {
    x: 366, // X coordinate on the PDF
    y: 509, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  firstPage.drawText(Moolnivasi, {
    x: 310, // X coordinate on the PDF
    y: 484, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  firstPage.drawText(Taxpay, {
    x: 200, // X coordinate on the PDF
    y: 460, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  firstPage.drawText(Mobile, {
    x: 120, // X coordinate on the PDF
    y: 440, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  firstPage.drawText(PanNo, {
    x: 200, // X coordinate on the PDF
    y: 425, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  firstPage.drawText(TinNo, {
    x: 200, // X coordinate on the PDF
    y: 405, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  firstPage.drawText(Memberfirst, {
    x: 80, // X coordinate on the PDF
    y: 347, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  firstPage.drawText(Agefirst, {
    x: 215, // X coordinate on the PDF
    y: 347, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  firstPage.drawText(Relationfirst, {
    x: 254, // X coordinate on the PDF
    y: 347, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  }); 
  firstPage.drawText(Worktypefirst, {
    x: 320, // X coordinate on the PDF
    y: 347, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  }); 
  firstPage.drawText(Yearlyincomefirst, {
    x: 440, // X coordinate on the PDF
    y: 347, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  firstPage.drawText(Agesecond, {
    x: 215, // X coordinate on the PDF
    y: 332, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  firstPage.drawText(Membersecond, {
    x: 80, // X coordinate on the PDF
    y: 332, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  firstPage.drawText(Relationsecond, {
    x: 254, // X coordinate on the PDF
    y: 332, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  }); 
  firstPage.drawText(Worktypesecond, {
    x: 320, // X coordinate on the PDF
    y: 332, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  }); 
  firstPage.drawText(Yearlyincomesecond, {
    x: 440, // X coordinate on the PDF
    y: 332, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  firstPage.drawText(Memberthird, {
    x: 80, // X coordinate on the PDF
    y: 319, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  firstPage.drawText(Agethird, {
    x: 215, // X coordinate on the PDF
    y: 319, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  firstPage.drawText(Memberthird, {
    x: 80, // X coordinate on the PDF
    y: 319, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  firstPage.drawText(Relationthird, {
    x: 254, // X coordinate on the PDF
    y: 319, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  }); 
  firstPage.drawText(Worktypethird, {
    x: 320, // X coordinate on the PDF
    y: 319, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  }); 
  firstPage.drawText(Yearlyincomethird, {
    x: 440, // X coordinate on the PDF
    y: 319, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  firstPage.drawText(Memberfour, {
    x: 80, // X coordinate on the PDF
    y: 305, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  firstPage.drawText(Agefour, {
    x: 215, // X coordinate on the PDF
    y: 310, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  firstPage.drawText(Relationfour, {
    x: 254, // X coordinate on the PDF
    y: 310, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  }); 
  firstPage.drawText(Worktypefour, {
    x: 320, // X coordinate on the PDF
    y: 310, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  }); 
  firstPage.drawText(Yearlyincomefour, {
    x: 440, // X coordinate on the PDF
    y: 310, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  firstPage.drawText(Memberfive, {
    x: 80, // X coordinate on the PDF
    y: 290, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  firstPage.drawText(Agefive, {
    x: 215, // X coordinate on the PDF
    y: 290, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  firstPage.drawText(Relationfive, {
    x: 254, // X coordinate on the PDF
    y: 290, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  }); 
  firstPage.drawText(Worktypefive, {
    x: 320, // X coordinate on the PDF
    y: 290, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  }); 
  firstPage.drawText(Yearlyincomefive, {
    x: 440, // X coordinate on the PDF
    y: 290, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  firstPage.drawText(Membersix, {
    x: 80, // X coordinate on the PDF
    y: 270, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  firstPage.drawText(Agesix, {
    x: 215, // X coordinate on the PDF
    y: 270, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  firstPage.drawText(Relationsix, {
    x: 254, // X coordinate on the PDF
    y: 270, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  }); 
  firstPage.drawText(Worktypesix, {
    x: 320, // X coordinate on the PDF
    y: 270, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  }); 
  firstPage.drawText(Yearlyincomesix, {
    x: 440, // X coordinate on the PDF
    y: 270, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  firstPage.drawText(Otherincome, {
    x: 440, // X coordinate on the PDF
    y: 259, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  firstPage.drawText(TotalIncome, {
    x: 440, // X coordinate on the PDF
    y: 240, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  firstPage.drawText(Date, {
    x: 60, // X coordinate on the PDF
    y: 189, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  firstPage.drawText(AAddress, {
    x: 60, // X coordinate on the PDF
    y: 170, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });

  secondPage.drawText(AvidanceFirst, {
    x: 60, // X coordinate on the PDF
    y: 735, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  secondPage.drawText(Avidancefather, {
    x: 320, // X coordinate on the PDF
    y: 735, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  secondPage.drawText(AvFirstAddress, {
    x: 80, // X coordinate on the PDF
    y: 715, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  secondPage.drawText(Vibhagfirst, {
    x: 100, // X coordinate on the PDF
    y: 686, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  secondPage.drawText(Rictifirst, {
    x: 420, // X coordinate on the PDF
    y: 686, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  secondPage.drawText(KfApplicant, {
    x: 100, // X coordinate on the PDF
    y: 630, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  secondPage.drawText(KfFather, {
    x: 420, // X coordinate on the PDF
    y: 630, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  secondPage.drawText(KfAddress, {
    x: 70, // X coordinate on the PDF
    y: 606, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  secondPage.drawText(Kfyearlyincome, {
    x: 300, // X coordinate on the PDF
    y: 575, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  secondPage.drawText(AvidancesignName, {
    x: 210, // X coordinate on the PDF
    y: 470, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  secondPage.drawText(AvidancesignDate, {
    x: 375, // X coordinate on the PDF
    y: 470, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  secondPage.drawText(AvidancesignAddress, {
    x: 480, // X coordinate on the PDF
    y: 470, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  secondPage.drawText(Avidancesecond, {
    x: 70, // X coordinate on the PDF
    y: 360, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  secondPage.drawText(Avidancesecondfather, {
    x: 340, // X coordinate on the PDF
    y: 360, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  secondPage.drawText(AsAddress, {
    x: 100, // X coordinate on the PDF
    y: 343, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  secondPage.drawText(AsvibhagName, {
    x: 120, // X coordinate on the PDF
    y: 313, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  secondPage.drawText(AsRikti, {
    x: 420, // X coordinate on the PDF
    y: 313, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  secondPage.drawText(AsApplicant, {
    x: 100, // X coordinate on the PDF
    y: 260, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  secondPage.drawText(AsApplicantfather, {
    x: 400, // X coordinate on the PDF
    y: 260, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  secondPage.drawText(AsApplicantAddress, {
    x: 100, // X coordinate on the PDF
    y: 230, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  secondPage.drawText(Asyearlyincome, {
    x: 300, // X coordinate on the PDF
    y: 200, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  secondPage.drawText(AsavidancesignName, {
    x: 210, // X coordinate on the PDF
    y: 100, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  secondPage.drawText(Asavidancedate, {
    x: 380, // X coordinate on the PDF
    y: 100, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  secondPage.drawText(Asavidanceaddress, {
    x: 480, // X coordinate on the PDF
    y: 100, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  thirdPage.drawText(Annexurename, {
    x: 120, // X coordinate on the PDF
    y: 610, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  thirdPage.drawText(Annexurefather, {
    x: 230, // X coordinate on the PDF
    y: 585, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  thirdPage.drawText(AnnexureDob, {
    x: 70, // X coordinate on the PDF
    y: 560, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  thirdPage.drawText(AnnexureAddress, {
    x: 200, // X coordinate on the PDF
    y: 560, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  thirdPage.drawText(AnnexureDistrict, {
    x: 200, // X coordinate on the PDF
    y: 540, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });





  fourPage.drawText(ownpromise, {
    x: 130, // X coordinate on the PDF
    y: 700, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  fourPage.drawText(ownpromiseFather, {
    x: 380, // X coordinate on the PDF
    y: 698, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
    const pdfBytes = await pdfDoc.save();
    console.log('PDF document saved successfully.');

    // Set the response headers for downloading the file
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="berojgariform.pdf"`,
      'Content-Length': pdfBytes.length,
    });


    // Send the PDF as binary data
    res.send(Buffer.from(pdfBytes));
    
};





export const ewsnewform= async (req, res)=> {
    
  const { Shreeman,incomeoffice,OfficeAddress,Adharno,Applicanthindi,Applicantenglish,Dob,DobAddress,Age
    ,Addressinfo,PresentAddress,FixAddress,Phoneno,Mobileno,Relign,Cast,SubCast,AddCast,Gender,Marrigestatus
    ,Fatherhindi,Fatherenglish,Motherhindi,Motherenglish,Husbandhindi,Husbandenglish,Wifehindi,Wifeenglish,
    Centraljob,Sallery,Firstjobdate,Community,sVacancy,sSallery,JobFromdate,JobTodate,FarmingLand,Flat,inFlat,outFlat
    ,tApplicant,tFather,tAddress,tCast,tSubcast,tlandscape,tFlat,tRashancard,tDate,tHalkano
    ,fPromiser,fFather,fCast,fState,fAddress,fFullAddress,fTehsil,fDistrict,fIncome
    
  } =req.body

     const fontBytes = await readFile(fontPath);
    // Read the PDF template file
    const pdfPath = path.join(process.cwd(), "/public/ewsnewform.pdf");
    const existingPdfBytes = await readFile(pdfPath);
    console.log('PDF file loaded successfully.');

    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    pdfDoc.registerFontkit(fontkit);
    const customFont = await pdfDoc.embedFont(fontBytes , { subset: true });

  
  const pages = pdfDoc.getPages();
  const firstPage = pages[0];
  let secondPage = pages[1];
  let thirdPage = pages[2];
  let fourthPage = pages[3];
  //   let fifthPage = pages[4];
  //   let sixthPage = pages[5];
  //   let seventhPage = pages[6];
  //   let eighthPage = pages[7];

  // Set font size, color, and text position
  const fontSize = 9;

  
  firstPage.drawText(Shreeman, {
    x: 250, // X coordinate on the PDF
    y: 628, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  firstPage.drawText(incomeoffice, {
    x: 250, // X coordinate on the PDF
    y: 600, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  firstPage.drawText(OfficeAddress, {
    x: 250, // X coordinate on the PDF
    y: 578, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  firstPage.drawText(Adharno, {
    x: 200, // X coordinate on the PDF
    y: 470, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  firstPage.drawText(Applicanthindi, {
    x: 226, // X coordinate on the PDF
    y: 447, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  firstPage.drawText(Applicantenglish, {
    x: 480, // X coordinate on the PDF
    y: 447, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  firstPage.drawText(Dob, {
    x: 150, // X coordinate on the PDF
    y: 415, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  firstPage.drawText(DobAddress, {
    x: 300, // X coordinate on the PDF
    y: 415, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  firstPage.drawText(Age, {
    x: 400, // X coordinate on the PDF
    y: 415, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  firstPage.drawText(Addressinfo, {
    x: 230, // X coordinate on the PDF
    y: 400, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  firstPage.drawText(PresentAddress, {
    x: 200, // X coordinate on the PDF
    y: 385, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  firstPage.drawText(FixAddress, {
    x: 200, // X coordinate on the PDF
    y: 352, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  firstPage.drawText(Phoneno, {
    x: 190, // X coordinate on the PDF
    y: 320, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  firstPage.drawText(Mobileno, {
    x: 350, // X coordinate on the PDF
    y: 320, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  firstPage.drawText(Relign, {
    x: 180, // X coordinate on the PDF
    y: 300, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  firstPage.drawText(Cast, {
    x: 270, // X coordinate on the PDF
    y: 300, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  firstPage.drawText(SubCast, {
    x: 400, // X coordinate on the PDF
    y: 300, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  firstPage.drawText(AddCast, {
    x: 110, // X coordinate on the PDF
    y: 255, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  firstPage.drawText(Gender, {
    x: 180, // X coordinate on the PDF
    y: 235, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  firstPage.drawText(Marrigestatus, {
    x: 400, // X coordinate on the PDF
    y: 235, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  firstPage.drawText(Fatherhindi, {
    x: 200, // X coordinate on the PDF
    y: 220, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  firstPage.drawText(Fatherenglish, {
    x: 420, // X coordinate on the PDF
    y: 220, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  firstPage.drawText(Motherhindi, {
    x: 200, // X coordinate on the PDF
    y: 205, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  firstPage.drawText(Motherenglish, {
    x: 400, // X coordinate on the PDF
    y: 205, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  firstPage.drawText(Husbandhindi, {
    x: 200, // X coordinate on the PDF
    y: 187, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  firstPage.drawText(Husbandenglish, {
    x: 400, // X coordinate on the PDF
    y: 187, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  firstPage.drawText(Wifehindi, {
    x: 200, // X coordinate on the PDF
    y: 170, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  firstPage.drawText(Wifeenglish, {
    x: 400, // X coordinate on the PDF
    y: 170, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });




  secondPage.drawText(Centraljob, {
    x: 260, // X coordinate on the PDF
    y: 728, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  secondPage.drawText(Sallery, {
    x: 295, // X coordinate on the PDF
    y: 710, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  secondPage.drawText(Firstjobdate, {
    x: 240, // X coordinate on the PDF
    y: 695, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  secondPage.drawText(Community, {
    x: 200, // X coordinate on the PDF
    y: 664, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  secondPage.drawText(sVacancy, {
    x: 190, // X coordinate on the PDF
    y: 648, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  secondPage.drawText(sSallery, {
    x: 300, // X coordinate on the PDF
    y: 630, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  secondPage.drawText(JobFromdate, {
    x: 230, // X coordinate on the PDF
    y: 615, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  secondPage.drawText(JobTodate, {
    x: 330, // X coordinate on the PDF
    y: 615, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  secondPage.drawText(FarmingLand, {
    x: 240, // X coordinate on the PDF
    y: 390, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  secondPage.drawText(Flat, {
    x: 240, // X coordinate on the PDF
    y: 370, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  secondPage.drawText(inFlat, {
    x: 340, // X coordinate on the PDF
    y: 355, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  secondPage.drawText(outFlat, {
    x: 360, // X coordinate on the PDF
    y: 340, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });




  thirdPage.drawText(tApplicant, {
    x: 450, // X coordinate on the PDF
    y: 400, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  thirdPage.drawText(tFather, {
    x: 170, // X coordinate on the PDF
    y: 380, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  thirdPage.drawText(tAddress, {
    x: 350, // X coordinate on the PDF
    y:380, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  thirdPage.drawText(tCast, {
    x: 300, // X coordinate on the PDF
    y: 363, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  thirdPage.drawText(tSubcast, {
    x: 380, // X coordinate on the PDF
    y: 363, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  thirdPage.drawText(tlandscape, {
    x: 340, // X coordinate on the PDF
    y: 348, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  thirdPage.drawText(tFlat, {
    x: 490, // X coordinate on the PDF
    y: 348, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  thirdPage.drawText(tRashancard, {
    x: 240, // X coordinate on the PDF
    y: 315, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  thirdPage.drawText(tDate, {
    x: 360, // X coordinate on the PDF
    y: 315, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  thirdPage.drawText(tHalkano, {
    x: 460, // X coordinate on the PDF
    y: 220, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });











  fourthPage.drawText(fPromiser, {
    x: 200, // X coordinate on the PDF
    y: 659, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  
  fourthPage.drawText(fFather, {
    x: 440, // X coordinate on the PDF
    y: 655, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  fourthPage.drawText(fCast, {
    x: 225, // X coordinate on the PDF
    y: 640, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  
  fourthPage.drawText(fState, {
    x: 348, // X coordinate on the PDF
    y: 640, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  fourthPage.drawText(fAddress, {
    x: 100, // X coordinate on the PDF
    y: 630, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  fourthPage.drawText(fFullAddress, {
    x: 370, // X coordinate on the PDF
    y: 600, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  fourthPage.drawText(fTehsil, {
    x: 110, // X coordinate on the PDF
    y: 588, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  fourthPage.drawText(fDistrict, {
    x: 180, // X coordinate on the PDF
    y: 588, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  fourthPage.drawText(fIncome, {
    x: 140, // X coordinate on the PDF
    y: 570, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
    const pdfBytes = await pdfDoc.save();
    console.log('PDF document saved successfully.');

    // Set the response headers for downloading the file
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="ewsnewform.pdf"`,
      'Content-Length': pdfBytes.length,
    });


    // Send the PDF as binary data
    res.send(Buffer.from(pdfBytes));
    
};






export const hesiyat= async (req, res)=> {
    
  const { Aadhar,Bhamashah,ApplicantName,Father,PresentAddress,FixAddress,Villagecity,Tehsil,District,Dob,DobAddress
    ,Age,GenterM,GenterF,Marriage,unMarriage,Religes,Cast,SubCast,Yes,No,TaxYes,TaxNo,Mobileno,Panno,Tinno,Property1
    ,Address1,Rate1,Property2,Address2,Rate2,Property3,Address3,Rate3,Property4,Address4,Rate4,Total,Reason,Date,Address
   ,AvidanceFirst,AvidanceFather,AvidanceAddress,AvidanceVibhag,AvidanceOfice,AvidanceRikti,AvidanceMobile,AvidanceApplicant
   ,AvidanceApplicantFather,AvidanceApplicantAddress,Hesiyat,SAvidance,SAvidanceFather,SAvidanceAddress,SAvidanceVibhag,
   SAvidanceOffice,SAvidanceRikti,SAvidanceMobile,SAvidanceApplicant,SAvidanceApplicantFather,SAvidanceApplicantAddress
   ,SHesiyat,Promiser,PromiserFather,PromiserAddress,PromiserVillage,PromiserTehsil,PromiserDistrict,PromiserProperty
   ,PromiserSqure,PromiserHesiyat
  } =req.body


     const fontBytes = await readFile(fontPath);
    // Read the PDF template file
    const pdfPath = path.join(process.cwd(), "/public/hesiyat.pdf");
    const existingPdfBytes = await readFile(pdfPath);
    console.log('PDF file loaded successfully.');

    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    pdfDoc.registerFontkit(fontkit);
    const customFont = await pdfDoc.embedFont(fontBytes , { subset: true });

  
  const pages = pdfDoc.getPages();
  const firstPage = pages[0];
  let secondPage = pages[1];
  let thirdPage = pages[2];
  // let fourPage = pages[3];
  //   let fifthPage = pages[4];
  //   let sixthPage = pages[5];
  //   let seventhPage = pages[6];
  //   let eighthPage = pages[7];

  // Set font size, color, and text position
  const fontSize = 9;




 firstPage.drawText(Aadhar, {
    x: 320, // X coordinate on the PDF
    y: 900, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  firstPage.drawText(Bhamashah, {
    x: 320, // X coordinate on the PDF
    y: 885, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  firstPage.drawText(ApplicantName, {
    x: 230, // X coordinate on the PDF
    y: 860, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  firstPage.drawText(Father, {
    x: 230, // X coordinate on the PDF
    y: 830, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  firstPage.drawText(PresentAddress, {
    x: 230, // X coordinate on the PDF
    y: 780, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  firstPage.drawText(FixAddress, {
    x: 230, // X coordinate on the PDF
    y: 740, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  firstPage.drawText(Villagecity, {
    x: 155, // X coordinate on the PDF
    y: 700, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  firstPage.drawText(Tehsil, {
    x: 320, // X coordinate on the PDF
    y: 700, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  firstPage.drawText(District, {
    x: 465, // X coordinate on the PDF
    y: 700, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  firstPage.drawText(Dob, {
    x: 165, // X coordinate on the PDF
    y: 670, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  firstPage.drawText(DobAddress, {
    x: 360, // X coordinate on the PDF
    y: 670, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  firstPage.drawText(Age, {
    x: 535, // X coordinate on the PDF
    y: 670, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  firstPage.drawText(GenterM, {
    x: 155, // X coordinate on the PDF
    y: 640, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  firstPage.drawText(GenterF, {
    x: 190, // X coordinate on the PDF
    y: 640, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  firstPage.drawText(Marriage, {
    x: 450, // X coordinate on the PDF
    y: 640, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  firstPage.drawText(unMarriage, {
    x: 480, // X coordinate on the PDF
    y: 640, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  firstPage.drawText(Religes, {
    x: 160, // X coordinate on the PDF
    y: 605, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  firstPage.drawText(Cast, {
    x: 305, // X coordinate on the PDF
    y: 605, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  firstPage.drawText(SubCast, {
    x: 464, // X coordinate on the PDF
    y: 605, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  firstPage.drawText(Yes, {
    x: 380, // X coordinate on the PDF
    y: 573, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  firstPage.drawText(No, {
    x: 464, // X coordinate on the PDF
    y: 573, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  firstPage.drawText(TaxYes, {
    x: 380, // X coordinate on the PDF
    y: 544, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  firstPage.drawText(TaxNo, {
    x: 464, // X coordinate on the PDF
    y: 544, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  firstPage.drawText(Mobileno, {
    x: 180, // X coordinate on the PDF
    y: 509, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  firstPage.drawText(Panno, {
    x: 290, // X coordinate on the PDF
    y: 480, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  firstPage.drawText(Tinno, {
    x: 280, // X coordinate on the PDF
    y: 440, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  firstPage.drawText(Property1, {
    x: 170, // X coordinate on the PDF
    y: 347, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  firstPage.drawText(Address1, {
    x: 350, // X coordinate on the PDF
    y: 347, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  firstPage.drawText(Rate1, {
    x: 480, // X coordinate on the PDF
    y: 347, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  firstPage.drawText(Property2, {
    x: 170, // X coordinate on the PDF
    y: 320, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  firstPage.drawText(Address2, {
    x: 350, // X coordinate on the PDF
    y: 320, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  firstPage.drawText(Rate2, {
    x: 480, // X coordinate on the PDF
    y:320, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  firstPage.drawText(Property3, {
    x: 170, // X coordinate on the PDF
    y: 290, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  firstPage.drawText(Address3, {
    x: 350, // X coordinate on the PDF
    y: 290, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  firstPage.drawText(Rate3, {
    x: 480, // X coordinate on the PDF
    y: 290, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  firstPage.drawText(Property4, {
    x: 170, // X coordinate on the PDF
    y: 267, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  firstPage.drawText(Address4, {
    x: 350, // X coordinate on the PDF
    y: 267, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  firstPage.drawText(Rate4, {
    x: 480, // X coordinate on the PDF
    y:267, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  firstPage.drawText(Total, {
    x: 480, // X coordinate on the PDF
    y:243, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  firstPage.drawText(Reason, {
    x: 280, // X coordinate on the PDF
    y:206, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  firstPage.drawText(Date, {
    x: 100, // X coordinate on the PDF
    y:150, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  firstPage.drawText(Address, {
    x: 100, // X coordinate on the PDF
    y:130, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });




  secondPage.drawText(AvidanceFirst, {
    x: 80, // X coordinate on the PDF
    y: 915, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  secondPage.drawText(AvidanceFather, {
    x: 360, // X coordinate on the PDF
    y: 915, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  secondPage.drawText(AvidanceAddress, {
    x: 85, // X coordinate on the PDF
    y: 888, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  secondPage.drawText(AvidanceVibhag, {
    x: 120, // X coordinate on the PDF
    y: 858, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  secondPage.drawText(AvidanceOfice, {
    x: 340, // X coordinate on the PDF
    y: 858, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  secondPage.drawText(AvidanceRikti, {
    x: 70, // X coordinate on the PDF
    y: 828, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  secondPage.drawText(AvidanceMobile, {
    x: 330, // X coordinate on the PDF
    y: 825, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  secondPage.drawText(AvidanceApplicant, {
    x: 140, // X coordinate on the PDF
    y: 770, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  secondPage.drawText(AvidanceApplicantFather, {
    x: 396, // X coordinate on the PDF
    y: 770, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  secondPage.drawText(AvidanceApplicantAddress, {
    x: 100, // X coordinate on the PDF
    y: 740, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  secondPage.drawText(Hesiyat, {
    x: 300, // X coordinate on the PDF
    y: 710, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  secondPage.drawText(SAvidance, {
    x: 70, // X coordinate on the PDF
    y: 610, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  secondPage.drawText(SAvidanceFather, {
    x: 360, // X coordinate on the PDF
    y: 610, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  secondPage.drawText(SAvidanceAddress, {
    x: 100, // X coordinate on the PDF
    y: 580, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  secondPage.drawText(SAvidanceVibhag, {
    x: 120, // X coordinate on the PDF
    y: 553, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  secondPage.drawText(SAvidanceOffice, {
    x: 340, // X coordinate on the PDF
    y: 553, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  secondPage.drawText(SAvidanceRikti, {
    x: 80, // X coordinate on the PDF
    y: 523, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  secondPage.drawText(SAvidanceMobile, {
    x: 330, // X coordinate on the PDF
    y: 520, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  secondPage.drawText(SAvidanceApplicant, {
    x: 120, // X coordinate on the PDF
    y: 467, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  secondPage.drawText(SAvidanceApplicantFather, {
    x: 380, // X coordinate on the PDF
    y: 467, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  secondPage.drawText(SAvidanceApplicantAddress, {
    x: 100, // X coordinate on the PDF
    y: 435, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  secondPage.drawText(SHesiyat, {
    x: 300, // X coordinate on the PDF
    y: 405, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });









  thirdPage.drawText(Promiser, {
    x: 70, // X coordinate on the PDF
    y: 909, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  thirdPage.drawText(PromiserFather, {
    x: 348, // X coordinate on the PDF
    y: 908, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  thirdPage.drawText(PromiserAddress, {
    x: 86, // X coordinate on the PDF
    y: 878, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  thirdPage.drawText(PromiserVillage, {
    x: 108, // X coordinate on the PDF
    y: 850, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  thirdPage.drawText(PromiserTehsil, {
    x: 290, // X coordinate on the PDF
    y: 850, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  thirdPage.drawText(PromiserDistrict, {
    x: 445, // X coordinate on the PDF
    y: 850, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  thirdPage.drawText(PromiserProperty, {
    x: 270, // X coordinate on the PDF
    y: 782, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  thirdPage.drawText(PromiserSqure, {
    x: 220, // X coordinate on the PDF
    y: 757, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  thirdPage.drawText(PromiserHesiyat, {
    x: 490, // X coordinate on the PDF
    y: 757, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
    const pdfBytes = await pdfDoc.save();
    console.log('PDF document saved successfully.');

    // Set the response headers for downloading the file
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="hesiyat.pdf"`,
      'Content-Length': pdfBytes.length,
    });


    // Send the PDF as binary data
    res.send(Buffer.from(pdfBytes));
    
};







export const minority= async (req, res)=> {
    
  const { Aadhar,Bhamashah,ApplicantName,ApplicantFather,PresentAddress,FixAddress,Villagect,Tehsil,District,
    Dob,DobAddress,Age,GenderM,GenderF,Marriage,UnMarriage,ApplicantVerg,ApplicantFatherVerg,ApplicantReliges,
    Applicantyes,Applicantno,ApplicantMobile,Date,Address,ApplicantCheck,ApplicantCheckFather,ApplicantCheckAddress
    ,Community,IdNumber,ApplicantCheckDate,HalkaNo,Avidancefirst,AvidancefirstFather,AvidancefirstAddress,FirstVibhag
    ,FirstRikti,FirstAvApplicant,FirstAvApplicanFather,FirstAvApplicantAddress,FirstLastyears,FirstCommunity,
    SecondAvidance,SecondAvidanceFather,SecondAvidanceAddress,SecondVibhag,SecondRikti,SecondAvApplicant,SecondAvApplicantFather
    ,SecondAvApplicantAddress,SecondLastyears,SecondCommunity,Promiser,PromiserFather,PromiserAddress,PromiserVillagect
     ,PromiserTehsil,PromiserDistrict,PromiserCommunity,PromiserCommunitysecond,PromiserCommunityDob,PromiserCommunityAddress
       ,PromiserAlpCommunity,PromiserInCommunities,PromiserSdistrict,PromiserChild,Promiseraplcertificate,PromiserSatyapn
    } =req.body


     const fontBytes = await readFile(fontPath);
    // Read the PDF template file
    const pdfPath = path.join(process.cwd(), "/public/minority.pdf");
    const existingPdfBytes = await readFile(pdfPath);
    console.log('PDF file loaded successfully.');

    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    pdfDoc.registerFontkit(fontkit);
    const customFont = await pdfDoc.embedFont(fontBytes , { subset: true });

  
  const pages = pdfDoc.getPages();
  const firstPage = pages[0];
  let secondPage = pages[1];
  let thirdPage = pages[2];
  // let fourPage = pages[3];
  //   let fifthPage = pages[4];
  //   let sixthPage = pages[5];
  //   let seventhPage = pages[6];
  //   let eighthPage = pages[7];

  // Set font size, color, and text position
  const fontSize = 9;




 firstPage.drawText(Aadhar, {
    x: 310, // X coordinate on the PDF
    y: 740, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  firstPage.drawText(Bhamashah, {
    x: 310, // X coordinate on the PDF
    y: 725, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  firstPage.drawText(ApplicantName, {
    x: 230, // X coordinate on the PDF
    y: 700, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  firstPage.drawText(ApplicantFather, {
    x: 230, // X coordinate on the PDF
    y: 670, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  firstPage.drawText(PresentAddress, {
    x: 230, // X coordinate on the PDF
    y: 620, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  firstPage.drawText(FixAddress, {
    x: 230, // X coordinate on the PDF
    y: 580, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  firstPage.drawText(Villagect, {
    x: 160, // X coordinate on the PDF
    y: 545, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  firstPage.drawText(Tehsil, {
    x: 310, // X coordinate on the PDF
    y: 545, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  firstPage.drawText(District, {
    x: 460, // X coordinate on the PDF
    y: 545, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  firstPage.drawText(Dob, {
    x: 160, // X coordinate on the PDF
    y: 510, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  firstPage.drawText(DobAddress, {
    x: 370, // X coordinate on the PDF
    y: 510, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  firstPage.drawText(Age, {
    x: 527, // X coordinate on the PDF
    y: 510, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  firstPage.drawText(GenderM, {
    x: 150, // X coordinate on the PDF
    y: 481, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  firstPage.drawText(GenderF, {
    x: 226, // X coordinate on the PDF
    y: 481, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  firstPage.drawText(Marriage, {
    x: 400, // X coordinate on the PDF
    y: 481, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  firstPage.drawText(UnMarriage, {
    x: 480, // X coordinate on the PDF
    y: 481, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  firstPage.drawText(ApplicantVerg, {
    x: 210, // X coordinate on the PDF
    y: 450, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  firstPage.drawText(ApplicantFatherVerg, {
    x: 210, // X coordinate on the PDF
    y: 420, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  firstPage.drawText(ApplicantReliges, {
    x: 425, // X coordinate on the PDF
    y: 396, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  firstPage.drawText(Applicantyes, {
    x: 380, // X coordinate on the PDF
    y: 365, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  firstPage.drawText(Applicantno, {
    x: 467, // X coordinate on the PDF
    y: 365, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  firstPage.drawText(ApplicantMobile, {
    x: 167, // X coordinate on the PDF
    y: 349, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  firstPage.drawText(Date, {
    x: 100, // X coordinate on the PDF
    y: 272, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  firstPage.drawText(Address, {
    x: 100, // X coordinate on the PDF
    y: 254, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  firstPage.drawText(ApplicantCheck, {
    x: 440, // X coordinate on the PDF
    y: 200, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  firstPage.drawText(ApplicantCheckFather, {
    x: 100, // X coordinate on the PDF
    y: 170, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  firstPage.drawText(ApplicantCheckAddress, {
    x: 310, // X coordinate on the PDF
    y: 170, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  firstPage.drawText(Community, {
    x: 310, // X coordinate on the PDF
    y: 142, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  firstPage.drawText(IdNumber, {
    x: 270, // X coordinate on the PDF
    y: 115, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  firstPage.drawText(ApplicantCheckDate, {
    x: 460, // X coordinate on the PDF
    y: 115, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  firstPage.drawText(HalkaNo, {
    x: 530, // X coordinate on the PDF
    y: 60, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });




  secondPage.drawText(Avidancefirst, {
    x: 70, // X coordinate on the PDF
    y: 737, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  secondPage.drawText(AvidancefirstFather, {
    x: 370, // X coordinate on the PDF
    y: 737, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  secondPage.drawText(AvidancefirstAddress, {
    x: 90, // X coordinate on the PDF
    y: 710, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  secondPage.drawText(FirstVibhag, {
    x: 130, // X coordinate on the PDF
    y: 678, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  secondPage.drawText(FirstRikti, {
    x: 330, // X coordinate on the PDF
    y: 678, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  secondPage.drawText(FirstAvApplicant, {
    x: 130, // X coordinate on the PDF
    y: 620, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  secondPage.drawText(FirstAvApplicanFather, {
    x: 380, // X coordinate on the PDF
    y: 620, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  secondPage.drawText(FirstAvApplicantAddress, {
    x: 90, // X coordinate on the PDF
    y: 590, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  secondPage.drawText(FirstLastyears, {
    x: 85, // X coordinate on the PDF
    y: 560, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  secondPage.drawText(FirstCommunity, {
    x: 470, // X coordinate on the PDF
    y: 560, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  secondPage.drawText(SecondAvidance, {
    x: 80, // X coordinate on the PDF
    y: 460, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  secondPage.drawText(SecondAvidanceFather, {
    x: 350, // X coordinate on the PDF
    y: 460, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  secondPage.drawText(SecondAvidanceAddress, {
    x: 100, // X coordinate on the PDF
    y: 430, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  secondPage.drawText(SecondVibhag, {
    x: 120, // X coordinate on the PDF
    y: 400, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  secondPage.drawText(SecondRikti, {
    x: 330, // X coordinate on the PDF
    y: 400, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  secondPage.drawText(SecondAvApplicant, {
    x: 120, // X coordinate on the PDF
    y: 340, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  secondPage.drawText(SecondAvApplicantFather, {
    x: 370, // X coordinate on the PDF
    y: 340, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  secondPage.drawText(SecondAvApplicantAddress, {
    x: 90, // X coordinate on the PDF
    y: 310, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  secondPage.drawText(SecondLastyears, {
    x: 100, // X coordinate on the PDF
    y: 280, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  secondPage.drawText(SecondCommunity, {
    x: 475, // X coordinate on the PDF
    y: 285, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });








  thirdPage.drawText(Promiser, {
    x: 67, // X coordinate on the PDF
    y: 767, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  thirdPage.drawText(PromiserFather, {
    x: 360, // X coordinate on the PDF
    y: 767, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  thirdPage.drawText(PromiserAddress, {
    x: 85, // X coordinate on the PDF
    y: 737, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  thirdPage.drawText(PromiserVillagect, {
    x: 110, // X coordinate on the PDF
    y: 710, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  thirdPage.drawText(PromiserTehsil, {
    x: 280, // X coordinate on the PDF
    y: 710, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  thirdPage.drawText(PromiserDistrict, {
    x: 437, // X coordinate on the PDF
    y: 710, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  thirdPage.drawText(PromiserCommunity, {
    x: 300, // X coordinate on the PDF
    y: 657, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  thirdPage.drawText(PromiserCommunitysecond, {
    x: 310, // X coordinate on the PDF
    y: 630, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  thirdPage.drawText(PromiserCommunityDob, {
    x: 70, // X coordinate on the PDF
    y: 600, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  thirdPage.drawText(PromiserCommunityAddress, {
    x: 260, // X coordinate on the PDF
    y: 600, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  thirdPage.drawText(PromiserAlpCommunity, {
    x: 365, // X coordinate on the PDF
    y:520, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  thirdPage.drawText(PromiserInCommunities, {
    x: 260, // X coordinate on the PDF
    y:490, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  thirdPage.drawText(PromiserSdistrict, {
    x: 170, // X coordinate on the PDF
    y: 465, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  thirdPage.drawText(PromiserChild, {
    x: 300, // X coordinate on the PDF
    y: 360, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  thirdPage.drawText(Promiseraplcertificate, {
    x: 200, // X coordinate on the PDF
    y: 338, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  thirdPage.drawText(PromiserSatyapn, {
    x: 70, // X coordinate on the PDF
    y: 240, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
    const pdfBytes = await pdfDoc.save();
    console.log('PDF document saved successfully.');

    // Set the response headers for downloading the file
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="minority.pdf"`,
      'Content-Length': pdfBytes.length,
    });


    // Send the PDF as binary data
    res.send(Buffer.from(pdfBytes));
    
};


export const PalanhaarForm= async (req, res)=> {
    
  const { mother,ffather,address,rollnumber1,child1,motherfather1,gender1,dob1,pcenter1,when1,rollnumber2,child2,
    motherfather2,gender2,dob2,pcenter2,when2,rollnumber3,child3,motherfather3,gender3,dob3,pcenter3,when3,
    rollnumber4,child4,motherfather4,gender4,dob4,pcenter4,when4,date1,signaturename1,office1,mobile1,stamp1,office2,
    kramank,date2,eduyear2,srollnumber1,sstudent1,smotherfather1,sgender1,sdob1,spresentclass1,sregisterdate1,
    srollnumber2,sstudent2,smotherfather2,sgender2,sdob2,spresentclass2,sregisterdate2,
    srollnumber3,sstudent3,smotherfather3,sgender3,sdob3,spresentclass3,sregisterdate3,
    srollnumber4,sstudent4,smotherfather4,sgender4,sdob4,spresentclass4,sregisterdate4,approver2,schooladdress2,
    mobile2,seal2,
    angancenter,kramank2,date3,anganyear,anganrollnumber1,anganchild1,anganmotherfather1,angangender1,angandob1,anganregisterdate1
   ,anganrollnumber2,anganchild2,anganmotherfather2,angangender2,angandob2,anganregisterdate2,
   anganrollnumber3,anganchild3,anganmotherfather3,angangender3,angandob3,anganregisterdate3,anganrollnumber4,
   anganchild4,anganmotherfather4,angangender4,angandob4,anganregisterdate4,anganapprover,angancenter3,anganmobile3,anganseal3,
   citypalankramank,citypalandate,orderkramank,orderdate,misses,tfather,taddress,nhusband,ctkramank1,tchild1,tgender1,tdob1
   ,ctkramank2,tchild2,tgender2,tdob2,ctkramank3,tchild3,tgender3,tdob3,ttodaydate3,tapprover3,tseal3,tapprover32,tseal32,tapprover333,
   tofficename,toffickramank,tofficdate,tofficorderdate,tofficjaridate,tofficmother,tofficfather,tofficaddress,toffichusband,tkramankfirst,tchildfirst,tgenderfirst,tdobfirst,tkramanksecond,tchildsecond,tgendersecond,tdobsecond,tkramankthird,tchildthird,tgenderthird,tdobthird,ttodaydate,tapprovername,tapproverseal,
   ckramank,cdate,cordercramank,corderdate,cmesses,cfather,caddress,chusband,ckramankfirst,cchildfirst,cgenderfirst,cdobfirst,ckramanksecond,cchildsecond,cgendersecond,cdobsecond,ckramankthird,cchildthird,cgenderthird,cdobthird,ctodaydate,capproverfirst,csealfirst,capproversecond,csealsecond,
   coffice,cofficekramank,cofficedate,cofficordernote,cofficorderdate,cofficordermother,cofficorderhusband,corderaddress,cfirsthusband,cbkramankfirst,cbchildfirst,cbgenderfirst,cbdobfirst,cbkramanksecond,cbchildsecond,cbgendersecond,cbdobsecond,cbchildthird,cbgenderthird,cbdobthird,cbkramankthird,cbtodaydate,cbapprover,cbapproverseal,
   } =req.body


     const fontBytes = await readFile(fontPath);
    // Read the PDF template file
    const pdfPath = path.join(process.cwd(), "/public/PalanhaarForm.pdf");
    const existingPdfBytes = await readFile(pdfPath);
    console.log('PDF file loaded successfully.');

    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    pdfDoc.registerFontkit(fontkit);
    const customFont = await pdfDoc.embedFont(fontBytes , { subset: true });

  
  const pages = pdfDoc.getPages();
  const firstPage = pages[0];
   let secondPage = pages[1];
  let thirdPage = pages[2];
    let fourthPage = pages[3];
  //   let fifthPage = pages[4];
  //   let sixthPage = pages[5];
  //   let seventhPage = pages[6];
  //   let eighthPage = pages[7];

  // Set font size, color, and text position
  const fontSize = 9;

  
  firstPage.drawText(mother, {
    x: 220, // X coordinate on the PDF
    y: 750, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  firstPage.drawText(ffather, {
    x: 440, // X coordinate on the PDF
    y: 750, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  firstPage.drawText(address, {
    x: 100, // X coordinate on the PDF
    y: 735, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  firstPage.drawText(rollnumber1, {
    x: 63, // X coordinate on the PDF
    y: 650, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  firstPage.drawText(child1, {
    x: 88, // X coordinate on the PDF
    y: 650, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  firstPage.drawText(motherfather1, {
    x: 193, // X coordinate on the PDF
    y: 650, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  firstPage.drawText(gender1, {
    x: 283, // X coordinate on the PDF
    y: 650, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  firstPage.drawText(dob1, {
    x: 330, // X coordinate on the PDF
    y: 650, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  firstPage.drawText(pcenter1, {
    x: 390, // X coordinate on the PDF
    y: 650, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  firstPage.drawText(when1, {
    x: 480, // X coordinate on the PDF
    y: 650, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  firstPage.drawText(rollnumber2, {
    x: 63, // X coordinate on the PDF
    y: 633, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  firstPage.drawText(child2, {
    x:  88, // X coordinate on the PDF
    y: 633, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  firstPage.drawText(motherfather2, {
    x: 193, // X coordinate on the PDF
    y: 633, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  firstPage.drawText(gender2, {
    x: 283, // X coordinate on the PDF
    y: 633, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  firstPage.drawText(dob2, {
    x: 330, // X coordinate on the PDF
    y:633, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  firstPage.drawText(pcenter2, {
    x: 390, // X coordinate on the PDF
    y: 633, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  firstPage.drawText(when2, {
    x: 480, // X coordinate on the PDF
    y: 633, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  firstPage.drawText(rollnumber3, {
    x: 63, // X coordinate on the PDF
    y: 618, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  firstPage.drawText(child3, {
    x:  88, // X coordinate on the PDF
    y: 618, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  firstPage.drawText(motherfather3, {
    x: 193, // X coordinate on the PDF
    y: 618, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  firstPage.drawText(gender3, {
    x: 283, // X coordinate on the PDF
    y: 618, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  firstPage.drawText(dob3, {
    x: 330, // X coordinate on the PDF
    y:618, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  firstPage.drawText(pcenter3, {
    x: 390, // X coordinate on the PDF
    y: 618, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  firstPage.drawText(when3, {
    x: 480, // X coordinate on the PDF
    y: 618, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  firstPage.drawText(rollnumber4, {
    x: 63, // X coordinate on the PDF
    y: 603, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  firstPage.drawText(child4, {
    x:  88, // X coordinate on the PDF
    y: 603, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  firstPage.drawText(motherfather4, {
    x: 193, // X coordinate on the PDF
    y: 603, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  firstPage.drawText(gender4, {
    x: 283, // X coordinate on the PDF
    y: 603, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  firstPage.drawText(dob4, {
    x: 330, // X coordinate on the PDF
    y:603, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  firstPage.drawText(pcenter4, {
    x: 390, // X coordinate on the PDF
    y: 603, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  firstPage.drawText(when4, {
    x: 480, // X coordinate on the PDF
    y: 603, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  firstPage.drawText(date1, {
    x: 88, // X coordinate on the PDF
    y: 580, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  firstPage.drawText(signaturename1, {
    x: 360, // X coordinate on the PDF
    y: 510, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  firstPage.drawText(office1, {
    x: 388, // X coordinate on the PDF
    y: 495, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  firstPage.drawText(mobile1, {
    x: 398, // X coordinate on the PDF
    y: 480, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  firstPage.drawText(stamp1, {
    x: 360, // X coordinate on the PDF
    y: 465, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });




  secondPage.drawText(office2, {
    x: 190, // X coordinate on the PDF
    y: 750, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  secondPage.drawText(kramank, {
    x: 90, // X coordinate on the PDF
    y: 725, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  secondPage.drawText(date2, {
    x: 485, // X coordinate on the PDF
    y: 725, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  secondPage.drawText(eduyear2, {
    x: 480, // X coordinate on the PDF
    y: 696, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  secondPage.drawText(srollnumber1, {
    x: 63, // X coordinate on the PDF
    y: 612, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  secondPage.drawText(sstudent1, {
    x: 88, // X coordinate on the PDF
    y: 612, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  secondPage.drawText(smotherfather1, {
    x: 200, // X coordinate on the PDF
    y: 612, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  secondPage.drawText(sgender1, {
    x: 280, // X coordinate on the PDF
    y: 612, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  secondPage.drawText(sdob1, {
    x: 325, // X coordinate on the PDF
    y: 612, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  secondPage.drawText(spresentclass1, {
    x: 388, // X coordinate on the PDF
    y: 612, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  secondPage.drawText(sregisterdate1, {
    x: 450, // X coordinate on the PDF
    y: 612, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  secondPage.drawText(srollnumber2, {
    x: 63, // X coordinate on the PDF
    y: 596, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  secondPage.drawText(sstudent2, {
    x: 88, // X coordinate on the PDF
    y: 596, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  secondPage.drawText(smotherfather2, {
    x: 200, // X coordinate on the PDF
    y:  596, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  secondPage.drawText(sgender2, {
    x: 280, // X coordinate on the PDF
    y: 596, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  secondPage.drawText(sdob2, {
    x: 325, // X coordinate on the PDF
    y: 596, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  secondPage.drawText(spresentclass2, {
    x: 388, // X coordinate on the PDF
    y: 596, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  secondPage.drawText(sregisterdate2, {
    x: 450, // X coordinate on the PDF
    y: 596, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  secondPage.drawText(srollnumber3, {
    x: 63, // X coordinate on the PDF
    y: 580, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  secondPage.drawText(sstudent3, {
    x: 88, // X coordinate on the PDF
    y: 580, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  secondPage.drawText(smotherfather3, {
    x: 200, // X coordinate on the PDF
    y: 580, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  secondPage.drawText(sgender3, {
    x: 280, // X coordinate on the PDF
    y: 580, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  secondPage.drawText(sdob3, {
    x: 325, // X coordinate on the PDF
    y: 580, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  secondPage.drawText(spresentclass3, {
    x: 388, // X coordinate on the PDF
    y: 580, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  secondPage.drawText(sregisterdate3, {
    x: 450, // X coordinate on the PDF
    y: 580, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  secondPage.drawText(srollnumber4, {
    x: 63, // X coordinate on the PDF
    y: 565, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  secondPage.drawText(sstudent4, {
    x: 88, // X coordinate on the PDF
    y: 565, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  secondPage.drawText(smotherfather4, {
    x: 200, // X coordinate on the PDF
    y: 565, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  secondPage.drawText(sgender4, {
    x: 280, // X coordinate on the PDF
    y: 565, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  secondPage.drawText(sdob4, {
    x: 325, // X coordinate on the PDF
    y: 565, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  secondPage.drawText(spresentclass4, {
    x: 388, // X coordinate on the PDF
    y: 565, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  secondPage.drawText(sregisterdate4, {
    x: 450, // X coordinate on the PDF
    y: 565, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  secondPage.drawText(approver2, {
    x: 390, // X coordinate on the PDF
    y: 488, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  secondPage.drawText(schooladdress2, {
    x: 390, // X coordinate on the PDF
    y: 472, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  secondPage.drawText(mobile2, {
    x: 390, // X coordinate on the PDF
    y: 456, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  secondPage.drawText(seal2, {
    x: 350, // X coordinate on the PDF
    y: 442, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });





  secondPage.drawText(angancenter, {
    x: 160, // X coordinate on the PDF
    y: 354, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  secondPage.drawText(kramank2, {
    x: 85, // X coordinate on the PDF
    y: 328, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  secondPage.drawText(date3, {
    x: 485, // X coordinate on the PDF
    y: 328, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  secondPage.drawText(anganyear, {
    x: 485, // X coordinate on the PDF
    y: 300, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  secondPage.drawText(anganrollnumber1, {
    x: 63, // X coordinate on the PDF
    y: 230, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  secondPage.drawText(anganchild1, {
    x: 92, // X coordinate on the PDF
    y: 230, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  secondPage.drawText(anganmotherfather1, {
    x: 200, // X coordinate on the PDF
    y: 230, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  secondPage.drawText(angangender1, {
    x: 284, // X coordinate on the PDF
    y: 230, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  secondPage.drawText(angandob1, {
    x: 330, // X coordinate on the PDF
    y: 230, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  secondPage.drawText(anganregisterdate1, {
    x: 410, // X coordinate on the PDF
    y: 230, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  secondPage.drawText(anganrollnumber2, {
    x: 63, // X coordinate on the PDF
    y: 215, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  secondPage.drawText(anganchild2, {
    x: 92, // X coordinate on the PDF
    y: 215, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  secondPage.drawText(anganmotherfather2, {
    x: 200, // X coordinate on the PDF
    y: 215, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  secondPage.drawText(angangender2, {
    x: 284, // X coordinate on the PDF
    y: 215, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  secondPage.drawText(angandob2, {
    x: 330, // X coordinate on the PDF
    y: 215, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  secondPage.drawText(anganregisterdate2, {
    x: 410, // X coordinate on the PDF
    y: 215, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  secondPage.drawText(anganrollnumber3, {
    x: 63, // X coordinate on the PDF
    y: 199, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  secondPage.drawText(anganchild3, {
    x: 92, // X coordinate on the PDF
    y: 199, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  secondPage.drawText(anganmotherfather3, {
    x: 200, // X coordinate on the PDF
    y: 199, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  secondPage.drawText(angangender3, {
    x: 284, // X coordinate on the PDF
    y: 199, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  secondPage.drawText(angandob3, {
    x: 330, // X coordinate on the PDF
    y: 199, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  secondPage.drawText(anganregisterdate3, {
    x: 410, // X coordinate on the PDF
    y: 199, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  secondPage.drawText(anganrollnumber4, {
    x: 63, // X coordinate on the PDF
    y: 184, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  secondPage.drawText(anganchild4, {
    x: 92, // X coordinate on the PDF
    y: 184, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  secondPage.drawText(anganmotherfather4, {
    x: 200, // X coordinate on the PDF
    y: 184, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  secondPage.drawText(angangender4, {
    x: 284, // X coordinate on the PDF
    y: 184, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  secondPage.drawText(angandob4, {
    x: 330, // X coordinate on the PDF
    y: 184, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  secondPage.drawText(anganregisterdate4, {
    x: 410, // X coordinate on the PDF
    y: 184, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  secondPage.drawText(anganapprover, {
    x: 385, // X coordinate on the PDF
    y: 104, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  secondPage.drawText(angancenter3, {
    x: 370, // X coordinate on the PDF
    y: 89, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  secondPage.drawText(anganmobile3, {
    x: 395, // X coordinate on the PDF
    y: 74, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  secondPage.drawText(anganseal3, {
    x: 360, // X coordinate on the PDF
    y: 60, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });









  thirdPage.drawText(citypalankramank, {
    x: 100, // X coordinate on the PDF
    y: 712, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  thirdPage.drawText(citypalandate, {
    x: 496, // X coordinate on the PDF
    y: 712, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  thirdPage.drawText(orderkramank, {
    x: 535, // X coordinate on the PDF
    y: 685, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  thirdPage.drawText(orderdate, {
    x: 127, // X coordinate on the PDF
    y: 670, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  thirdPage.drawText(misses, {
    x: 353, // X coordinate on the PDF
    y: 670, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  thirdPage.drawText(tfather, {
    x: 520, // X coordinate on the PDF
    y: 670, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  thirdPage.drawText(taddress, {
    x: 187, // X coordinate on the PDF
    y: 657, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  thirdPage.drawText(nhusband, {
    x: 180, // X coordinate on the PDF
    y: 640, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  thirdPage.drawText(ctkramank1, {
    x: 70, // X coordinate on the PDF
    y: 583, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  thirdPage.drawText(tchild1, {
    x: 120, // X coordinate on the PDF
    y: 583, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  thirdPage.drawText(tgender1, {
    x: 290, // X coordinate on the PDF
    y: 583, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  thirdPage.drawText(tdob1, {
    x: 390, // X coordinate on the PDF
    y: 583, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  thirdPage.drawText(ctkramank2, {
    x: 70, // X coordinate on the PDF
    y: 569, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  thirdPage.drawText(tchild2, {
    x: 120, // X coordinate on the PDF
    y: 569, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  thirdPage.drawText(tgender2, {
    x: 290, // X coordinate on the PDF
    y: 569, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  thirdPage.drawText(tdob2, {
    x: 390, // X coordinate on the PDF
    y: 569, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  thirdPage.drawText(ctkramank3, {
    x: 70, // X coordinate on the PDF
    y: 555, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  thirdPage.drawText(tchild3, {
    x: 120, // X coordinate on the PDF
    y: 555, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  thirdPage.drawText(tgender3, {
    x: 290, // X coordinate on the PDF
    y: 555, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  thirdPage.drawText(tdob3, {
    x: 390, // X coordinate on the PDF
    y: 555, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  thirdPage.drawText(ttodaydate3, {
    x: 160, // X coordinate on the PDF
    y: 534, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  thirdPage.drawText(tapprover3, {
    x: 146, // X coordinate on the PDF
    y: 460, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  thirdPage.drawText(tseal3, {
    x: 100, // X coordinate on the PDF
    y: 445, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  thirdPage.drawText(tapprover32, {
    x: 310, // X coordinate on the PDF
    y: 460, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  thirdPage.drawText(tseal32, {
    x: 280, // X coordinate on the PDF
    y: 445, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  thirdPage.drawText(tapprover333, {
    x: 470, // X coordinate on the PDF
    y: 445, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  thirdPage.drawText(tofficename, {
    x: 170, // X coordinate on the PDF
    y: 360, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  thirdPage.drawText(toffickramank, {
    x: 100, // X coordinate on the PDF
    y: 335, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  thirdPage.drawText(tofficdate, {
    x: 500, // X coordinate on the PDF
    y: 335, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  thirdPage.drawText(tofficorderdate, {
    x: 533, // X coordinate on the PDF
    y: 315, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  thirdPage.drawText(tofficjaridate, {
    x: 125, // X coordinate on the PDF
    y: 299, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  thirdPage.drawText(tofficmother, {
    x: 360, // X coordinate on the PDF
    y: 299, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  thirdPage.drawText(tofficfather, {
    x: 520, // X coordinate on the PDF
    y: 299, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  thirdPage.drawText(tofficaddress, {
    x: 200, // X coordinate on the PDF
    y: 285, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  thirdPage.drawText(toffichusband, {
    x: 190, // X coordinate on the PDF
    y: 270, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  thirdPage.drawText(tkramankfirst, {
    x: 74, // X coordinate on the PDF
    y: 214, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  thirdPage.drawText(tchildfirst, {
    x: 140, // X coordinate on the PDF
    y: 214, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  thirdPage.drawText(tgenderfirst, {
    x: 270, // X coordinate on the PDF
    y: 214, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  thirdPage.drawText(tdobfirst, {
    x: 380, // X coordinate on the PDF
    y: 214, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  thirdPage.drawText(tkramanksecond, {
    x: 74, // X coordinate on the PDF
    y: 199, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  thirdPage.drawText(tchildsecond, {
    x: 140, // X coordinate on the PDF
    y: 199, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  thirdPage.drawText(tgendersecond, {
    x: 270, // X coordinate on the PDF
    y: 199, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  thirdPage.drawText(tdobsecond, {
    x: 380, // X coordinate on the PDF
    y: 199, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  thirdPage.drawText(tkramankthird, {
    x: 74, // X coordinate on the PDF
    y: 180, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  thirdPage.drawText(tchildthird, {
    x: 140, // X coordinate on the PDF
    y: 180, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  thirdPage.drawText(tgenderthird, {
    x: 270, // X coordinate on the PDF
    y: 180, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  thirdPage.drawText(tdobthird, {
    x: 380, // X coordinate on the PDF
    y: 180, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  thirdPage.drawText(ttodaydate, {
    x: 295, // X coordinate on the PDF
    y: 160, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  thirdPage.drawText(tapprovername, {
    x: 400, // X coordinate on the PDF
    y: 75, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  thirdPage.drawText(tapproverseal, {
    x: 350, // X coordinate on the PDF
    y: 60, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });








  fourthPage.drawText(ckramank, {
    x: 95, // X coordinate on the PDF
    y: 736, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  fourthPage.drawText(cdate, {
    x: 495, // X coordinate on the PDF
    y: 736, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  fourthPage.drawText(cordercramank, {
    x: 530, // X coordinate on the PDF
    y: 710, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  fourthPage.drawText(corderdate, {
    x: 125, // X coordinate on the PDF
    y: 695, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  fourthPage.drawText(cmesses, {
    x: 355, // X coordinate on the PDF
    y: 695, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  fourthPage.drawText(cfather, {
    x: 509, // X coordinate on the PDF
    y: 695, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  fourthPage.drawText(caddress, {
    x: 190, // X coordinate on the PDF
    y: 680, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  fourthPage.drawText(chusband, {
    x: 180, // X coordinate on the PDF
    y: 666, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  fourthPage.drawText(ckramankfirst, {
    x: 70, // X coordinate on the PDF
    y: 606, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  fourthPage.drawText(cchildfirst, {
    x: 120, // X coordinate on the PDF
    y: 606, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  fourthPage.drawText(cgenderfirst, {
    x: 300, // X coordinate on the PDF
    y: 606, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  fourthPage.drawText(cdobfirst, {
    x: 400, // X coordinate on the PDF
    y: 606, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  fourthPage.drawText(ckramanksecond, {
    x: 70, // X coordinate on the PDF
    y: 592, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  fourthPage.drawText(cchildsecond, {
    x: 120, // X coordinate on the PDF
    y: 592, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  fourthPage.drawText(cgendersecond, {
    x: 300, // X coordinate on the PDF
    y: 592, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  fourthPage.drawText(cdobsecond, {
    x: 400, // X coordinate on the PDF
    y: 592, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  fourthPage.drawText(ckramankthird, {
    x: 70, // X coordinate on the PDF
    y: 575, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  fourthPage.drawText(cchildthird, {
    x: 120, // X coordinate on the PDF
    y:  575, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  fourthPage.drawText(cgenderthird, {
    x: 300, // X coordinate on the PDF
    y:  575, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  fourthPage.drawText(cdobthird, {
    x: 400, // X coordinate on the PDF
    y:  575, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  fourthPage.drawText(ctodaydate, {
    x: 155, // X coordinate on the PDF
    y:  555, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  fourthPage.drawText(capproverfirst, {
    x: 230, // X coordinate on the PDF
    y:  483, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  fourthPage.drawText(csealfirst, {
    x: 180, // X coordinate on the PDF
    y:  467, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  fourthPage.drawText(capproversecond, {
    x: 390, // X coordinate on the PDF
    y:  483, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  fourthPage.drawText(csealsecond, {
    x: 340, // X coordinate on the PDF
    y:  467, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  fourthPage.drawText(coffice, {
    x: 160, // X coordinate on the PDF
    y:  380, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  fourthPage.drawText(cofficekramank, {
    x: 95, // X coordinate on the PDF
    y:  355, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  fourthPage.drawText(cofficedate, {
    x: 495, // X coordinate on the PDF
    y:  355, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  fourthPage.drawText(cofficordernote, {
    x: 530, // X coordinate on the PDF
    y:  330, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  fourthPage.drawText(cofficorderdate, {
    x: 125, // X coordinate on the PDF
    y:  319, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  fourthPage.drawText(cofficordermother, {
    x: 350, // X coordinate on the PDF
    y:  319, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  fourthPage.drawText(cofficorderhusband, {
    x: 520, // X coordinate on the PDF
    y:  319, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  fourthPage.drawText(corderaddress, {
    x: 195, // X coordinate on the PDF
    y: 304, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  fourthPage.drawText(cfirsthusband, {
    x: 190, // X coordinate on the PDF
    y:  288, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  fourthPage.drawText(cbkramankfirst, {
    x: 72, // X coordinate on the PDF
    y:  232, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  fourthPage.drawText(cbkramankfirst, {
    x: 72, // X coordinate on the PDF
    y:  232, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  fourthPage.drawText(cbchildfirst, {
    x: 120, // X coordinate on the PDF
    y:  232, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  fourthPage.drawText(cbgenderfirst, {
    x: 280, // X coordinate on the PDF
    y:  232, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  fourthPage.drawText(cbdobfirst, {
    x: 400, // X coordinate on the PDF
    y:  232, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  fourthPage.drawText(cbkramanksecond, {
    x: 72, // X coordinate on the PDF
    y:  216, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  fourthPage.drawText(cbchildsecond, {
    x: 120, // X coordinate on the PDF
    y:  216, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  fourthPage.drawText(cbgendersecond, {
    x: 280, // X coordinate on the PDF
    y:  216, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  fourthPage.drawText(cbdobsecond, {
    x: 400, // X coordinate on the PDF
    y:  216, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  fourthPage.drawText(cbkramankthird, {
    x: 72, // X coordinate on the PDF
    y:  200, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  fourthPage.drawText(cbchildthird, {
    x: 120, // X coordinate on the PDF
    y:  200, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  fourthPage.drawText(cbgenderthird, {
    x: 280, // X coordinate on the PDF
    y:  200, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  fourthPage.drawText(cbdobthird, {
    x: 400, // X coordinate on the PDF
    y:  200, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  fourthPage.drawText(cbtodaydate, {
    x: 285, // X coordinate on the PDF
    y:  180, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  fourthPage.drawText(cbapprover, {
    x: 400, // X coordinate on the PDF
    y:  93, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
  fourthPage.drawText(cbapproverseal, {
    x: 360, // X coordinate on the PDF
    y:  75, // Y coordinate on the PDF
    font: customFont,
    size: fontSize,
    color: rgb(0, 0, 0), // black color
  });
    const pdfBytes = await pdfDoc.save();
    console.log('PDF document saved successfully.');

    // Set the response headers for downloading the file
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="PalanhaarForm.pdf"`,
      'Content-Length': pdfBytes.length,
    });


    // Send the PDF as binary data
    res.send(Buffer.from(pdfBytes));
    
};


