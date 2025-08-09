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
    const copyLink = document.getElementById('copyLink');
    const copyLinkInstruction = document.querySelector('.copy-link-instruction');

    // إظهار مربع التحذير فقط إذا كان المستخدم في متصفح مدمج
    if (isInAppBrowser()) {
        warningOverlay.style.display = 'flex';
        // إظهار تعليمات نسخ الرابط على iOS
        if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
            copyLinkInstruction.style.display = 'block';
        }
    } else {
        warningOverlay.style.display = 'none';
    }

    // وظيفة فتح في المتصفح الخارجي
    openBrowserBtn.addEventListener('click', () => {
        const url = window.location.href;
        
        // محاولة إعادة التوجيه التلقائي على أندرويد
        if (/Android/i.test(navigator.userAgent)) {
            window.location.href = `intent://${url.replace(/^https?:\/\//, '')}#Intent;scheme=https;package=com.android.chrome;end`;
        } 
        // محاولة فتح في نافذة جديدة على iOS والأجهزة الأخرى
        else {
            window.open(url, '_blank');
        }
    });

    // وظيفة نسخ الرابط
    copyLink.addEventListener('click', () => {
        const url = window.location.href;
        navigator.clipboard.writeText(url).then(() => {
            alert('تم نسخ الرابط بنجاح! يمكنك الآن فتحه في متصفحك.');
        }).catch(err => {
            console.error('فشل في نسخ الرابط:', err);
            alert('فشل في النسخ. يرجى محاولة النسخ يدويًا.');
        });
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