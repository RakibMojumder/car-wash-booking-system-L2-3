# Car wash booking system API

Welcome to the Car Wash Booking System API! This API lets you manage and interact with a car washing booking service. You can use it to perform various operations related to car washing, such as creating services, managing services, and querying service details. Also, there is a slot system. Admin can generate slots for services.


## Technology
- TypeScript
- Express
- Mongoose
- Zod
- Cors
- JWT

## Base URL

The base URL for the API is: https://car-washing-system-api.vercel.app/

## API Endpoints

### User Routes

### 1\. User Sign Up

**Route**: `/api/auth/signup` (**POST**)

**Request Body:**

```json
{
  "name": "Programming Hero",
  "email": "web@programming-hero.com",
  "password": "ph-password",
  "phone": "1234567890",
  "role": "admin", //role can be user or admin
  "address": "123 Main Street, City, Country"
}
```

**Response**:

```json
{
  "success": true,
  "statusCode": 200,
  "message": "User registered successfully",
  "data": {
    "_id": "60629b8e8cfcd926384b6e5e",
    "name": "Programming Hero",
    "email": "web@programming-hero.com",
    "phone": "1234567890",
    "role": "admin",
    "address": "123 Main Street, City, Country",
    "createdAt": "2024-06-15T12:00:00Z",
    "updatedAt": "2024-06-15T12:00:00Z",
  }
}
```

###   

### 2\. User Login

**Route**: `/api/auth/login`(**POST**)

**Request Body:**

```json
{
    "email": "web@programming-hero.com",
    "password": "ph-password",
}
```

  

**Response:**

```json
{
    "success": true,
    "statusCode": 200,
    "message": "User logged in successfully",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MDYyOWI4ZThjZmNkOTI2Mzg0YjZlNWUiLCJuYW1lIjoiUHJvZ3JhbW1pbmcgSGVyb3MiLCJlbWFpbCI6IndlYkBwcm9ncmFtbWluZy1oZXJvLmNvbSIsInBob25lIjoiMTIzNDU2Nzg5MCIsInJvbGUiOiJhZG1pbiIsImFkZHJlc3MiOiIxMjMgTWFpbiBTdHJlZXQsIENpdHksIENvdW50cnkiLCJpYXQiOjE2MjQ1MTY2MTksImV4cCI6MTYyNDUyMDYxOX0.kWrEphO6lE9P5tvzrNBwx0sNogNuXpdyG-YoN9fB1W8",
    "data": {
        "_id": "60629b8e8cfcd926384b6e5e",
        "name": "Programming Hero",
        "email": "web@programming-hero.com",
        "phone": "1234567890",
        "role": "admin",
        "address": "123 Main Street, City, Country",
        "createdAt": "2024-06-15T12:00:00Z", 
        "updatedAt": "2024-06-15T12:00:00Z", 
    }
}
```

###

### **3\. Create Service (Only Accessible by Admin)**

**Route:** `/api/services`(**POST**)

**Request Headers:**

```javascript
Authorization: 
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmF
tZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c

```

**Request Body:**

```json
{
    "name": "Car Wash",
    "description": "Professional car washing service",
    "price": 50,
    "duration": 60, // Duration in minutes
    "isDeleted": false
}
```

**Response Body:**

```json
{
    "success": true,
    "statusCode": 200,
    "message": "Service created successfully",
    "data": {
        "_id": "60d9c4e4f3b4b544b8b8d1c5",
        "name": "Car Wash",
        "description": "Professional car washing service",
        "price": 50,
        "duration": 60,
        "isDeleted": false,
        "createdAt": "2024-06-15T12:00:00Z", 
        "updatedAt": "2024-06-15T12:00:00Z", 
    }
}
```

###   

### **4\. Get a Service**

**Route:** `/api/services/:id`(**GET**)

**Response:**

```json
{
    "success": true,
    "statusCode": 200,
    "message": "Service retrieved successfully",
    "data": {
        "_id": "60d9c4e4f3b4b544b8b8d1c5",
        "name": "Car Wash",
        "description": "Professional car washing service",
        "price": 50,
        "duration": 60,
        "isDeleted": false,
        "createdAt": "2024-06-15T12:00:00Z", 
        "updatedAt": "2024-06-15T12:00:00Z", 
    }
}
```

  

### **5\. Get All Services**

**Route:** `/api/services`(**GET**)

**Response:**

