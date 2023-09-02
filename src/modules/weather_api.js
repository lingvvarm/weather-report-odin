export default async function fetchData(city) {
  const answer = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=82377d73ca97467ba51112441233008&q=${city}&days=8&aqi=no&alerts=no`, { mode: 'cors' });
  if (!(answer.ok)) {
    return false;
  }
  const data = await answer.json();
  return data;
}
