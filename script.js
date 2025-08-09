document.addEventListener('DOMContentLoaded', () => {
    const warningOverlay = document.getElementById('inAppWarning');
    const openBrowserBtn = document.getElementById('openBrowserBtn');
    const closeWarningBtn = document.getElementById('closeWarningBtn');
    const copyLink = document.getElementById('copyLink');

    // هذه الدالة الجديدة تحاول فتح الرابط باستخدام "Application Intents"
    function openInExternalBrowser(url) {
        const ua = navigator.userAgent || navigator.vendor || window.opera;
        const isAndroid = /Android/i.test(ua);
        const isiOS = /iPhone|iPad|iPod/i.test(ua);
        const currentUrl = url;

        if (isAndroid) {
            // محاولة استخدام intent لفتح الرابط في متصفح خارجي
            const intentUrl = `intent:${currentUrl}#Intent;scheme=https;package=com.android.chrome;end`;
            window.location.href = intentUrl;
        } else if (isiOS) {
            // على iOS، نستخدم حلولًا بديلة
            // الخيار 1: محاولة فتح نافذة جديدة
            window.open(currentUrl, '_blank');
            
            // الخيار 2: استخدام scheme URL بديل (قد لا يعمل على كل التطبيقات)
            //window.location.href = `x-web-search://?source=web&q=${encodeURIComponent(currentUrl)}`;
        } else {
            // للمتصفحات الأخرى، نفتح في نافذة جديدة
            window.open(currentUrl, '_blank');
        }
    }
    
    // إظهار مربع التحذير عند تحميل الصفحة
    warningOverlay.style.display = 'flex';

    // وظيفة لفتح الموقع في المتصفح الخارجي
    openBrowserBtn.addEventListener('click', () => {
        openInExternalBrowser(window.location.href);
        // إخفاء المربع بعد الضغط على الزر
        warningOverlay.style.display = 'none';
    });

    // وظيفة نسخ الرابط
    copyLink.addEventListener('click', () => {
        const url = window.location.href;
        navigator.clipboard.writeText(url).then(() => {
            alert('تم نسخ الرابط بنجاح! يمكنك الآن فتحه في متصفحك.');
            warningOverlay.style.display = 'none';
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