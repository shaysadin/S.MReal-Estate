howMany = 12;
listButton = $('button.list-view');
gridButton = $('button.grid-view');
wrapper = $('div.wrapper');
const wrapperDiv = document.getElementById('div-wrapper');

listButton.on('click',function(){
    
  gridButton.removeClass('on');
  listButton.addClass('on');
  wrapper.removeClass('grid').addClass('list');
  
});

gridButton.on('click',function(){
    
  listButton.removeClass('on');
  gridButton.addClass('on');
  wrapper.removeClass('list').addClass('grid');
  
});

const maxPropertiesToShow = 12;
let currentPage = 1;

function generatePropertyList(property) {
  let imageElement = '';

  // Check if the 'image' field is present and it is an array with at least one element
  if (property.images && Array.isArray(property.images) && property.images.length > 0) {
    imageElement = `<figure class="image"><img src="${property.images[0]}" alt=""></figure>`;
  } else {
    // If 'image' is missing or empty, you can provide a default image or an error message
    imageElement = '<figure class="image"><img src="assets/images/feature/feature-1.jpg" alt="No Image Available"></figure>';
  }
  
  return `
    <div class="deals-block-one">
    <div class="inner-box">
        <div class="image-box">
        ${imageElement}
            <div class="batch"><i class="icon-11"></i></div>
            <span class="category">${property.category}</span>
            <div class="buy-btn"><a href="property-details.html?id=${property.id}">${property.type}</a></div>
        </div>
        <div class="lower-content">
            <div class="title-text"><h4><a href="property-details.html?id=${property.id}">${property.title}</a></h4></div>
            <div class="price-box clearfix">
                <div class="price-info pull-left">
                    <h6>מחיר</h6>
                    <h4>₪${property.price}</h4>
                </div>
                <div class="author-box pull-right">
                    <figure class="author-thumb"> 
                    <img src="${property.authorImage}" alt="">
                        <span>${property.author}</span>
                    </figure>
                </div>
            </div>
            <p>${property.description}</p>
            <ul class="more-details clearfix">
            <li><i class="icon-14"></i>${property.beds} חדרים</li>
              <li><i class="icon-15"></i>${property.baths} ח'ד רחצה</li>
              <li><i class="icon-16"></i>${property.sqFt} מ"ר</li>
            </ul>
            <div class="other-info-box clearfix">
                <div class="btn-box pull-left"><a href="property-details.html?id=${property.id}" class="theme-btn btn-two">לצפייה בנכס</a></div>
                <ul class="other-option pull-right clearfix">
                    <li><a href="property-details.html?id=${property.id}"><i class="icon-12"></i></a></li>
                    <li><a href="property-details.html?id=${property.id}"><i class="icon-13"></i></a></li>
                </ul>
            </div>
        </div>
    </div>
</div>
  `;
}

// Function to generate property blocks HTML for grid view
function generatePropertyGrid(property) {
  let imageElement = '';

  // Check if the 'image' field is present and it is an array with at least one element
  if (property.images && Array.isArray(property.images) && property.images.length > 0) {
    imageElement = `<figure class="image"><img src="${property.images[0]}" alt=""></figure>`;
  } else {
    // If 'image' is missing or empty, you can provide a default image or an error message
    imageElement = '<figure class="image"><img src="assets/images/feature/feature-1.jpg" alt="No Image Available"></figure>';
  }

  return `
  <div class="col-lg-6 col-md-6 col-sm-12 feature-block">
  <div class="feature-block-one">
      <div class="inner-box">
          <div class="image-box">
              ${imageElement}
              <div class="batch"><i class="icon-11"></i></div>
              <span class="category">${property.category}</span>
          </div>
          <div class="lower-content">
              <div class="author-info clearfix">
                  <div class="author pull-left">
                      <figure class="author-thumb"><img src="${property.authorImage}" alt=""></figure>
                      <h6>${property.author}</h6>
                  </div>
                  <div class="buy-btn pull-right"><a href="property-details.html?id=${property.id}">${property.type}</a></div>
              </div>
              <div class="title-text"><h4><a href="property-details.html?id=${property.id}">${property.title}</a></h4></div>
              <div class="price-box clearfix">
                  <div class="price-info pull-left">
                      <h6>מחיר</h6>
                      <h4>₪${property.price}</h4>
                  </div>
                  <ul class="other-option pull-right clearfix">
                      <li><a href="property-details.html?id=${property.id}"><i class="icon-12"></i></a></li>
                      <li><a href="property-details.html?id=${property.id}"><i class="icon-13"></i></a></li>
                  </ul>
              </div>
              <p>${property.description}</p>
              <ul class="more-details clearfix">
              <li><i class="icon-14"></i>${property.beds} חדרים</li>
              <li><i class="icon-15"></i>${property.baths} ח'ד רחצה</li>
              <li><i class="icon-16"></i>${property.sqFt} מ"ר</li>
              </ul>
              <div class="btn-box"><a href="property-details.html?id=${property.id}" class="theme-btn btn-two">לצפייה בנכס</a></div>
          </div>
      </div>
  </div>
</div>
  `;
}

