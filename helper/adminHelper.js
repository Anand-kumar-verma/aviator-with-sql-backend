"user strict";
var sql = require("../config/db.config");
// const path = require("path");

module.exports = {
  getAlredyPlacedBet: function (params) {
    let query_string =
      "SELECT tr_package FROM tr35_retopup_temp WHERE tr_transid = ? AND tr_user_id = ? AND tr_type = 1";
    let param = params;
    return new Promise((resolve, reject) => {
      sql.query(query_string, param, (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve(result);
      });
    });
  },
  functionToreturnDummyResult: function (index) {
    const array = [
      {
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
      },

      {
        hash: "0000000003c9a564d25473a75f10663e28ec2af72e6e5f16d413dde92d5sdlds4542",
        number: 65241369,
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
      },

      {
        hash: "0000000003c9a564d25473a75f10663e28ec2af72e6e5f16d413dde9244fgh145",
        number: 68745213,
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
      },
      {
        hash: "0000000003c9a564d25473a75f10663e28ec2af72e6e5f16d413dde92dgfhdfh451",
        number: 69532458,
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
      },
    ];
    return array[index || 0];
  },
  funciotnForInsertDataInTR_42: function (params) {
    const sql42 =
      "INSERT INTO tr42_win_slot (tr41_slot_id, tr_block_time, tr41_packtype,tr_transaction_id,tr_price,tr_hashno,tr_overall_hash,tr_digits,tr_number) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)"; // Adjust the columns and values as per your table structure
    let param = params;
    return new Promise((resolve, reject) => {
      sql.query(sql42, param, (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve(result);
      });
    });
  },
  funciotnForInsertDataInTR_43: function (params) {
    const sql43 =
      "INSERT INTO tr43_win_slot (tr41_slot_id, tr_block_time, tr41_packtype,tr_transaction_id,tr_price,tr_hashno,tr_overall_hash,tr_digits,tr_number) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)"; // Adjust the columns and values as per your table structure
    let param = params;
    return new Promise((resolve, reject) => {
      sql.query(sql43, param, (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve(result);
      });
    });
  },
  functionToUpdateTheTransId: function (params) {
    const sqlupdatequery = `UPDATE tr_game SET tr_tranaction_id = ?, tr_price = ? WHERE tr_id = 1`;
    let param = params;
    return new Promise((resolve, reject) => {
      sql.query(sqlupdatequery, param, (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve(result);
      });
    });
  },
  functionToUpdateTheManualResult: function (params) {
    const query_data = `UPDATE tr41_trx_result  SET tr41_status=2 WHERE tr41_type=1;`;
    let param = params;
    return new Promise((resolve, reject) => {
      sql.query(query_data, param, (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve(result);
      });
    });
  },
  functionToGetTheManualResult: function (params) {
    const queryformanualresult = `SELECT tr41_packid FROM tr41_trx_result WHERE tr41_type=1 AND tr41_status=1 LIMIT 1`;
    let param = params;
    return new Promise((resolve, reject) => {
      sql.query(queryformanualresult, param, (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve(result);
      });
    });
  },

  queryDb: function (query, param) {
    return new Promise((resolve, reject) => {
      sql.query(query, param, (err, result) => {
        if (err) {
          //return reject(err);
          return console.log(err);
        }
        resolve(result);
      });
    });
  },
};
