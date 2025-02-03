export type BaseHours =
  | '00'
  | '01'
  | '02'
  | '03'
  | '04'
  | '05'
  | '06'
  | '07'
  | '08'
  | '09'
  | '10'
  | '11'
  | '12'
  | '13'
  | '14'
  | '15'
  | '16'
  | '17'
  | '18'
  | '19'
  | '20'
  | '21'
  | '22'
  | '23'

export type Hours = BaseHours

export type BaseMinutesAndSeconds =
  | BaseHours
  | '24'
  | '25'
  | '26'
  | '27'
  | '28'
  | '29'
  | '30'
  | '31'
  | '32'
  | '33'
  | '34'
  | '35'
  | '36'
  | '37'
  | '38'
  | '39'
  | '40'
  | '41'
  | '42'
  | '43'
  | '44'
  | '45'
  | '46'
  | '47'
  | '48'
  | '49'
  | '50'
  | '51'
  | '52'
  | '53'
  | '54'
  | '55'
  | '56'
  | '57'
  | '58'
  | '59'

export type Minutes = BaseMinutesAndSeconds

export type Seconds = BaseMinutesAndSeconds

export type Duration = `${Hours}:${Minutes}:${Seconds}`

export class DurationVO {
  constructor(private readonly value: Duration) {}

  isValid() {
    const [hours, minutes, seconds] = this.value.split(':')
    const convertedHours = Number(hours)
    const convertedMinutes = Number(minutes)
    const convertedSeconds = Number(seconds)
    const isValidHours = convertedHours >= 0 && convertedHours <= 23
    const isValidMinutes = convertedMinutes >= 0 && convertedMinutes <= 59
    const isValidSeconds = convertedSeconds >= 0 && convertedSeconds <= 59
    if (!isValidHours || !isValidMinutes || !isValidSeconds) {
      return false
    }
    return true
  }

  toValue() {
    return this.value
  }

  toString() {
    return this.value.toString()
  }
}
