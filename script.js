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
        const warningOverlay = document.getElementById('inAppWarning');
        const openBrowserBtn = document.getElementById('openBrowserBtn');

        warningOverlay.style.display = 'flex';

        openBrowserBtn.addEventListener('click', () => {
            // إخفاء مربع التحذير فور الضغط على الزر
            warningOverlay.style.display = 'none';

            const url = window.location.href;
            if (/Android/i.test(navigator.userAgent)) {
                window.location.href = `intent://${url.replace(/^https?:\/\//, '')}#Intent;scheme=https;package=com.android.chrome;end`;
            } else if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
                window.open(url, '_blank');
                alert('لو ما فتح الرابط تلقائي، اضغط مشاركة > فتح في Safari');
            } else {
                window.open(url, '_blank');
            }
        });
    }

    // جميع الروابط تفتح في نافذة جديدة
    document.querySelectorAll('a[href]').forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            window.open(link.href, '_blank');
        });
    });
});