```json
{
    "success": true,
    "statusCode": 200,
    "message": "Services retrieved successfully",
    "data": [
        {
            "_id": "60d9c4e4f3b4b544b8b8d1c5",
            "name": "Car Wash",
            "description": "Professional car washing service",
            "price": 50,
            "duration": 60,
            "isDeleted": false,
            "createdAt": "2024-06-15T12:00:00Z", 
            "updatedAt": "2024-06-15T12:00:00Z", 
        },
        {
            "_id": "60d9c4e4f3b4b544b8b8d1c6",
            "name": "Oil Change",
            "description": "Regular engine oil change service",
            "price": 30,
            "duration": 30,
            "isDeleted": false,
            "createdAt": "2024-06-15T12:00:00Z",
            "updatedAt": "2024-06-15T12:00:00Z",
        },
        {
            "_id": "60d9c4e4f3b4b544b8b8d1c7",
            "name": "Tire Rotation",
            "description": "Rotation of vehicle tires",
            "price": 20,
            "duration": 45,
            "isDeleted": false,
            "createdAt": "2024-06-15T12:00:00Z",
            "updatedAt": "2024-06-15T12:00:00Z",
        }
    ]
}
```

  

### **6\. Update Services (Only Accessible by Admin)**

**Route:** `/api/services/:id`(**PUT**)

**Request Headers:**

```javascript
Authorization: 
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmF
tZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c

```

**Request Body:**

```json
{
    "price": 700 // You can include any attribute(s) of the service collection that you want to update, one or more.
}
```

**Response Body:**

```json
{
    "success": true,
    "statusCode": 200,
    "message": "Service updated successfully",
    "data": {
        "_id": "60d9c4e4f3b4b544b8b8d1c5",
        "name": "Car Wash",
        "description": "Professional car washing service",
        "price": 700,
        "duration": 60,
        "isDeleted": false,
        "createdAt": "2024-06-15T12:00:00Z", 
        "updatedAt": "2024-06-15T12:00:00Z",
    }
}
```
### 

### **7\. Delete a Service (Only Accessible by Admin)**

**Route:** `/api/services/:id`(**DELETE**) \[SOFT DELETE \]

**Request Headers:**

```javascript
Authorization: 
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmF
tZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c

```

**Response Body:**

```json
{
    "success": true,
    "statusCode": 200,
    "message": "Service deleted successfully",
    "data": {
        "_id": "60d9c4e4f3b4b544b8b8d1c5",
        "name": "Car Wash",
        "description": "Professional car washing service",
        "price": 50,
        "duration": 60,
        "isDeleted": true,
        "createdAt": "2024-06-15T12:00:00Z",
        "updatedAt": "2024-06-15T12:00:00Z",
    }
}
```

  

### 8.**Create Slot (Only Accessible by Admin)**

**Route:** `/api/slots`(**POST**)

**Request Headers:**

```javascript
Authorization: 
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmF
tZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
 
```

**Request Body:**

```json
{
    "service": "60d9c4e4f3b4b544b8b8d1c5",
    "date": "2024-06-15",
    "startTime": "09:00",
    "endTime": "14:00"
}
```

**Response Body:**

```json
{
    "success": true,
    "statusCode": 200,
    "message": "Slots created successfully",
    "data": [
        {
            "_id": "60d9c4e4f3b4b544b8b8d1c6",
            "service": "60d9c4e4f3b4b544b8b8d1c5",
            "date": "2024-06-15",
            "startTime": "09:00",
            "endTime": "10:00",
            "isBooked": "available",
            "createdAt": "2024-06-15T12:00:00Z",
            "updatedAt": "2024-06-15T12:00:00Z",
        },
        {
            "_id": "60d9c4e4f3b4b544b8b8d1c7",
            "service": "60d9c4e4f3b4b544b8b8d1c5",
            "date": "2024-06-15",
            "startTime": "10:00",
            "endTime": "11:00",
            "isBooked": "available",
            "createdAt": "2024-06-15T12:00:00Z",
            "updatedAt": "2024-06-15T12:00:00Z",
        },
        {
            "_id": "60d9c4e4f3b4b544b8b8d1c7",
            "service": "60d9c4e4f3b4b544b8b8d1c5",
            "date": "2024-06-15",
            "startTime": "11:00",
            "endTime": "12:00",
            "isBooked": "available",
            "createdAt": "2024-06-15T12:00:00Z",
            "updatedAt": "2024-06-15T12:00:00Z",
        },
        {
            "_id": "60d9c4e4f3b4b544b8b8d1c7",
            "service": "60d9c4e4f3b4b544b8b8d1c5",
            "date": "2024-06-15",
            "startTime": "12:00",
            "endTime": "13:00",
            "isBooked": "available",
            "createdAt": "2024-06-15T12:00:00Z",
            "updatedAt": "2024-06-15T12:00:00Z",
        },
        {
            "_id": "60d9c4e4f3b4b544b8b8d1c7",
            "service": "60d9c4e4f3b4b544b8b8d1c5",
            "date": "2024-06-15",
            "startTime": "13:00",
            "endTime": "14:00", 
            "isBooked": "available",
            "createdAt": "2024-06-15T12:00:00Z",
            "updatedAt": "2024-06-15T12:00:00Z",
        }
    ]
}
```
### **9\. Get available slots**

