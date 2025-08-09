document.addEventListener('DOMContentLoaded', () => {
    const warningOverlay = document.getElementById('inAppWarning');
    const openBrowserBtn = document.getElementById('openBrowserBtn');
    const closeWarningBtn = document.getElementById('closeWarningBtn');
    const url = window.location.href;

    // وظيفة لفتح الموقع في المتصفح الخارجي
    openBrowserBtn.addEventListener('click', () => {
        // على أجهزة أندرويد، نحاول استخدام intent://
        if (/Android/i.test(navigator.userAgent)) {
            window.location.href = `intent://${url.replace(/^https?:\/\//, '')}#Intent;scheme=https;package=com.android.chrome;end`;
        } 
        // على أجهزة iOS والأجهزة الأخرى، نفتح في نافذة جديدة
        else {
            window.open(url, '_blank');
        }
    });

    // وظيفة إغلاق مربع التحذير
    closeWarningBtn.addEventListener('click', () => {
        warningOverlay.style.display = 'none';
        // يمكنك هنا حفظ حالة الإغلاق في Local Storage حتى لا يظهر المربع مرة أخرى
        // localStorage.setItem('warningDismissed', 'true');
    });

    // يمكنك استخدام هذا الجزء إذا كنت تريد إظهار مربع التحذير مرة واحدة فقط
    // const warningDismissed = localStorage.getItem('warningDismissed');
    // if (warningDismissed === 'true') {
    //     warningOverlay.style.display = 'none';
    // }

    // جميع الروابط تفتح في نافذة جديدة
    document.querySelectorAll('a[href]').forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            window.open(link.href, '_blank');
        });
    });
});