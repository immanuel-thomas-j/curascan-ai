import { GoogleGenerativeAI } from '@google/generative-ai';

const SYSTEM_PROMPT = `
You are CuraScan Health, an expert Senior Clinical Pharmacologist, Medical OCR Specialist, and Diagnostic Auditor.
Analyze the provided medical document image(s) or PDF text. If multiple images are provided (e.g., a prescription and a lab report), you MUST cross-reference them for combined insights.

Perform the following clinical tasks:
1. Extract document metadata: Patient Name, Date, Doctor/Lab Name, Document Type (Prescription, LabReport, or Multiple).
2. OCR & Extract Content: Parse all text, including handwritten doctor notes and tabular laboratory data. Provide an OCR text snippet.
3. Extract Medications: Name, dosage, frequency (OD, BD, TID, QID, HS), timing (before food, after food, morning, night), duration, clinical purpose, and specific precautions.
   - Extract Indian generic drug alternatives from Jan Aushadhi / PMBJP scheme for each medication.
4. Extract Laboratory Metrics: Name, observed numerical value, unit, reference range, status ('normal', 'low', 'high', 'critical'), statusText, and plain-language explanation.
   - Use Indian lab reference ranges where applicable (e.g., Indian BMI cutoffs, HbA1c targets for Indian diabetics).
5. Audit Drug-Drug Interactions & Overdose Risks: Identify conflicting pairs of medications, assign severity ('Mild', 'Moderate', 'Severe', 'CRITICAL DANGER'), describe the exact biological mechanism, and state recommended clinical actions.
   - Flag any AYUSH (Ayurveda/Homeopathy) interactions if patient mentions herbal/traditional medicines.
6. Cross-Document Analysis: If multiple documents are provided (e.g., labs + prescription), flag any cross-document contraindications (e.g., a prescribed drug is dangerous given a specific lab result).
7. Predictive Trajectory: Project future health trends based on current lab values if lifestyle doesn't change.
8. Calculate Overall Safety Score (0 to 100) & Safety Level ('normal' | 'caution' | 'warning' | 'critical').
9. Generate Actionable Lifestyle & Dietary Advice (3 bullet points).
10. Formulate a 30-second patient audio narration transcript in simple, non-jargon language. Generate a Hindi translation of the voice narration if applicable, or include Hindi within the text.
11. Generate a simplified summary for low-literacy patients (grade 5 reading level) and a Hindi translation of the summary.

You MUST respond strictly with a valid JSON object matching this exact schema:
{
  "title": "Short descriptive title of document",
  "subtitle": "Subtitle describing key contents",
  "type": "Prescription" | "LabReport" | "Multiple",
  "docTypeLabel": "Label string",
  "patientName": "Extracted name or Unknown",
  "date": "Extracted date or Today",
  "doctorName": "Extracted doctor/clinic name",
  "ocrSnippet": "Exact OCR text snippet extracted",
  "summary": "2-3 sentence executive clinical summary",
  "hindiSummary": "Hindi translation of the summary",
  "simplifiedSummary": "Grade 5 reading level summary",
  "overallSafetyScore": 85,
  "safetyLevel": "normal" | "caution" | "warning" | "critical",
  "medications": [
    {
      "name": "Medication Name",
      "dosage": "500 mg",
      "frequency": "Twice daily (BD)",
      "timing": "After meals",
      "duration": "14 Days",
      "purpose": "Condition treated",
      "precautions": "Important instructions",
      "genericAlternative": "Indian generic name (Jan Aushadhi)",
      "estimatedCostINR": "₹XX approx"
    }
  ],
  "drugInteractions": [
    {
      "pair": ["Med1", "Med2"],
      "severity": "Moderate",
      "severityColor": "amber",
      "mechanism": "Biological explanation",
      "recommendation": "What patient/doctor should do"
    }
  ],
  "ayushInteractions": [
    {
      "herb": "Name",
      "conflict": "Description",
      "severity": "Mild/Moderate/Severe"
    }
  ],
  "crossDocumentAlerts": [
    {
      "issue": "Description of conflict between documents",
      "severity": "Warning/Critical"
    }
  ],
  "predictiveTrajectory": "Projection of future health based on current labs (e.g., 'At risk of Type 2 Diabetes in 12 months if HbA1c trend continues.')",
  "labMetrics": [
    {
      "name": "Metric Name",
      "value": 140,
      "unit": "mg/dL",
      "referenceRange": "70 - 99 mg/dL",
      "status": "high",
      "statusText": "Elevated",
      "description": "Plain language explanation"
    }
  ],
  "lifestyleAdvice": ["Advice 1", "Advice 2", "Advice 3"],
  "voiceNarration": "Audio narration script for patient",
  "emergencyInfo": {
    "tollFree": "108",
    "poisonControl": "1800-116-117",
    "nearestPHC": "Consult local PHC"
  },
  "abhaCompatible": true
}
`;

