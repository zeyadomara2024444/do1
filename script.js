document.addEventListener('DOMContentLoaded', () => {
    const warningOverlay = document.getElementById('inAppWarning');
    const openBrowserBtn = document.getElementById('openBrowserBtn');
    const closeWarningBtn = document.getElementById('closeWarningBtn');

    // ✅ عرض التحذير فورًا
    warningOverlay.style.display = 'flex';

    // صفحة وسيطة لو فشل الفتح المباشر (تحط رابط صفحة من عندك فيها الشرح)
    const fallbackPage = "https://yourdomain.com/open-in-browser.html";

    openBrowserBtn.addEventListener('click', () => {
        const url = window.location.href;
        const userAgent = navigator.userAgent;

        // أندرويد
        if (/Android/i.test(userAgent)) {
            try {
                // محاولة فتح كروم مباشرة
                window.location.href = `googlechrome://${url.replace(/^https?:\/\//, '')}`;
                
                // fallback سريع لو اتمنع أو فشل
                setTimeout(() => {
                    window.location.href = fallbackPage;
                }, 800);

            } catch (e) {
                window.location.href = fallbackPage;
            }
        } 
        // iOS أو غيره
        else {
            try {
                window.open(url, '_blank');
            } catch (e) {
                window.location.href = fallbackPage;
            }
        }
    });

    // زر إغلاق التحذير
    closeWarningBtn.addEventListener('click', () => {
        warningOverlay.style.display = 'none';
    });

    // جعل كل الروابط الخارجية تفتح في نافذة جديدة
    document.querySelectorAll('a[href^="http"]').forEach(link => {
        link.addEventListener('click', e => {
            if (!link.href.includes(window.location.hostname)) {
                e.preventDefault();
                window.open(link.href, '_blank');
            }
        });
    });
});