// Initial load: Fetch the JSON data and display properties in grid view by default
function fetchPropertiesData() {
  return fetch('/get_properties')
    .then((response) => response.json())
    .then((data) => {
      // Loop through the properties and add 'amenities' property if missing
      propertiesData = data.map((property) => {
        if (!property.amenities) {
          property.amenities = []; // Add empty array if 'amenities' property is missing
        }
        return property;
      });
    })
    .catch((error) => {
      console.error('Error fetching properties data:', error);
    });
}



// Event listener for list button click
listButton.on('click', filterProperties );

// Event listener for grid button click
gridButton.on('click', filterProperties);

let propertiesData;



// function filterProperties() {
  
//   fetchPropertiesData().then(() => {
//   const propertyCategory = document.querySelector('.select-box select[name="propCategory"]').value;
//   const propertyLocation = document.querySelector('.select-box select[name="propertyLocation"]').value;
//   const maxRooms = document.querySelector('.select-box select[name="maxRooms"]').value;
//   const propertyType = document.querySelector('.select-box select[name="propertyType"]').value;
//   const propertyPriceRange = document.querySelector('.select-box select[name="propertyPriceRange"]').value;

//   console.log('propertyCategory:', propertyCategory);
//   console.log('propertyLocation:', propertyLocation);
//   console.log('maxRooms:', maxRooms);
//   console.log('propertyType:', propertyType);
//   console.log('propertyPriceRange:', propertyPriceRange);

//   console.log(propertiesData);
//   const filteredProperties = propertiesData.filter((property) => {
//     let match = true;
//     if (propertyCategory !== 'הכל' && property.category !== propertyCategory) {
//       match = false;
//     }
//     if (propertyLocation !== 'הכל' && property.location !== propertyLocation) {
//       match = false;
//     }
//     if (propertyType !== 'הכל' && property.type !== propertyType) {
//       match = false;
//     }
//     // Add more filtering criteria as needed
//     // ...
//     if (maxRooms === '2+ Rooms' && property.beds < 2) {
//       match = false;
//     }
//     if (maxRooms === '3+ Rooms' && property.beds < 3) {
//       match = false;
//     }
//     if (maxRooms === '4+ Rooms' && property.beds < 4) {
//       match = false;
//     }
//     if (maxRooms === '5+ Rooms' && property.beds < 5) {
//       match = false;
//     }
//     // Check if amenities property exists and is an array
//     const selectedAmenities = document.querySelectorAll('input[type="checkbox"]:checked');
//     const selectedAmenitiesValues = Array.from(selectedAmenities).map((checkbox) => checkbox.value);
//     if (Array.isArray(property.amenities)) {
//       const hasAllAmenities = selectedAmenitiesValues.every((amenity) => property.amenities.includes(amenity));
//       if (!hasAllAmenities) {
//         match = false;
//       }
//     }

//     const propertyPrice = parseFloat(property.price.replace(/,/g, ''));