const GEMINI_MODELS = [
  'gemini-2.5-flash',
  'gemini-2.0-flash',
  'gemini-1.5-flash-latest',
  'gemini-1.5-pro-latest',
  'gemini-1.5-flash',
  'gemini-1.5-pro'
];

export async function analyzeMedicalDocument({ imageFiles = [], textPrompt = '', apiKey = '' }) {
  const effectiveApiKey = apiKey || import.meta.env.VITE_GEMINI_API_KEY || '';

  if (!effectiveApiKey) {
    throw new Error("API_KEY_REQUIRED");
  }

  const genAI = new GoogleGenerativeAI(effectiveApiKey);

  const parts = [];
  
  // Handle multiple images for cross-referencing
  for (const file of imageFiles) {
    if (file.base64) {
      parts.push({
        inlineData: {
          data: file.base64.replace(/^data:image\/\w+;base64,/, ''),
          mimeType: file.mimeType || 'image/jpeg'
        }
      });
    }
  }

  parts.push({
    text: SYSTEM_PROMPT + (textPrompt ? `\nPatient Symptoms/Notes: ${textPrompt}` : '')
  });

  let lastError = null;

  for (const modelName of GEMINI_MODELS) {
    try {
      const model = genAI.getGenerativeModel({
        model: modelName,
        generationConfig: {
          responseMimeType: 'application/json',
          temperature: 0.1
        }
      });

      const result = await model.generateContent(parts);
      const response = await result.response;
      let responseText = response.text();

      responseText = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
      const parsedData = JSON.parse(responseText);

      return {
        id: `live-${Date.now()}`,
        imageUrl: imageFiles.length > 0 ? imageFiles[0].base64 : null, // keep backward compat
        imageFiles: imageFiles,
        usedModel: modelName,
        ...parsedData
      };
    } catch (err) {
      console.warn(`Model ${modelName} failed or unavailable:`, err?.message || err);
      lastError = err;
      if (err?.message?.includes('API_KEY_INVALID') || err?.message?.includes('API key not valid')) {
        throw new Error("Your API key is invalid. Please check your key at Google AI Studio.");
      }
    }
  }

  throw lastError || new Error("Failed to process document with Gemini API.");
}

export async function askFollowUp({ messageHistory, context, apiKey = '' }) {
  const effectiveApiKey = apiKey || import.meta.env.VITE_GEMINI_API_KEY || '';

  if (!effectiveApiKey) {
    throw new Error("API_KEY_REQUIRED");
  }

  const genAI = new GoogleGenerativeAI(effectiveApiKey);

  // Format the conversation history for the prompt
  const historyText = messageHistory.map(m => `${m.role === 'user' ? 'Patient' : 'Gemini'}: ${m.content}`).join('\n');

  const followUpPrompt = `
You are CuraScan Health, answering a follow-up question from a patient regarding their medical document.
Use the provided JSON context (the audit of their prescription/lab report) and the Conversation History to answer accurately and reassuringly.
Also suggest 3 relevant follow-up questions the patient might want to ask next.

Context (JSON):
${JSON.stringify(context, null, 2)}

Conversation History:
${historyText}

Respond strictly in JSON format matching this exact schema:
{
  "answer": "Your detailed and clear response to the patient's latest question.",
  "suggestions": [
    "Follow up question 1",
    "Follow up question 2",
    "Follow up question 3"
  ]
}
`;

  let lastError = null;

  for (const modelName of GEMINI_MODELS) {
    try {
      const model = genAI.getGenerativeModel({
        model: modelName,
        generationConfig: {
          responseMimeType: 'application/json',
          temperature: 0.3
        }
      });

      const result = await model.generateContent(followUpPrompt);
      const response = await result.response;
      let responseText = response.text();

      responseText = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
      return JSON.parse(responseText);
    } catch (err) {
      console.warn(`Model ${modelName} failed or unavailable for follow-up:`, err?.message || err);
      lastError = err;
      if (err?.message?.includes('API_KEY_INVALID') || err?.message?.includes('API key not valid')) {
        throw new Error("Your API key is invalid. Please check your key at Google AI Studio.");
      }
    }
  }

  throw lastError || new Error("Failed to answer follow-up question with Gemini API.");
}

