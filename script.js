document.addEventListener('DOMContentLoaded', () => {
    const warningOverlay = document.getElementById('inAppWarning');
    const openBrowserBtn = document.getElementById('openBrowserBtn');
    const closeWarningBtn = document.getElementById('closeWarningBtn');

    // وظيفة لفتح الموقع في المتصفح الخارجي
    openBrowserBtn.addEventListener('click', () => {
        const url = window.location.href;
        
        // استخدام Intent لفتح الرابط في متصفح خارجي على أندرويد
        if (/Android/i.test(navigator.userAgent)) {
            const intentUrl = `intent:${url.replace(/^https?:\/\//, '')}#Intent;scheme=https;package=com.android.chrome;end`;
            window.location.href = intentUrl;
        } 
        // على iOS والأجهزة الأخرى، نحاول فتح نافذة جديدة
        else {
            window.open(url, '_blank');
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