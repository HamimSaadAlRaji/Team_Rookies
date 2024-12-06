Here's a short README documentation for your web application. You can include this in your project's `README.md` file.

---

# Crime Map Web Application

This is a React-based web application that displays a crime map with interactive heatmaps and routing functionality. The app fetches crime data from an API and allows users to visualize crime occurrences based on location. It also allows users to interact with the map to view routing directions between two points.

## Features
- **Heatmap of Crimes**: Displays crime data as a heatmap, showing the concentration of crimes in a specific area.
- **Routing Directions**: Allows users to input two locations and view directions between them on the map.
- **Smooth Scroll Navigation**: Provides smooth scrolling to different sections of the page, like the Crime Map.
- **Responsive Design**: The map and search functionalities are designed to work on both desktop and mobile devices.

## Setup

To run the project locally, follow these steps:

### Prerequisites
- **Node.js** (version 16.x or higher)
- **npm** (Node package manager)

### Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/your-username/crime-map-app.git
    cd crime-map-app
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Start the development server**:
    ```bash
    npm start
    ```

4. Open your browser and go to `http://localhost:3000`.

## File Structure
- `src/`
  - `components/`
    - `Header/`: Contains the header component with the logo and navigation buttons.
    - `Map/`: Contains the map container and logic for displaying the crime heatmap.
    - `CrimeMap/`: Contains the crime map and related functionalities like fetching and displaying crime data.
  - `App.js`: The main component where all sections (Header, Map, CrimeMap) are combined.
  - `App.css`: Global styles for the app.
  - `Header.css`: Styles specific to the header component.
- `public/`
  - `index.html`: The HTML template for the React app.

## Dependencies
- **React**: The JavaScript library for building user interfaces.
- **Leaflet**: A JavaScript library for interactive maps.
- **React-Leaflet**: React components for Leaflet maps.
- **Leaflet Heatmap**: A Leaflet plugin to display heatmaps.
- **Leaflet Routing Machine**: A Leaflet plugin for route planning and directions.
- **React Anchor Link Smooth Scroll**: A smooth scroll library for anchor links.
- **Tailwind CSS**: A utility-first CSS framework for styling.

## Functionality
1. **Map**: The interactive map is initialized with a heatmap layer showing the crime data. Users can input start and end locations to view directions.
2. **Crime Map Section**: This section shows a crime map with data fetched from a public API (`https://data.police.uk/api/crimes-street`), filtered to display crimes in a particular category (e.g., `drugs`).
3. **Routing**: Users can input locations in the "From" and "To" search fields, and routing directions will be displayed between those two points.
4. **Smooth Scroll**: The header includes a button that smoothly scrolls to the Crime Map section of the page.

## Tailwind CSS Customization
- **Classes Used**:
  - `w-4/5`: 80% width of the parent container.
  - `my-8`: Vertical margin (top and bottom).
  - `text-3xl`: Font size for the header.
  - `font-semibold`: Semi-bold font weight for text.
  - `text-center`: Center-aligns text.
  - `mb-4`: Margin-bottom for spacing between elements.
  
  For more customization options, refer to the [Tailwind CSS documentation](https://tailwindcss.com/docs).
