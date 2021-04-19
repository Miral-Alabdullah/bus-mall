'use strict';


let images = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg',
  'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg',
  'unicorn.jpg', 'usb.gif', 'water-can.jpg', 'wine-glass.jpg']; //Creating an array to store the images inside

let
  leftIndex,
  middleIndex,
  rightIdex;

let counts = 0;
let maxAttempts = 25;

function BusCatalog(productName, imagePath) {
  this.productName = productName;
  this.imagePath = imagePath;
  this.votes = 0;
  this.numberOfDisplaying = 0;
  BusCatalog.arrayOfObjects.push(this);
}
BusCatalog.arrayOfObjects = []; //creating array of objects to store the objects(images)

for (let i=0; i<images.length; i++){
  new BusCatalog (images[i].split('.')[0], `../img/${images[i]}`); // using the for loop to create instances of the constructor function
}

console.log(BusCatalog.arrayOfObjects);

// console.log(BusCatalog.arrayOfObjects);


let leftImageElement = document.getElementById('left-image');
let middleImageElement = document.getElementById('middle-image');
let rightImageElement = document.getElementById('right-image');

function renderIamges() {
  leftIndex = generateRandomImages();
  middleIndex = generateRandomImages();
  rightIdex = generateRandomImages();
  while(leftIndex === middleIndex || leftIndex === rightIdex || middleIndex === rightIdex){
    middleIndex = generateRandomImages();
    rightIdex = generateRandomImages();
  }
  leftImageElement.src = BusCatalog.arrayOfObjects[leftIndex].imagePath;
  middleImageElement.src = BusCatalog.arrayOfObjects[middleIndex].imagePath;
  rightImageElement.src = BusCatalog.arrayOfObjects[rightIdex].imagePath;
}

renderIamges();



leftImageElement.addEventListener('click',handleClicking);
middleImageElement.addEventListener('click',handleClicking);
rightImageElement.addEventListener('click',handleClicking);

function handleClicking(event){
  counts++;
  if (maxAttempts>=counts) {
    if(event.target === 'left-image'){
      BusCatalog.arrayOfObjects[leftIndex].votes++;
    } else if(event.target === 'middle-image'){
      BusCatalog.arrayOfObjects[middleIndex].votes++;
    } else if(event.target === 'right-image'){
      BusCatalog.arrayOfObjects[rightIdex].votes++;
    }
    renderIamges();
  }
  else if (maxAttempts === counts){
    leftImageElement.removeEventListener('click', handleClicking);
    middleImageElement.removeEventListener('click',handleClicking);
    rightImageElement.removeEventListener('click',handleClicking);
  }
}

console.log(BusCatalog.arrayOfObjects[leftIndex].votes);


function generateRandomImages() {
  return Math.floor(Math.random() * BusCatalog.arrayOfObjects.length);
}