//     if (propertyPriceRange === '5000' && (propertyPrice < 0 || propertyPrice > 5000)) {
//       match = false;
//   } else if (propertyPriceRange === '10000' && (propertyPrice < 5000 || propertyPrice > 10000)) {
//       match = false;
//   } else if (propertyPriceRange === '500000' && (propertyPrice < 250000 || propertyPrice > 500000)) {
//       match = false;
//   } else if (propertyPriceRange === '1000000' && (propertyPrice < 500000 || propertyPrice > 1000000)) {
//       match = false;
//   } else if (propertyPriceRange === '1500000' && (propertyPrice < 1000000 || propertyPrice > 1500000)) {
//       match = false;
//   }
//   else if (propertyPriceRange === '2000000' && (propertyPrice < 1500000 || propertyPrice > 2000000)) {
//   match = false;
//   }
//   else if (propertyPriceRange === '2000001' && (propertyPrice <= 2000000)) {
//     match = false;
// }
   

//     return match;
//   });
//   console.log(filteredProperties);
//   if (!filteredProperties || filteredProperties.length === 0) {
//     console.log('No properties match the selected criteria.');
//   }

//   // Call a function to display the filtered properties
//   const totalPages = Math.ceil(filteredProperties.length / maxPropertiesToShow);

//   displayProperties(filteredProperties, totalPages);
// })
// .catch((error) => {
//   console.error('Error fetching properties data:', error);
// });
// }

function filterProperties() {
  const propertyCategory = document.querySelector('.select-box select[name="propCategory"]').value;
  const propertyLocation = document.querySelector('.select-box select[name="propertyLocation"]').value;
  const maxRooms = document.querySelector('.select-box select[name="maxRooms"]').value;
  const propertyType = document.querySelector('.select-box select[name="propertyType"]').value;
  const propertyPriceRange = document.querySelector('.select-box select[name="propertyPriceRange"]').value;

  console.log('propertyCategory:', propertyCategory);
  console.log('propertyLocation:', propertyLocation);
  console.log('maxRooms:', maxRooms);
  console.log('propertyType:', propertyType);
  console.log('propertyPriceRange:', propertyPriceRange);

  fetchPropertiesData().then(() => {
    // Filter properties based on the selected criteria
    const filteredProperties = propertiesData.filter((property) => {
      let match = true;
      if (propertyCategory !== 'הכל' && property.category !== propertyCategory) {
        match = false;
      }
      if (propertyLocation !== 'הכל' && property.location !== propertyLocation) {
        match = false;
      }
      if (propertyType !== 'הכל' && property.type !== propertyType) {
        match = false;
      }
      // Add more filtering criteria as needed
      if (maxRooms === '2+ Rooms' && property.beds < 2) {
        match = false;
      }
      if (maxRooms === '3+ Rooms' && property.beds < 3) {
        match = false;
      }
      if (maxRooms === '4+ Rooms' && property.beds < 4) {
        match = false;
      }
      if (maxRooms === '5+ Rooms' && property.beds < 5) {
        match = false;
      }
      // Check if amenities property exists and is an array
      const selectedAmenities = document.querySelectorAll('input[name="amenities"]:checked');
      const selectedAmenitiesValues = Array.from(selectedAmenities).map((checkbox) => checkbox.value);
      
      if (Array.isArray(property.amenities)) {
        const hasAllAmenities = selectedAmenitiesValues.every((amenity) => property.amenities.includes(amenity));
     
        if (!hasAllAmenities) {
          match = false;
        }
      }

      const propertyPrice = parseFloat(property.price.replace(/,/g, ''));
      if (propertyPriceRange === '5000' && (propertyPrice < 0 || propertyPrice > 5000)) {
        match = false;
      } else if (propertyPriceRange === '10000' && (propertyPrice < 5000 || propertyPrice > 10000)) {
        match = false;
      } else if (propertyPriceRange === '500000' && (propertyPrice < 250000 || propertyPrice > 500000)) {
        match = false;
      } else if (propertyPriceRange === '1000000' && (propertyPrice < 500000 || propertyPrice > 1000000)) {
        match = false;
      } else if (propertyPriceRange === '1500000' && (propertyPrice < 1000000 || propertyPrice > 1500000)) {
        match = false;
      } else if (propertyPriceRange === '2000000' && (propertyPrice < 1500000 || propertyPrice > 2000000)) {
        match = false;
      } else if (propertyPriceRange === '2000001' && propertyPrice <= 2000000) {
        match = false;
      }
      console.log('Property:', property, 'Match:', match);
      return match;
    });

    if (!filteredProperties || filteredProperties.length === 0) {
      alert('לא נמצאו נכסים.');
    }

    // Call a function to display the filtered properties
    const totalPages = Math.ceil(filteredProperties.length / maxPropertiesToShow);
    displayProperties(filteredProperties, totalPages);
  });
}

