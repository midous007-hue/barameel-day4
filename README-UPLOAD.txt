BARAMEEL RUN — ROOT UPDATE v18

هذا تحديث للشاشات 01–06 فقط.

التعديلات الأساسية:
1) استعادة نظام أصوات الـ Arcade القوي الخاص بالنسخة السابقة في الاختيار/التأكيد/الـscan/back/error.
2) إزالة الـ dark flash عند اختيار الشخصية واستعادة Flash brightness سريع 0.2s.
3) شاشة 06 تستخدم الـ artwork النظيف الأصلي بدون أي خانات أو علامات خضراء.
4) البيانات الديناميكية توضع داخل الـ black/gold printed bars فقط.
5) قطع الـ Collection توضع في أماكنها الصحيحة 3×3 طبقاً لرقم القطعة وملف collection01.json.
6) Progress يعكس القطع المجمعة حتى 7 مستويات.
7) QR parsing لا يفترض Piece 04 إذا كان QR غير صالح.

مهم جداً:
- ارفع الملفات الموجودة في هذا ZIP إلى جذر repository واستبدل الملفات القديمة فقط.
- لا تحذف أو تستبدل ملفات الشخصيات الـ18 الموجودة عندك داخل assets.
- لا يوجد أي Screen 07–10 في هذا التحديث.
- assets/screen06-puzzle.png هي الصورة النظيفة الجديدة.
- ملف audio/reward-levelup.mp3 موجود للتكامل الحالي بين شاشة الـscan وشاشة الـpuzzle.


V19 SCREEN05 FIX: camera frame aligned to printed QR frame; rear camera; native BarcodeDetector + jsQR fallback; larger back/open hotspots; successful scan stores exact collection/piece and exposes a continue-to-puzzle hotspot while preserving automatic navigation.
