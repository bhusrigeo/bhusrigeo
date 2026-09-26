export type UserRole =
  | "SuperAdmin"
  | "OperationsManager"
  | "FinanceManager"
  | "EnterpriseClient"
  | "Freelancer";

export type Currency = "USD" | "INR";

export type ProjectStage =
  | "TENDER_RFQ"
  | "MOBILIZATION"
  | "ACQUISITION"
  | "REMOTE_PROCESSING_QC"
  | "INTERPRETATION"
  | "FINAL_DELIVERY"
  | "INVOICED_CLOSED";

export type SurveyTaxonomy =
  | "HIGH_RES_GEOPHYSICAL_HYDROGRAPHIC"
  | "GEOHAZARD_RIG_CLEARANCE"
  | "PIPELINE_CABLE_ROUTE"
  | "IMR_POST_LAY"
  | "BENTHIC_ENVIRONMENTAL_BASELINE"
  | "UXO_TARGET_CLEARANCE";

export type RFPStatus =
  | "NEW_LEAD"
  | "TECHNICAL_FEASIBILITY"
  | "QUOTE_GENERATED"
  | "AWARDED"
  | "DECLINED";

export type FreelancerDiscipline =
  | "PARTY_CHIEF"
  | "HYDROGRAPHER"
  | "PROCESSING_GEOPHYSICIST"
  | "SEISMIC_INTERPRETER"
  | "GEOTECHNICAL_ENGINEER"
  | "CLIENT_REPRESENTATIVE"
  | "ROV_SPECIALIST";

export type AvailabilityStatus = "AVAILABLE" | "DEPLOYED" | "STANDBY" | "IN_TRANSIT";

export type VisaProcessingStatus = "VISA_APPROVED" | "IN_PROCESS" | "LOI_ISSUED" | "OTB_CLEARED" | "DOCS_PENDING" | "EXPIRED";

export type PayslipStatus = "DRAFT" | "APPROVED" | "DISBURSED";

export type InvoiceStatus =
  | "DRAFT"
  | "PRO_FORMA"
  | "ISSUED"
  | "PARTIALLY_PAID"
  | "PAID"
  | "VOID";

export type MilestoneStage =
  | "ADVANCE_MOBILIZATION_20"
  | "ACQUISITION_SIGNOFF_40"
  | "FINAL_DELIVERY_ACCEPTANCE_40";

export interface AssignedManpower {
  id: string;
  specialistId: string;
  fullName: string;
  roleTitle: string;
  discipline: FreelancerDiscipline;
  passportNumber: string;
  seamanBookCdc: string;
  visaStatus: "VISA_APPROVED" | "IN_PROCESS" | "DOCS_PENDING" | "EXPIRED";
  clientBillingRateDay: number;
  staffPayRateDay: number;
  daysWorked: number;
  dailyShiftHours: number;
  totalDaysPlanned: number;
}

export interface Project {
  id: string;
  projectNumber: string;
  name: string;
  clientId: string;
  clientName?: string;
  stage: ProjectStage;
  taxonomy: SurveyTaxonomy;
  currency: Currency;
  contractValue?: number;
  surveyLocation?: string;
  latitude?: number;
  longitude?: number;
  waterDepthMeters?: number;
  mobilizationWindow?: string;
  vesselName?: string;
  utmZone?: string;
  geodeticDatum?: "WGS84";
  remoteProcessingUrl?: string;
  scopeDetails?: string;
  assignedManpower?: AssignedManpower[];
  progressPercent: number;
  createdAt: string;
  updatedAt: string;
}

export interface ClientRFP {
  id: string;
  companyName: string;
  contactName: string;
  email: string;
  phone?: string;
  taxonomy: SurveyTaxonomy;
  surveyLocation: string;
  latitude?: number;
  longitude?: number;
  targetWaterDepth?: number;
  mobilizationWindow: string;
  vesselRequirement: "FULL_VESSEL_SPREAD" | "REMOTE_PROCESSING_ONLY" | "ROV_AUV_SPREAD";
  documentKeys?: string[];
  status: RFPStatus;
  createdAt: string;
}

