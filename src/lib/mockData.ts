import { IMAGES } from "@/lib/images";
import type {
  Project,
  ClientRFP,
  SpecialistRecord,
  Invoice,
  TelemetryLog,
  DemoAccount,
  DualMarginLineItem,
  OfferLetter,
  VisaRecord,
  ContractorPayslip,
  ClientCompany,
  CompanyProfile,
  OperationalHub
} from "@/types/domain";

export const DEMO_ACCOUNTS: DemoAccount[] = [
  {
    role: "SuperAdmin",
    label: "Executive Admin Console",
    email: "admin@bhusrigeo.com",
    name: "Capt. Rajesh Varma",
    description: "Full access to commercial financials, PDF invoice engine, freelancer rates, and system parameters.",
    permissions: ["FINANCIALS", "INVOICE_PDF", "FREELANCER_RATES", "PROJECT_APPROVAL", "TELEMETRY_QC"]
  },
  {
    role: "OperationsManager",
    label: "Survey Operations Manager",
    email: "ops.manager@bhusrigeo.com",
    name: "Elena Rostova",
    description: "Manage project Kanban stages, RFP scoping, specialist crewing assignments, and Starlink telemetry.",
    permissions: ["PROJECT_APPROVAL", "SPECIALIST_CREWING", "TELEMETRY_QC", "RFP_SCOPING"]
  },
  {
    role: "Freelancer",
    label: "Offshore Specialist / Party Chief",
    email: "specialist.vance@bhusrigeo.com",
    name: "Dr. Alistair Vance (BHS-HYD-042)",
    description: "Self-service specialist portal to manage certifications, day rates, and offshore availability.",
    permissions: ["PROFILE_EDIT", "CERTIFICATION_UPLOAD", "ASSIGNED_PROJECTS"]
  },
  {
    role: "EnterpriseClient",
    label: "Client Representative Portal",
    email: "client.rep@totalenergies.com",
    name: "Claire Bennett (TotalEnergies)",
    description: "Client portal to track campaign telemetry, inspect bathymetric DTMs, and download invoices.",
    permissions: ["VIEW_TELEMETRY", "VIEW_PROJECTS", "DOWNLOAD_INVOICES"]
  }
];

