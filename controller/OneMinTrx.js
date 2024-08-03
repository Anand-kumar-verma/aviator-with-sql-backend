const schedule = require("node-cron");
const {
  queryDb,
  functionToreturnDummyResult,
} = require("../helper/adminHelper");
const moment = require("moment");
const soment = require("moment-timezone");
const { default: axios } = require("axios");

exports.generatedTimeEveryAfterEveryOneMinTRX = (io) => {
  let clear_interval;

  try {
    const job = schedule.schedule("* * * * * *", function () {
    // function handleTimer() {
    //   clear_interval = setInterval(() => {
        const currentTime = new Date();
        const timeToSend =
          currentTime.getSeconds() > 0
            ? 60 - currentTime.getSeconds()
            : currentTime.getSeconds();
        io.emit("onemintrx", timeToSend);
        if (timeToSend === 0) {
          // clearInterval(clear_interval);
          // handleTimer();
        }
      // }, 1000);
    // }
    // handleTimer();
    });
  } catch (e) {
    console.log(e);
  }
};

exports.insertOneMinTrxResultByCron = async(request,response) => {
  let isAlreadyHit = "";
  let result = "";
  let manual_result = "";
  // const insert = schedule.schedule("48 * * * * *", async function () {
    const datetoAPISend = parseInt(new Date().getTime().toString());
    const actualtome = soment.tz("Asia/Kolkata");
    const time = actualtome.add(5, "hours").add(30, "minutes").valueOf();
    var kill_time;
    try {
      datetoAPISend &&
        (kill_time = setTimeout(async () => {
          await axios
            .get(
              `https://apilist.tronscanapi.com/api/block`,
              {
                params: {
                  sort: "-balance",
                  start: "0",
                  limit: "20",
                  producer: "",
                  number: "",
                  start_timestamp: datetoAPISend,
                  end_timestamp: datetoAPISend,
                },
              },
              {
                headers: {
                  "Content-Type": "application/json",
                },
              }
            )
            .then((res) => {
              clearTimeout(kill_time);
              if (res?.data?.data?.[0]) {
                const obj = res?.data?.data?.[0];
                try {
                  insertIntoTrxonetable(
                    manual_result,
                    time,
                    obj,
                    (err, results) => {
                      if (err) {
                        console.error("Error inserting data: ", err);
                      } else {
                        console.log("Data inserted successfully: ", results);
                      }
                    }
                  );
                 
                } catch (e) {
                  console.log(e);
                }
              } else {
                getGeneratedTronResultIfFailButRandom(
                  datetoAPISend,
                  isAlreadyHit,
                  result,
                  manual_result,
                  time
                );
              }
            })
            .catch((e) => {
              console.log("error in tron api");
              clearTimeout(kill_time);
              getGeneratedTronResultIfFailButRandom(
                datetoAPISend,
                isAlreadyHit,
                result,
                manual_result,
                time
              );
            });
        }, [4000]));
    return response.status(200).json({
      msg:"hiii"
    })
    } catch (e) {
      clearTimeout(kill_time);
      console.log(e);
      return response.status(400).json({
        msg:"hiii"
      })
    }
  // });
};

async function getGeneratedTronResultIfFailButRandom(
  datetoAPISend,
  isAlreadyHit,
  result,
  manual_result,
  time
) {
  console.log("above api is failed");
  const fd = new FormData();
  /////////////////// inbetween 0 to 4 random number //////////////////
  const obj = functionToreturnDummyResult(
    Math.floor(Math.random() * (4 - 0 + 1)) + 0
  );

  try {
    insertIntoTrxonetable(manual_result, time, obj, (err, results) => {
      if (err) {
        console.error("Error inserting data: ", err);
      } else {
        console.log("Data inserted successfully: ", results);
      }
    });
    // isAlreadyHit = prevalue;
  } catch (e) {
    console.log(e);
  }
}

async function insertIntoTrxonetable(manual_result, time, obj, callback) {
  if (!obj?.hash) {
    obj = {
      hash: "0000000003c9a564d25473a75f10663e28ec2af72e6e5f16d413ddekjdsflja45",
      number: 65234895,
      size: 68325,
      timestamp: 1721285448000,
      txTrieRoot: "25ff7WnEyFkEm9edoVw84FBoYoiYExudyCFzTUarVz2G1bPVjm",
      parentHash:
        "0000000003c9a5639ef20261042c150fd3885b7148a77d6428be9129622191a4",
      witnessId: 0,
      witnessAddress: "TJBtdYunmQkeK5KninwgcjuK1RPDhyUWBZ",
      nrOfTrx: 283,
      nrOfTrx: 283,
      witnessName: "JD Investment",
      version: "30",
      fee: 265.16438,
      confirmed: false,
      nrOfTrx: 283,
      witnessName: "JD Investment",
      version: "30",
      nrOfTrx: 283,
      witnessName: "JD Investment",
      version: "30",
      nrOfTrx: 283,
      witnessName: "JD Investment",
      witnessName: "JD Investment",
      version: "30",
      fee: 265.16438,
      confirmed: false,
      confirmations: 3,
      netUsage: 83776,
      energyUsage: 4107654,
      blockReward: 16,
      voteReward: 160,
      revert: false,
    };
  }
  const newString =
    obj?.hash ||
    "0000000003c9a564d25473a75f10663e28ec2af72e6e5f16d413ddekjdsflja45";
  let num = null;
  for (let i = newString.length - 1; i >= 0; i--) {
    if (!isNaN(parseInt(newString[i]))) {
      num = parseInt(newString[i]);
      break;
    }
  }
  try {
    // const query = `CALL sp_insert_trx_one_min_result(?,?,?,?,?,?,?);`;
    const query = `CALL sp_inert_trx_testing_result_OVI(?,?,?,?,?,?,?);`;
    await queryDb(query, [
      Number(num + 1),
      String(moment(time).format("HH:mm:ss")),
      1,
      `**${obj?.hash?.slice(-4) || "ja45"}`,
      JSON.stringify(obj),
      `${obj?.hash.slice(-5) || "lja45"}`,
      obj?.number || 65234895,
    ])
      .then((result) => {})
      .catch((e) => {
        console.log("error in the sp_insert_trx_one_min_result");
      });
  } catch (e) {
    console.log("error in the sp_insert_trx_one_min_result");
  }
}
