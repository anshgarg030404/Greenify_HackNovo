from flask import Flask, jsonify
import serial
import threading

# === CONFIGURATION ===
COM_PORT = "COM5"  # <- CHANGE THIS if needed
BAUD_RATE = 9600

# === FLASK SETUP ===
app = Flask(__name__)
latest_data = {"solar": None, "temp": None, "humidity": None}

# === SERIAL READER FUNCTION ===
def read_serial():
    global latest_data
    try:
        ser = serial.Serial(COM_PORT, BAUD_RATE, timeout=1)
        print(f"✅ Connected to {COM_PORT}")

        while True:
            if ser.in_waiting:
                line = ser.readline().decode("utf-8", errors='ignore').strip()
                print("📥 Received:", line)

                # Example: Solar:2.45, Temp:26.5, Humidity:51.2
                try:
                    parts = [p.strip() for p in line.split(',')]
                    for part in parts:
                        key_value = part.split(':')
                        if len(key_value) != 2:
                            continue
                        key, value = key_value[0].lower(), key_value[1]
                        if "solar" in key:
                            latest_data["solar"] = float(value)
                        elif "temp" in key:
                            latest_data["temp"] = float(value)
                        elif "humidity" in key:
                            latest_data["humidity"] = float(value)
                except Exception as e:
                    print(f"⚠️ Parsing error: {e}")
    except Exception as e:
        print(f"❌ Serial connection error: {e}")

# === START SERIAL THREAD ===
threading.Thread(target=read_serial, daemon=True).start()

# === ROOT ROUTE ===
@app.route("/")
def home():
    return "<h1>Welcome to the Sensor Data API!</h1><p>Visit <a href='/data'>/data</a> to see the latest readings.</p>"

# === API ENDPOINT ===
@app.route("/data")
def get_data():
    try:
        solar_val = latest_data["solar"]
        status = "N/A"

        # Health simulation logic (like Arduino code)
        if solar_val is not None:
            if solar_val >= 1.5:
                status = "✅ Healthy Panel"
            elif solar_val >= 0.8:
                status = "⚠ Needs Cleaning / Shaded"
            else:
                status = "❌ Possibly Damaged / Poor Light"

        safe_data = {
            "solar": solar_val if solar_val is not None else "N/A",
            "status": status,
            "temp": latest_data["temp"] if latest_data["temp"] is not None else "N/A",
            "humidity": latest_data["humidity"] if latest_data["humidity"] is not None else "N/A"
        }
        return jsonify(safe_data)
    except Exception as e:
        print(f"❌ Error in /data route: {e}")
        return jsonify({"error": str(e)}), 500

# === RUN FLASK SERVER ===
if __name__ == "__main__":
    print("🚀 Starting Flask server at http://127.0.0.1:5000/")
    app.run(debug=False)
