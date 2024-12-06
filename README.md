# Crime Prediction API

This repository contains a Flask-based API that predicts the possibility of crime based on user input. The model uses various features such as date, time, latitude, and longitude to make predictions.

 
- `api.py`: The main Flask application that handles prediction requests.
- `crime_prediction_model.pkl`: The pre-trained crime prediction model.
- `label_encoders.pkl`: Encoders for categorical features.
- `scaler.pkl`: Scaler for standardizing features.
- `predict.js`: A Node.js script to test the API.

## Setup

1. Clone the repository:
    ```sh
    git clone <repository-url>
    cd <repository-directory>
    ```

2. Install the required Python packages:
    ```sh
    pip install -r requirements.txt
    ```

3. Run the Flask application:
    ```sh
    python api.py
    ```

## API Endpoint

### POST /predict

Predicts the possibility of crime based on the provided input.

#### Request Body

```json
{
    "date": "YYYY-MM-DD",
    "time": "HH:MM",
    "lat": "float",
    "lon": "float"
}

##### Response

```json
{
    "crime_type": "string",
    "probability": float
}