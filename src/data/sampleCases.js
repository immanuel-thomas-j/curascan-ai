export const SAMPLE_CASES = [
  {
    id: "sample-1",
    title: "Handwritten Diabetes & Lipid Rx",
    subtitle: "Handwritten Doctor's Note (Metformin, Glimepiride, Atorvastatin, Aspirin)",
    type: "Prescription",
    docTypeLabel: "Handwritten Prescription",
    patientName: "Rajesh Kumar (54 yrs, Male)",
    date: "15 Nov 2026",
    doctorName: "Dr. A. K. Sharma, MD (Diabetology)",
    imageUrl: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80",
    ocrSnippet: "Rx: Metformin 1000mg BD after meals, Glimepiride 2mg OD before bkfst, Atorvastatin 20mg HS, Aspirin 75mg OD after food. Re-check Fasting Blood Sugar in 4 weeks.",
    summary: "Patient prescribed dual oral hypoglycemics (Metformin + Glimepiride) along with lipid-lowering Atorvastatin and antiplatelet Aspirin. Requires strict blood glucose monitoring and dietary management.",
    overallSafetyScore: 78,
    safetyLevel: "caution",
    medications: [
      {
        name: "Metformin HCl",
        dosage: "1000 mg",
        frequency: "Twice daily (BD)",
        timing: "After meals (Breakfast & Dinner)",
        duration: "30 Days",
        purpose: "Blood Sugar Control (Type 2 Diabetes)",
        precautions: "Take immediately after meals to reduce stomach upset. Avoid excessive alcohol intake."
      },
      {
        name: "Glimepiride",
        dosage: "2 mg",
        frequency: "Once daily (OD)",
        timing: "30 mins Before Breakfast",
        duration: "30 Days",
        purpose: "Insulin Secretion Stimulant",
        precautions: "Must eat breakfast after taking to prevent sudden hypoglycemia (low blood sugar)."
      },
      {
        name: "Atorvastatin",
        dosage: "20 mg",
        frequency: "Once daily (HS)",
        timing: "At bedtime",
        duration: "30 Days",
        purpose: "Cholesterol & Plaque Control",
        precautions: "Avoid drinking grapefruit juice. Report unusual muscle pain or dark urine immediately."
      },
      {
        name: "Aspirin (EC)",
        dosage: "75 mg",
        frequency: "Once daily (OD)",
        timing: "After Lunch",
        duration: "30 Days",
        purpose: "Blood Thinning / Cardiovascular Protection",
        precautions: "Take with food to prevent gastric irritation. Watch out for unusual bruising or bleeding."
      }
    ],
    drugInteractions: [
      {
        pair: ["Glimepiride", "Aspirin"],
        severity: "Moderate",
        severityColor: "amber",
        mechanism: "Aspirin can displace Glimepiride from plasma proteins, enhancing its hypoglycemic effect.",
        recommendation: "Monitor blood glucose frequently. Educate patient on early signs of hypoglycemia (sweating, shaky hands, dizziness)."
      },
      {
        pair: ["Metformin", "Glimepiride"],
        severity: "Mild (Synergistic)",
        severityColor: "cyan",
        mechanism: "Dual glucose lowering. Standard combination therapy but carries additive risk of low blood sugar if meals are missed.",
        recommendation: "Ensure regular meal schedules. Carry fast-acting glucose tablets or fruit juice."
      }
    ],
    labMetrics: [
      {
        name: "Fasting Blood Glucose",
        value: 168,
        unit: "mg/dL",
        referenceRange: "70 - 99 mg/dL",
        status: "high",
        statusText: "Elevated (Hyperglycemia)",
        description: "Fasting blood sugar is above optimal levels. Indicates need for glycemic control."
      },
      {
        name: "HbA1c (Glycated Hemoglobin)",
        value: 8.4,
        unit: "%",
        referenceRange: "< 5.7%",
        status: "critical",
        statusText: "High (Uncontrolled Diabetes)",
        description: "Reflects average blood sugar over the last 3 months. Target for diabetics is < 7.0%."
      },
      {
        name: "LDL Cholesterol",
        value: 142,
        unit: "mg/dL",
        referenceRange: "< 100 mg/dL",
        status: "high",
        statusText: "Elevated",
        description: "Bad cholesterol level requires statin therapy to reduce long-term arterial plaque."
      }
    ],
    lifestyleAdvice: [
      "Maintain a low glycemic index diet (whole grains, green leafy vegetables, avoid refined sugars).",
      "Engage in 30 minutes of moderate aerobic exercise daily (brisk walking).",
      "Carry glucose candy or juice at all times in case of sudden dizzy spells (hypoglycemia)."
    ],
    voiceNarration: "Hello Rajesh. Your prescription contains 4 medications for diabetes, cholesterol, and heart safety. Take Glimepiride half an hour before breakfast, Metformin after breakfast and dinner, Aspirin after lunch, and Atorvastatin before sleeping. Be careful not to skip meals while taking Glimepiride to prevent low blood sugar."
  },
  {
    id: "sample-2",
    title: "Multi-Page Lipid & Renal Lab PDF",
    subtitle: "Complete Blood Count, Lipid Profile & Kidney Panel Laboratory Report",
    type: "LabReport",
    docTypeLabel: "Diagnostic Lab PDF",
    patientName: "Meena Patel (61 yrs, Female)",
    date: "15 Nov 2026",
    doctorName: "Apollo Diagnostics Central Lab",
    imageUrl: "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=800&q=80",
    ocrSnippet: "PANEL: Comprehensive Metabolic & Lipid Profile. HbA1c: 8.8%, Total Cholesterol: 248 mg/dL, Triglycerides: 290 mg/dL, eGFR: 62 mL/min/1.73m2, Serum Creatinine: 1.3 mg/dL.",
    summary: "Comprehensive laboratory audit reveals diabetic dyslipidemia combined with early Stage 2 Chronic Kidney Disease (borderline eGFR). Requires prompt clinical correlation and dietary sodium/protein management.",
    overallSafetyScore: 62,
    safetyLevel: "warning",
    medications: [],
    drugInteractions: [],
    labMetrics: [
      {
        name: "HbA1c (Glycated Hb)",
        value: 8.8,
        unit: "%",
        referenceRange: "4.0 - 5.6%",
        status: "critical",
        statusText: "Severely High",
        description: "High average blood sugar over past 90 days. High risk of microvascular complications."
      },
      {
        name: "Serum Triglycerides",
        value: 290,
        unit: "mg/dL",
        referenceRange: "< 150 mg/dL",
        status: "critical",
        statusText: "Very High",
        description: "Elevated blood fat increases risk of fatty liver and cardiovascular disease."
      },
      {
        name: "Total Cholesterol",
        value: 248,
        unit: "mg/dL",
        referenceRange: "< 200 mg/dL",
        status: "high",
        statusText: "High",
        description: "Elevated total blood cholesterol requiring dietary modifications and medical intervention."
      },
      {
        name: "Serum Creatinine",
        value: 1.35,
        unit: "mg/dL",
        referenceRange: "0.59 - 1.04 mg/dL",
        status: "high",
        statusText: "Slightly Elevated",
        description: "Kidney filtration indicator is elevated. Requires adequate hydration and monitoring."
      },
      {
        name: "eGFR (Kidney Filtration)",
        value: 62,
        unit: "mL/min",
        referenceRange: "> 90 mL/min",
        status: "high",
        statusText: "Mildly Decreased (Stage 2 CKD)",
        description: "Filtration rate indicates mild kidney reduction. Avoid over-the-counter NSAID painkillers like Ibuprofen."
      },
      {
        name: "Hemoglobin (Hb)",
        value: 12.8,
        unit: "g/dL",
        referenceRange: "12.0 - 15.5 g/dL",
        status: "normal",
        statusText: "Normal",
        description: "Oxygen-carrying protein in red blood cells is within healthy limits."
      }
    ],
    lifestyleAdvice: [
      "Strictly limit dietary sodium (< 2,000 mg/day) and avoid processed foods to protect kidney health.",
      "Avoid OTC painkillers like Ibuprofen or Naproxen which can worsen kidney filtration.",
      "Schedule a follow-up consultation with your Nephrologist or Endocrinologist within 14 days."
    ],
    voiceNarration: "Hello Meena. Your lab test shows elevated blood sugar levels and high triglycerides, along with mild kidney stress. Please drink plenty of water, avoid salty foods and fried snacks, and do not take painkiller medicines like Ibuprofen without consulting your doctor."
  },
  {
    id: "sample-3",
    title: "Cardiac Care Multi-Drug Conflict Rx",
    subtitle: "Post-Infarction Therapy (Warfarin, Amiodarone, Lisinopril, Spironolactone)",
    type: "Prescription",
    docTypeLabel: "Complex Cardiac Prescription",
    patientName: "David Miller (68 yrs, Male)",
    date: "15 Nov 2026",
    doctorName: "Dr. S. R. Vance, FACC (Cardiology)",
    imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80",
    ocrSnippet: "Rx: Warfarin 5mg OD (Adjust per INR), Amiodarone 200mg OD, Lisinopril 10mg OD, Spironolactone 25mg OD, Furosemide 40mg OD. Weekly INR check mandated.",
    summary: "HIGH CRITICAL SAFETY ALERT: Severe drug-drug interaction detected between Warfarin and Amiodarone, significantly elevating bleeding risk. Co-administration of Lisinopril and Spironolactone increases hyperkalemia risk.",
    overallSafetyScore: 48,
    safetyLevel: "critical",
    medications: [
      {
        name: "Warfarin Sodium",
        dosage: "5 mg",
        frequency: "Once daily (OD)",
        timing: "6:00 PM (Consistent time)",
        duration: "Continuous",
        purpose: "Anticoagulant (Prevents Blood Clots)",
        precautions: "Maintain consistent Vitamin K diet (green leafy veggies). Report unusual bleeding immediately."
      },
      {
        name: "Amiodarone HCl",
        dosage: "200 mg",
        frequency: "Once daily (OD)",
        timing: "With morning meal",
        duration: "Continuous",
        purpose: "Antiarrhythmic (Heart Rhythm Control)",
        precautions: "Avoid sun exposure (causes photosensitivity). Requires routine liver and thyroid tests."
      },
      {
        name: "Lisinopril",
        dosage: "10 mg",
        frequency: "Once daily (OD)",
        timing: "Morning",
        duration: "Continuous",
        purpose: "ACE Inhibitor (Blood Pressure & Heart Failure)",
        precautions: "May cause dry persistent cough. Monitor blood potassium levels regularly."
      },
      {
        name: "Spironolactone",
        dosage: "25 mg",
        frequency: "Once daily (OD)",
        timing: "Morning with food",
        duration: "Continuous",
        purpose: "Potassium-Sparing Diuretic",
        precautions: "Avoid potassium salt substitutes and bananas in high quantities."
      }
    ],
    drugInteractions: [
      {
        pair: ["Warfarin", "Amiodarone"],
        severity: "CRITICAL DANGER",
        severityColor: "rose",
        mechanism: "Amiodarone inhibits CYP2C9 and CYP3A4, causing Warfarin serum levels to spike dramatically and doubling INR bleeding risk.",
        recommendation: "CRITICAL: Reduce Warfarin dose by 30% to 50% when initiating Amiodarone. Check INR twice weekly until stable."
      },
      {
        pair: ["Lisinopril", "Spironolactone"],
        severity: "Severe",
        severityColor: "rose",
        mechanism: "Combined ACE inhibitor and potassium-sparing diuretic can cause life-threatening hyperkalemia (high blood potassium).",
        recommendation: "Monitor serum potassium (K+) within 7 days of starting dual therapy. Target K+ < 5.0 mEq/L."
      }
    ],
    labMetrics: [
      {
        name: "Prothrombin Time (INR)",
        value: 3.4,
        unit: "Ratio",
        referenceRange: "2.0 - 3.0 (Therapeutic Target)",
        status: "high",
        statusText: "Above Target Range (Bleeding Risk)",
        description: "Blood is thinning more than target range due to Amiodarone interaction."
      },
      {
        name: "Serum Potassium (K+)",
        value: 5.4,
        unit: "mEq/L",
        referenceRange: "3.5 - 5.0 mEq/L",
        status: "high",
        statusText: "Elevated (Hyperkalemia)",
        description: "Potassium level is elevated due to combined Lisinopril + Spironolactone."
      }
    ],
    lifestyleAdvice: [
      "CRITICAL: Contact your prescribing cardiologist immediately to review Warfarin dosing alongside Amiodarone.",
      "Avoid potassium salt substitutes and limit high-potassium foods like avocados, bananas, and coconut water.",
      "Check for signs of bleeding: dark tarry stools, bleeding gums, or unprovoked large bruises."
    ],
    voiceNarration: "URGENT ALERT for David. Your prescription contains a high-risk drug interaction between Warfarin and Amiodarone. This can make your blood too thin and increase bleeding risk. Please contact your doctor immediately to check your INR blood test before taking your next dose."
  }
];