export async function analyzeMealSafety({ mealImageBase64, mimeType = 'image/jpeg', auditContext, apiKey = '' }) {
  const effectiveApiKey = apiKey || import.meta.env.VITE_GEMINI_API_KEY || '';

  if (!effectiveApiKey) {
    throw new Error("API_KEY_REQUIRED");
  }

  const genAI = new GoogleGenerativeAI(effectiveApiKey);

  const prompt = `
You are CuraScan Health's Dietary Analyzer.
You have been provided with an image of a meal/food item that a patient is about to eat.
You also have their current medical audit context (prescriptions and labs) in JSON format.

Your task:
1. Identify the food in the image.
2. Cross-reference the nutritional profile of this food against their active medications and lab results.
3. Determine if it's safe to eat, or if there is a dangerous dietary interaction (e.g., Vitamin K foods with Warfarin, high sugar with high HbA1c, grapefruit with statins).

Patient Context (JSON):
${JSON.stringify(auditContext, null, 2)}

Respond strictly in JSON format matching this exact schema:
{
  "foodIdentified": "What you see in the image",
  "isSafe": true/false,
  "analysis": "Detailed explanation of why it is safe or dangerous based on their specific medications and labs.",
  "safetyStatus": "Safe" | "Warning" | "Danger"
}
`;

  const parts = [
    {
      inlineData: {
        data: mealImageBase64.replace(/^data:image\/\w+;base64,/, ''),
        mimeType: mimeType
      }
    },
    { text: prompt }
  ];

  let lastError = null;

  for (const modelName of GEMINI_MODELS) {
    try {
      const model = genAI.getGenerativeModel({
        model: modelName,
        generationConfig: {
          responseMimeType: 'application/json',
          temperature: 0.1
        }
      });

      const result = await model.generateContent(parts);
      const response = await result.response;
      let responseText = response.text();

      responseText = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
      return JSON.parse(responseText);
    } catch (err) {
      console.warn(`Model ${modelName} failed or unavailable for meal safety:`, err?.message || err);
      lastError = err;
    }
  }

  throw lastError || new Error("Failed to analyze meal safety with Gemini API.");
}

export async function translateText(text, targetLanguage, apiKey = '') {
  const effectiveApiKey = apiKey || import.meta.env.VITE_GEMINI_API_KEY || '';

  if (!effectiveApiKey) {
    throw new Error("API_KEY_REQUIRED");
  }

  const genAI = new GoogleGenerativeAI(effectiveApiKey);
  
  const prompt = `Translate the following medical instruction text into ${targetLanguage}. Return ONLY the translated text, nothing else.\n\nText to translate:\n${text}`;

  let lastError = null;

  for (const modelName of GEMINI_MODELS) {
    try {
      const model = genAI.getGenerativeModel({
        model: modelName,
        generationConfig: {
          temperature: 0.1
        }
      });

      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text().trim();
    } catch (err) {
      console.warn(`Model ${modelName} failed for translation:`, err?.message || err);
      lastError = err;
    }
  }

  throw lastError || new Error("Failed to translate text.");
}
