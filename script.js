document.addEventListener('DOMContentLoaded', () => {
    const warningOverlay = document.getElementById('inAppWarning');
    const openBrowserBtn = document.getElementById('openBrowserBtn');
    const closeWarningBtn = document.getElementById('closeWarningBtn');

    // زر الفتح في المتصفح
    openBrowserBtn.addEventListener('click', () => {
        const url = window.location.href;

        if (/Android/i.test(navigator.userAgent)) {
            // محاولة 1: Chrome مباشرة
            window.location.href = `googlechrome://${url.replace(/^https?:\/\//, '')}`;

            // محاولة 2: Intent بعد 0.4 ثانية
            setTimeout(() => {
                window.location.href = `intent:${url.replace(/^https?:\/\//, '')}#Intent;scheme=https;end`;
            }, 400);

            // محاولة 3: الرابط العادي بعد 0.8 ثانية
            setTimeout(() => {
                window.location.href = url;
            }, 800);
        } else {
            // iOS والأجهزة الأخرى
            window.open(url, '_blank');
        }
    });

    // زر الإغلاق
    closeWarningBtn.addEventListener('click', () => {
        warningOverlay.style.display = 'none';
    });
});

