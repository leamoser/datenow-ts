export type Year = number
export type Month = 1|2|3|4|5|6|7|8|9|10|11|12
export type Day = 1|2|3|4|5|6|7|8|9|10|11|12|13|14|15|16|17|18|19|20|21|22|23|24|25|26|27|28|29|30|31
export type Hour = 0|1|2|3|4|5|6|7|8|9|10|11|12|13|14|15|16|17|18|19|20|21|22|23
export type Minute = 0|1|2|3|4|5|6|7|8|9|10|11|12|13|14|15|16|17|18|19|20|21|22|23|24|25|26|27|28|29|30|31|32|33|34|35|36|37|38|39|40|41|42|43|44|45|46|47|48|49|50|51|52|53|54|55|56|57|58|59
export type Second = Minute

export interface DateObjectParams{
    year?: Year,
    month?: Month,
    day?: Day,
    hours?: Hour,
    minutes?: Minute,
    seconds?: Second
}
export interface YearObject{
    long: number,
    short: number
}
export interface MonthObject{
    index: number,
    number: number,
    short: string,
    long: string
}
export interface WeekdayObject{
    index: number,
    indexStartingMonday: number,
    short: string,
    long: string
}
export interface TimeObject{
    hour: number,
    minute: number,
    second: number,
    millisecond: number
}

// --> class config
export type Languages = 'en'|'de'|'fr'|'nl'|'it'|'el'

// --> functionalities
export interface CalendarizedDate {
    filler: boolean,
    day: number,
    weekday: WeekdayObject
}
export interface TimeDifference {
    days: number,
    hours: number,
    minutes: number,
    seconds: number
}
export interface YearMonthObject extends MonthObject {
    year?: Year
}