// Add an event listener to the filter button
const filterButton = document.getElementById('filterButton');
// filterButton.addEventListener('click', filterProperties);
filterButton.addEventListener('click', () => {
  filterProperties(propertiesData);
});




const urlParams = new URLSearchParams(window.location.search);

// Retrieve selected parameters from the URL
const searchInputParam = urlParams.get('search-field');
const locationParam = urlParams.get('location');
const propertyCategoryParam = urlParams.get('propertyCategory');
const saleRentParam = urlParams.get('saleRent');
const categoryName = urlParams.get('category');
const propertyPriceRangeParam = urlParams.get('propertyPriceRange');
const maxRoomsParam = urlParams.get('maxRooms');




// Get the current tab button with the "active-btn" class


// Filter properties based on the selected parameters
function filterPropertiesByParams(properties) {
  const filteredProperties = properties.filter((property) => {
    let match = true;

    // Check if property location matches the selected location parameter
    if (locationParam && locationParam !== 'הכל' && property.location !== locationParam) {
      match = false;
    }

    // Check if property type matches the selected property type parameter
    if (propertyCategoryParam && propertyCategoryParam !== 'הכל' && property.category !== propertyCategoryParam) {
      match = false;
    }

    // Check if property sale/rent option matches the selected parameter
    if (saleRentParam && saleRentParam !== 'הכל' && property.type !== saleRentParam) {
      match = false;
    }
    if (categoryName && property.category !== categoryName) {
      match = false;
    }

    

    // Check if search input matches property title or location
    if (searchInputParam && searchInputParam.trim() !== '') {
      const searchInput = searchInputParam.toLowerCase();
      const titleLower = property.title.toLowerCase();
      const locationLower = property.location.toLowerCase();
      const categoryLower = property.category.toLowerCase();

      // Check for partial matches in title and location
      if (!titleLower.includes(searchInput) && !locationLower.includes(searchInput) && !categoryLower.includes(searchInput)) {
          match = false;
      }
  }

  const propertyPrice = parseFloat(property.price.replace(/,/g, ''));
  if (propertyPriceRangeParam === '5000' && (propertyPrice < 0 || propertyPrice > 5000)) {
    match = false;
  } else if (propertyPriceRangeParam === '10000' && (propertyPrice < 5000 || propertyPrice > 10000)) {
    match = false;
  } else if (propertyPriceRangeParam === '500000' && (propertyPrice < 250000 || propertyPrice > 500000)) {
    match = false;
  } else if (propertyPriceRangeParam === '1000000' && (propertyPrice < 500000 || propertyPrice > 1000000)) {
    match = false;
  } else if (propertyPriceRangeParam === '1500000' && (propertyPrice < 1000000 || propertyPrice > 1500000)) {
    match = false;
  } else if (propertyPriceRangeParam === '2000000' && (propertyPrice < 1500000 || propertyPrice > 2000000)) {
    match = false;
  } else if (propertyPriceRangeParam === '2000001' && propertyPrice <= 2000000) {
    match = false;
  }

  if (maxRoomsParam === '2+ Rooms' && property.beds < 2) {
    match = false;
  }
  if (maxRoomsParam === '3+ Rooms' && property.beds < 3) {
    match = false;
  }
  if (maxRoomsParam === '4+ Rooms' && property.beds < 4) {
    match = false;
  }
  if (maxRoomsParam === '5+ Rooms' && property.beds < 5) {
    match = false;
  }
    // Add more filtering criteria as needed
    // ...

    return match;
  });

  return filteredProperties;
}


