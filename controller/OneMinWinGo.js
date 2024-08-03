const { default: axios } = require("axios");
const schedule = require("node-cron");

exports.generatedTimeEveryAfterEveryOneMin = (io) => {
  const job = schedule.schedule("* * * * * *",function () {
    const currentTime = new Date();
    const timeToSend =
      currentTime.getSeconds() > 0
        ? 60 - currentTime.getSeconds()
        : currentTime.getSeconds();
    io.emit("onemin", timeToSend); // Emit the formatted time
    if (timeToSend === 0) {
      OneMinWinGo();
    }
  });
};

async function OneMinWinGo() {
  try {
    await axios.get("https://admin.zupeeter.com/public/api/resultonemin");
  } catch (e) {
    console.log(e);
  }
}
