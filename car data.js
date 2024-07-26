
const cars = [
    {
        "id": 1,
        "car_model": "Maruti Suzuki Swift",
        "type": "Hatchback",
        "seats": 5,
        "price_per_day": 1200,
        "available": 10,
        "location": "Mumbai"
    },
    {
        "id": 2,
        "car_model": "Hyundai i20",
        "type": "Hatchback",
        "seats": 5,
        "price_per_day": 1300,
        "available": 8,
        "location": "Mumbai"
    },
    {
        "id": 3,
        "car_model": "Honda Amaze",
        "type": "Sedan",
        "seats": 5,
        "price_per_day": 1500,
        "available": 6,
        "location": "Delhi"
    },
    {
        "id": 4,
        "car_model": "Toyota Innova Crysta",
        "type": "SUV",
        "seats": 7,
        "price_per_day": 2500,
        "available": 4,
        "location": "Delhi"
    },
    {
        "id": 5,
        "car_model": "Maruti Suzuki Baleno",
        "type": "Hatchback",
        "seats": 5,
        "price_per_day": 1100,
        "available": 7,
        "location": "Mumbai"
    },
    {
        "id": 6,
        "car_model": "Hyundai Verna",
        "type": "Sedan",
        "seats": 5,
        "price_per_day": 1400,
        "available": 5,
        "location": "Delhi"
    },
    {
        "id": 7,
        "car_model": "Mahindra XUV500",
        "type": "Sedan",
        "seats": 5,
        "price_per_day": 2800,
        "available": 3,
        "location": "Mumbai"
    },
    {
        "id": 8,
        "car_model": "Tata Tiago",
        "type": "Hatchback",
        "seats": 5,
        "price_per_day": 1000,
        "available": 9,
        "location": "Mumbai"
    },
    {
        "id": 9,
        "car_model": "Ford Aspire",
        "type": "Sedan",
        "seats": 5,
        "price_per_day": 1350,
        "available": 6,
        "location": "Delhi"
    },
    {
        "id": 10,
        "car_model": "Mahindra Scorpio",
        "type": "SUV",
        "seats": 7,
        "price_per_day": 2600,
        "available": 4,
        "location": "Delhi"
    },
    {
        "id": 11,
        "car_model": "Renault Kwid",
        "type": "Hatchback",
        "seats": 5,
        "price_per_day": 950,
        "available": 12,
        "location": "Mumbai"
    },
    {
        "id": 12,
        "car_model": "Honda City",
        "type": "Sedan",
        "seats": 5,
        "price_per_day": 1700,
        "available": 7,
        "location": "Delhi"
    },
    {
        "id": 13,
        "car_model": "Maruti Suzuki Ertiga",
        "type": "SUV",
        "seats": 7,
        "price_per_day": 2300,
        "available": 5,
        "location": "Delhi"
    },
    {
        "id": 14,
        "car_model": "Volkswagen Polo",
        "type": "Hatchback",
        "seats": 5,
        "price_per_day": 1250,
        "available": 8,
        "location": "Mumbai"
    },
    {
        "id": 15,
        "car_model": "Hyundai Aura",
        "type": "Sedan",
        "seats": 5,
        "price_per_day": 1450,
        "available": 6,
        "location": "Delhi"
    },
    {
        "id": 16,
        "car_model": "Mahindra Thar",
        "type": "SUV",
        "seats": 4,
        "price_per_day": 3000,
        "available": 3,
        "location": "Mumbai"
    },
    {
        "id": 17,
        "car_model": "Toyota Etios",
        "type": "Sedan",
        "seats": 5,
        "price_per_day": 1550,
        "available": 4,
        "location": "Delhi"
    },
    {
        "id": 18,
        "car_model": "Maruti Suzuki Vitara Brezza",
        "type": "SUV",
        "seats": 5,
        "price_per_day": 1550,
        "available": 4,
        "location": "Mumbai"
    },
    {
        "id": 19,
        "car_model": "Ford EcoSport",
        "type": "SUV",
        "seats": 5,
        "price_per_day": 2200,
        "available": 6,
        "location": "Delhi"
    },
    {
        "id": 20,
        "car_model": "Renault Duster",
        "type": "SUV",
        "seats": 5,
        "price_per_day": 2100,
        "available": 7,
        "location": "Mumbai"
    },
    {
        "id": 21,
        "car_model": "Maruti Suzuki Celerio",
        "type": "Hatchback",
        "seats": 5,
        "price_per_day": 1100,
        "available": 8,
        "location": "Mumbai"
    },
    {
        "id": 22,
        "car_model": "Tata Nexon",
        "type": "SUV",
        "seats": 5,
        "price_per_day": 2300,
        "available": 5,
        "location": "Delhi"
    },
    {
        "id": 23,
        "car_model": "Hyundai Grand i10",
        "type": "Hatchback",
        "seats": 5,
        "price_per_day": 1150,
        "available": 7,
        "location": "Mumbai"
    },
    {
        "id": 24,
        "car_model": "Mahindra Bolero",
        "type": "SUV",
        "seats": 7,
        "price_per_day": 2400,
        "available": 4,
        "location": "Delhi"
    },
    {
        "id": 25,
        "car_model": "Honda WR-V",
        "type": "SUV",
        "seats": 5,
        "price_per_day": 2250,
        "available": 6,
        "location": "Mumbai"
    },
    {
        "id": 26,
        "car_model": "Volkswagen Vento",
        "type": "Sedan",
        "seats": 5,
        "price_per_day": 1600,
        "available": 5,
        "location": "Delhi"
    },
    {
        "id": 27,
        "car_model": "Ford Figo",
        "type": "Hatchback",
        "seats": 5,
        "price_per_day": 1250,
        "available": 8,
        "location": "Mumbai"
    },
    {
        "id": 28,
        "car_model": "Toyota Yaris",
        "type": "Sedan",
        "seats": 5,
        "price_per_day": 1750,
        "available": 4,
        "location": "Delhi"
    },
    {
        "id": 29,
        "car_model": "Mahindra Marazzo",
        "type": "SUV",
        "seats": 7,
        "price_per_day": 2700,
        "available": 3,
        "location": "Mumbai"
    },
    {
        "id": 30,
        "car_model": "Hyundai Venue",
        "type": "SUV",
        "seats": 5,
        "price_per_day": 2150,
        "available": 7,
        "location": "Delhi"
    }
]
