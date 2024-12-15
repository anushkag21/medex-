const dosageList = [
    "250 mg",
    "1000 mg",
    "75 mg",
    "50 mg",
    "5 mg",
    "150 mg",
    "300 mg",
    "200 mg",
    "10 mg",
    "20 mg"
];

const frequenciesList = [
    "Once Daily (QD)",
    "Twice Daily (BID)",
    "Three Times Daily (TID)",
    "Four Times Daily (QID)",
    "Every 6 Hours (Q6H)",
    "As Needed (PRN)",
    "Once Every Other Day (QOD)",
    "Every 8 Hours (Q8H)",
    "Every 12 Hours (Q12H)",
    "Once Weekly (QW)"
];

const medicalCheckupList = [
    "Physical Examination",
    "Blood Pressure Measurement",
    "Blood Tests",
    "Cholesterol Panel",
    "Blood Glucose Test",
    "Complete Blood Count (CBC)",
    "Thyroid Function Tests",
    "Liver Function Tests",
    "Kidney Function Tests",
    "Urinalysis",
    "Body Mass Index (BMI) Measurement",
    "Vision Test",
    "Hearing Test",
    "Dental Checkup",
    "Skin Examination",
    "Cancer Screenings (e.g., Mammogram, Pap Smear, Prostate Specific Antigen)",
    "Bone Density Test",
    "Electrocardiogram (ECG or EKG)",
    "Chest X-ray",
    "Pulmonary Function Tests",
    "Colonoscopy",
    "Stool Test for Colorectal Cancer",
    "DEXA Scan (Dual-Energy X-ray Absorptiometry)",
    "HIV Test",
    "Sexually Transmitted Infections (STI) Screenings",
    "Immunizations and Vaccinations",
    "Eye Exam",
    "Psychological Assessment",
    "Annual Checkup with General Practitioner"
];
const medicalSymptomsList = [
    "Fever",
    "Headache",
    "Fatigue",
    "Cough",
    "Sore throat",
    "Shortness of breath",
    "Chest pain",
    "Abdominal pain",
    "Nausea",
    "Vomiting",
    "Diarrhea",
    "Dizziness",
    "Muscle aches",
    "Joint pain",
    "Rash",
    "Swelling",
    "Difficulty swallowing",
    "Frequent urination",
    "Blood in urine",
    "Loss of appetite"
];

export const MedicalSymptomsOptions = medicalSymptomsList.map((item) => {
    return { label: item, value: item }
})

export const MedicalCheckupOptions = medicalCheckupList.map((item) => {
    return { label: item, value: item }
})

export const DosageOptions = dosageList.map((item) => {
    return {
        label: item,
        value: item
    }
})

export const FrequencyOptions = frequenciesList.map((item) => {
    return {
        label: item,
        value: item
    }
})