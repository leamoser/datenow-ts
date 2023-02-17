import { weekdays, weekdaysShort, months, monthsShort } from "./translations";
import {
    CalendarizedDate,
    DateObjectParams,
    Day, DayObject,
    Hour,
    Languages,
    Minute,
    Month,
    MonthObject,
    Second, TimeDifference, TimeObject, WeekdayObject,
    Year, YearMonthObject,
    YearObject
} from "./types";
const defaultLanguage = 'en'
const helper = {
    weekdays: (lang: Languages): string[] => {
        return weekdays[lang]
    },
    weekdaysShort: (lang: Languages): string[] => {
        return weekdaysShort[lang]
    },
    months: (lang: Languages): string[] => {
        return months[lang]
    },
    monthsShort: (lang: Languages): string[] => {
        return monthsShort[lang]
    },
    milliseconds: {
        year: 31556952000,
        day: 86400000,
        hour: 3600000,
        minute: 60000,
        second: 1000
    },
    padTo2Digits: (num: number): string => {
        return num <= 9 ? ('0' + num).toString() : num.toString()
    },
    formats: {
        time: {
            H: (date: Date) => { return helper.padTo2Digits(get.hour(date)) },
            i: (date: Date) => { return helper.padTo2Digits(get.minute(date)) },
            s: (date: Date) => { return helper.padTo2Digits(get.second(date)) },
            v: (date: Date) => { return helper.padTo2Digits(get.millisecond(date)) }
        },
        date: {
            Y: (date: Date) => { return get.year(date) },
            y: (date: Date) => { return get.yearObject(date).short },
            F: (date: Date, lang: Languages) => { return get.monthObject(date, lang).long },
            m: (date: Date, lang: Languages) => { return helper.padTo2Digits(get.monthObject(date, lang).number) },
            M: (date: Date, lang: Languages) => { return get.monthObject(date, lang).short },
            d: (date: Date) => { return helper.padTo2Digits(get.day(date)) },
            D: (date: Date, lang: Languages) => { return get.weekdayObject(date, lang).short },
            l: (date: Date, lang: Languages) => { return get.weekdayObject(date, lang).long }
        }
    }
}

/**
 * @remarks Function Group for the initial creation of Dates
 */
const create = {
    dateNow: () :Date => {
        return new Date()
    },
    dateByMilliseconds: (ms: number) :Date => {
        return new Date(ms)
    },
    dateByDatestring: (datestring: string) :Date => {
        return new Date(datestring)
    },
    dateByParams: (params: DateObjectParams) :Date => {
        const year: Year = params?.year || 2022
        const month: Month = params?.month || 1
        const day: Day = params?.day || 10
        const hour: Hour = params?.hours || 12
        const minute: Minute = params?.minutes || 30
        const second: Second = params?.seconds || 0
        return new Date(year, month - 1, day, hour, minute, second)
    }
}

/**
 * @remarks Function Group for everything related to formatting Dates.
 */
const format = {
    toISO: (date: Date) :string => {
        return date.toISOString()
    },
    toMilliseconds: (date: Date) :number => {
        return Date.parse(date.toString())
    },
    toTime: (form: string, date: Date) :string => {
        const f: any = helper.formats.time
        const params: string[] = form.split('')
        let allowedSymbols = []
        for (const key in f) {
            allowedSymbols.push(key)
        }
        let time = []
        for (const i in params) {
            if(allowedSymbols.indexOf(params[i]) !== -1){
                time.push(f[params[i]](date))
            }else{
                time.push(params[i])
            }
        }
        return time.join('')
    },
    toDate: (form: string, date: Date, lang: Languages = defaultLanguage) :string => {
        const params: string[] = form.split('')
        const f: any = helper.formats.date
        let allowedSymbols = []
        for (const key in f) {
            allowedSymbols.push(key)
        }
        let formatedDate = []
        for (const i in params) {
            if(allowedSymbols.indexOf(params[i]) !== -1){
                formatedDate.push(f[params[i]](date, lang))
            }else{
                formatedDate.push(params[i])
            }
        }
        return formatedDate.join('')
    }
}

/**
 * @remarks Class for getting parts, e.g. years or weekdays, of choosen Dates.
 */
