;(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined'
        && typeof require === 'function' ? factory(require('../moment')) :
    typeof define === 'function' && define.amd ? define(['../moment'], factory) :
    factory(global.moment)
 }(this, (function (moment) { 'use strict';

 //! moment.js locale configuration

 var monthsShortDot$3 = 'ene._feb._mar._abr._may._jun._jul._ago._sep._oct._nov._dic.'.split(
    '_'
),
monthsShort$4 = 'ene_feb_mar_abr_may_jun_jul_ago_sep_oct_nov_dic'.split('_'),
monthsParse$5 = [
    /^ene/i,
    /^feb/i,
    /^mar/i,
    /^abr/i,
    /^may/i,
    /^jun/i,
    /^jul/i,
    /^ago/i,
    /^sep/i,
    /^oct/i,
    /^nov/i,
    /^dic/i,
],
monthsRegex$5 = /^(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre|ene\.?|feb\.?|mar\.?|abr\.?|may\.?|jun\.?|jul\.?|ago\.?|sep\.?|oct\.?|nov\.?|dic\.?)/i;

moment.defineLocale('es', {
months: 'enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre'.split(
    '_'
),
monthsShort: function (m, format) {
    if (!m) {
        return monthsShortDot$3;
    } else if (/-MMM-/.test(format)) {
        return monthsShort$4[m.month()];
    } else {
        return monthsShortDot$3[m.month()];
    }
},
monthsRegex: monthsRegex$5,
monthsShortRegex: monthsRegex$5,
monthsStrictRegex: /^(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre)/i,
monthsShortStrictRegex: /^(ene\.?|feb\.?|mar\.?|abr\.?|may\.?|jun\.?|jul\.?|ago\.?|sep\.?|oct\.?|nov\.?|dic\.?)/i,
monthsParse: monthsParse$5,
longMonthsParse: monthsParse$5,
shortMonthsParse: monthsParse$5,
weekdays: 'domingo_lunes_martes_miércoles_jueves_viernes_sábado'.split('_'),
weekdaysShort: 'dom._lun._mar._mié._jue._vie._sáb.'.split('_'),
weekdaysMin: 'do_lu_ma_mi_ju_vi_sá'.split('_'),
weekdaysParseExact: true,
longDateFormat: {
    LT: 'H:mm',
    LTS: 'H:mm:ss',
    L: 'DD/MM/YYYY',
    LL: 'D [de] MMMM [de] YYYY',
    LLL: 'D [de] MMMM [de] YYYY H:mm',
    LLLL: 'dddd, D [de] MMMM [de] YYYY H:mm',
},
calendar: {
    sameDay: function () {
        return '[hoy a la' + (this.hours() !== 1 ? 's' : '') + '] LT';
    },
    nextDay: function () {
        return '[mañana a la' + (this.hours() !== 1 ? 's' : '') + '] LT';
    },
    nextWeek: function () {
        return 'dddd [a la' + (this.hours() !== 1 ? 's' : '') + '] LT';
    },
    lastDay: function () {
        return '[ayer a la' + (this.hours() !== 1 ? 's' : '') + '] LT';
    },
    lastWeek: function () {
        return (
            '[el] dddd [pasado a la' +
            (this.hours() !== 1 ? 's' : '') +
            '] LT'
        );
    },
    sameElse: 'L',
},
relativeTime: {
    future: 'en %s',
    past: 'hace %s',
    s: 'unos segundos',
    ss: '%d segundos',
    m: 'un minuto',
    mm: '%d minutos',
    h: 'una hora',
    hh: '%d horas',
    d: 'un día',
    dd: '%d días',
    w: 'una semana',
    ww: '%d semanas',
    M: 'un mes',
    MM: '%d meses',
    y: 'un año',
    yy: '%d años',
},
dayOfMonthOrdinalParse: /\d{1,2}º/,
ordinal: '%dº',
week: {
    dow: 1, // Monday is the first day of the week.
    doy: 4, // The week that contains Jan 4th is the first week of the year.
},
invalidDate: 'Fecha inválida',
});

 //! moment.js locale configuration

 var monthsStrictRegex$1 = /^(janvier|février|mars|avril|mai|juin|juillet|août|septembre|octobre|novembre|décembre)/i,
 monthsShortStrictRegex$1 = /(janv\.?|févr\.?|mars|avr\.?|mai|juin|juil\.?|août|sept\.?|oct\.?|nov\.?|déc\.?)/i,
 monthsRegex$6 = /(janv\.?|févr\.?|mars|avr\.?|mai|juin|juil\.?|août|sept\.?|oct\.?|nov\.?|déc\.?|janvier|février|mars|avril|mai|juin|juillet|août|septembre|octobre|novembre|décembre)/i,
 monthsParse$6 = [
     /^janv/i,
     /^févr/i,
     /^mars/i,
     /^avr/i,
     /^mai/i,
     /^juin/i,
     /^juil/i,
     /^août/i,
     /^sept/i,
     /^oct/i,
     /^nov/i,
     /^déc/i,
 ];

moment.defineLocale('fr', {
 months: 'janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre'.split(
     '_'
 ),
 monthsShort: 'janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.'.split(
     '_'
 ),
 monthsRegex: monthsRegex$6,
 monthsShortRegex: monthsRegex$6,
 monthsStrictRegex: monthsStrictRegex$1,
 monthsShortStrictRegex: monthsShortStrictRegex$1,
 monthsParse: monthsParse$6,
 longMonthsParse: monthsParse$6,
 shortMonthsParse: monthsParse$6,
 weekdays: 'dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi'.split('_'),
 weekdaysShort: 'dim._lun._mar._mer._jeu._ven._sam.'.split('_'),
 weekdaysMin: 'di_lu_ma_me_je_ve_sa'.split('_'),
 weekdaysParseExact: true,
 longDateFormat: {
     LT: 'HH:mm',
     LTS: 'HH:mm:ss',
     L: 'DD/MM/YYYY',
     LL: 'D MMMM YYYY',
     LLL: 'D MMMM YYYY HH:mm',
     LLLL: 'dddd D MMMM YYYY HH:mm',
 },
 calendar: {
     sameDay: '[Aujourd’hui à] LT',
     nextDay: '[Demain à] LT',
     nextWeek: 'dddd [à] LT',
     lastDay: '[Hier à] LT',
     lastWeek: 'dddd [dernier à] LT',
     sameElse: 'L',
 },
 relativeTime: {
     future: 'dans %s',
     past: 'il y a %s',
     s: 'quelques secondes',
     ss: '%d secondes',
     m: 'une minute',
     mm: '%d minutes',
     h: 'une heure',
     hh: '%d heures',
     d: 'un jour',
     dd: '%d jours',
     w: 'une semaine',
     ww: '%d semaines',
     M: 'un mois',
     MM: '%d mois',
     y: 'un an',
     yy: '%d ans',
 },
 dayOfMonthOrdinalParse: /\d{1,2}(er|)/,
 ordinal: function (number, period) {
     switch (period) {
         // TODO: Return 'e' when day of month > 1. Move this case inside
         // block for masculine words below.
         // See https://github.com/moment/moment/issues/3375
         case 'D':
             return number + (number === 1 ? 'er' : '');

         // Words with masculine grammatical gender: mois, trimestre, jour
         default:
         case 'M':
         case 'Q':
         case 'DDD':
         case 'd':
             return number + (number === 1 ? 'er' : 'e');

         // Words with feminine grammatical gender: semaine
         case 'w':
         case 'W':
             return number + (number === 1 ? 're' : 'e');
     }
 },
 week: {
     dow: 1, // Monday is the first day of the week.
     doy: 4, // The week that contains Jan 4th is the first week of the year.
 },
});

 //! moment.js locale configuration

 function processRelativeTime$2(number, withoutSuffix, key, isFuture) {
    var format = {
        m: ['eine Minute', 'einer Minute'],
        h: ['eine Stunde', 'einer Stunde'],
        d: ['ein Tag', 'einem Tag'],
        dd: [number + ' Tage', number + ' Tagen'],
        w: ['eine Woche', 'einer Woche'],
        M: ['ein Monat', 'einem Monat'],
        MM: [number + ' Monate', number + ' Monaten'],
        y: ['ein Jahr', 'einem Jahr'],
        yy: [number + ' Jahre', number + ' Jahren'],
    };
    return withoutSuffix ? format[key][0] : format[key][1];
}

moment.defineLocale('de', {
    months: 'Januar_Februar_März_April_Mai_Juni_Juli_August_September_Oktober_November_Dezember'.split(
        '_'
    ),
    monthsShort: 'Jan._Feb._März_Apr._Mai_Juni_Juli_Aug._Sep._Okt._Nov._Dez.'.split(
        '_'
    ),
    monthsParseExact: true,
    weekdays: 'Sonntag_Montag_Dienstag_Mittwoch_Donnerstag_Freitag_Samstag'.split(
        '_'
    ),
    weekdaysShort: 'So._Mo._Di._Mi._Do._Fr._Sa.'.split('_'),
    weekdaysMin: 'So_Mo_Di_Mi_Do_Fr_Sa'.split('_'),
    weekdaysParseExact: true,
    longDateFormat: {
        LT: 'HH:mm',
        LTS: 'HH:mm:ss',
        L: 'DD.MM.YYYY',
        LL: 'D. MMMM YYYY',
        LLL: 'D. MMMM YYYY HH:mm',
        LLLL: 'dddd, D. MMMM YYYY HH:mm',
    },
    calendar: {
        sameDay: '[heute um] LT [Uhr]',
        sameElse: 'L',
        nextDay: '[morgen um] LT [Uhr]',
        nextWeek: 'dddd [um] LT [Uhr]',
        lastDay: '[gestern um] LT [Uhr]',
        lastWeek: '[letzten] dddd [um] LT [Uhr]',
    },
    relativeTime: {
        future: 'in %s',
        past: 'vor %s',
        s: 'ein paar Sekunden',
        ss: '%d Sekunden',
        m: processRelativeTime$2,
        mm: '%d Minuten',
        h: processRelativeTime$2,
        hh: '%d Stunden',
        d: processRelativeTime$2,
        dd: processRelativeTime$2,
        w: processRelativeTime$2,
        ww: '%d Wochen',
        M: processRelativeTime$2,
        MM: processRelativeTime$2,
        y: processRelativeTime$2,
        yy: processRelativeTime$2,
    },
    dayOfMonthOrdinalParse: /\d{1,2}\./,
    ordinal: '%d.',
    week: {
        dow: 1, // Monday is the first day of the week.
        doy: 4, // The week that contains Jan 4th is the first week of the year.
    },
});

 //! moment.js locale configuration

 function plural$4(word, num) {
    var forms = word.split('_');
    return num % 10 === 1 && num % 100 !== 11
        ? forms[0]
        : num % 10 >= 2 && num % 10 <= 4 && (num % 100 < 10 || num % 100 >= 20)
        ? forms[1]
        : forms[2];
}
function relativeTimeWithPlural$3(number, withoutSuffix, key) {
    var format = {
        ss: withoutSuffix ? 'секунда_секунды_секунд' : 'секунду_секунды_секунд',
        mm: withoutSuffix ? 'минута_минуты_минут' : 'минуту_минуты_минут',
        hh: 'час_часа_часов',
        dd: 'день_дня_дней',
        ww: 'неделя_недели_недель',
        MM: 'месяц_месяца_месяцев',
        yy: 'год_года_лет',
    };
    if (key === 'm') {
        return withoutSuffix ? 'минута' : 'минуту';
    } else {
        return number + ' ' + plural$4(format[key], +number);
    }
}
var monthsParse$b = [
    /^янв/i,
    /^фев/i,
    /^мар/i,
    /^апр/i,
    /^ма[йя]/i,
    /^июн/i,
    /^июл/i,
    /^авг/i,
    /^сен/i,
    /^окт/i,
    /^ноя/i,
    /^дек/i,
];

// http://new.gramota.ru/spravka/rules/139-prop : § 103
// Сокращения месяцев: http://new.gramota.ru/spravka/buro/search-answer?s=242637
// CLDR data:          http://www.unicode.org/cldr/charts/28/summary/ru.html#1753
moment.defineLocale('ru', {
    months: {
        format: 'января_февраля_марта_апреля_мая_июня_июля_августа_сентября_октября_ноября_декабря'.split(
            '_'
        ),
        standalone: 'январь_февраль_март_апрель_май_июнь_июль_август_сентябрь_октябрь_ноябрь_декабрь'.split(
            '_'
        ),
    },
    monthsShort: {
        // по CLDR именно "июл." и "июн.", но какой смысл менять букву на точку?
        format: 'янв._февр._мар._апр._мая_июня_июля_авг._сент._окт._нояб._дек.'.split(
            '_'
        ),
        standalone: 'янв._февр._март_апр._май_июнь_июль_авг._сент._окт._нояб._дек.'.split(
            '_'
        ),
    },
    weekdays: {
        standalone: 'воскресенье_понедельник_вторник_среда_четверг_пятница_суббота'.split(
            '_'
        ),
        format: 'воскресенье_понедельник_вторник_среду_четверг_пятницу_субботу'.split(
            '_'
        ),
        isFormat: /\[ ?[Вв] ?(?:прошлую|следующую|эту)? ?] ?dddd/,
    },
    weekdaysShort: 'вс_пн_вт_ср_чт_пт_сб'.split('_'),
    weekdaysMin: 'вс_пн_вт_ср_чт_пт_сб'.split('_'),
    monthsParse: monthsParse$b,
    longMonthsParse: monthsParse$b,
    shortMonthsParse: monthsParse$b,

    // полные названия с падежами, по три буквы, для некоторых, по 4 буквы, сокращения с точкой и без точки
    monthsRegex: /^(январ[ья]|янв\.?|феврал[ья]|февр?\.?|марта?|мар\.?|апрел[ья]|апр\.?|ма[йя]|июн[ья]|июн\.?|июл[ья]|июл\.?|августа?|авг\.?|сентябр[ья]|сент?\.?|октябр[ья]|окт\.?|ноябр[ья]|нояб?\.?|декабр[ья]|дек\.?)/i,

    // копия предыдущего
    monthsShortRegex: /^(январ[ья]|янв\.?|феврал[ья]|февр?\.?|марта?|мар\.?|апрел[ья]|апр\.?|ма[йя]|июн[ья]|июн\.?|июл[ья]|июл\.?|августа?|авг\.?|сентябр[ья]|сент?\.?|октябр[ья]|окт\.?|ноябр[ья]|нояб?\.?|декабр[ья]|дек\.?)/i,

    // полные названия с падежами
    monthsStrictRegex: /^(январ[яь]|феврал[яь]|марта?|апрел[яь]|ма[яй]|июн[яь]|июл[яь]|августа?|сентябр[яь]|октябр[яь]|ноябр[яь]|декабр[яь])/i,

    // Выражение, которое соответствует только сокращённым формам
    monthsShortStrictRegex: /^(янв\.|февр?\.|мар[т.]|апр\.|ма[яй]|июн[ья.]|июл[ья.]|авг\.|сент?\.|окт\.|нояб?\.|дек\.)/i,
    longDateFormat: {
        LT: 'H:mm',
        LTS: 'H:mm:ss',
        L: 'DD.MM.YYYY',
        LL: 'D MMMM YYYY г.',
        LLL: 'D MMMM YYYY г., H:mm',
        LLLL: 'dddd, D MMMM YYYY г., H:mm',
    },
    calendar: {
        sameDay: '[Сегодня, в] LT',
        nextDay: '[Завтра, в] LT',
        lastDay: '[Вчера, в] LT',
        nextWeek: function (now) {
            if (now.week() !== this.week()) {
                switch (this.day()) {
                    case 0:
                        return '[В следующее] dddd, [в] LT';
                    case 1:
                    case 2:
                    case 4:
                        return '[В следующий] dddd, [в] LT';
                    case 3:
                    case 5:
                    case 6:
                        return '[В следующую] dddd, [в] LT';
                }
            } else {
                if (this.day() === 2) {
                    return '[Во] dddd, [в] LT';
                } else {
                    return '[В] dddd, [в] LT';
                }
            }
        },
        lastWeek: function (now) {
            if (now.week() !== this.week()) {
                switch (this.day()) {
                    case 0:
                        return '[В прошлое] dddd, [в] LT';
                    case 1:
                    case 2:
                    case 4:
                        return '[В прошлый] dddd, [в] LT';
                    case 3:
                    case 5:
                    case 6:
                        return '[В прошлую] dddd, [в] LT';
                }
            } else {
                if (this.day() === 2) {
                    return '[Во] dddd, [в] LT';
                } else {
                    return '[В] dddd, [в] LT';
                }
            }
        },
        sameElse: 'L',
    },
    relativeTime: {
        future: 'через %s',
        past: '%s назад',
        s: 'несколько секунд',
        ss: relativeTimeWithPlural$3,
        m: relativeTimeWithPlural$3,
        mm: relativeTimeWithPlural$3,
        h: 'час',
        hh: relativeTimeWithPlural$3,
        d: 'день',
        dd: relativeTimeWithPlural$3,
        w: 'неделя',
        ww: relativeTimeWithPlural$3,
        M: 'месяц',
        MM: relativeTimeWithPlural$3,
        y: 'год',
        yy: relativeTimeWithPlural$3,
    },
    meridiemParse: /ночи|утра|дня|вечера/i,
    isPM: function (input) {
        return /^(дня|вечера)$/.test(input);
    },
    meridiem: function (hour, minute, isLower) {
        if (hour < 4) {
            return 'ночи';
        } else if (hour < 12) {
            return 'утра';
        } else if (hour < 17) {
            return 'дня';
        } else {
            return 'вечера';
        }
    },
    dayOfMonthOrdinalParse: /\d{1,2}-(й|го|я)/,
    ordinal: function (number, period) {
        switch (period) {
            case 'M':
            case 'd':
            case 'DDD':
                return number + '-й';
            case 'D':
                return number + '-го';
            case 'w':
            case 'W':
                return number + '-я';
            default:
                return number;
        }
    },
    week: {
        dow: 1, // Monday is the first day of the week.
        doy: 4, // The week that contains Jan 4th is the first week of the year.
    },
});

 moment.locale('en');

 return moment;

})));
