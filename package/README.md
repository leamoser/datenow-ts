# datenow-ts

![picture alt](https://img.shields.io/badge/Version-2.2.0-00b3b0?style=flat-square "Current Version")

The pain of my life has been working with dates in JavaScript.
That's why I wrote this little library, to help you working with dates and time in JavaScript and TypeScript.

### 💾 install

**npm**:

```text
npm i datenow-ts
```

**yarn**:

```text
yarn add datenow-ts
```

### 🎳 test

To check if datenow-ts is installed correctly, implement the check-function and run it.

```javascript
const {check} = require('datenow-ts')
check()
// or
import {check} from 'datenow-ts'

check()
```

If you get a console message with infos about the package, everything is implemented correctly and you can start using
the package.

# 🏂 what you can do with datenow-ts

> The whole package is destructured into six function groups you can use.
> The following table explains all of the six groups.

| group                    | what it does                                                                                            |
|--------------------------|---------------------------------------------------------------------------------------------------------|
| [``create``](#-create)   | Functions for creating dates in multiple ways.                                                          |
| [``format`` ](#-format)  | Functions for formatting dates in certain ways.                                                         |
| [``get``](#-get)         | Functions for getting parts of a date, e.g. the month in a certain language.                            |
| [``modify``](#-modify)   | Functions for modifying dates, e.g. adding x months to a date.                                          |
| [``until``](#-until)     | Functions for calclating durations between two dates.                                                   |
| [``span``](#-span)       | Functions for getting informations about the span between two dates, e.g. all months between two dates. |
| [``compare``](#-compare) | Functions for comparing two dates                                                                       |

## ✍️ create

To use the functions provided under this category, implement them as follows:

```javascript
const {create} = require('datenow-ts')
// or
import {create} from 'datenow-ts'
```

These are the functions you have at your disposal after implementing.

| command                  | params                                                                  |
|--------------------------|-------------------------------------------------------------------------|
| ``dateNow()``            | -                                                                       |
| ``dateByParams()``       | z.B. `{year: 2023, month: 1, day: 1, hours: 1, minutes: 1, seconds: 1}` |
| ``dateByMilliseconds()`` | 1 / number / milliseconds from 1.1.1970                                 |
| ``dateByDatestring()``   | z.B. `2021/03/05`                                                       |

All functions under this category return a datestring in the following format:

```text
Sun Jan 01 2023 01:01:01 GMT+0100 (Mitteleuropäische Normalzeit)
```

### Example

```javascript
const {create} = require('datenow-ts')
const date = create.dateByParams({year: 2023, month: 1, day: 1})
console.log(date)
```

## 🤲 get

To use the functions provided under this category, implement them as follows:

```javascript
const {get} = require('datenow-ts')
// or
import {get} from 'datenow-ts'
```

These are the functions you have at your disposal after implementing.
The parameter you pass to all these functions is a datestring (ideally created by a function from the ``create``
section).

| command                           | eg. return                                                                  |
|-----------------------------------|-----------------------------------------------------------------------------|
| ``year(date)``                    | `2023`                                                                      |
| ``yearObject(date)``              | `{long: 2023, short: 23}`                                                   |
| ``monthIndex(date)``              | `0` for january                                                             |
| ``monthObject(date, lang)``       | `{index: 0, number: 1, paddedNumber: '01', short: 'Jan', long: 'January' }` |
| ``calendarizedMonth(date, lang)`` | Returns an array with all days of the month the passed date is in.          |
| ``day(date)``                     | `1`                                                                         |
| ``dayObject(date)``               | `{ number: 1, paddedNumber: '01' }`                                         |
| ``weekdayIndex(date)``            | `0` for sunday                                                              |
| ``weekdayObject(date, lang)``     | `{index: 0, indexStartingMonday: 6, short: 'Su', long: 'Sunday'}`           |
| ``calendarWeek(prefix,date)``     | `KW 4`                                                                      |
| ``hour(date)``                    | `14` for 2 PM                                                               |
| ``minute(date)``                  | `32`                                                                        |
| ``second(date)``                  | `19`                                                                        |
| ``millisecond(date)``             | `233`                                                                       |

## 🎭 modify

To use the functions provided under this category, implement them as follows:

```javascript
const {modify} = require('datenow-ts')
// or
import {modify} from 'datenow-ts'
```

In this modify-section, you have the same functionalities for every unit.
All existing units are:

- year
- month
- day
- hour
- minute
- second

All available actions are the following:

| command                                        | params                           |
|------------------------------------------------|----------------------------------|
| ``modify.[unit].changeTo(date,newUnit)``       | date (datestring), unit (number) |
| ``modify.[unit].add(date,numberOfUnits)``      | date (datestring), unit (number) |
| ``modify.[unit].subtract(date,numberOfUnits)`` | date (datestring), unit (number) |

### Example

```javascript
const {create, modify} = require('datenow-ts')
const date = create.dateByParams({year: 2023, month: 1, day: 1})
console.log('date 10 years in the future:', modify.year.add(date, 10))
```

## 🎰 format

To use the functions provided under this category, implement them as follows:

```javascript
const {format} = require('datenow-ts')
// or
import {format} from 'datenow-ts'
```

The two simple commands are:

| command              | params            | eg. response               |
|----------------------|-------------------|----------------------------|
| ``toISO()``          | date (datestring) | `2022-01-01T14:26:50.803Z` |
| ``toMilliseconds()`` | date (datestring) | `1641047269000`            |

Then you have another two commands, which are a little more complex.

### toTime()

```javascript
// -> example
import {create, format} from 'datenow-ts'

const date = create.dateNow()
const formatedTime = format.toTime(date, 'H:i')
// -> returns 23:30
```

The first parameter is the datestring.
As a second parameter you can pass the format you wish as a string.
Reserved letters will be parsed, everything else will act as a seperator.

*Reserved letters*

- ``H`` Hours
- ``i`` Minutes
- ``s`` Seconds
- ``v`` Milliseconds

### toDate()

```javascript
// -> example 
import {create, format} from 'datenow-ts'

const date = create.dateNow()
const formatedDate = format.toDate(date, 'd. F Y')
// --> returns 1. January 2022
```

The first parameter is the datestring.
As a second parameter you can pass the format you wish as a string.
Reserved letters will be parsed, everything else will act as seperators.

*Reserved letters*

- ``Y`` Year long
- ``y`` Year short
- ``F`` Month long
- ``M`` Month short
- ``m`` Month number
- ``d`` Day
- ``D`` Weekday short
- ``l`` Weekday long

## > until

To use the functions provided under this category, implement them as follows:

```javascript
const {until} = require('datenow-ts')
// or
import {until} from 'datenow-ts'
```

You have six functions at your displosal in this section.
They all take two datestrings as parameters.
The first one is the start date, the second one the end date.

To calculate the number of years between two days, this is your way to go:

```javascript
const {create, until} = require('datenow-ts');
const from = create.dateNow()
const to = create.dateByDatestring('2053-04-07')
console.log('years beween:', until.years(from, to))
```

The exactly same syntax can be used with all the following units:

- ``years``
- ``days``
- ``hours``
- ``minutes``
- ``seconds``
- ``complete`` ➡️ This returns an object with all units combined.

## 🪢 span

To use the functions provided under this category, implement them as follows:

```javascript
const {span} = require('datenow-ts')
// or
import {span} from 'datenow-ts'
```

Functions under this category give you informations about the the time between two dates.
For now, only two functions are implemented.

### years(from, to)

```javascript
// -> example
const {create, span} = require('datenow-ts')
const from = create.dateNow()
const to = create.dateByDatestring('2050-04-07')
console.log('array with years between', span.years(from, to))
// returns array with all years between -> [2023,2024,2025,...]
```

### months(from,to)

```javascript
// -> example
const {create, span} = require('datenow-ts')
const from = create.dateNow()
const to = create.dateByDatestring('2024-04-07')
console.log('array with months between', span.months(from, to))
// returns array with all months between -> [ {index: 1, number: 2, short: 'Feb', long: 'February', year: 2023 }, {index: 2, number: 3, short: 'Mar', long: 'March', year: 2023 }, ... ] 
```

## 👯 compare

To use the functions provided under this category, implement them as follows:

```javascript
const {compare} = require('datenow-ts')
// or
import {compare} from 'datenow-ts'
```

Functions under this category compare two dates with each otgher and return
a boolean value if a condition meets. The following conditions can be compared:

| Function                                    | Checks if the two dates have...        |
|---------------------------------------------|----------------------------------------|
| ``isSameYear``(dateFirst, dateSecond)       | ... the same year                      |
| ``isSameExactMonth``(dateFirst, dateSecond) | ... the same year and month            |
| ``isSameMonth``(dateFirst, dateSecond)      | ... the same month                     |
| ``isSameExactDay``(dateFirst, dateSecond)   | ... the same year, month and day       |
| ``isSameDay``(dateFirst, dateSecond)        | ... the same day                       |
| ``isSameExactTime``(dateFirst, dateSecond)  | ... the same year, month, day and time |
| ``isSameTime``(dateFirst, dateSecond)       | ... the same time                      |


This example shows how to use these functions:

```javascript
import { create, compare } from 'datenow-ts'
const dateFirst = create.dateByDatestring('2023-01-05')
const dateSecond = create.dateByDatestring('2022-01-10')

console.log(compare.isSameMonth(dateFirst, dateSecond))
// -> returns true, as the two months are the same
```

The second parameter is optional. 
If no parameter is passed, the first date will be compared to 
the current date and time.

# 🌐 Translations

The following languages are already implemented:

| Language          | Language Code |
|-------------------|---------------|
| English (default) | en            |
| Deutsch           | de            |
| Français          | fr            |
| Italiano          | it            |
| Nederlands        | nl            |
| Ελληνική          | el            |


All functions that return anything where anything needs to be translated, the last parameter is the language code.
If no language code is passed, the default language (in this case english) is set.

# That's it...

This package is a work in progress.
Feedbacks or ideas for extensions are highly welcome!
And if you want, you can also contribute to the package via GitHub.

- Contact: [privat@lea-moser.ch](mailto:privat@lea-moser.ch)
- My Website: [lea-moser.ch](https://www.lea-moser.ch)
