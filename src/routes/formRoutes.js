import { Router } from "express";
import { MarriageCertificatecompleteform, BonafiedCertificateForm , berojgariform , ewsnewform,
    hesiyat , minority , PalanhaarForm
 } from "../controllers/demoController.js"
import { EPFO15GForm , AadharOnlineAddressCorrectionForm , affedeivtforascholar , ANNEXURE,
    GeneralCasteForm , IncomeCertificate4PageFormat , lab ,obcstatecentercasteCertificateForm , RGHSCARDLimitForm,
    SCSTCasteSTATECENTERCertificateForm
 } from "../controllers/formController.js";

const router = Router();



router.get("/", (req, res) => {
    res.render("index")
})
router.get("/viewAllForms", (req, res) => {
    res.render("viewAllForms")
})

router.get("/quickAccess" , (req, res) => {
    res.render("quickAccess")
})

router.get("/BonafiedCertificateForm", (req, res) => {
    res.render("BonafiedCertificateForm")
})
router.post('/BonafiedCertificateForm', BonafiedCertificateForm);

router.get("/MarriageCertificatecompleteform", (req, res) => {
    res.render("MarriageCertificatecompleteform")
})
router.post('/MarriageCertificatecompleteform', MarriageCertificatecompleteform);

router.get("/EPFO15GForm", (req, res) => {
    res.render("EPFO15GForm")
})
router.post('/EPFO15GForm', EPFO15GForm);

router.get("/AadharOnlineAddressCorrectionForm" , (req, res) => {
    res.render("AadharOnlineAddressCorrectionForm")
})
router.post('/AadharOnlineAddressCorrectionForm', AadharOnlineAddressCorrectionForm );


router.get("/affedeivtforascholar" , (req, res) => {
    res.render("affedeivtforascholar")
    })
router.post('/affedeivtforascholar', affedeivtforascholar );

router.get("/ANNEXURE", (req, res) => {
    res.render("ANNEXURE")
})
router.post('/ANNEXURE',ANNEXURE);

router.get("/generalCasteForm", (req, res) => {
    res.render("generalCasteForm")
})
router.post('/generalCasteForm',GeneralCasteForm);


router.get("/IncomeCertificate4PageFormat", (req, res) => { 
    res.render("IncomeCertificate4PageFormat")
}) 

router.post('/IncomeCertificate4PageFormat', IncomeCertificate4PageFormat );

router.get("/lab" , (req,res)=>{
    res.render("lab")
})
router.post('/lab', lab );

router.get("/OBCSTATECENTERCasteCertificateForm" , (req, res)=>{
    res.render("OBCSTATECENTERCasteCertificateForm")
})

router.post('/OBCSTATECENTERCasteCertificateForm', obcstatecentercasteCertificateForm );


router.get("/RGHSCARDLimitForm" , (req, res)=>{
    res.render("RGHSCARDLimitForm")
})

router.post('/RGHSCARDLimitForm', RGHSCARDLimitForm );


router.get("/SCSTCasteSTATECENTERCertificateForm" , (req, res)=>{
    res.render("SCSTCasteSTATECENTERCertificateForm")
})

router.post('/SCSTCasteSTATECENTERCertificateForm', SCSTCasteSTATECENTERCertificateForm );

router.get("/berojgariForm" , (req,res)=>{
    res.render("berojgariform")
})

router.post("/berojgariform" , berojgariform)

router.get("/wesnewform" , (req, res)=>{
    res.render("ewsnewform")
})

router.post("/ewsnewform" , ewsnewform)

router.get("/hesiyat" , (req, res)=>{
    res.render("hesiyat")
})

router.post("/hesiyat" , hesiyat)

router.get("/minorityForm" , (req, res)=>{
    res.render("minorityForm")
})

router.post("/minorityForm" , minority)

router.get("/palan" , (req, res)=>{
    res.render("palan")
})

router.post("/palan" , PalanhaarForm)

export default router