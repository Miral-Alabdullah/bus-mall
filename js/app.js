'use strict';


let images = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg',
  'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg',
  'unicorn.jpg', 'usb.gif', 'water-can.jpg', 'wine-glass.jpg']; //Creating an array to store the images inside

function BusCatalog(productName, imagePath) {
  this.productName = productName;
  this.imagePath =imagePath;
  this.numberOfDisplays = 0;
}

BusCatalog.arrayOfObjects = []; //creating array of objects to store the objects(images)

for (let i=0; i<images.length; i++){
  new BusCatalog (images[i].split('.'), `../img/${images[i]}`); // using the for loop to create instances of the constructor function
}
