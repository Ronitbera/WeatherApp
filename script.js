async function getWeather() {
  const city = document.getElementById('city').value.trim();
  const card = document.getElementById('weather-card');

  if (!city) {
    alert("Please enter a city.");
    return;
  }

  // 🚫 Prevent numeric or invalid input
  if (!/^[a-zA-Z\s]+$/.test(city)) {
    alert("Please enter a valid city name (letters only).");
    return;
  }

 const apiKey = "fb7f35f03098e7267b9224f2e5ebc10e";

const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (data.cod !== 200) {
      card.innerHTML = `<p>City not found.</p>`;
      return;
    }

    // ✅ Set background and font color based on weather
    setBackground(data.main.temp, data.weather[0].icon);

    // ✅ Display weather data
    card.innerHTML = `
      <h2>${data.name}, ${data.sys.country}</h2>
      <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="Weather Icon" />
      <p>${data.weather[0].description}</p>
      <p>🌡 Temp: ${data.main.temp}°C</p>
      <p>💧 Humidity: ${data.main.humidity}%</p>
    `;
  } catch (err) {
    card.innerHTML = `<p>Something went wrong. Try again later.</p>`;
  }
}

// ✅ Move setBackground outside getWeather
function setBackground(temp, iconCode) {
  const isNight = iconCode.includes('n');
  const body = document.body;
  const app = document.querySelector('.app');
  const weatherCard = document.getElementById('weather-card');

  if (isNight) {
    if (temp <= 10) {
      body.style.background = 'linear-gradient(to bottom, #0f2027, #203a43, #2c5364)';
    } else if (temp <= 25) {
      body.style.background = 'linear-gradient(to bottom, #1e3c72, #2a5298)';
    } else {
      body.style.background = 'linear-gradient(to bottom, #0f0c29, #302b63, #24243e)';
    }

    body.style.color = '#f1f1f1';
    app.style.background = 'rgba(255, 255, 255, 0.05)';
    app.style.border = '1px solid rgba(255,255,255,0.1)';
    weatherCard.style.background = 'rgba(255, 255, 255, 0.08)';
  } else {
    if (temp <= 10) {
      body.style.background = 'linear-gradient(to right, #74ebd5, #ACB6E5)';
    } else if (temp <= 25) {
      body.style.background = 'linear-gradient(to right, #fbc2eb, #a6c1ee)';
    } else {
      body.style.background = 'linear-gradient(to right, #f12711, #f5af19)';
    }

    body.style.color = '#111';
    app.style.background = 'rgba(255, 255, 255, 0.9)';
    app.style.border = '1px solid #ddd';
    weatherCard.style.background = '#ffffffcc';
  }
}



