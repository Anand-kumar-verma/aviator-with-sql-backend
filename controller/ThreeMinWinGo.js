const { default: axios } = require("axios");
const schedule = require("node-cron");

exports.generatedTimeEveryAfterEveryThreeMin = (io) => {
  let min = 2;

  const job = schedule.schedule("* * * * * *",function () {
    const currentTime = new Date().getSeconds(io); // Get the current time
    const timeToSend = currentTime > 0 ? 60 - currentTime : currentTime;
    io.emit("threemin", `${min}_${timeToSend}`);
    if (currentTime === 0) {
      min--;
      if (min < 0) {
        threeMinWingo();
        min = 2; // Reset min to 2 when it reaches 0
      }
    }
  });
};

async function threeMinWingo() {
  try {
    const res = await axios.get(
      "https://admin.zupeeter.com/public/api/resultthreemin"
    );
  } catch (e) {
    console.log(e);
  }
}