**Route:** `/api/slots/availability`(**GET**)

**Query Parameters:**

*   `date`: (Optional) The specific date for which available slots are requested (format: YYYY-MM-DD).
*   `serviceId`: (Optional) ID of the service for which available slots are requested.

  

**Request Example:**

```plain
  GET /api/slots/availability?date=2024-06-15&serviceId=60d9c4e4f3b4b544b8b8d1c5
```

  

**Response:**

```json
{
    "success": true,
    "statusCode": 200,
    "message": "Available slots retrieved successfully",
    "data": [
        {
            "_id": "60d9c4e4f3b4b544b8b8d1c6",
            "service": {
               "_id": "60d9c4e4f3b4b544b8b8d1c5",
                "name": "Car Wash",
                "description": "Professional car washing service",
                "price": 700,
                "duration": 60,
                "isDeleted": false,
                "createdAt": "2024-06-15T12:00:00Z", 
                "updatedAt": "2024-06-15T12:00:00Z"
             }, 
            "date": "2024-06-15", 
            "startTime": "09:00",
            "endTime": "10:00",
            "isBooked": "available",
            "createdAt": "2024-06-15T12:00:00Z", 
            "updatedAt": "2024-06-15T12:00:00Z"
        },
        {
            "_id": "60d9c4e4f3b4b544b8b8d1c9",
            "service": {
               "_id": "60d9c4e4f3b4b544b8b8d1c5",
                "name": "Car Wash",
                "description": "Professional car washing service",
                "price": 700,
                "duration": 60,
                "isDeleted": false,
                "createdAt": "2024-06-15T12:00:00Z", 
                "updatedAt": "2024-06-15T12:00:00Z"
             }, 
            "date": "2024-06-15",
            "startTime": "10:00",
            "endTime": "11:00",
            "isBooked": "canceled",
            "createdAt": "2024-06-15T12:00:00Z", 
            "updatedAt": "2024-06-15T12:00:00Z"
        }
    ]
}
```

### **10\. Book a Service (Only Accessible by User)**

**Route:** `/api/bookings`(**POST**)

**Request Headers:**

```javascript
Authorization: 
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmF
tZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c

```

**Request Body:**

```json
{
    "serviceId": "60d9c4e4f3b4b544b8b8d1c5",
    "slotId": "60d9c4e4f3b4b544b8b8d1c6",
    "vehicleType": "car",
    "vehicleBrand": "Toyota",
    "vehicleModel": "Camry",
    "manufacturingYear": 2020,
    "registrationPlate": "ABC123"
}
```

**Response Body:**

```json
{
    "success": true,
    "statusCode": 200,
    "message": "Booking successful",
    "data": {
        "_id": "60d9c4e4f3b4b544b8b8d1c7",
        "customer": {
            "_id": "123456789012345678901234",
            "name": "John Doe",
            "email": "johndoe@example.com",
            "phone": "1234567890",
            "address": "123 Main Street, City, Country"
        },
        "service": {
            "_id": "60d9c4e4f3b4b544b8b8d1c5",
            "name": "Car Wash",
            "description": "Exterior and interior car cleaning",
            "price": 50,
            "duration": 30,
            "isDeleted": false
        },
        "slot": {
            "_id": "60d9c4e4f3b4b544b8b8d1c6",
            "service": "60d9c4e4f3b4b544b8b8d1c5",
            "date": "2024-06-15",
            "startTime": "09:00",
            "endTime": "10:00",
            "isBooked": "booked"
        },
        "vehicleType": "car",
        "vehicleBrand": "Toyota",
        "vehicleModel": "Camry",
        "manufacturingYear": 2020,
        "registrationPlate": "ABC123",
        "createdAt": "2024-06-15T12:00:00Z", 
        "updatedAt": "2024-06-15T12:00:00Z", 
    }
}
```

  

