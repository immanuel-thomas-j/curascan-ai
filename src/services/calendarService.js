/**
 * Generates an iCalendar (.ics) string for medication schedule reminders
 */
export function generateMedicationCalendar(medications, patientName) {
  if (!medications || medications.length === 0) return null;

  let icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//CuraScan AI//Medication Reminder//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH'
  ];

  const now = new Date();
  const formatICSDate = (date) => {
    return date.toISOString().replace(/-|:|\.\d+/g, '');
  };

  medications.forEach((med, index) => {
    // Schedule morning (8 AM), lunch (1 PM), evening (6 PM), night (10 PM) based on timing
    let hours = 8;
    const lowerTiming = (med.timing || med.frequency || '').toLowerCase();
    if (lowerTiming.includes('night') || lowerTiming.includes('bedtime') || lowerTiming.includes('hs')) {
      hours = 22;
    } else if (lowerTiming.includes('lunch') || lowerTiming.includes('afternoon')) {
      hours = 13;
    } else if (lowerTiming.includes('evening')) {
      hours = 18;
    }

    const startDate = new Date(now);
    startDate.setHours(hours, 0, 0, 0);

    const endDate = new Date(startDate);
    endDate.setMinutes(15);

    icsContent.push(
      'BEGIN:VEVENT',
      `UID:curascan-${Date.now()}-${index}@curascan.ai`,
      `DTSTAMP:${formatICSDate(now)}`,
      `DTSTART:${formatICSDate(startDate)}`,
      `DTEND:${formatICSDate(endDate)}`,
      `RRULE:FREQ=DAILY;COUNT=30`,
      `SUMMARY:💊 Take ${med.name} (${med.dosage})`,
      `DESCRIPTION:Instructions: ${med.timing || med.frequency}. Purpose: ${med.purpose || 'Medication'}. Precautions: ${med.precautions || 'Take as prescribed.'}`,
      `LOCATION:Home / Prescription`,
      'STATUS:CONFIRMED',
      'BEGIN:VALARM',
      'TRIGGER:-PT15M',
      'ACTION:DISPLAY',
      `DESCRIPTION:Reminder: Time to take ${med.name} ${med.dosage}`,
      'END:VALARM',
      'END:VEVENT'
    );
  });

  icsContent.push('END:VCALENDAR');
  return icsContent.join('\r\n');
}

export function downloadCalendarFile(medications, patientName = "Patient") {
  const icsString = generateMedicationCalendar(medications, patientName);
  if (!icsString) return;

  const blob = new Blob([icsString], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `CuraScan_Pill_Reminders_${patientName.replace(/\s+/g, '_')}.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
