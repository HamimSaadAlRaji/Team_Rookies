from flask import Flask, jsonify, request
import numpy as np
import joblib
import pandas as pd
from skl2onnx.common.data_types import FloatTensorType

# Initialize the Flask application
app = Flask(__name__)

# Load the model and preprocessing objects
model = joblib.load("crime_prediction_model.pkl")
label_encoders = joblib.load("label_encoders.pkl")
scaler = joblib.load("scaler.pkl")

# Function to handle unseen labels
def transform_label(encoder, value, default_value):
    try:
        return encoder.transform([value])[0]
    except ValueError:
        if default_value in encoder.classes_:
            return encoder.transform([default_value])[0]
        else:
            # If the default value is also not in the classes, return the first class as a fallback
            return encoder.transform([encoder.classes_[0]])[0]

# Define an endpoint to get predictions
@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get the user input from the request body
        user_input = request.get_json()

        # Extract date and time information
        date = pd.to_datetime(user_input['date'])
        hour = int(user_input['time'].split(':')[0])

        # Prepare the features
        user_features_df = pd.DataFrame([[
            user_input['lat'],
            user_input['lon'],
            date.year,
            date.month,
            date.day,
            hour,
            30,  # Example age
            transform_label(label_encoders['Vict Sex'], 'M', 'M'),  # Example sex
            transform_label(label_encoders['Vict Descent'], 'W', 'W'),  # Example descent
            transform_label(label_encoders['Premis Desc'], 'STREET', 'STREET'),  # Example premise
            transform_label(label_encoders['Weapon Desc'], 'NONE', 'NONE'),  # Example weapon
            transform_label(label_encoders['Status Desc'], 'COMPLETED', 'COMPLETED')  # Example status
        ]], columns=['LAT', 'LON', 'year', 'month', 'day', 'hour', 'Vict Age', 'Vict Sex', 'Vict Descent', 'Premis Desc', 'Weapon Desc', 'Status Desc'])

        # Standardize the features
        user_features = scaler.transform(user_features_df)

        # Predict crime type and probability
        crime_type = model.predict(user_features)[0]
        crime_probability = model.predict_proba(user_features).max()

        # Get the original label for the predicted crime type
        crime_type_encoder = label_encoders['Crm Cd Desc']
        predicted_crime_label = crime_type_encoder.inverse_transform([crime_type])[0]

        # Return the response as a JSON object
        response = {
            "crime_type": predicted_crime_label,
            "probability": round(crime_probability * 100, 2)
        }
        return jsonify(response)

    except Exception as e:
        return jsonify({"error": str(e)}), 400

# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True)


# http://127.0.0.1:5000/predict