export const MOCK_PROJECTS: Project[] = [
  {
    id: "proj-001",
    projectNumber: "BHS-2026-KG-09",
    name: "KG-DWN-98/2 Rig-Site Clearance & Shallow Gas DHI Survey",
    clientId: "usr-client-01",
    clientName: "ONGC Deepwater Operations",
    stage: "ACQUISITION",
    taxonomy: "GEOHAZARD_RIG_CLEARANCE",
    currency: "USD",
    contractValue: 185000,
    surveyLocation: "KG Basin Block 98/2, Bay of Bengal",
    latitude: 16.4215,
    longitude: 82.355,
    waterDepthMeters: 1420,
    mobilizationWindow: "Immediate (Q3 2026)",
    vesselName: "Chartered RV Pacific Explorer",
    utmZone: "44N",
    geodeticDatum: "WGS84",
    remoteProcessingUrl: "https://telemetry.bhusrigeo.com/live/BHS-2026-KG-09",
    scopeDetails: "Deepwater multi-beam bathymetry (MBES), sub-bottom acoustic profiling (SBP), side scan sonar (SSS), and shallow gas Direct Hydrocarbon Indicator (DHI) detection prior to semi-submersible rig positioning.",
    assignedManpower: [
      {
        id: "amp-101",
        specialistId: "BHS-HYD-042",
        fullName: "Dr. Alistair Vance",
        roleTitle: "Senior Hydrographic Party Chief",
        discipline: "PARTY_CHIEF",
        passportNumber: "GB98421044",
        seamanBookCdc: "CDC-UK-88421",
        visaStatus: "VISA_APPROVED",
        clientBillingRateDay: 1350,
        staffPayRateDay: 950,
        daysWorked: 16,
        dailyShiftHours: 12,
        totalDaysPlanned: 21
      },
      {
        id: "amp-102",
        specialistId: "BHS-GEO-018",
        fullName: "Priya Sundaram",
        roleTitle: "Lead Sub-Bottom Processing Geophysicist",
        discipline: "PROCESSING_GEOPHYSICIST",
        passportNumber: "IN77429910",
        seamanBookCdc: "CDC-IN-99120",
        visaStatus: "VISA_APPROVED",
        clientBillingRateDay: 1150,
        staffPayRateDay: 820,
        daysWorked: 16,
        dailyShiftHours: 12,
        totalDaysPlanned: 21
      },
      {
        id: "amp-103",
        specialistId: "BHS-[#07142F]-031",
        fullName: "Capt. Jonathan Hayes",
        roleTitle: "Independent Hydrographic Client Representative",
        discipline: "CLIENT_REPRESENTATIVE",
        passportNumber: "GB66219011",
        seamanBookCdc: "CDC-UK-44102",
        visaStatus: "VISA_APPROVED",
        clientBillingRateDay: 1250,
        staffPayRateDay: 900,
        daysWorked: 16,
        dailyShiftHours: 12,
        totalDaysPlanned: 21
      }
    ],
    progressPercent: 68,
    createdAt: "2026-08-10T00:00:00Z",
    updatedAt: "2026-09-20T00:00:00Z"
  },
  {
    id: "proj-002",
    projectNumber: "BHS-2026-MUM-14",
    name: "Mumbai High South Pipeline Trenching & Alignment Survey",
    clientId: "usr-client-02",
    clientName: "L&T Hydrocarbon Engineering",
    stage: "REMOTE_PROCESSING_QC",
    taxonomy: "PIPELINE_CABLE_ROUTE",
    currency: "INR",
    contractValue: 18500000,
    surveyLocation: "Mumbai High South Field, Arabian Sea",
    latitude: 19.412,
    longitude: 71.288,
    waterDepthMeters: 85,
    mobilizationWindow: "Completed",
    vesselName: "Chartered MV Ocean Vantage",
    utmZone: "43N",
    geodeticDatum: "WGS84",
    remoteProcessingUrl: "https://telemetry.bhusrigeo.com/live/BHS-2026-MUM-14",
    scopeDetails: "TSS 440/350 pipeline tracking, ROV subsea laser inspection, and continuous depth-of-burial profiling along 42 km offshore oil transport trunkline.",
    assignedManpower: [
      {
        id: "amp-201",
        specialistId: "BHS-ROV-005",
        fullName: "Capt. Rajesh Varma",
        roleTitle: "Subsea Survey & ROV Supervisor",
        discipline: "ROV_SPECIALIST",
        passportNumber: "IN98102941",
        seamanBookCdc: "CDC-IN-55102",
        visaStatus: "VISA_APPROVED",
        clientBillingRateDay: 95000,
        staffPayRateDay: 68000,
        daysWorked: 18,
        dailyShiftHours: 12,
        totalDaysPlanned: 20
      },
      {
        id: "amp-202",
        specialistId: "BHS-HYD-019",
        fullName: "Vikram Malhotra",
        roleTitle: "Senior Hydrographer",
        discipline: "HYDROGRAPHER",
        passportNumber: "IN66102933",
        seamanBookCdc: "CDC-IN-44910",
        visaStatus: "VISA_APPROVED",
        clientBillingRateDay: 85000,
        staffPayRateDay: 60000,
        daysWorked: 18,
        dailyShiftHours: 12,
        totalDaysPlanned: 20
      }
    ],
    progressPercent: 82,
    createdAt: "2026-07-15T00:00:00Z",
    updatedAt: "2026-09-19T00:00:00Z"
  },
  {
    id: "proj-003",
    projectNumber: "BHS-2026-GOM-04",
    name: "Gulf of Mexico Deepwater Anchor Refusal & CPT Site Investigation",
    clientId: "usr-client-03",
    clientName: "TotalEnergies E&P USA",
    stage: "TENDER_RFQ",
    taxonomy: "HIGH_RES_GEOPHYSICAL_HYDROGRAPHIC",
    currency: "USD",
    contractValue: 240000,
    surveyLocation: "Mississippi Canyon Block 482, GoM",
    latitude: 28.145,
    longitude: -89.412,
    waterDepthMeters: 2150,
    mobilizationWindow: "Q4 2026",
    vesselName: "Chartered ROV Spread Alpha",
    utmZone: "16N",
    geodeticDatum: "WGS84",
    scopeDetails: "Seabed CPT soil mechanics logging (40m penetration), piston coring, and high-frequency sparker geohazard assessment for deepwater floating production hub.",
    assignedManpower: [
      {
        id: "amp-301",
        specialistId: "BHS-CPT-009",
        fullName: "Marcus Thorne",
        roleTitle: "Senior Seabed CPT Operator & Soil Engineer",
        discipline: "GEOTECHNICAL_ENGINEER",
        passportNumber: "US55410982",
        seamanBookCdc: "CDC-US-44102",
        visaStatus: "VISA_APPROVED",
        clientBillingRateDay: 1450,
        staffPayRateDay: 1100,
        daysWorked: 0,
        dailyShiftHours: 12,
        totalDaysPlanned: 14
      }
    ],
    progressPercent: 15,
    createdAt: "2026-09-01T00:00:00Z",
    updatedAt: "2026-09-18T00:00:00Z"
  }
];

