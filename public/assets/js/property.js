function generateProperty(property) {
    let imageElement = '';

    // Check if the 'image' field is present and it is an array with at least one element
    if (property.images && Array.isArray(property.images) && property.images.length > 0) {
        imageElement = `<figure class="image"><img src="${property.images[0]}" alt=""></figure>`;
    } else {
        // If 'image' is missing or empty, you can provide a default image or an error message
        imageElement = '<figure class="image"><img src="assets/images/feature/feature-1.jpg" alt="No Image Available"></figure>';
    }
    return `
        <div class="col-lg-4 col-md-6 col-sm-12 feature-block" style="margin-top: 10px;">
            <div class="feature-block-one wow fadeInUp animated" data-wow-delay="00ms" data-wow-duration="1500ms">
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
                            <li><i class="icon-15"></i>${property.baths} רחצה</li>
                            <li><i class="icon-16"></i>${property.sqFt} מ"ר</li>
                        </ul>
                        <div class="btn-box"><a href="property-details.html?id=${property.id}" class="theme-btn btn-two">לצפייה בנכס</a></div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// function generatePropertyDeals(property) {
//         let imageElement = '';


//     // Check if the 'image' field is present and it is an array with at least one element
//     if (property.images && Array.isArray(property.images) && property.images.length > 0) {
//         imageElement = `<figure class="image"><img src="${property.images[0]}" alt=""></figure>`;
//     } else {
//         // If 'image' is missing or empty, you can provide a default image or an error message
//         imageElement = '<figure class="image"><img src="assets/images/feature/feature-1.jpg" alt="No Image Available"></figure>';
//     }
//     return `
//     <div class="single-item">
//     <div class="row clearfix">
//         <div class="col-lg-6 col-md-6 col-sm-12 deals-block">
//             <div class="image-box">
//                 ${imageElement}
//                 <div class="batch"><i class="icon-11"></i></div>
//                 <span class="category">${property.category}</span>
//                 <div class="buy-btn"><a href="property-details.html">${property.type}</a></div>
//             </div>
//         </div>
//         <div class="col-lg-6 col-md-6 col-sm-12 deals-block">
//             <div class="deals-block-one">
//                 <div class="inner-box">
//                     <div class="lower-content">
//                         <div class="title-text"><h4><a href="property-details.html">${property.title}</a></h4></div>
//                         <div class="price-box clearfix">
//                             <div class="price-info pull-left">
//                                 <h6>Start From</h6>
//                                 <h4>${property.price}</h4>
//                             </div>
//                             <div class="author-box pull-right">
//                                 <figure class="author-thumb"> 
//                                     <img src="${property.authorImage}" alt="">
//                                     <span>${property.author}</span>
//                                 </figure>
//                             </div>
//                         </div>
//                         <p>${property.description}</p>
//                         <ul class="more-details clearfix">
//                         <li><i class="icon-14"></i>${property.beds} חדרים</li>
//                         <li><i class="icon-15"></i>${property.baths} רחצה</li>
//                         <li><i class="icon-16"></i>${property.sqFt} מ"ר</li>
//                         </ul>
//                         <div class="other-info-box clearfix">
//                             <div class="btn-box pull-left"><a href="property-details.html" class="theme-btn btn-one">See Details</a></div>
//                             <ul class="other-option pull-right clearfix">
//                                 <li><a href="property-details.html"><i class="icon-12"></i></a></li>
//                                 <li><a href="property-details.html"><i class="icon-13"></i></a></li>
//                             </ul>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     </div>
// </div>`;
// }

function generateCarousel(property) {
    let carouselDealHTML = '<div class="deals-carousel owl-carousel owl-theme dots-style-one owl-nav-none">';

    // Loop through the images array and generate figure elements for each image

    for (i = 0; i < 4; i++) {
        currentProperty = property[i]
        let imageElement = '';


        // Check if the 'image' field is present and it is an array with at least one element
        if (currentProperty.images && Array.isArray(currentProperty.images) && currentProperty.images.length > 0) {
            imageElement = `<figure class="image"><img src="${currentProperty.images[0]}" alt=""></figure>`;
        } else {
            // If 'image' is missing or empty, you can provide a default image or an error message
            imageElement = '<figure class="image"><img src="assets/images/feature/feature-1.jpg" alt="No Image Available"></figure>';
        }
        carouselDealHTML += ` <div class="single-item">
        <div class="row clearfix">
            <div class="col-lg-6 col-md-6 col-sm-12 deals-block">
                <div class="image-box">
                    ${imageElement}
                    <div class="batch"><i class="icon-11"></i></div>
                    <span class="category">${currentProperty.category}</span>
                    <div class="buy-btn"><a href="property-details.html?id=${currentProperty.id}">${currentProperty.type}</a></div>
                </div>
            </div>
            <div class="col-lg-6 col-md-6 col-sm-12 deals-block">
                <div class="deals-block-one">
                    <div class="inner-box">
                        <div class="lower-content">
                            <div class="title-text"><h4><a href="property-details.html?id=${currentProperty.id}">${currentProperty.title}</a></h4></div>
                            <div class="price-box clearfix">
                                <div class="price-info pull-left">
                                    <h6>Start From</h6>
                                    <h4>₪${currentProperty.price}</h4>
                                </div>
                                <div class="author-box pull-right">
                                    <figure class="author-thumb"> 
                                        <img src="${currentProperty.authorImage}" alt="">
                                        <span>${currentProperty.author}</span>
                                    </figure>
                                </div>
                            </div>
                            <p>${currentProperty.description}</p>
                            <ul class="more-details clearfix">
                            <li><i class="icon-14"></i>${currentProperty.beds} חדרים</li>
                            <li><i class="icon-15"></i>${currentProperty.baths} ח'ד רחצה</li>
                            <li><i class="icon-16"></i>${currentProperty.sqFt} מ"ר</li>
                            </ul>
                            <div class="other-info-box clearfix">
                                <div class="btn-box pull-left"><a href="property-details.html?id=${currentProperty.id}" class="theme-btn btn-one">לצפייה בנכס</a></div>
                                <ul class="other-option pull-right clearfix">
                                    <li><a href="property-details.html?id=${currentProperty.id}"><i class="icon-12"></i></a></li>
                                    <li><a href="property-details.html?id=${currentProperty.id}"><i class="icon-13"></i></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>`
    }

    carouselDealHTML += '</div>';
    return carouselDealHTML;
}
function generatePropertyDeals(property) {
    return `<div class="sec-title centred">
                <h5>נכסים חמים</h5>
                <h2>העסקאות החמות שלנו</h2>
            </div>
            ${generateCarousel(property)}
            `;
        }

fetch('/property.json')
    .then((response) => response.json())
    .then((data) => {
        // Check if the data is an array and has at least one element
        if (Array.isArray(data) && data.length > 0) {
            const maxPropertiesToShow = 12;
            const randomProperties = getRandomProperties(data, maxPropertiesToShow);
            const propertyGrid = document.getElementById('property-grid');


            // Generate property blocks HTML
            const propertyBlocksHTML = randomProperties.map((property) => generateProperty(property)).join('');

            // Append the property blocks to the property grid
            propertyGrid.innerHTML = propertyBlocksHTML;

            // Generate property deals blocks HTML
            // const propertyDealBlocksHTML = generatePropertyDeals(data);

            // Append the property blocks to the property grid
            // propertyDeals.innerHTML = propertyDealBlocksHTML;

            $('.deals-carousel').owlCarousel({
                loop:true,
                margin:50,
                nav:true,
                smartSpeed: 500,
                autoplay: true,
                autoplayTimeout: 10000,
                autoplayTimeout: 15000,
                navText: [ '<span class="far fa-angle-left"></span>', '<span class="far fa-angle-right"></span>' ],
                responsive:{
                    0:{
                        items:1
                    },
                    600:{
                        items:1
                    },
                    800:{
                        items:1
                    },
                    1024:{
                        items:1
                    },
                    1200:{
                        items:1
                    }
                }
            });
            // Call the Owl Carousel initialization after the propertyDeals element is available in the DOM
        } else {
            console.error('Invalid or empty JSON data');
        }
    })
    .catch((error) => {
        console.error('Error fetching JSON data:', error);
    });

    function getRandomProperties(data, count) {
        const shuffledData = [...data]; // Create a copy of the data array
        let currentIndex = shuffledData.length, randomIndex, temporaryValue;
    
        // While there remain elements to shuffle...
        while (currentIndex !== 0) {
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
    
            // And swap it with the current element.
            temporaryValue = shuffledData[currentIndex];
            shuffledData[currentIndex] = shuffledData[randomIndex];
            shuffledData[randomIndex] = temporaryValue;
        }
    
        // Return a slice of the shuffled data with the specified count
        return shuffledData.slice(0, count);
    }