### **11\. Get All Bookings (Only Accessible by Admin)**

**Route:** `/api/bookings`(**GET**)

**Request Headers:**

```javascript
Authorization: 
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmF
tZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c


```

**Response Body:**

```json
{
    "success": true,
    "statusCode": 200,
    "message": "All bookings retrieved successfully",
    "data": [
        {
            "_id": "60d9c4e4f3b4b544b8b8d1c7",
            "customer": {
                "_id": "123456789012345678901234",
                "name": "John Doe",
                "email": "johndoe@example.com",
                "phone": "1234567890",
                "address": "123 Main Street, City, Country"
            },
            "service": {
                "_id": "60d9c4e4f3b4b544b8b8d1c5",
                "name": "Car Wash",
                "description": "Exterior and interior car cleaning",
                "price": 50,
                "duration": 30,
                "isDeleted": false
            },
            "slot": {
                "_id": "60d9c4e4f3b4b544b8b8d1c6",
                "service": "60d9c4e4f3b4b544b8b8d1c5",
                "date": "2024-06-15",
                "startTime": "09:00",
                "endTime": "09:30",
                "isBooked": "booked"
            },
            "vehicleType": "car",
            "vehicleBrand": "Toyota",
            "vehicleModel": "Camry",
            "manufacturingYear": 2020,
            "registrationPlate": "ABC123",
            "createdAt": "2024-06-15T12:00:00Z",
            "updatedAt": "2024-06-15T12:00:00Z"
        },
        {
            "_id": "60d9c4e4f3b4b544b8b8d1c8",
            "customer": {
                "_id": "234567890123456789012345",
                "name": "Jane Smith",
                "email": "janesmith@example.com",
                "phone": "0987654321",
                "address": "456 Oak Street, City, Country"
            },
            "service": {
                "_id": "60d9c4e4f3b4b544b8b8d1c5",
                "name": "Car Wash",
                "description": "Exterior and interior car cleaning",
                "price": 50,
                "duration": 30,
                "isDeleted": false
            },
            "slot": {
                "_id": "60d9c4e4f3b4b544b8b8d1c9",
                "service": "60d9c4e4f3b4b544b8b8d1c5",
                "date": "2024-06-15",
                "startTime": "10:00",
                "endTime": "10:30",
                "isBooked": "canceled"
            },
            "vehicleType": "car",
            "vehicleBrand": "Honda",
            "vehicleModel": "Accord",
            "manufacturingYear": 2018,
            "registrationPlate": "XYZ456",
            "createdAt": "2024-06-15T13:00:00Z",
            "updatedAt": "2024-06-15T13:30:00Z"
        }
    ],

    // aditional bookings 
}
```

  

### **12\. Get User's Bookings (Only Accessible by User)**

**Route:** `/api/my-bookings`(**GET**)

**Request Headers:**

```javascript
Authorization: 
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmF
tZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c


```

**Response Body:**

```json
{
    "success": true,
    "statusCode": 200,
    "message": "User bookings retrieved successfully",
    "data": [
        {
            "_id": "60d9c4e4f3b4b544b8b8d1c7",
            "service": {
                "_id": "60d9c4e4f3b4b544b8b8d1c5",
                "name": "Car Wash",
                "description": "Exterior and interior car cleaning",
                "price": 50,
                "duration": 30,
                "isDeleted": false
            },
            "slot": {
                "_id": "60d9c4e4f3b4b544b8b8d1c6",
                "service": "60d9c4e4f3b4b544b8b8d1c5",
                "date": "2024-06-15",
                "startTime": "09:00",
                "endTime": "09:30",
                "isBooked": "booked"
            },
            "vehicleType": "car",
            "vehicleBrand": "Toyota",
            "vehicleModel": "Camry",
            "manufacturingYear": 2020,
            "registrationPlate": "ABC123",
            "createdAt": "2024-06-15T12:00:00Z",
            "updatedAt": "2024-06-15T12:00:00Z"
        }
    ]
}
```

##   