export const MOCK_RFPS: ClientRFP[] = [
  {
    id: "rfp-101",
    companyName: "Reliance Marine Energy",
    contactName: "Jean-Luc Moreau",
    email: "jl.moreau@relmarine.com",
    taxonomy: "GEOHAZARD_RIG_CLEARANCE",
    surveyLocation: "KG-DWN-98/2 Block, Bay of Bengal",
    targetWaterDepth: 1420,
    mobilizationWindow: "Q4 2026",
    vesselRequirement: "FULL_VESSEL_SPREAD",
    status: "TECHNICAL_FEASIBILITY",
    createdAt: "2026-09-18T10:00:00Z"
  },
  {
    id: "rfp-102",
    companyName: "TotalEnergies E&P",
    contactName: "Claire Bennett",
    email: "c.bennett@totalenergies.com",
    taxonomy: "PIPELINE_CABLE_ROUTE",
    surveyLocation: "Block 32 Deepwater, Offshore Angola",
    targetWaterDepth: 1850,
    mobilizationWindow: "Immediate",
    vesselRequirement: "REMOTE_PROCESSING_ONLY",
    status: "NEW_LEAD",
    createdAt: "2026-09-19T14:30:00Z"
  }
];

export const MOCK_FREELANCERS: SpecialistRecord[] = [
  {
    id: "fl-01",
    specialistId: "BHS-HYD-042",
    fullName: "Dr. Alistair Vance",
    email: "a.vance@bhusrigeo.com",
    phone: "+44 7700 900142",
    discipline: "PARTY_CHIEF",
    roleTitle: "Senior Hydrographic Party Chief",
    yearsExperience: 14,
    status: "DEPLOYED",
    hubLocation: "Mumbai / KG Basin",
    certifications: ["IMCA Certified Hydrographer", "BOSIET with HUET", "STCW-95", "Offshore Medical Class 1"],
    softwareSkills: ["CARIS HIPS/SIPS", "EIVA NaviModel", "SonarWiz", "QINSy"],
    dayRateUsd: 950,
    dayRateInr: 78000,
    currentProject: "KG-DWN-98/2 Rig-Site Clearance",
    projectHistory: [
      { projectName: "KG-DWN-98/2 Geohazard Survey", operator: "ONGC", year: "2026", role: "Party Chief" },
      { projectName: "Brosna Deepwater MBES", operator: "BP", year: "2025", role: "Senior Surveyor" }
    ]
  },
  {
    id: "fl-02",
    specialistId: "BHS-GEO-018",
    fullName: "Priya Sundaram",
    email: "p.sundaram@bhusrigeo.com",
    phone: "+91 98200 44118",
    discipline: "PROCESSING_GEOPHYSICIST",
    roleTitle: "Lead Sub-Bottom Geophysicist",
    yearsExperience: 9,
    status: "AVAILABLE",
    hubLocation: "Mumbai Hub",
    certifications: ["BOSIET with HUET", "OGUK Offshore Medical", "STCW-95 Safety"],
    softwareSkills: ["Kingdom Suite", "Petrel", "Seismic Unix", "Starlink Remote Denoising"],
    dayRateUsd: 820,
    dayRateInr: 68000,
    projectHistory: [
      { projectName: "Mumbai High Pipeline Survey", operator: "L&T Hydrocarbon", year: "2026", role: "Lead Processing Geophysicist" },
      { projectName: "Gulf of Mannar Cable Route", operator: "Prysmian", year: "2025", role: "Geophysicist" }
    ]
  },
  {
    id: "fl-03",
    specialistId: "BHS-CPT-009",
    fullName: "Marcus Thorne",
    email: "m.thorne@bhusrigeo.com",
    phone: "+1 713 555 0109",
    discipline: "GEOTECHNICAL_ENGINEER",
    roleTitle: "Senior Seabed CPT Operator & Soil Engineer",
    yearsExperience: 12,
    status: "DEPLOYED",
    hubLocation: "Houston / Gulf of Mexico",
    certifications: ["Datem CPT Specialist", "BOSIET", "STCW-95", "USCG Offshore"],
    softwareSkills: ["Geopsy", "CPT-Pro", "PLAXIS 3D", "AutoCAD Civil"],
    dayRateUsd: 1100,
    dayRateInr: 91000,
    currentProject: "Gulf of Mexico Anchor Refusal CPT",
    projectHistory: [
      { projectName: "Mississippi Canyon Anchor Site", operator: "TotalEnergies", year: "2026", role: "Lead CPT Engineer" }
    ]
  },
  {
    id: "fl-04",
    specialistId: "BHS-REP-031",
    fullName: "Capt. Jonathan Hayes",
    email: "j.hayes@bhusrigeo.com",
    phone: "+44 7911 123456",
    discipline: "CLIENT_REPRESENTATIVE",
    roleTitle: "Independent Hydrographic Client Representative",
    yearsExperience: 18,
    status: "AVAILABLE",
    hubLocation: "Aberdeen / Kakinada",
    certifications: ["IMCA Client Rep Certified", "BOSIET", "Mates Master Mariner", "Offshore Medical"],
    softwareSkills: ["IMCA QA/QC Checklists", "QINSy", "CARIS", "Client Audit Logs"],
    dayRateUsd: 1250,
    dayRateInr: 104000,
    projectHistory: [
      { projectName: "Offshore Wind Interconnector", operator: "Orsted", year: "2026", role: "Client Rep" }
    ]
  }
];

