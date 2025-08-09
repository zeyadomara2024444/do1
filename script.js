document.addEventListener('DOMContentLoaded', () => {
    function isInAppBrowser() {
        const ua = navigator.userAgent || navigator.vendor || window.opera;
        return (
            /Tiktok/i.test(ua) ||
            /FBAV|FBIOS/i.test(ua) ||
            /Instagram/i.test(ua) ||
            /WebView/i.test(ua)
        );
    }
    
    const warningOverlay = document.getElementById('inAppWarning');
    const openBrowserBtn = document.getElementById('openBrowserBtn');
    const closeWarningBtn = document.getElementById('closeWarningBtn');

    // إظهار مربع التحذير فقط إذا كان المستخدم في متصفح مدمج
    if (isInAppBrowser()) {
        warningOverlay.style.display = 'flex';
    } else {
        warningOverlay.style.display = 'none';
    }

    // وظيفة لفتح الموقع في المتصفح الخارجي
    openBrowserBtn.addEventListener('click', () => {
        const url = window.location.href;
        
        // استخدام الطريقة الجديدة التي تحاول فتح نافذة جديدة وإغلاق النافذة الحالية
        try {
            // محاولة فتح نافذة جديدة
            const newWindow = window.open(url, '_blank');
            if (newWindow) {
                // محاولة إغلاق النافذة الحالية
                window.close();
            }
        } catch (e) {
            console.error("فشل في فتح نافذة جديدة: ", e);
            // في حالة الفشل، نعود للطرق التقليدية
            if (/Android/i.test(navigator.userAgent)) {
                window.location.href = `intent://${url.replace(/^https?:\/\//, '')}#Intent;scheme=https;package=com.android.chrome;end`;
            } else {
                window.location.href = url;
            }
        }
    });

    // وظيفة إغلاق مربع التحذير
    closeWarningBtn.addEventListener('click', () => {
        warningOverlay.style.display = 'none';
    });

    // جميع الروابط تفتح في نافذة جديدة
    document.querySelectorAll('a[href]').forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            window.open(link.href, '_blank');
        });
    });
});