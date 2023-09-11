const express = require('express');
const app = express();
const port = 3000;
const multer = require('multer');
const path = require('path');
const fs = require('fs'); // Choose any available port number
const fse = require('fs-extra');

app.use(express.urlencoded({ extended: true }));
app.use(express.static('./public'))
// Define routes and middleware
app.get('/', (req, res) => {
    res.render('index');
});

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         const propertyId = req.body.id; // Assuming you have a field for property ID in the form
//         const subfolderName = `./public/assets/images/properties/${propertyId}`;
//         fs.mkdirSync(subfolderName, { recursive: true });
//         cb(null, subfolderName);
//     },
//     filename: (req, file, cb) => {
//         cb(null, file.originalname);
//     }
// });
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const propertyTitle = req.body.title; // Assuming you have a field for property ID in the form
        // Create the new folder path with the property ID
        const subfolderName = `./public/assets/images/properties/${propertyTitle}`;
        fs.mkdirSync(subfolderName, { recursive: true });

        cb(null, subfolderName);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

// Route to serve the property form page
app.get('/property_form', (req, res) => {
    res.sendFile(path.join(__dirname, './public/property_form.html'));
});

// Route to handle form submission and save property details to JSON
app.post('/create_property', upload.array('images'), (req, res) => {
    // Read the existing property data from the JSON file
    console.log('Form Data:', req.body);
    const selectedAuthor = req.body.author;
    const selectedCategory = req.body.category;

    // Map the selected author to the corresponding author image filename

    // Get the filename of the selected author's image

    let properties = [];
    try {
        properties = require('./public/property.json');
    } catch (error) {
        console.error('Error reading property.json:', error);
    }

    // Get the last ID in the existing properties array
    const lastProperty = properties[properties.length - 1];
    let lastIdNumber = 0;

    if (lastProperty) {
        const lastId = lastProperty.id;
        const match = lastId.match(/(\d+)$/); // Extract numeric part from the ID
        if (match) {
            lastIdNumber = parseInt(match[1]); // Convert to integer
        }
    }

    // Create the new ID for the new property
    const newIdNumber = lastIdNumber + 1;
    const newPropertyId = `property-${req.body.title}`;

    // Create an array to store the file paths of the uploaded images
    const imagePaths = req.files.map((file) => `/assets/images/properties/${req.body.title}/${file.filename}`);

    const amenities = Array.isArray(req.body.amenities) ? req.body.amenities : [req.body.amenities];

    let authorName = '' 

    if(selectedAuthor === 'meidan'){
        authorName = 'מידן שויקי'
    }else if (selectedAuthor === 'oren'){
        authorName = 'אורן קארו'
    }else {
        authorName = 'יפעת שטרית'
    }


    // Create the new property object with the form data and image paths
    const newProperty = {
        id: newPropertyId,
        title: req.body.title,
        type: req.body.type,
        category: selectedCategory,
        author: authorName,
        price: req.body.price,
        description: req.body.shortDesc,
        beds: req.body.beds,
        baths: req.body.baths,
        sqFt: req.body.sqFt,
        link: "property-details.html", // You can set the link as needed

        // Assuming you have handled file uploads and have access to the image paths
        images: imagePaths,
        authorImage: `/assets/images/team/${selectedAuthor}.jpeg`, // Assuming you have the author image path as well
        amenities: amenities,
        location: req.body.location,
        floor: req.body.floor,
        buildingfloors: req.body.buildingfloors,
        longDesc: req.body.longDesc
    };

    // Append the new property to the existing properties array
    // properties.push(newProperty);

    let priority = req.body.priority;

    // If the priority field is empty or not a valid number, set it to the default (last index)
    if (!priority || isNaN(priority) || priority < 1 || priority > 9) {
        priority = properties.length + 1; // Add the property to the last index
    } else {
        priority = parseInt(priority); // Convert priority to an integer
    }

    // Add the property to the specified index (priority - 1) in the properties array
    properties.splice(priority - 1, 0, newProperty);

    // Write the updated array back to the JSON file
    fs.writeFile('./public/property.json', JSON.stringify(properties, null, 2), (error) => {
        if (error) {
            console.error('Error writing property.json:', error);
            res.sendStatus(500);
        } else {
            // For demonstration purposes, send back the new property object as a response
            res.json(newProperty);
        }
    });
});

app.get('/get_properties', (req, res) => {
    try {
      const properties = require('./public/property.json');
      res.json(properties);
    } catch (error) {
      console.error('Error reading properties.json:', error);
      res.sendStatus(500);
    }
  });

//   app.delete('/delete_property/:id', (req, res) => {
//     const id = req.params.id;

//     // Read the properties data from the JSON file
//     fs.readFile('./public/property.json', 'utf8', (error, data) => {
//         if (error) {
//             console.error('Error reading properties.json:', error);
//             res.sendStatus(500);
//         } else {
//             try {
//                 // Parse the JSON data into an array
//                 const properties = JSON.parse(data);

//                 // Find the index of the property with the given ID
//                 const propertyIndex = properties.findIndex((property) => property.id === id);

//                 if (propertyIndex !== -1) {
//                     // Remove the property from the array
//                     properties.splice(propertyIndex, 1);

//                     // Write the updated array back to the JSON file
//                     fs.writeFile('./public/property.json', JSON.stringify(properties, null, 2), (error) => {
//                         if (error) {
//                             console.error('Error writing properties.json:', error);
//                             res.sendStatus(500);
//                         } else {
//                             res.sendStatus(200);
//                         }
//                     });
//                 } else {
//                     // Property with the given ID not found
//                     res.sendStatus(404);
//                 }
//             } catch (error) {
//                 console.error('Error parsing properties data:', error);
//                 res.sendStatus(500);
//             }
//         }
//     });
// });


app.delete('/delete_property/:id', (req, res) => {
    const id = req.params.id;

    // Read the properties data from the JSON file
    fs.readFile('./public/property.json', 'utf8', (error, data) => {
        if (error) {
            console.error('Error reading properties.json:', error);
            res.sendStatus(500);
        } else {
            try {
                // Parse the JSON data into an array
                let properties = JSON.parse(data);

                // Find the index of the property with the given ID
                const propertyIndex = properties.findIndex((property) => property.id === id);

                if (propertyIndex !== -1) {
                    // Get the property to be deleted
                    const propertyToDelete = properties[propertyIndex];

                    // Remove the property from the array
                    properties.splice(propertyIndex, 1);

                    // Write the updated array back to the JSON file
                    fs.writeFile('./public/property.json', JSON.stringify(properties, null, 2), (error) => {
                        if (error) {
                            console.error('Error writing properties.json:', error);
                            res.sendStatus(500);
                        } else {
                            // Delete the property's image folder
                            const imagePath = `./public/assets/images/properties/${propertyToDelete.title}`;
                            fse.remove(imagePath, (error) => {
                                if (error) {
                                    console.error('Error deleting image folder:', error);
                                    res.sendStatus(500);
                                } else {
                                    res.sendStatus(200);
                                }
                            });
                        }
                    });
                } else {
                    // Property with the given ID not found
                    res.sendStatus(404);
                }
            } catch (error) {
                console.error('Error parsing properties data:', error);
                res.sendStatus(500);
            }
        }
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});