export const MOCK_DUAL_MARGIN_QUOTES: DualMarginLineItem[] = [
  {
    id: "dq-01",
    roleTitle: "Senior Hydrographic Party Chief (Dr. Vance - BHS-HYD-042)",
    discipline: "PARTY_CHIEF",
    clientBillingRateDay: 1350,
    staffPayRateDay: 950,
    quantityDays: 14,
    currency: "USD",
    marginDay: 400,
    marginPercent: 29.6,
    totalClientBilling: 18900,
    totalStaffCost: 13300
  },
  {
    id: "dq-02",
    roleTitle: "Lead Sub-Bottom Geophysicist (Priya Sundaram - BHS-GEO-018)",
    discipline: "PROCESSING_GEOPHYSICIST",
    clientBillingRateDay: 1150,
    staffPayRateDay: 820,
    quantityDays: 14,
    currency: "USD",
    marginDay: 330,
    marginPercent: 28.7,
    totalClientBilling: 16100,
    totalStaffCost: 11480
  },
  {
    id: "dq-03",
    roleTitle: "Seabed CPT Lead Engineer (Marcus Thorne - BHS-CPT-009)",
    discipline: "GEOTECHNICAL_ENGINEER",
    clientBillingRateDay: 1650,
    staffPayRateDay: 1100,
    quantityDays: 14,
    currency: "USD",
    marginDay: 550,
    marginPercent: 33.3,
    totalClientBilling: 23100,
    totalStaffCost: 15400
  }
];

export const MOCK_OFFER_LETTERS: OfferLetter[] = [
  {
    id: "off-01",
    offerNumber: "BHS-OFFER-2026-042",
    specialistId: "BHS-HYD-042",
    specialistName: "Dr. Alistair Vance",
    roleTitle: "Senior Hydrographic Party Chief",
    projectName: "KG-DWN-98/2 Rig-Site Clearance & Geohazard Survey",
    operatorName: "ONGC Deepwater Operations",
    agreedDayRate: 950,
    currency: "USD",
    perDiemAllowance: 75,
    mobilizationDate: "2026-10-01",
    expectedDurationDays: 14,
    vesselName: "Chartered RV Pacific Explorer",
    status: "ACCEPTED"
  },
  {
    id: "off-02",
    offerNumber: "BHS-OFFER-2026-018",
    specialistId: "BHS-GEO-018",
    specialistName: "Priya Sundaram",
    roleTitle: "Lead Sub-Bottom Geophysicist",
    projectName: "Mumbai High South Pipeline Alignment",
    operatorName: "L&T Hydrocarbon Engineering",
    agreedDayRate: 820,
    currency: "USD",
    perDiemAllowance: 60,
    mobilizationDate: "2026-10-05",
    expectedDurationDays: 12,
    vesselName: "Chartered MV Ocean Vantage",
    status: "ISSUED"
  }
];

