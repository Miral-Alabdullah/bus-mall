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
let namesOfProducts = [];
let dataOfVotes = [];
let dataOfDisplayingImages = [];
let castArray = [];
let castData;

function BusCatalog(productName, imagePath) {
  this.productName = productName;
  this.imagePath = imagePath;
  this.votes = 0;
  this.numberOfDisplaying = 0;
  BusCatalog.arrayOfObjects.push(this);
  namesOfProducts.push(this.productName);
}
BusCatalog.arrayOfObjects = []; //creating array of objects to store the objects(images)


for (let i = 0; i < images.length; i++) {
  new BusCatalog(images[i].split('.')[0], `img/${images[i]}`); // using the for loop to create instances of the constructor function
}

// console.log(BusCatalog.arrayOfObjects);


let imagesSection = document.getElementById('images');

let leftImageElement = document.getElementById('left-image');
let middleImageElement = document.getElementById('middle-image');
let rightImageElement = document.getElementById('right-image');

let uniqueArray = [];
function renderIamges() {
  leftIndex = generateRandomImages();
  middleIndex = generateRandomImages();
  rightIdex = generateRandomImages();
  while (leftIndex === middleIndex || leftIndex === rightIdex || middleIndex === rightIdex ||
         uniqueArray.includes(leftIndex) || uniqueArray.includes(middleIndex) || uniqueArray.includes(rightIdex)) {
    leftIndex = generateRandomImages();
    middleIndex = generateRandomImages();
    rightIdex = generateRandomImages();
  }
  uniqueArray = [leftIndex,middleIndex,rightIdex];
  leftImageElement.src = BusCatalog.arrayOfObjects[leftIndex].imagePath;
  middleImageElement.src = BusCatalog.arrayOfObjects[middleIndex].imagePath;
  rightImageElement.src = BusCatalog.arrayOfObjects[rightIdex].imagePath;
  BusCatalog.arrayOfObjects[leftIndex].numberOfDisplaying++;
  BusCatalog.arrayOfObjects[middleIndex].numberOfDisplaying++;
  BusCatalog.arrayOfObjects[rightIdex].numberOfDisplaying++;
}

renderIamges();

let btn = document.getElementById('btn');
imagesSection.addEventListener('click', handleClicking);


function handleClicking(event) {
  counts++;
  if (maxAttempts >= counts) {
    if (event.target.id === 'left-image') {
      BusCatalog.arrayOfObjects[leftIndex].votes++;
    } else if (event.target.id === 'middle-image') {
      BusCatalog.arrayOfObjects[middleIndex].votes++;
    } else if (event.target.id === 'right-image') {
      BusCatalog.arrayOfObjects[rightIdex].votes++;
    }
    renderIamges();
  }
  else {
    imagesSection.removeEventListener('click', handleClicking);
    btn.addEventListener('click', onClick);
    saveTols();
  }
}


function generateRandomImages() {
  return Math.floor(Math.random() * BusCatalog.arrayOfObjects.length);
}


function renderList() {

  let unorderdList = document.getElementById('unorderdList');
  let liElement;
  for (let i = 0; i < images.length; i++) {
    dataOfVotes.push(BusCatalog.arrayOfObjects[i].votes);
    dataOfDisplayingImages.push(BusCatalog.arrayOfObjects[i].numberOfDisplaying);
    liElement = document.createElement('li');
    unorderdList.appendChild(liElement);
    liElement.textContent = `${BusCatalog.arrayOfObjects[i].productName} has ${BusCatalog.arrayOfObjects[i].votes} votes, and was seen ${BusCatalog.arrayOfObjects[i].numberOfDisplaying} times.`;
  }
  chart();
}


function onClick() {
  renderList();
  btn.removeEventListener('click',onClick);
}

function saveTols(){
  castArray = JSON.stringify(BusCatalog.arrayOfObjects);
  localStorage.setItem('check', castArray);
}


function getFromls() {
  let data = localStorage.getItem('check');
  castData = JSON.parse(data);
  BusCatalog.arrayOfObjects = castData;
}
getFromls();


function chart(){
  let ctx = document.getElementById('myChart');
  let myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: namesOfProducts,
      datasets: [{
        label: 'Number Of votes',
        data: dataOfVotes,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
        ],
        borderWidth: 1
      },{
        label:'Number of showing the image',
        data: dataOfDisplayingImages,
        backgroundColor:[
          'rgb(192,192,192)'
        ],
        borderWidth: 1
      }]
    }
  });
}
