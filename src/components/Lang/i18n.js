import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const resources = {
    en: {
        translation: {
            welcome: 'Welcome to Clicon online store',
            search_placeholder: 'Search for anything...',
            followUse: 'Follow us:',
            trackOrder: 'Track Order',
            compare: 'Compare',
            suppert: 'Customer Support',
            needHelp: 'Need Help',
            ShopBtn: 'Shop now',
            xbox: {
                title: 'Xbox Consoles',
                subtitle: '-THE BEST PLACE TO PLAY',
                desc: 'Save up to 50% on select Xbox games. Get 3 months of PC Game Pass for $2 USD.',
            },
            ps: {
                title: 'PlayStation 5',
                subtitle: 'NEXT GEN GAMING',
                desc: 'Experience lightning-fast loading with ultra-high speed SSD.',
            },
            pixel: {
                firstP: 'SUMMER SALES',
                firsth3: 'New Google Pixel 6 Pro',
            },
            buds: {
                firsth3: 'Xiaomi FlipBuds Pro',
            },
            xboxBlue: {
                title: 'Xbox Wireless Controller',
                subtitle: 'ACCESSORIES',
                desc: 'Experience lightning-fast loading with ultra-high speed SSD and blue model',
            },
        },
    },

    uz: {
        translation: {
            welcome: 'Clicon onlayn do‘koniga xush kelibsiz',
            search_placeholder: 'Nimani qidirmoqchisiz...?',
            followUse: 'Bizni kuzating:',
            ShopBtn: 'Sotib olish',
            xbox: {
                title: 'Xbox konsollari',
                subtitle: '-O‘YIN UCHUN ENG YAXSHI JOY',
                desc: 'Tanlangan Xbox o‘yinlarida 50% gacha chegirma. PC Game Pass — 3 oyga atigi $2.',
            },
            ps: {
                title: 'PlayStation 5',
                subtitle: '-YANGI AVLOD O‘YINLARI',
                desc: 'Ultra-tezkor SSD bilan yangi darajadagi tezlik.',
            },
            // 🔹 BU YERDA QOLGANLARINI HAM QO'SHISH KERAK:
            xboxBlue: {
                title: 'Xbox simsiz kontrolleri',
                subtitle: 'AKSESUARLAR',
                desc: 'Moviy modeldagi ultra-tezkor boshqaruvni his qiling.',
            },
            pixel: {
                firstP: 'YOZGI SAVDO',
                firsth3: 'Yangi Google Pixel 6 Pro',
            },
            buds: {
                firsth3: 'Xiaomi FlipBuds Pro quloqchinlari',
            },
        },
    },

    ru: {
        translation: {
            welcome: 'Добро пожаловать в онлайн-магазин Clicon',
            search_placeholder: 'Искать что угодно...',
            followUse: 'Подписывайтесь на нас:',
            ShopBtn: 'Купить сейчас',
            xbox: {
                title: 'Консоли Xbox',
                subtitle: '-ЛУЧШЕЕ МЕСТО ДЛЯ ИГР',
                desc: 'Скидки до 50% на игры Xbox. PC Game Pass на 3 месяца всего за $2.',
            },
            ps: {
                title: 'PlayStation 5',
                subtitle: '-ИГРЫ НОВОГО ПОКОЛЕНИЯ',
                desc: 'Молниеносная загрузка благодаря сверхбыстрому SSD.',
            },
            // 🔹 RU UCHUN HAM QO'SHAMIZ:
            xboxBlue: {
                title: 'Беспроводной контроллер Xbox',
                subtitle: 'АКСЕССУАРЫ',
                desc: 'Почувствуйте сверхбыстрое управление в синей модели.',
            },
            pixel: {
                firstP: 'ЛЕТНЯЯ РАСПРОДАЖА',
                firsth3: 'Новый Google Pixel 6 Pro',
            },
            buds: {
                firsth3: 'Наушники Xiaomi FlipBuds Pro',
            },
        },
    },
}

i18n.use(initReactI18next).init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
})

export default i18n