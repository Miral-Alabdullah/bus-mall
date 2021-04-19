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
  new BusCatalog (images[i].split('.')[0], `img/${images[i]}`); // using the for loop to create instances of the constructor function
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
  BusCatalog.arrayOfObjects[leftIndex].numberOfDisplaying++;
  BusCatalog.arrayOfObjects[middleIndex].numberOfDisplaying++;
  BusCatalog.arrayOfObjects[rightIdex].numberOfDisplaying++;
}

renderIamges();



leftImageElement.addEventListener('click',handleClicking);
middleImageElement.addEventListener('click',handleClicking);
rightImageElement.addEventListener('click',handleClicking);

function handleClicking(event){
  counts++;
  if (maxAttempts>=counts) {
    if(event.target.id === 'left-image'){
      BusCatalog.arrayOfObjects[leftIndex].votes++;
    } else if(event.target.id === 'middle-image'){
      BusCatalog.arrayOfObjects[middleIndex].votes++;
      // console.log(BusCatalog.arrayOfObjects[middleIndex].votes);
    } else if(event.target.id === 'right-image'){
      BusCatalog.arrayOfObjects[rightIdex].votes++;
      // console.log(BusCatalog.arrayOfObjects[rightIdex].votes);
    }
    // console.log(BusCatalog.arrayOfObjects);
    renderIamges();
  }
  else if (maxAttempts === counts){
    leftImageElement.removeEventListener('click', handleClicking);
    middleImageElement.removeEventListener('click',handleClicking);
    rightImageElement.removeEventListener('click',handleClicking);
  }
}



function generateRandomImages() {
  return Math.floor(Math.random() * BusCatalog.arrayOfObjects.length);
}


function renderList(){

  let unorderdList = document.getElementById('unorderdList');
  let liElement;
  for (let i=0; i<=images.length; i++){
    liElement = document.createElement('li');
    unorderdList.appendChild(liElement);
    liElement.textContent = `${images[i].split('.')[0]} has ${BusCatalog.arrayOfObjects[i].votes} 
                           votes, and was seen ${BusCatalog.arrayOfObjects[i].numberOfDisplaying} times.`;
  }
}

let btn = document.getElementById('btn');
btn.addEventListener('click',onClick);

function onClick() {
  renderList();
  btn.removeEventListener('click',renderList);
}



