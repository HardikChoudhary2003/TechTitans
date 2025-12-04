const asyncHandler = require('express-async-handler');

// @desc    Get health info/advisories
// @route   GET /public/info
// @access  Public
const getHealthInfo = asyncHandler(async (req, res) => {
    const advisories = [
        {
            id: 1,
            title: 'Flu Season Advisory',
            content: 'Flu cases are rising. Please get your flu shot.',
            date: new Date().toISOString(),
            priority: 'High',
        },
        {
            id: 2,
            title: 'Heat Wave Warning',
            content: 'Extreme temperatures expected. Stay hydrated.',
            date: new Date().toISOString(),
            priority: 'Medium',
        },
        {
            id: 3,
            title: 'COVID-19 Booster',
            content: 'New boosters are available for eligible groups.',
            date: new Date().toISOString(),
            priority: 'Low',
        },
    ];
    res.status(200).json(advisories);
});

// @desc    Get facilities list
// @route   GET /public/facilities
// @access  Public
const getFacilities = asyncHandler(async (req, res) => {
    const facilities = [
        {
            id: 1,
            name: 'City General Hospital',
            address: '123 Main St, Cityville',
            phone: '555-0101',
            type: 'Hospital',
        },
        {
            id: 2,
            name: 'Community Health Clinic',
            address: '456 Oak Ave, Townsburg',
            phone: '555-0102',
            type: 'Clinic',
        },
        {
            id: 3,
            name: 'Sunrise Urgent Care',
            address: '789 Pine Ln, Villageton',
            phone: '555-0103',
            type: 'Urgent Care',
        },
    ];
    res.status(200).json(facilities);
});

module.exports = {
    getHealthInfo,
    getFacilities,
};