function displayProperties(properties, totalPages) {
  const wrapperDiv = document.getElementById('div-wrapper');
  const propertyGrid = document.getElementById('property-grid');
  const propertyList = document.getElementById('property-list');

  // Calculate the starting and ending index for the current page
  const startIndex = (currentPage - 1) * maxPropertiesToShow;

  // For grid view, show 15 properties per page
  const endIndexGrid = startIndex + maxPropertiesToShow;

  // For list view, show 10 properties per page
  const endIndexList = startIndex + maxPropertiesToShow;

  // Get the sliced data based on the view type
  let slicedData;
  if (wrapperDiv.classList.contains('grid')) {
    slicedData = properties.slice(startIndex, endIndexGrid);
  } else {
    slicedData = properties.slice(startIndex, endIndexList);
  }
  // Clear existing property blocks
  propertyGrid.innerHTML = '';
  propertyList.innerHTML = '';

  // Generate and display property blocks based on current page
  if (wrapperDiv.classList.contains('grid')) {
    const propertyBlocksHTML = slicedData.map((property) => generatePropertyGrid(property)).join('');
    propertyGrid.innerHTML = propertyBlocksHTML;
  } else if (wrapperDiv.classList.contains('list')) {
    const propertyBlocksHTML = slicedData.map((property) => generatePropertyList(property)).join('');
    propertyList.innerHTML = propertyBlocksHTML;
  }

  // Call the displayPagination function to update the pagination buttons
  displayPagination(totalPages);
}

// Function to generate pagination buttons
function generatePaginationButtons(totalPages) {
  let buttonsHTML = '';
  for (let i = 1; i <= totalPages; i++) {
    if (i === currentPage) {
      buttonsHTML += `<li><a href="#" class="current">${i}</a></li>`;
    } else {
      buttonsHTML += `<li><a href="#" class="pagination-button" data-page="${i}">${i}</a></li>`;
    }
  }
  return `<ul class="pagination clearfix">${buttonsHTML}</ul>`;
}

// Function to display the pagination buttons
function displayPagination(totalPages) {
  const paginationContainer = document.getElementById('pagination-container');
  paginationContainer.innerHTML = generatePaginationButtons(totalPages);

  // Add event listeners to the pagination buttons
  const paginationButtons = document.querySelectorAll('.pagination-button');
  paginationButtons.forEach((button) => {
    button.addEventListener('click', () => {
      // Get the page number from the data-page attribute
      currentPage = parseInt(button.dataset.page);
      // Fetch properties data and update the display for the current page
      fetchPropertiesData().then(() => {
        const filteredProperties = filterProperties(propertiesData);
        const totalPages = Math.ceil(filteredProperties.length / maxPropertiesToShow);

      // Display all properties for the first page
        displayProperties(filteredProperties, totalPages);
      });
    });
  });
}

