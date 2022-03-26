import {
    DateObject,
    Day,
    Hour,
    Minute,
    Month,
    MonthObject,
    Second,
    TimeObject,
    WeekdayObject,
    Year,
    YearObject
} from "./types";

export const create = {
    dateNow: () :Date => {
        return new Date()
    },
    dateByMilliseconds: (milliseconds: number) :Date => {
        return new Date(milliseconds)
    },
    dateByDatestring: (datestring: string) :Date => {
        return new Date(datestring)
    },
    dateByParams: (params: DateObject) :Date => {
        return new Date(params.year,params.month-1,params.day,params.hours,params.minutes,params.seconds)
    }
}
export const format = {
    toISO: (date: Date) :string => {
        return date.toISOString()
    },
    toMilliseconds: (date: Date) :number => {
        return Date.parse(date.toString())
    },
    toTime: (date: Date, format: string) :string => {
        console.log()
        const f: any = helper.formats.time
        const params: string[] = format.split('')
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
    toDate: (date: Date, format: string) :string => {
        const params: string[] = format.split('')
        const f: any = helper.formats.date
        let allowedSymbols = []
        for (const key in f) {
            allowedSymbols.push(key)
        }
        let formatedDate = []
        for (const i in params) {
            if(allowedSymbols.indexOf(params[i]) !== -1){
                formatedDate.push(f[params[i]](date))
            }else{
                formatedDate.push(params[i])
            }
        }
        return formatedDate.join('')
    }
}
export const helper = {
    weekdays: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday'
    ],
    weekdaysShort: [
        'Mo',
        'Tu',
        'We',
        'Th',
        'Fr',
        'Sa',
        'Su'
    ],
    months: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ],
    monthsShort:[
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
    ],
    milliseconds: {
        year: 31556952000,
        day: 86400000,
        hour: 3600000,
        minute: 60000,
        second: 1000
    },
    formats: {
        time: {
            H: (date: Date) => { return get.hour(date) },
            i: (date: Date) => { return get.minute(date) },
            s: (date: Date) => { return get.second(date) },
            v: (date: Date) => { return get.millisecond(date) },
        },
        date: {
            Y: (date: Date) => { return get.year(date) },
            y: (date: Date) => { return get.yearObject(date).short },
            F: (date: Date) => { return get.monthObject(date).long },
            m: (date: Date) => { return get.monthObject(date).number },
            M: (date: Date) => { return get.monthObject(date).short },
            d: (date: Date) => { return get.day(date) },
            D: (date: Date) => { return get.weekdayObject(date).short },
            l: (date: Date) => { return get.weekdayObject(date).long }
        }
    }}
export const get = {
    year: (date: Date) :Year => {
        return date.getFullYear()
    },
    yearObject: (date: Date) :YearObject => {
        return {
            long: date.getFullYear(),
            short: parseInt(date.getFullYear().toString().slice(2))
        }
    },
    monthIndex: (date: Date) :number => {
        return date.getMonth()
    },
    monthObject: (date: Date) :MonthObject => {
        return {
            index: date.getMonth(),
            number: date.getMonth() + 1,
            short: helper.monthsShort[date.getMonth()],
            long: helper.months[date.getMonth()]
        }
    },
    day: (date: Date) :number => {
        return date.getDate()
    },
    weekdayIndex: (date: Date) :number => {
        return date.getDay()
    },
    weekdayObject: (date: Date) :WeekdayObject => {
        const index: number = date.getDay()
        let indexStartingMonday: number = index >= 1 ? index - 1 : 6
        return {
            index,
            indexStartingMonday,
            short: helper.weekdaysShort[indexStartingMonday],
            long: helper.weekdays[indexStartingMonday]
        }
    },
    hour: (date: Date) :number => {
        return date.getHours()
    },
    minute: (date: Date) :number => {
        return date.getMinutes()
    },
    second: (date: Date) :number => {
        return date.getSeconds()
    },
    millisecond: (date: Date) :number => {
        return date.getMilliseconds()
    },
    timeObject: (date: Date) :TimeObject => {
        return {
            hour: get.hour(date),
            minute: get.minute(date),
            second: get.second(date),
            millisecond: get.millisecond(date)
        }
    }
}
export const modify = {
    year: {
        changeTo: (date: Date, year: Year) :Date => {
            return new Date(date.setFullYear(year))
        },
        add: (date: Date, numberOfYears: number) :Date => {
            const NOW = get.year(date)
            const AFTER = NOW + numberOfYears
            return new Date(date.setFullYear(AFTER))
        },
        subtract: (date: Date, numberOfYears: number) :Date => {
            const NOW = get.year(date)
            const AFTER = NOW - numberOfYears
            return new Date(date.setFullYear(AFTER))
        }
    },
    month: {
        changeTo: (date: Date,month: Month) :Date => {
            return new Date(date.setMonth(month - 1))
        },
        add: (date: Date, numberOfMonths: number) :Date => {
            const MONTH_NOW = get.monthIndex(date)
            const YEAR_NOW = get.year(date)
            const MONTH_AFTER = MONTH_NOW + numberOfMonths <= 11 ? MONTH_NOW + numberOfMonths : (((MONTH_NOW + 1) + numberOfMonths) % 12) - 1
            const YEAR_AFTER = MONTH_NOW + numberOfMonths <= 11 ? YEAR_NOW : YEAR_NOW + Math.floor(((MONTH_NOW + 1) + numberOfMonths) / 12)
            return new Date(date.setFullYear(YEAR_AFTER,MONTH_AFTER))
        },
        subtract: (date: Date, numberOfMonths: number) :Date => {
            const MONTH_NOW = get.monthIndex(date)
            const YEAR_NOW = get.year(date)
            let MONTH_AFTER, YEAR_AFTER
            if(MONTH_NOW - numberOfMonths >= 0){
                YEAR_AFTER = YEAR_NOW
                MONTH_AFTER = MONTH_NOW - numberOfMonths
            }else{
                let minusYears = 0
                let i = numberOfMonths
                while(i >= 12){
                    minusYears++
                    i = i - 12
                }
                if(i < 12){
                    minusYears++
                    i = 12 - i
                }
                YEAR_AFTER = YEAR_NOW - minusYears
                MONTH_AFTER = i + 1
            }
            return new Date(date.setFullYear(YEAR_AFTER,MONTH_AFTER))
        }
    },
    day: {
        changeTo: (date: Date, day: Day) :Date => {
            return new Date(date.setDate(day))
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
            return new Date(date.setHours(hour))
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
            return new Date(date.setMinutes(minute))
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
            return new Date(date.setSeconds(second))
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

export const check = () =>  {
    console.log('🤝 datenow-ts 1.2.0 has sucessfully been installed')
    console.log('🫀 call datenow to start modifying your dates')
    console.log('👀 explore everything datenow-ts has to offer by reading the docs')
    console.log('✉️ feedback: privat@lea-moser.ch')
}