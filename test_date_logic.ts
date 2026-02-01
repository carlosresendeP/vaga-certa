function checkDays() {
  const startStr = "2026-02-01T12:16:30.774Z";
  const nowStr = "2026-02-01T12:20:00.000Z"; // 4 minutes later

  const startDate = new Date(startStr);
  const now = new Date(nowStr);

  const diffTime = Math.abs(now.getTime() - startDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  console.log(`Start: ${startDate.toISOString()}`);
  console.log(`Now:   ${now.toISOString()}`);
  console.log(`Diff (ms): ${diffTime}`);
  console.log(`Diff (days): ${diffDays}`);
  console.log(`Is within 7 days: ${diffDays <= 7}`);
}

checkDays();
