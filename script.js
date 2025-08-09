document.addEventListener('DOMContentLoaded', () => {
    // تحديد العناصر
    const warningOverlay = document.getElementById('inAppWarning');
    const openBrowserBtn = document.getElementById('openBrowserBtn');
    const closeWarningBtn = document.getElementById('closeWarningBtn');
    const url = window.location.href;

    // إضافة وظيفة لزر "فتح في المتصفح"
    openBrowserBtn.addEventListener('click', () => {
        // على أجهزة أندرويد، نحاول استخدام intent://
        if (/Android/i.test(navigator.userAgent)) {
            window.location.href = `intent://${url.replace(/^https?:\/\//, '')}#Intent;scheme=https;package=com.android.chrome;end`;
        } 
        // على أجهزة iOS والأجهزة الأخرى، نفتح في علامة تبويب جديدة
        else {
            window.open(url, '_blank');
        }
    });

    // إضافة وظيفة لزر "إغلاق" لإخفاء مربع التحذير
    closeWarningBtn.addEventListener('click', () => {
        warningOverlay.style.display = 'none';
    });

    // فتح جميع الروابط في نافذة جديدة
    document.querySelectorAll('a[href]').forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            window.open(link.href, '_blank');
        });
    });
});