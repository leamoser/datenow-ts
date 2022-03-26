# datenow-ts
The pain of my life has been working with dates in JavaScript.
That's why I wrote this little library, to help you working with dates and time in JavaScript and Typescript.

### 💾 install
**npm**:
```text
npm i datenow-ts
```

**yarn**:
```text
yarn add datenow-ts
```

### 🗜️ embed
Add datenow-ts to your file by writing this line:
```javascript
const datenow = require('datenow-ts')
```

### 🎳 testing
To see if everything works, try the following command.
You should see infos about the installed version in your console, if the package is installed correctly.
```javascript
datenow.check()
```
# 🏂 what you can do with datenow-ts

## ✍️ create
the base-command for functions falling under this category start with ``datenow.create.`` and are
followed by the specific command. like so:
```javascript
const date = datenow.create.dateNow()
```

| command                  | params                                                                  |
|--------------------------|-------------------------------------------------------------------------|
| ``dateNow()``            | -                                                                       |
| ``dateByParams()``       | z.B. `{year: 2021, month: 2, day: 1, hours: 2, minutes: 1, seconds: 0}` |
| ``dateByMilliseconds()`` | 1 / number / milliseconds from 1.1.1970                                 |
| ``dateByDatestring()``   | z.B. `2021/03/05`                                                       |

All the functions under this category return a datestring in the following format:
```text
Sat Jan 01 2022 14:37:47 GMT+0100 (Mitteleuropäische Normalzeit)
```

## 🤲 get
the base-command for functions falling under this category start with ``datenow.get.`` and are
followed by the specific command. like so:
```javascript
const year = datenow.get.year(date)
```

| command                 | eg. return                                                        |
|-------------------------|-------------------------------------------------------------------|
| ``year(date)``          | `2022`                                                            |
| ``yearObject(date)``    | `{long: 2022, short: 22}`                                         |
| ``monthIndex(date)``    | `0` for january                                                   |
| ``monthObject(date)``   | `{index: 0, number: 1, short: 'Jan', long: 'January' }`           |
| ``day(date)``           | `1`                                                               |
| ``weekdayIndex(date)``  | `0` for sunday                                                    |
| ``weekdayObject(date)`` | `{index: 0, indexStartingMonday: 6, short: 'Su', long: 'Sunday'}` |
| ``hour(date)``          | `14` for 2 PM                                                     |
| ``minute(date)``        | `32`                                                              |
| ``second(date)``        | `19`                                                              |
| ``millisecond(date)``   | `233`                                                             |

## 🎭 modify
the base-command for functions falling under this category start with ``datenow.modify.`` and are
followed by the specific command. like so:
```javascript
const year = datenow.modify.year.changeTo(date, 1997)
```
In this modify-section, you have the same functionalities for every unit.
All existing units are:
- year
- month
- day
- hour
- minute
- second

All available actions are:

| command                                                | params                           |
|--------------------------------------------------------|----------------------------------|
| ``datenow.modify.[unit].changeTo(date,newUnit)``       | date (datestring), unit (number) |
| ``datenow.modify.[unit].add(date,numberOfUnits)``      | date (datestring), unit (number) |
| ``datenow.modify.[unit].subtract(date,numberOfUnits)`` | date (datestring), unit (number) |

## 🎰 format
the base-command for functions falling under this category start with ``datenow.format.`` and are
followed by the specific command. like so:
```javascript
const year = datenow.modify.format.toISO(date)
```

The two simple commands are:

| command              | params            | eg. response               |
|----------------------|-------------------|----------------------------|
| ``toISO()``          | date (datestring) | `2022-01-01T14:26:50.803Z` |
| ``toMilliseconds()`` | date (datestring) | `1641047269000`            |

Then you have another two commands, which are a little more complex.
### toTime()
```javascript
const date = datenow.create.dateNow()
const formatedTime = datenow.format.toTime(date,'H:i')
//returns 23:30
```
As the first parameter you have to pass the datestring.
Afterwards, you can pass the format you wish as a string.
Reserved letters will be parsed, everything else will act as seperators.

*Reserved letters*
- **H:** Hours
- **i:** Minutes
- **s:** Seconds
- **v:** milliseconds

### toDate()
```javascript
const date = datenow.create.dateNow()
const formatedDate = datenow.format.toDate(date,'d. F Y')
//returns 1. January 2022
```
As the first parameter you have to pass the datestring.
Afterwards, you can pass the format you wish as a string.
Reserved letters will be parsed, everything else will act as seperators.

*Reserved letters*
- **Y:** Year long
- **y:** Year short
- **F:** Month long
- **M:** Month short
- **m:** Month number
- **d:** Day
- **D:** Weekday short
- **l:** Weekday long

# That's it...
This package is a work in progress.
Feedbacks or ideas for extensions are highly welcome!

- Contact: [privat@lea-moser.ch](mailto:privat@lea-moser.ch)
- My Website: [lea-moser.ch](https://www.lea-moser.ch)
