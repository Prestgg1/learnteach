<template>
    <main class="container mx-auto px-4 py-8">
        <section class="bg-white shadow-md rounded-lg p-6 mb-8">
            <h2 class="text-2xl font-bold text-primary-600 mb-4">
                Şərtlər və Qaydalar
            </h2>
            <p class="leading-7 mb-4">
                “Öyrən və Öyrət” platformasına qoşulan hər bir istifadəçi qeyd
                olunan şərtləri qəbul etmiş sayılır. İstifadəçilər, platformada
                qeydiyyatdan keçməklə şəxsi məlumatlarının toplanmasına və emal
                olunmasına razılıq verir.
            </p>
            <p class="leading-7 mb-4">
                Platformada paylaşılan bütün məlumatlar və məzmunlar müəllif
                hüquqlarına uyğun şəkildə istifadə edilməlidir. İstifadəçilər
                yalnız özlərinə məxsus və doğruluğu təmin edilmiş məlumatları
                paylaşmalıdırlar.
            </p>
            <p class="leading-7 mb-4">
                Platformada təhqir, təhdid və qeyri-etik davranışlar qadağandır.
                İstifadəçilər şifrə və hesab məlumatlarının təhlükəsizliyinə
                görə özləri cavabdehdirlər.
            </p>
            <p class="leading-7 mb-4">
                “Öyrən və Öyrət” istifadəçilərin şəxsi məlumatlarını üçüncü
                tərəflərlə paylaşmama öhdəliyi daşıyır. Platformada tədris
                materiallarının istifadəsi yalnız şəxsi təhsil məqsədləri üçün
                nəzərdə tutulub.
            </p>
            <p class="leading-7">
                İstifadəçilərin yayımladığı materialların müəllif hüquqlarının
                qorunması onların öz məsuliyyətindədir. İstifadəçilər “Öyrən və
                Öyrət” platformasında yüklədikləri materialların qanunlara uyğun
                olduğunu təsdiq edir.
            </p>
        </section>
    </main>
</template>
<script setup>
definePageMeta({
    title: "Şərtlər",
});

const user = useCurrentUser();
</script>
