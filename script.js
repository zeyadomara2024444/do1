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

    if (isInAppBrowser()) {
        const url = window.location.href;
        
        // محاولة إعادة التوجيه التلقائي
        if (/Android/i.test(navigator.userAgent)) {
            // إعادة التوجيه إلى Chrome على أندرويد
            window.location.href = `intent://${url.replace(/^https?:\/\//, '')}#Intent;scheme=https;package=com.android.chrome;end`;
        } else if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
            // على iOS لا يمكن الإجبار، لذا نظهر رسالة
            const warningOverlay = document.getElementById('inAppWarning');
            const openBrowserBtn = document.getElementById('openBrowserBtn');
            const warningMessage = document.getElementById('warningMessage');

            warningMessage.textContent = 'أنت حالياً داخل متصفح مدمج. اضغط على الزر لفتح الموقع في المتصفح العادي.';
            warningOverlay.style.display = 'flex';

            openBrowserBtn.addEventListener('click', () => {
                window.open(url, '_blank');
            });
        }
    } else {
        // إذا لم يكن المتصفح مدمجًا، يمكننا إخفاء مربع التحذير
        const warningOverlay = document.getElementById('inAppWarning');
        warningOverlay.style.display = 'none';
    }

    // جميع الروابط تفتح في نافذة جديدة
    document.querySelectorAll('a[href]').forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            window.open(link.href, '_blank');
        });
    });
});