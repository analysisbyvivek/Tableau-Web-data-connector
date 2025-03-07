(function () {
    var myConnector = tableau.makeConnector();

    // API Configuration - Replace with your actual API keys
    const WEATHER_API_KEY = "YOUR_WEATHER_API_KEY_HERE";
    const POLLUTION_API_KEY = "YOUR_POLLUTION_API_KEY_HERE";

    // Location settings (Change as needed)
    const CITY = "Norway"; // Modify for different locations
    const COORDS = { lat: 60.4720, lon: 8.4689 }; // Modify for different coordinates

    myConnector.getSchema = function (schemaCallback) {
        var cols = [
            { id: "dt", alias: "Timestamp", dataType: tableau.dataTypeEnum.datetime },
            { id: "temp", alias: "Temperature (°C)", dataType: tableau.dataTypeEnum.float },
            { id: "feels_like", alias: "Feels Like (°C)", dataType: tableau.dataTypeEnum.float },
            { id: "temp_min", alias: "Min Temperature (°C)", dataType: tableau.dataTypeEnum.float },
            { id: "temp_max", alias: "Max Temperature (°C)", dataType: tableau.dataTypeEnum.float },
            { id: "pressure", alias: "Pressure (hPa)", dataType: tableau.dataTypeEnum.float },
            { id: "humidity", alias: "Humidity (%)", dataType: tableau.dataTypeEnum.float },
            { id: "weather_main", alias: "Weather Condition", dataType: tableau.dataTypeEnum.string },
            { id: "weather_desc", alias: "Weather Description", dataType: tableau.dataTypeEnum.string },
            { id: "wind_speed", alias: "Wind Speed (m/s)", dataType: tableau.dataTypeEnum.float },
            { id: "wind_deg", alias: "Wind Direction (°)", dataType: tableau.dataTypeEnum.float },
            { id: "cloudiness", alias: "Cloudiness (%)", dataType: tableau.dataTypeEnum.float },
            { id: "rain_3h", alias: "Rain Volume (last 3h, mm)", dataType: tableau.dataTypeEnum.float },
            { id: "snow_3h", alias: "Snow Volume (last 3h, mm)", dataType: tableau.dataTypeEnum.float },
            { id: "aqi", alias: "Air Quality Index", dataType: tableau.dataTypeEnum.float },
            { id: "co", alias: "CO (µg/m³)", dataType: tableau.dataTypeEnum.float },
            { id: "no", alias: "NO (µg/m³)", dataType: tableau.dataTypeEnum.float },
            { id: "no2", alias: "NO₂ (µg/m³)", dataType: tableau.dataTypeEnum.float },
            { id: "o3", alias: "O₃ (µg/m³)", dataType: tableau.dataTypeEnum.float },
            { id: "so2", alias: "SO₂ (µg/m³)", dataType: tableau.dataTypeEnum.float },
            { id: "pm2_5", alias: "PM₂.₅ (µg/m³)", dataType: tableau.dataTypeEnum.float },
            { id: "pm10", alias: "PM₁₀ (µg/m³)", dataType: tableau.dataTypeEnum.float },
            { id: "nh3", alias: "NH₃ (µg/m³)", dataType: tableau.dataTypeEnum.float }
        ];

        var tableSchema = {
            id: "WeatherAndAirPollutionForecast",
            alias: `5-day Weather and Air Pollution Forecast for ${CITY}`,
            columns: cols
        };

        schemaCallback([tableSchema]);
    };

    myConnector.getData = function (table, doneCallback) {
        var weatherAPIURL = `https://api.openweathermap.org/data/2.5/forecast?q=${CITY}&appid=${WEATHER_API_KEY}`;

        fetch(weatherAPIURL)
            .then(response => response.json())
            .then(weatherData => {
                if (!weatherData.list) {
                    console.error("Invalid weather data response:", weatherData);
                    return;
                }

                var startTimestamp = weatherData.list[0].dt;
                var endTimestamp = weatherData.list[weatherData.list.length - 1].dt;
                var pollutionAPIURL = `https://api.openweathermap.org/data/2.5/air_pollution/history?lat=${COORDS.lat}&lon=${COORDS.lon}&start=${startTimestamp}&end=${endTimestamp}&appid=${POLLUTION_API_KEY}`;

                fetch(pollutionAPIURL)
                    .then(response => response.json())
                    .then(pollutionData => {
                        if (!pollutionData.list) {
                            console.error("Invalid air pollution data response:", pollutionData);
                            return;
                        }

                        var tableData = [];
                        weatherData.list.forEach((entry, index) => {
                            var pollution = pollutionData.list[index] || {};
                            tableData.push({
                                "dt": new Date(entry.dt * 1000).toISOString().slice(0, 19).replace("T", " "),
                                "temp": (entry.main.temp - 273.15).toFixed(2),
                                "feels_like": (entry.main.feels_like - 273.15).toFixed(2),
                                "temp_min": (entry.main.temp_min - 273.15).toFixed(2),
                                "temp_max": (entry.main.temp_max - 273.15).toFixed(2),
                                "pressure": entry.main.pressure,
                                "humidity": entry.main.humidity,
                                "weather_main": entry.weather[0].main,
                                "weather_desc": entry.weather[0].description,
                                "wind_speed": entry.wind.speed,
                                "wind_deg": entry.wind.deg,
                                "cloudiness": entry.clouds.all,
                                "rain_3h": entry.rain ? entry.rain["3h"] : 0,
                                "snow_3h": entry.snow ? entry.snow["3h"] : 0,
                                "aqi": pollution.main ? pollution.main.aqi : null,
                                "co": pollution.components ? pollution.components.co : null,
                                "no": pollution.components ? pollution.components.no : null,
                                "no2": pollution.components ? pollution.components.no2 : null,
                                "o3": pollution.components ? pollution.components.o3 : null,
                                "so2": pollution.components ? pollution.components.so2 : null,
                                "pm2_5": pollution.components ? pollution.components.pm2_5 : null,
                                "pm10": pollution.components ? pollution.components.pm10 : null,
                                "nh3": pollution.components ? pollution.components.nh3 : null
                            });
                        });

                        table.appendRows(tableData);
                        doneCallback();
                    })
                    .catch(error => console.error("Error fetching air pollution data:", error));
            })
            .catch(error => console.error("Error fetching weather data:", error));
    };

    tableau.registerConnector(myConnector);

    function send() {
        tableau.connectionName = `Weather and Air Pollution Forecast for ${CITY}`;
        tableau.submit();
    }

    window.send = send;
})();