const get = {
    year: (date: Date): Year => {
        return date.getFullYear()
    },
    yearObject: (date: Date): YearObject => {
        return {
            long: date.getFullYear(),
            short: parseInt(date.getFullYear().toString().slice(2))
        }
    },
    monthIndex: (date: Date): number => {
        return date.getMonth()
    },
    monthObject: (date: Date, lang: Languages = defaultLanguage): MonthObject => {
        return {
            index: date.getMonth(),
            number: date.getMonth() + 1,
            paddedNumber: helper.padTo2Digits(date.getMonth() + 1),
            short: helper.monthsShort(lang)[date.getMonth()],
            long: helper.months(lang)[date.getMonth()]
        }
    },
    calendarizedMonth: (date: Date, language: Languages = defaultLanguage): CalendarizedDate[] => {
        // --- reset date to first
        const resettedDate = modify.day.changeTo(date,1)
        let days: CalendarizedDate[] = []
        const DAYSBEFORE = get.weekdayObject(resettedDate,language).indexStartingMonday
        const MONTH = date.getMonth()
        const fill = (filler: boolean, day: Day, paddedDay: string, weekday: WeekdayObject): void => {
            days.push({
                filler,
                day,
                paddedDay,
                weekday
            })
        }
        // --- fillers before
        if(resettedDate.getDate() === 1){
            for(let i = 0; i < DAYSBEFORE; i++){
                const DAYBEFORE = create.dateByMilliseconds(resettedDate.getTime() - ((DAYSBEFORE - i) * helper.milliseconds.day))
                fill(true, DAYBEFORE.getDate() as Day, helper.padTo2Digits(DAYBEFORE.getDate()), get.weekdayObject(DAYBEFORE,language))
            }
        }
        // --- actual dates
        while(resettedDate.getMonth() === MONTH){
            fill(false, resettedDate.getDate() as Day, helper.padTo2Digits(resettedDate.getDate()), get.weekdayObject(resettedDate,language))
            resettedDate.setDate(resettedDate.getDate() + 1)
        }
        // --- fillers after
        while(get.weekdayObject(resettedDate,language).indexStartingMonday !== 0){
            fill(true, resettedDate.getDate() as Day, helper.padTo2Digits(resettedDate.getDate()), get.weekdayObject(resettedDate,language))
            resettedDate.setDate(resettedDate.getDate() + 1)
        }
        return days
    },
    day: (date: Date): number => {
        return date.getDate()
    },
    dayObject: (date: Date): DayObject => {
        return {
            number: date.getDate(),
            paddedNumber: helper.padTo2Digits(date.getDate())
        }
    },
    weekdayIndex: (date: Date): number => {
        return date.getDay()
    },
    weekdayObject: (date: Date, lang: Languages = defaultLanguage): WeekdayObject => {
        const index: number = date.getDay()
        let indexStartingMonday: number = index >= 1 ? index - 1 : 6
        return {
            index,
            indexStartingMonday,
            short: helper.weekdaysShort(lang)[indexStartingMonday],
            long: helper.weekdays(lang)[indexStartingMonday]
        }
    },
    calendarWeek: (prefix: string, date: Date): string => {
        const day = date.getDay() || 7
        date.setUTCDate(date.getUTCDate() + 4 - day)
        const yearStart = new Date(Date.UTC(date.getUTCFullYear(),0,1))
        if(prefix){
            // @ts-ignore
            return prefix + ' ' + Math.ceil((((date - yearStart) / 86400000) + 1) / 7).toString()
        }else{
            // @ts-ignore
            return Math.ceil((((date - yearStart) / 86400000) + 1) / 7).toString()
        }

    },
    hour: (date: Date): number => {
        return date.getHours()
    },
    minute: (date: Date): number => {
        return date.getMinutes()
    },
    second: (date: Date): number => {
        return date.getSeconds()
    },
    millisecond: (date: Date): number => {
        return date.getMilliseconds()
    },
    timeObject: (date: Date): TimeObject => {
        return {
            hour: get.hour(date),
            minute: get.minute(date),
            second: get.second(date),
            millisecond: get.millisecond(date)
        }
    }
}

/**
 @remarks Function Group for modifying Dates, e.g. adding x months to a Date.
 */
