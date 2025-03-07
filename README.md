
---

# **Tableau Weather Connector**  
🚀 **A Web Data Connector (WDC) for Tableau that fetches real-time weather and air pollution data from OpenWeather API.**  

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)  
[![Tableau Web Data Connector](https://img.shields.io/badge/Tableau-WDC-orange)](https://www.tableau.com/developer/tools/web-data-connector)  

## 📌 **Overview**  
This **Tableau Web Data Connector (WDC)** allows users to retrieve **5-day weather forecasts** and **air pollution data** from the **OpenWeather API** and visualize it directly in Tableau. It integrates **temperature, humidity, wind speed, air quality index (AQI), and more.**  

---

## 🔧 **Features**  
✅ **Real-Time Weather Forecasts** (Temperature, Humidity, Pressure, Wind, etc.)  
✅ **Air Pollution Data** (AQI, CO, NO₂, SO₂, PM2.5, PM10, etc.)  
✅ **Seamless Integration with Tableau** via Web Data Connector (WDC)  
✅ **Fully Customizable API Calls** for location-based data retrieval  

---

## 🚀 **Installation & Setup**  

### **Step 1: Clone the Repository**  
Open your terminal and run:  
```sh
git clone https://github.com/analysisbyvivek/Tableau-Web-data-connector.git
cd Tableau-Web-data-connector
```

### **Step 2: Add API Keys**  
Edit `weatherConnector.js` and replace `YOUR_API_KEY_HERE` with your actual OpenWeather API keys:  
```js
const WEATHER_API_KEY = "YOUR_WEATHER_API_KEY_HERE";
const POLLUTION_API_KEY = "YOUR_POLLUTION_API_KEY_HERE";
```

---

### **🚀 Usage Guide**  

Here’s the fixed version with proper image placement:  

### **1️⃣ Start Tableau & Open the Web Data Connector**  
- Launch **Tableau Desktop**  
- Navigate to **"Connect" > "To a Server" > "Web Data Connector"**  

![Screenshot 2025-03-07 at 2 49 15 PM](https://github.com/user-attachments/assets/629c6ac0-a00a-40b5-90d0-3bf63407c277)

- **Enter the URL** of your hosted `index.html` file 

---

### **2️⃣ Host the Web Data Connector Locally (Fast & Easy with Node.js)**  

**🔹 If you have Node.js installed, follow these steps:**  

📌 **Step 1: Install `http-server` (Only once)**  
```bash
npm install -g http-server
```  

📌 **Step 2: Start the server inside your project folder**  
```bash
http-server
```  

➡️ Your Web Data Connector will be available at:  
🌍 **http://localhost:8080/** (default)  

📌 **Optional:** Change the port if needed  
```bash
http-server -p 3000
```  
🌍 **http://localhost:3000/**  

---

### **3️⃣ Configure Your OpenWeather API Keys**  
- Open `connector.js`  
- Replace `"YOUR_WEATHER_API_KEY_HERE"` and `"YOUR_POLLUTION_API_KEY_HERE"` with your actual API keys  

---

### **4️⃣ Fetch & Visualize Weather Data in Tableau**  
- Click **Update Now** in Tableau to pull the latest data  
- Create **insightful visualizations** using weather & air pollution metrics  

---

### **🔹 Next Steps:**  
- **Deploy the connector** on a server for remote access  
- **Automate data refreshes** using Tableau’s extract scheduling  

🎯 **You’re all set to analyze weather & air quality data in Tableau! 🚀** 

---

## 📊 **Data Fields**  
The following data fields are retrieved and structured in Tableau:  

| **Category** | **Field Name** | **Description** |
|-------------|--------------|----------------|
| **Weather** | `temp` | Temperature (°C) |
|  | `feels_like` | Feels Like Temperature (°C) |
|  | `humidity` | Humidity (%) |
|  | `pressure` | Atmospheric Pressure (hPa) |
|  | `wind_speed` | Wind Speed (m/s) |
| **Air Pollution** | `aqi` | Air Quality Index (1-5) |
|  | `co` | Carbon Monoxide (µg/m³) |
|  | `no2` | Nitrogen Dioxide (µg/m³) |
|  | `pm2_5` | Fine Particulate Matter (µg/m³) |

---

## 🛠 **Customization**  
Want to fetch data for a **different city or country**?  
Modify the API request in `connector.js`:  
```js
const weatherAPIURL = `https://api.openweathermap.org/data/2.5/forecast?q=YourCity&appid=${WEATHER_API_KEY}`;
```

---

## 📜 **License**  
This project is licensed under the [MIT License](LICENSE).  

---

## 🤝 **Contributing**  
Want to improve this project? Feel free to:  
✅ Fork the repo  
✅ Submit a Pull Request  
✅ Report issues in the **Issues** section  

---

> **⭐ If you find this project helpful, give it a star on GitHub!** 🚀  

---
