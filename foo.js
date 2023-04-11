const majorCities = {
    cities: [
        { "name": "New York", "state": "New York" },
        { "name": "Los Angeles", "state": "California" },
        { "name": "Chicago", "state": "Illinois" },
        { "name": "Houston", "state": "Texas" },
        { "name": "Phoenix", "state": "Arizona" },
        { "name": "Philadelphia", "state": "Pennsylvania" },
        { "name": "San Antonio", "state": "Texas" },
        { "name": "San Diego", "state": "California" },
        { "name": "Dallas", "state": "Texas" },
        { "name": "San Jose", "state": "California" },
        { "name": "Austin", "state": "Texas" },
        { "name": "Jacksonville", "state": "Florida" },
        { "name": "Fort Worth", "state": "Texas" },
        { "name": "Columbus", "state": "Ohio" },
        { "name": "San Francisco", "state": "California" },
        { "name": "Charlotte", "state": "North Carolina" },
        { "name": "Indianapolis", "state": "Indiana" },
        { "name": "Seattle", "state": "Washington" },
        { "name": "Denver", "state": "Colorado" },
        { "name": "Washington", "state": "District of Columbia" },
        { "name": "Boston", "state": "Massachusetts" },
        { "name": "El Paso", "state": "Texas" },
        { "name": "Detroit", "state": "Michigan" },
        { "name": "Nashville", "state": "Tennessee" },
        { "name": "Portland", "state": "Oregon" },
        { "name": "Las Vegas", "state": "Nevada" },
        { "name": "Oklahoma City", "state": "Oklahoma" },
        { "name": "Atlanta", "state": "Georgia" },
        { "name": "New Orleans", "state": "Louisiana" },
        { "name": "Honolulu", "state": "Hawaii" }
    ]
}


const citiesMatch = (searchString) => {
    if (!searchString) return []; // return empty array if no search string

    let matchingCities = [];

    Object.values(majorCities.cities).forEach(cityObj => {
        const cityName = cityObj.name.toLowerCase();

        if (cityName.includes(searchString.toLowerCase())) {
            matchingCities.push(cityObj.name);
        }

    });

    return matchingCities;
}

