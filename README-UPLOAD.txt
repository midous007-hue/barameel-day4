BARAMEEL RUN — FIXED BUILD v17 (SCREENS 01–06 ONLY)

النسخة دي مبنية لتجربة التدفق الحالي فقط:
01 Nickname → 02 Choose Runner → 03 Runner Confirmed → 04 Run → 05 QR Scan → 06 Puzzle.

مهم:
- لا توجد أي شاشات 07–10 في هذا البناء.
- صور الشخصيات للشاشات 02/03/04 تستخدم الأسماء الدقيقة:
  screen02-[runner].png
  screen03-[runner].png
  screen04-[runner].png
  والـ runner هم:
  brona, chiller, dreamer, racer, rookie, skater
- لو الصور موجودة بالفعل في GitHub assets اتركها كما هي. النسخة لا تعيد إنشاءها ولا ترسم طبقات فوقها.
- screen01-start.png = شاشة البداية الحالية ذات خانة nickname الفارغة.
- screen05-scanner.png = شاشة الـ QR الحالية.
- screen06-puzzle.png = النسخة التي فيها خانات الإدخال الخضراء التي طلبت الالتزام بها.

إصلاحات التنفيذ:
1) Nickname:
   - الكتابة داخل الخانة المطبوعة نفسها.
   - placeholder TYPE YOUR NICKNAME يختفي تلقائياً بمجرد أول حرف.
   - الاسم يستخدم نفس وزن/ميل الخط تقريباً ولا توجد خانة HTML مرئية إضافية.
   - الاسم محفوظ في localStorage.

2) Screen 02:
   - مناطق الضغط أصبحت فوق بطاقات الشخصيات نفسها، وليست أعلى منها.
   - الضغط على أي بطاقة يغير artwork الكامل للشخصية فوراً.
   - Choose button مضبوط فوق الزر المطبوع نفسه.
   - انتقال 02 → 03 يعمل دائماً.

3) Screen 05 → 06:
   - QR فقط.
   - الكاميرا داخل مساحة QR المطبوعة فقط.
   - بعد اكتشاف QR يتم احتساب القطعة +100 points.
   - reward-levelup.mp3 يبدأ عند الاكتشاف.
   - يتم حفظ توقيت بدء الـ reward، والشاشة 06 تكمل نفس الـ audio من موضع زمني قريب من موضع الانتقال بدلاً من بدء صوت جديد من الصفر.
   - شاشة 06 تدخل بتأثير glow/flash خفيف.

4) Screen 06:
   - يستخدم screen06-puzzle.png الذي يحتوي الخانات الخضراء.
   - Collection No / Collection Name / Piece + Points تدخل داخل الخانات الخضراء فقط.
   - شبكة الـ 9 قطع في أماكنها.
   - القطع المجموعة تظهر فقط في مكانها.
   - progress يظهر حسب عدد القطع المجموعة.
   - لا توجد أزرار مرئية HTML فوق artwork؛ الضغط فقط hotspots شفافة فوق الأزرار المطبوعة.

5) Cache:
   - service worker version v17.
   - بعد الرفع افتح GitHub Pages مرة، ثم اقفل التبويب القديم وافتحه من جديد.

TEST QR:
- موجود: assets/test-qr-piece-04.png
- الـ payload هو رابط screen05 مع collection01 و piece04.
- عند المسح: +100 points + piece 04.

لو كانت ملفات 18 صورة للشخصيات موجودة عندك بالفعل داخل assets، لا تستبدلها. هذا البناء متوافق مع نفس الأسماء.