export const MOCK_VISA_RECORDS: VisaRecord[] = [
  {
    id: "visa-01",
    specialistId: "BHS-HYD-042",
    specialistName: "Dr. Alistair Vance",
    passportNumber: "GB98421044",
    seamanBookCdc: "CDC-UK-88421",
    targetCountry: "United States (Gulf of Mexico / Houston)",
    visaType: "C1/D Seaman Transit & US B1/OECS Visa",
    loiStatus: "LOI_APPROVED",
    visaStatus: "VISA_APPROVED",
    otbClearance: "OTB_CLEARED",
    stcwBosietExpiry: "2028-06-30",
    medicalExpiry: "2027-11-15"
  },
  {
    id: "visa-02",
    specialistId: "BHS-GEO-018",
    specialistName: "Priya Sundaram",
    passportNumber: "IN77429910",
    seamanBookCdc: "CDC-IN-99120",
    targetCountry: "Angola (Block 32 Deepwater / Luanda)",
    visaType: "Angolan Offshore Work Permit (TWP)",
    loiStatus: "LOI_APPROVED",
    visaStatus: "DOCS_PENDING",
    otbClearance: "PENDING",
    stcwBosietExpiry: "2027-04-12",
    medicalExpiry: "2026-12-01"
  },
  {
    id: "visa-03",
    specialistId: "BHS-CPT-009",
    specialistName: "Marcus Thorne",
    passportNumber: "US55410982",
    seamanBookCdc: "CDC-US-44102",
    targetCountry: "United Kingdom (North Sea / Aberdeen)",
    visaType: "UK Offshore Transit & Frontier Worker",
    loiStatus: "LOI_APPROVED",
    visaStatus: "VISA_APPROVED",
    otbClearance: "OTB_CLEARED",
    stcwBosietExpiry: "2029-01-20",
    medicalExpiry: "2027-08-30"
  },
  {
    id: "visa-04",
    specialistId: "BHS-NAV-033",
    specialistName: "Jean-Luc Dubois",
    passportNumber: "FR8829104",
    seamanBookCdc: "CDC-FR-33012",
    targetCountry: "United Arab Emirates (Abu Dhabi / Offshore)",
    visaType: "UAE Mission Visa & Offshore Pass",
    loiStatus: "LOI_ISSUED",
    visaStatus: "IN_PROCESS",
    otbClearance: "FLIGHT_BOOKED",
    stcwBosietExpiry: "2028-09-15",
    medicalExpiry: "2027-05-20"
  },
  {
    id: "visa-05",
    specialistId: "BHS-ROV-015",
    specialistName: "Tariq Al-Mansoor",
    passportNumber: "SA9920148",
    seamanBookCdc: "CDC-SA-77123",
    targetCountry: "Australia (Browse Basin / Perth)",
    visaType: "Australia Subclass 400 Short Stay Specialist",
    loiStatus: "LOI_APPROVED",
    visaStatus: "VISA_APPROVED",
    otbClearance: "OTB_CLEARED",
    stcwBosietExpiry: "2029-03-10",
    medicalExpiry: "2028-01-14"
  },
  {
    id: "visa-06",
    specialistId: "BHS-HYD-058",
    specialistName: "Capt. Rajesh Varma",
    passportNumber: "IN4499102",
    seamanBookCdc: "CDC-IN-11029",
    targetCountry: "India (KG Basin Block 98/2)",
    visaType: "Indian Project & Offshore Seaman Clearance",
    loiStatus: "LOI_APPROVED",
    visaStatus: "VISA_APPROVED",
    otbClearance: "OTB_CLEARED",
    stcwBosietExpiry: "2028-11-30",
    medicalExpiry: "2027-09-18"
  }
];