const modify = {
    year: {
        changeTo: (date: Date, year: Year) :Date => {
            const dateCopy = new Date(date.valueOf());
            return new Date(dateCopy.setFullYear(year))
        },
        add: (date: Date, numberOfYears: number) :Date => {
            const dateCopy = new Date(date.valueOf());
            const NOW = get.year(dateCopy)
            const AFTER = NOW + numberOfYears
            return new Date(dateCopy.setFullYear(AFTER))
        },
        subtract: (date: Date, numberOfYears: number) :Date => {
            const dateCopy = new Date(date.valueOf());
            const NOW = get.year(dateCopy)
            const AFTER = NOW - numberOfYears
            return new Date(dateCopy.setFullYear(AFTER))
        }
    },
    month: {
        changeTo: (date: Date, month: Month) :Date => {
            const dateCopy = new Date(date.valueOf());
            return new Date(dateCopy.setMonth(month - 1))
        },
        add: (date: Date, numberOfMonths: number) :Date => {
            const dateCopy = new Date(date.valueOf());
            return new Date(dateCopy.setMonth(date.getMonth() + numberOfMonths));
        },
        subtract: (date: Date, numberOfMonths: number) :Date => {
            const dateCopy = new Date(date.valueOf());
            return new Date(dateCopy.setMonth(date.getMonth() - numberOfMonths));
        }
    },
    day: {
        changeTo: (date: Date, day: Day) :Date => {
            const dateCopy = new Date(date.valueOf());
            return new Date(dateCopy.setDate(day))
        },
        add: (date: Date, numberOfDays: number) :Date => {
            const NOW = format.toMilliseconds(date)
            const MS = helper.milliseconds.day * numberOfDays
            return create.dateByMilliseconds(NOW + MS);
        },
        subtract: (date: Date, numberOfDays: number) => {
            const NOW = format.toMilliseconds(date)
            const MS = helper.milliseconds.day * numberOfDays
            return create.dateByMilliseconds(NOW - MS);
        }
    },
    hour: {
        changeTo: (date: Date, hour: Hour) :Date => {
            const dateCopy = new Date(date.valueOf());
            return new Date(dateCopy.setHours(hour))
        },
        add: (date: Date, numberOfHours: number) :Date => {
            const NOW = format.toMilliseconds(date)
            const MS = helper.milliseconds.hour * numberOfHours
            return create.dateByMilliseconds(NOW + MS)
        },
        subtract: (date: Date, numberOfHours: number) :Date => {
            const NOW = format.toMilliseconds(date)
            const MS = helper.milliseconds.hour * numberOfHours
            return create.dateByMilliseconds(NOW - MS)
        }
    },
    minute: {
        changeTo: (date: Date, minute: Minute) :Date => {
            const dateCopy = new Date(date.valueOf());
            return new Date(dateCopy.setMinutes(minute))
        },
        add: (date: Date, numberOfMinutes: number) :Date => {
            const NOW = format.toMilliseconds(date)
            const MS = helper.milliseconds.minute * numberOfMinutes
            return create.dateByMilliseconds(NOW + MS)
        },
        subtract: (date: Date, numberOfMinutes: number) :Date => {
            const NOW = format.toMilliseconds(date)
            const MS = helper.milliseconds.minute * numberOfMinutes
            return create.dateByMilliseconds(NOW - MS)
        }
    },
    second: {
        changeTo: (date: Date, second: Second) :Date => {
            const dateCopy = new Date(date.valueOf());
            return new Date(dateCopy.setSeconds(second))
        },
        add: (date: Date, numberOfSeconds: number) :Date => {
            const NOW = format.toMilliseconds(date)
            const MS = helper.milliseconds.second * numberOfSeconds
            return create.dateByMilliseconds(NOW + MS)
        },
        subtract: (date: Date, numberofSeconds: number) :Date => {
            const NOW = format.toMilliseconds(date)
            const MS = helper.milliseconds.second * numberofSeconds
            return create.dateByMilliseconds(NOW - MS)
        }
    }
}

/**
 * @remarks Function Group for getting time difference between two Dates.
 */
