export default class TemperatureController {
  constructor(todayHeader, forecastHeaders) {
    this.todayHeader = todayHeader;
    this.forecastHeaders = forecastHeaders;
    this.state = 'c';
  }

  celsiusToFahrenheit(celsius) {
    return Number(celsius) * (9 / 5) + 32;
  }

  fahreheitToCelsius(fahrenheit) {
    return (Number(fahrenheit) - 32) * (5 / 9);
  }

  toggleMetrics() {
    if (this.state === 'c') {
      this.todayHeader.textContent = `${this.todayHeader.textContent}`
    }
  }
}