function applySelectedParamsToFilters(locationParam, propertyTypeParam, saleRentParam, categoryName, propertyPriceRangeParam, maxRoomsParam ) {
  setTimeout(() => {
    const locationSelect = document.querySelector('.select-box select[name="propertyLocation"]');
    const propertyTypeSelect = document.querySelector('.select-box select[name="propertyType"]');
    const categorySelect = document.querySelector('.select-box select[name="propCategory"]');
    const pricrRangeSelect = document.querySelector('.select-box select[name="propertyPriceRange"]');
    const maxRoomsSelect = document.querySelector('.select-box select[name="maxRooms"]');


    // Check if locationSelect exists before applying selected option
    if (locationSelect && locationParam) {
      for (const option of locationSelect.options) {
        if (option.value === locationParam) {
          option.selected = true;
          break;
        }
      }
      // Trigger change event on custom select box
      const locationCustomSelect = document.querySelector('.select-box select[name="propertyLocation"] + .nice-select');
      if (locationCustomSelect) {
        locationCustomSelect.querySelector('.current').innerText = locationParam;
      }
    }

    // Check if propertyTypeSelect exists before applying selected option
    if (propertyTypeSelect && saleRentParam) {
      propertyTypeSelect.value = saleRentParam;
      // Trigger change event on custom select box
      const propertyTypeCustomSelect = document.querySelector('.select-box select[name="propertyType"] + .nice-select');
      if (propertyTypeCustomSelect) {
        propertyTypeCustomSelect.querySelector('.current').innerText = saleRentParam;
      }
    }

    // Check if categorySelect exists before applying selected option
    if (categorySelect && categoryName) {
      categorySelect.value = categoryName;
      // Trigger change event on custom select box
      const categoryCustomSelect = document.querySelector('.select-box select[name="propCategory"] + .nice-select');
      if (categoryCustomSelect) {
        categoryCustomSelect.querySelector('.current').innerText = categoryName;
      }
    }

    if (categorySelect && propertyTypeParam) {
      categorySelect.value = propertyTypeParam;
      // Trigger change event on custom select box
      const categoryCustomSelect = document.querySelector('.select-box select[name="propCategory"] + .nice-select');
      if (categoryCustomSelect) {
        categoryCustomSelect.querySelector('.current').innerText = propertyTypeParam;
      }
    }

    if (maxRoomsSelect && maxRoomsParam) {
      maxRoomsSelect.value = maxRoomsParam;
      // Trigger change event on custom select box
      const maxRoomCustomSelect = document.querySelector('.select-box select[name="maxRooms"] + .nice-select');
      if (maxRoomCustomSelect) {
        maxRoomCustomSelect.querySelector('.current').innerText = maxRoomsParam;
      }
    }

    if (pricrRangeSelect && propertyPriceRangeParam) {
      pricrRangeSelect.value = propertyPriceRangeParam;
      // Trigger change event on custom select box
      const priceCustomSelect = document.querySelector('.select-box select[name="propertyPriceRange"] + .nice-select');
      if (priceCustomSelect) {
        priceCustomSelect.querySelector('.current').innerText = propertyPriceRangeParam;
      }
    }
  }, 200); // Adjust the delay as needed (e.g., 100 milliseconds)
}

document.addEventListener('DOMContentLoaded', () => {
  // Retrieve selected parameters from the URL
  const urlParams = new URLSearchParams(window.location.search);
  const locationParam = urlParams.get('location');
  const propertyTypeParam = urlParams.get('propertyCategory');
  const saleRentParam = urlParams.get('saleRent');
  const categoryName = urlParams.get('category');
  const propertyPriceRangeParam = urlParams.get('propertyPriceRange');
  const maxRoomsParam = urlParams.get('maxRooms');


  
  applySelectedParamsToFilters(locationParam, propertyTypeParam, saleRentParam, categoryName, propertyPriceRangeParam, maxRoomsParam )
  // Check if any of the parameters is present in the URL
  if (locationParam || propertyTypeParam || saleRentParam || categoryName || propertyPriceRangeParam || maxRoomsParam) {
    // Fetch properties data and filter based on URL parameters
    fetchPropertiesData().then(() => {
      // Filter properties based on the URL parameters

      const filteredProperties = filterPropertiesByParams(propertiesData);

      // Display the filtered properties
      const totalPages = Math.ceil(filteredProperties.length / maxPropertiesToShow);

      // Display all properties for the first page
      displayProperties(filteredProperties, totalPages);
    });

   
    // history.pushState({}, '', window.location.pathname);
  } else {
    // If no parameters in the URL, fetch all properties data and display them
    fetchPropertiesData().then(() => {
      const totalPages = Math.ceil(propertiesData.length / maxPropertiesToShow);
      displayProperties(propertiesData, totalPages);
    });
  }
});