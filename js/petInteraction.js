// let path = location.search.split("=").pop();
// let pet = getDom("img");
// let queryParams = new URLSearchParams(window.location.search);
// let petIdentifier = queryParams.get('pet');
// let dirPath = `../img/${petIdentifier}/`;
// pet.src = path;

// let pet = getDom("img");
// let queryParams = new URLSearchParams(window.location.search);
// let petIdentifier = queryParams.get('pet');
// let dirPath = `../img/${petIdentifier}/`;
// pet.src = dirPath; // 初始状态设置为健康状态

let pet = getDom("img");
let queryParams = new URLSearchParams(window.location.search);
let petIdentifier = queryParams.get('pet');
let dirPath = `../img/${petIdentifier}/`;

pet.src = dirPath + "health.gif";


// let dirPath = path.replace(/avatar.[\w]+$/, "");
// let dirPath = "img/pet2/";
// let dirPath = "../img/pet2/";
let timer = null;

let health = getDom(".health .value");
let cleanliness = getDom(".Cleanliness .value");

function getRandomInt(min = 1, max = 5) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 * 处理状态值
 * @param {num} healthHandle  处理健康度 0为减少 1为增加
 * @param {*} cleanlinessHandle 处理清洁度 0为减少 1为增加
 *
 */
function stateValueHandle(healthHandle = 1, cleanlinessHandle = 1) {
  if (timer) return;
  let healthVal = +health.style.width.replace("%", "");
  let clearLinessVal = +cleanliness.style.width.replace("%", "");

  let newHealthVal = healthHandle
    ? healthVal + getRandomInt()
    : healthVal - getRandomInt();
  if (newHealthVal > 100) newHealthVal = 100;
  if (newHealthVal < 0) newHealthVal = 0;

  let newClearLinessVal = cleanlinessHandle
    ? clearLinessVal + getRandomInt()
    : clearLinessVal - getRandomInt();
  if (newClearLinessVal > 100) newClearLinessVal = 100;
  if (newClearLinessVal < 0) newClearLinessVal = 0;

  health.style.backgroundColor = newHealthVal < 20 ? "red" : "#5ac163";
  cleanliness.style.backgroundColor =
    newClearLinessVal < 20 ? "red" : "#4f80ea";
  health.style.width = newHealthVal + "%";
  cleanliness.style.width = newClearLinessVal + "%";

  return { newHealthVal, newClearLinessVal };
}

/**
 * 处理交互
 * @param {string} type -交互类型
 * @param {*} stateObj - 状态值对象
 */

function interaction(type, stateObj) {
  if (timer) return;
  // clearTimeout(timer);
  let { newHealthVal, newClearLinessVal } = stateObj;
  // pet.src = dirPath + `${type}.gif`;
  pet.src = dirPath + type + ".gif";
  console.log(newHealthVal)
  timer = setTimeout(() => {
    if (newHealthVal < 20 || newClearLinessVal < 20) {
      // pet.src = dirPath + "ill.gif";
      pet.src = dirPath + "ill.gif";
      // console.log(pet.src)
    }
    else {
      pet.src = dirPath + "health.gif";
    }

    // setTimeout(() => {
    //   pet.src = path;
    // }, 2000);
    timer = null
  }, 1000);
}

setInterval(() => {

  stateValueHandle(0, 0)
}, 3000)

getDomAndListener(".feed", "click", (e) => {
  let stateObj = stateValueHandle(1, 0);
  interaction("feed", stateObj);
});
getDomAndListener(".play", "click", (e) => {
  let stateObj = stateValueHandle(1, 0);
  interaction("play", stateObj);
});
getDomAndListener(".wash", "click", (e) => {
  let stateObj = stateValueHandle(0, 1);
  interaction("wash", stateObj);
});