export interface SpecialistRecord {
  id: string;
  specialistId: string; // e.g. SED-HYD-042
  fullName: string;
  email: string;
  phone: string;
  discipline: FreelancerDiscipline;
  roleTitle: string;
  yearsExperience: number;
  status: AvailabilityStatus;
  hubLocation: string;
  certifications: string[];
  softwareSkills: string[];
  dayRateUsd: number;
  dayRateInr: number;
  currentProject?: string;
  projectHistory: {
    projectName: string;
    operator: string;
    year: string;
    role: string;
  }[];
}

export interface DualMarginLineItem {
  id: string;
  roleTitle: string;
  discipline: FreelancerDiscipline;
  clientBillingRateDay: number;
  staffPayRateDay: number;
  quantityDays: number;
  currency: Currency;
  marginDay: number;
  marginPercent: number;
  totalClientBilling: number;
  totalStaffCost: number;
}

export interface QuotationLineItem {
  id?: string;
  description: string;
  category: "VESSEL_DAY_RATE" | "REMOTE_PROCESSING" | "REPORTING_DELIVERABLE" | "MOBILIZATION_DEMOB" | "SPECIALIST_CREWING";
  quantity: number;
  unit: string;
  unitPrice: number;
  taxRate: number;
  currency: Currency;
  total: number;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  projectId: string;
  customerName: string;
  currency: Currency;
  status: InvoiceStatus;
  milestoneStage: MilestoneStage;
  issueDate: string;
  dueDate: string;
  subtotal: number;
  taxGst: number;
  taxTds: number;
  total: number;
  exchangeGainLoss?: number;
  lines: QuotationLineItem[];
}

export interface TelemetryLog {
  id: string;
  projectId: string;
  timestamp: string;
  source: "VESSEL" | "REMOTE_QC" | "PROCESSING_PIPELINE";
  severity: "INFO" | "WARNING" | "CRITICAL";
  message: string;
  acquisitionLine?: string;
  dataQualityScore?: number;
  waterDepthMeters?: number;
}

export interface DemoAccount {
  role: UserRole;
  label: string;
  email: string;
  name: string;
  description: string;
  permissions: string[];
}

export interface OfferLetter {
  id: string;
  offerNumber: string;
  specialistId: string;
  specialistName: string;
  roleTitle: string;
  projectName: string;
  operatorName: string;
  agreedDayRate: number;
  currency: Currency;
  perDiemAllowance: number;
  mobilizationDate: string;
  expectedDurationDays: number;
  vesselName: string;
  status: "ISSUED" | "ACCEPTED" | "MOBILIZED";
}

export interface VisaRecord {
  id: string;
  specialistId: string;
  specialistName: string;
  passportNumber: string;
  seamanBookCdc: string;
  targetCountry: string;
  visaType: string;
  loiStatus: "LOI_APPROVED" | "LOI_ISSUED" | "LOI_PENDING" | "REJECTED";
  visaStatus: VisaProcessingStatus;
  otbClearance: "OTB_CLEARED" | "FLIGHT_BOOKED" | "PENDING";
  stcwBosietExpiry: string;
  medicalExpiry: string;
}

export interface ContractorPayslip {
  id: string;
  payslipNumber: string;
  specialistId: string;
  specialistName: string;
  roleTitle: string;
  projectName: string;
  periodStart: string;
  periodEnd: string;
  daysWorked: number;
  dayRate: number;
  currency: Currency;
  grossPay: number;
  perDiemBonus: number;
  taxDeduction: number;
  netPay: number;
  status: PayslipStatus;
  bankSwiftIfsc: string;
  accountNumber: string;
}

export interface ClientCompany {
  id: string;
  clientCode: string;
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  gstTaxId: string;
  preferredCurrency: Currency;
  country: string;
}

export interface CompanyProfile {
  firmName: string;
  legalEntity: string;
  gstNo: string;
  cinNo: string;
  certifications: string[];
  address: string;
  cityCountry: string;
  email: string;
  phone: string;
  website: string;
  logoUrl: string;
}

export interface OperationalHub {
  id: string;
  city: string;
  country: string;
  domain: string;
  address: string;
  phone: string;
  email: string;
  focus: string;
  image?: string;
  isPrimary?: boolean;
}

