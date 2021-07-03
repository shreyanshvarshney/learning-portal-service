const mongoose = require('mongoose');
const customRegex = require('../utils/custom-regex');

const classroomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name field is required'],
        unique: true,
        trim: true,
        maxLength: [50, 'name field can have maximum 50 characters'],
        minLength: [5, 'name field should have minimum 5 characters']
    },
    slug: {type: String},
    description: {
        type: String,
        required: [true, 'description field is required'],
        maxLength: [500, 'description field can have maximum 500 characters'],
        minLength: [5, 'description field should have minimum 5 characters']
    },
    website: {
        type: String,
        trim: true,
        match: [customRegex.url, 'Please enter a valid URL with HTTP or HTTPS in starting']
    },
    phone: {
        type: String,
        trim: true,
        maxLength: [20, 'Phone number cannot be longer than 20 characters']
    },
    email: {
        type: String,
        lowercase: true,
        trim: true,
        match: [customRegex.email, 'Please enter a valid email']
    },
    address: {
        type: String,
        required: [true, 'address field is required']
    },
    location: {
        // GeoJSON point is a format for storing geographic points 
        type: {
            type: String,
            enum: ['Point'], // 'location.type' must be 'Point'
            // required: true
        },
        coordinates: {
            type: [Number],
            // required: true,
            index: '2dsphere'
        },
        formattedAdress: String,
        country: String,
        city: String,
        zipcode: String,
        state: String,
        street: String
    },
    careers: {
        // Array of Strings
        type: [String],
        required: true,
        enum: [
            'Business',
            'Web Development',
            'Accounts',
            'Stock Market',
            'UI/UX',
            'Machine Learning',
            'Data Science',
            'Android Development',
            'Entrepreneurship',
            'Other'
        ]
    },
    // Will add students enrolled and seats available fields in this classroom schema later...

    averageRating: {
        type: Number,
        min: [1, 'rating field must be atleast 1'],
        max: [10, 'rating field cannot be more than 10']
    },
    averageCost: {type: Number},
    photo: {
        type: String,
        default: 'default-classroom.png'
    },
    accommodation: {
        type: Boolean,
        default: false
    },
    onlineDoubtsSupport: {
        type: Boolean,
        default: false
    },
    placementSupport: {
        type: Boolean,
        default: false
    },
    placementGuarantee: {
        type: Boolean,
        default: false
    },
    acceptGi: {
        type: Boolean,
        default: false
    }
},
{timestamps: true});

module.exports = mongoose.model('Classroom', classroomSchema);