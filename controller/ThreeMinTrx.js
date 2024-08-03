const schedule  = require("node-cron");

exports.generatedTimeEveryAfterEveryThreeMinTRX = (io) => {
  let min = 2;
  let twoMinTrxJob = schedule.schedule("* * * * * *", function () {
    const currentTime = new Date().getSeconds(); // Get the current time
    const timeToSend = currentTime > 0 ? 60 - currentTime : currentTime;
    io.emit("threemintrx", `${min}_${timeToSend}`);
    // if (min === 0 && timeToSend === 6) {
    //   const datetoAPISend = parseInt(new Date().getTime().toString());
    //   const actualtome = soment.tz("Asia/Kolkata");
    //   const time = actualtome.add(5, "hours").add(30, "minutes").valueOf();
    //   try {
    //     setTimeout(async () => {
    //       const res = await axios.get(
    //         `https://apilist.tronscanapi.com/api/block?sort=-balance&start=0&limit=20&producer=&number=&start_timestamp=${datetoAPISend}&end_timestamp=${datetoAPISend}`
    //       );
    //       if (res?.data?.data[0]) {
    //         const obj = res.data.data[0];
    //         const fd = new FormData();
    //         fd.append("hash", `**${obj.hash.slice(-4)}`);
    //         fd.append("digits", `${obj.hash.slice(-5)}`);
    //         fd.append("number", obj.number);
    //         fd.append("time", moment(time).format("HH:mm:ss"));
    //         const newString = obj.hash;
    //         let num = null;
    //         for (let i = newString.length - 1; i >= 0; i--) {
    //           if (!isNaN(parseInt(newString[i]))) {
    //             num = parseInt(newString[i]);
    //             break;
    //           }
    //         }
    //         fd.append("slotid", num);
    //         fd.append("overall", JSON.stringify(obj));
    //         //  trx 3
    //         try {
    //           console.log("functoin call for 3 min");
    //           const response = await axios.post(
    //             "https://admin.zupeeter.com/Apitrx/insert_three_trx",
    //             fd
    //           );
    //         } catch (e) {
    //           console.log(e);
    //         }
    //       }
    //     }, [6000]);
    //   } catch (e) {
    //     console.log(e);
    //   }
    // }
    if (currentTime === 0) {
      min--;
      if (min < 0) min = 2; // Reset min to 2 when it reaches 0
    }
  });
};
