from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/calculate', methods=['POST'])
def calculate():
    data = request.get_json()
    passenger_number = data['passengerNumber']
    taxi_fare = data['taxiFare']
  
    if not isinstance(passenger_number, (int, float)) or not isinstance(taxi_fare, (int, float)):
        return jsonify({'error': 'Invalid input'}), 400

    driver_cash = passenger_number * taxi_fare
    return jsonify({'driverCash': driver_cash})

if __name__ == '__main__':
    app.run(debug=True)