const until = {
    years: (dateFrom: Date, dateTo: Date): number => {
        const DIFFERENCE = Math.abs(dateFrom.getTime() - dateTo.getTime())
        return Math.floor(DIFFERENCE / helper.milliseconds.year)
    },
    days: (dateFrom: Date, dateTo: Date): number => {
        const DIFFERENCE = Math.abs(dateFrom.getTime() - dateTo.getTime())
        return Math.floor(DIFFERENCE / helper.milliseconds.day)
    },
    hours: (dateFrom: Date, dateTo: Date): number => {
        const DIFFERENCE = Math.abs(dateFrom.getTime() - dateTo.getTime())
        return Math.floor(DIFFERENCE / helper.milliseconds.hour)
    },
    minutes: (dateFrom: Date, dateTo: Date): number => {
        const DIFFERENCE = Math.abs(dateFrom.getTime() - dateTo.getTime())
        return Math.floor(DIFFERENCE / helper.milliseconds.minute)
    },
    seconds: (dateFrom: Date, dateTo: Date): number => {
        const DIFFERENCE = Math.abs(dateFrom.getTime() - dateTo.getTime())
        return Math.floor(DIFFERENCE / helper.milliseconds.second)
    },
    complete: (dateFrom: Date, dateTo: Date): TimeDifference => {
        const FROM = dateFrom.getTime()
        const TO = dateTo.getTime()
        let differenceStart = TO - FROM
        let difference = {
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0
        }
        difference.days = Math.floor(differenceStart / helper.milliseconds.day)
        differenceStart = differenceStart % helper.milliseconds.day
        difference.hours = Math.floor(differenceStart / helper.milliseconds.hour)
        differenceStart = differenceStart % helper.milliseconds.hour
        difference.minutes = Math.floor(differenceStart / helper.milliseconds.minute)
        differenceStart = differenceStart % helper.milliseconds.minute
        difference.seconds = Math.floor(differenceStart / helper.milliseconds.second)
        return difference
    }
}

/**
 * @remarks Function Group for getting an Array of all Months or Years beween two dates
 */
const span = {
    years: (dateFrom: Date, dateTo: Date): Year[] => {
        let years = []
        for(let i = dateFrom.getFullYear(); i <= dateTo.getFullYear(); i++){
            years.push(i)
        }
        return years
    },
    months: (dateFrom: Date, dateTo: Date, language: Languages = defaultLanguage): any[] => {
        const FROM = new Date(dateFrom.getFullYear(), dateFrom.getMonth())
        const TO = new Date(dateTo.getFullYear(), dateTo.getMonth())
        const months = []
        while(FROM.getFullYear() !== TO.getFullYear() || FROM.getMonth() !== TO.getMonth()) {
            let obj: YearMonthObject = get.monthObject(FROM,language)
            obj.year = FROM.getFullYear()
            months.push(obj)
            modify.month.add(FROM, 1)
        }
        let obj: YearMonthObject = get.monthObject(FROM,language)
        obj.year = FROM.getFullYear()
        months.push(obj)
        return months
    }
}

/**
 * @remarks Function Group to compare two Dates
 */
const compare = {
    isSameYear: (dateFirst: Date, dateSecond: Date = create.dateNow()): boolean => {
        return dateFirst.getFullYear() === dateSecond.getFullYear();
    },
    isSameExactMonth: (dateFirst: Date, dateSecond: Date = create.dateNow()): boolean => {
        return (
            dateFirst.getFullYear() === dateSecond.getFullYear() &&
            dateFirst.getMonth() === dateSecond.getMonth()
        )
    },
    isSameMonth: (dateFirst: Date, dateSecond: Date = create.dateNow()): boolean => {
        return dateFirst.getMonth() === dateSecond.getMonth()
    },
    isSameExactDay: (dateFirst: Date, dateSecond: Date = create.dateNow()): boolean => {
        return (
            dateFirst.getFullYear() === dateSecond.getFullYear() &&
            dateFirst.getMonth() === dateSecond.getMonth() &&
            dateFirst.getDate() === dateSecond.getDate()
        )
    },
    isSameDay: (dateFirst: Date, dateSecond: Date = create.dateNow()): boolean => {
        return dateFirst.getDate() === dateSecond.getDate()
    },
    isSameExactTime: (dateFirst: Date, dateSecond: Date = create.dateNow()): boolean => {
        return dateFirst.valueOf() === dateSecond.valueOf()
    },
    isSameTime: (dateFirst: Date, dateSecond: Date = create.dateNow()): boolean => {
        return (
            dateFirst.getHours() === dateSecond.getHours() &&
            dateFirst.getMinutes() === dateSecond.getMinutes() &&
            dateFirst.getSeconds() === dateSecond.getSeconds() &&
            dateFirst.getMilliseconds() === dateSecond.getMilliseconds()
        )
    }
}

/**
 *@remarks Function to check if package is working
 */
const check = () =>  {
    console.log('🤝 datenow-ts 2.2.0 has sucessfully been installed')
    console.log('🫀 import a function group to start working with your dates')
    console.log('👀 explore everything datenow-ts has to offer by reading the docs')
    console.log('✉️ feedback: privat@lea-moser.ch')
}

// -> exports
export { create, format, get, modify, until, span, compare, helper, check }