export const MOCK_PAYSLIPS: ContractorPayslip[] = [
  {
    id: "ps-001",
    payslipNumber: "BHS-PAY-2026-088",
    specialistId: "BHS-HYD-042",
    specialistName: "Dr. Alistair Vance",
    roleTitle: "Senior Hydrographic Party Chief",
    projectName: "KG-DWN-98/2 Rig-Site Clearance",
    periodStart: "2026-09-01",
    periodEnd: "2026-09-14",
    daysWorked: 14,
    dayRate: 950,
    currency: "USD",
    grossPay: 13300,
    perDiemBonus: 1050,
    taxDeduction: 0,
    netPay: 14350,
    status: "DISBURSED",
    bankSwiftIfsc: "HSBCGB2L / GB82HSBC40020012345678",
    accountNumber: "GB82HSBC40020012345678"
  },
  {
    id: "ps-002",
    payslipNumber: "BHS-PAY-2026-089",
    specialistId: "BHS-GEO-018",
    specialistName: "Priya Sundaram",
    roleTitle: "Lead Sub-Bottom Geophysicist",
    projectName: "Mumbai High Pipeline Alignment",
    periodStart: "2026-09-05",
    periodEnd: "2026-09-17",
    daysWorked: 12,
    dayRate: 820,
    currency: "USD",
    grossPay: 9840,
    perDiemBonus: 720,
    taxDeduction: 0,
    netPay: 10560,
    status: "APPROVED",
    bankSwiftIfsc: "HDFC0000001 / IN9842100824",
    accountNumber: "5010023456789"
  }
];

export const MOCK_INVOICES: Invoice[] = [
  {
    id: "inv-001",
    invoiceNumber: "BHS-INV-2026-008",
    projectId: "proj-001",
    customerName: "ONGC Deepwater Operations",
    currency: "USD",
    status: "PARTIALLY_PAID",
    milestoneStage: "ACQUISITION_SIGNOFF_40",
    issueDate: "2026-09-01",
    dueDate: "2026-10-01",
    subtotal: 140000,
    taxGst: 25200,
    taxTds: 2800,
    total: 165200,
    exchangeGainLoss: 42500,
    lines: [
      {
        description: "Hydrographic Survey Scope - KG-DWN-98/2 Rig Site Clearance",
        category: "VESSEL_DAY_RATE",
        quantity: 14,
        unit: "days",
        unitPrice: 7500,
        taxRate: 18,
        currency: "USD",
        total: 105000
      },
      {
        description: "Senior Party Chief (Dr. Vance - BHS-HYD-042) Day Rate",
        category: "SPECIALIST_CREWING",
        quantity: 14,
        unit: "days",
        unitPrice: 950,
        taxRate: 18,
        currency: "USD",
        total: 13300
      }
    ]
  }
];

export const MOCK_TELEMETRY: TelemetryLog[] = [
  {
    id: "telem-01",
    projectId: "proj-001",
    timestamp: "2026-09-20T17:45:00Z",
    source: "VESSEL",
    severity: "INFO",
    message: "Kongsberg EM2040 MBES dual-head ping active. Acoustic velocity calibration 1522.4 m/s at 1,420m depth.",
    acquisitionLine: "LINE-142-NORTH",
    dataQualityScore: 99.4,
    waterDepthMeters: 1420.5
  }
];

