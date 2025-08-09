document.addEventListener('DOMContentLoaded', () => {
    const warningOverlay = document.getElementById('inAppWarning');
    const openBrowserBtn = document.getElementById('openBrowserBtn');
    const closeWarningBtn = document.getElementById('closeWarningBtn');

    // ✅ التحذير يظهر فورًا لأي حد
    warningOverlay.style.display = 'flex';

    // زر فتح الموقع في المتصفح الخارجي
    openBrowserBtn.addEventListener('click', () => {
        const url = window.location.href;

        if (/Android/i.test(navigator.userAgent)) {
            try {
                // محاولة فتح كروم مباشرة
                window.location.href = `googlechrome://${url.replace(/^https?:\/\//, '')}`;
                // لو فشلت المحاولة نفتح الرابط العادي
                setTimeout(() => {
                    window.location.href = url;
                }, 500);
            } catch (e) {
                window.location.href = url;
            }
        } else {
            // iOS أو باقي الأنظمة
            window.open(url, '_blank');
        }
    });

    // زر إغلاق التحذير
    closeWarningBtn.addEventListener('click', () => {
        warningOverlay.style.display = 'none';
    });

    // فتح الروابط الخارجية في نافذة جديدة فقط
    document.querySelectorAll('a[href^="http"]').forEach(link => {
        link.addEventListener('click', e => {
            if (!link.href.includes(window.location.hostname)) {
                e.preventDefault();
                window.open(link.href, '_blank');
            }
        });
    });
});