export const MOCK_CLIENT_COMPANIES: ClientCompany[] = [
  {
    id: "cli-01",
    clientCode: "CLI-TOT-01",
    companyName: "TotalEnergies E&P USA Inc.",
    contactPerson: "Claire Bennett (Procurement Director)",
    email: "c.bennett@totalenergies.com",
    phone: "+1 (713) 554-8920",
    address: "1200 Smith St, Suite 2400, Houston, TX 77002, USA",
    gstTaxId: "EIN 84-2910482",
    preferredCurrency: "USD",
    country: "United States"
  },
  {
    id: "cli-02",
    clientCode: "CLI-ONG-02",
    companyName: "ONGC Deepwater Operations (India)",
    contactPerson: "Dr. K.S. Rao (GM Subsea)",
    email: "ksrao@ongc.co.in",
    phone: "+91 22 2656 2000",
    address: "ONGC Green Heights, Bandra-Kurla Complex, Mumbai 400051, India",
    gstTaxId: "36AABCS1234F1Z9",
    preferredCurrency: "INR",
    country: "India"
  },
  {
    id: "cli-03",
    clientCode: "CLI-FUG-03",
    companyName: "Fugro Subsea Services B.V.",
    contactPerson: "Mark Thompson (Survey Operations)",
    email: "m.thompson@fugro.com",
    phone: "+31 70 311 1420",
    address: "Veurse Achterweg 10, 2264 SG Leidschendam, Netherlands",
    gstTaxId: "VAT NL80394819B01",
    preferredCurrency: "USD",
    country: "Netherlands"
  },
  {
    id: "cli-04",
    clientCode: "CLI-SHL-04",
    companyName: "Shell Offshore Inc.",
    contactPerson: "Sarah Jenkins (Deepwater Logistics)",
    email: "s.jenkins@shell.com",
    phone: "+1 (504) 588-6161",
    address: "701 Poydras St, New Orleans, LA 70139, USA",
    gstTaxId: "EIN 74-1290381",
    preferredCurrency: "USD",
    country: "United States"
  },
  {
    id: "cli-05",
    clientCode: "CLI-SUB-05",
    companyName: "Subsea7 Global Crewing Ltd",
    contactPerson: "Lars Lindqvist (Subsea Director)",
    email: "l.lindqvist@subsea7.com",
    phone: "+44 1224 266000",
    address: "Greenwell Road, East Tullos, Aberdeen AB12 3AX, UK",
    gstTaxId: "GB 928104812",
    preferredCurrency: "USD",
    country: "United Kingdom"
  }
];

export const DEFAULT_COMPANY_PROFILE: CompanyProfile = {
  firmName: "BHUSRI GEOSCIENCES & ENGINEERING SOLUTIONS PRIVATE LIMITED",
  legalEntity: "BHUSRI Geosciences & Engineering Solutions",
  gstNo: "36AABCS1234F1Z9",
  cinNo: "U74999TG2026PTC184920",
  certifications: [
    "ISO 9001:2015 Quality Management Certified",
    "ISO 14001 Offshore Environmental Management",
    "IMCA Certified Hydrographic & Subsea Survey Company",
    "STCW 95 / BOSIET / OGUK Medical Offshore Compliant"
  ],
  address: "Subsea Technology Corridor, HITEC City, Hyderabad - 500081, TG, India",
  cityCountry: "Hyderabad, India · Houston, TX, USA · Aberdeen, UK",
  email: "commercial@bhusrigeo.com",
  phone: "+91 40 4821 9900",
  website: "bhusrigeo.com",
  logoUrl: "/bhusri-logo.png"
};

export const MOCK_OPERATIONAL_HUBS: OperationalHub[] = [
  {
    id: "hub-1",
    city: "Kakinada Deepwater Logistics Hub",
    country: "India (East Coast Operations)",
    domain: "bhusrigeo.com",
    address: "Deepwater Jetty Complex, Kakinada Port, Andhra Pradesh 533005",
    phone: "+91 884 235 9910",
    email: "kakinada.ops@bhusrigeo.com",
    focus: "KG Basin, Palk Strait, Andaman Deepwater",
    image: IMAGES.kakinadaBase,
    isPrimary: true
  },
  {
    id: "hub-2",
    city: "Mumbai Offshore Operational Base",
    country: "India (West Coast Operations)",
    domain: "bhusrigeo.com",
    address: "Plot 14, JNPT Logistics Zone, Navi Mumbai, Maharashtra 400707",
    phone: "+91 22 6789 4400",
    email: "mumbai.ops@bhusrigeo.com",
    focus: "Arabian Sea, Mumbai High, Gulf of Khambhat",
    image: IMAGES.mumbaiBase
  },
  {
    id: "hub-3",
    city: "Houston Remote Data Processing Center",
    country: "United States (International HQ)",
    domain: "bhusrigeo.com",
    address: "1200 Energy Corridor Blvd, Suite 800, Houston, TX 77079",
    phone: "+1 713 554 9000",
    email: "houston.qc@bhusrigeo.com",
    focus: "Global Starlink Remote QC & SEG-Y Interpretation",
    image: IMAGES.houstonBase
  }
];

