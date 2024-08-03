const { queryDb, getAlredyPlacedBet } = require("../helper/adminHelper");
const { failMsg } = require("../helper/helperResponse");

exports.getGameHistory = async (req, res) => {
  const { gameid, limit } = req.body;

  if (!gameid || !limit) {
    return res.status(400).json({
      // Changed to 400 for bad request
      msg: "gameid and limit are required",
    });
  }
  try {
    const query =
      "SELECT * FROM tr42_win_slot WHERE tr41_packtype = 1 ORDER BY tr_transaction_id DESC LIMIT 200";
    await queryDb(query, [])
      .then((result) => {
        return res.status(200).json({
          msg: "Data fetched successfully",
          data: result,
        });
      })
      .catch((e) => {
        console.log(e);
        return res.status(500).json({
          msg: `Something went wrong api calling`,
        });
      });
  } catch (e) {
    return failMsg("Something went worng in node api");
  }
};
exports.getMyHistory = async (req, res) => {
  const { gameid, userid } = req.body;

  if (!gameid || !userid) {
    return res.status(400).json({
      // Changed to 400 for bad request
      msg: "gameid and userid are required",
    });
  }
  try {
    const query = `SELECT * FROM tr35_retopup_temp WHERE tr_user_id = ? AND tr_type = 1 ORDER BY tr_transid DESC LIMIT 200`;
    await queryDb(query, [Number(userid)])
      .then((result) => {
        return res.status(200).json({
          msg: "Data fetched successfully",
          earning: result,
        });
      })
      .catch((e) => {
        return res.status(500).json({
          msg: `Something went wrong api calling`,
        });
      });
  } catch (e) {
    return failMsg("Something went worng in node api");
  }
};
exports.placeBetTrx = async (req, res) => {
  const { user_id, type, round_no, amount, bet_number, description } = req.body;
  if (round_no && Number(round_no) <= 1) {
    return res.status(200).json({
      msg: `Refresh your page may be your game history not updated.`,
    });
  }

  if (!user_id || !type || !round_no || !amount || !bet_number || !description)
    return res.status(200).json({
      msg: `Everything is required`,
    });

  if (user_id && Number(user_id) <= 0) {
    return res.status(200).json({
      msg: `Please refresh your page`,
    });
  }

  if (Number(amount) <= 0)
    return res.status(200).json({
      msg: `Amount should be grater or equal to 1.`,
    });
  if (type && Number(type) <= 0)
    return res.status(200).json({
      msg: `Type is not define`,
    });
  if (type && Number(type) >= 4)
    return res.status(200).json({
      msg: `Type is not define`,
    });

  try {
    await getAlredyPlacedBet([String(round_no), Number(user_id)])
      .then(async (result) => {
        if (
          [11, 12, 13]?.includes(Number(bet_number)) &&
          result?.find((i) => [11, 12, 13]?.includes(i?.tr_package))
        ) {
          return res.status(200).json({
            msg: `Already Placed on color`,
          });
        } else if (
          [14, 15]?.includes(Number(bet_number)) &&
          result?.find((i) => [14, 15]?.includes(i?.tr_package))
        ) {
          return res.status(200).json({
            msg: `Already placed on big/small`,
          });
        } else if (
          [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]?.includes(Number(bet_number)) &&
          result?.filter((i) =>
            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]?.includes(i?.tr_package)
          )?.length > 2
        ) {
          return res.status(200).json({
            msg: `You have already placed 3  bets.`,
          });
        } else {
          const procedureCall =
            "CALL trx_bet_placing_node(?, ?, ?, ?, ?, ?, @result_msg); SELECT @result_msg;";
          await queryDb(procedureCall, [
            user_id,
            type,
            round_no,
            amount,
            bet_number,
            description,
          ])
            .then((newresult) => {
              return res.status(200).json({
                msg: newresult[1][0]["@result_msg"],
              });
            })
            .catch((error) => {
              return res.status(500).json({
                msg: `Something went wrong api calling`,
              });
            });
        }
      })
      .catch((e) => {
        return res.status(500).json({
          msg: `Something went wrong api calling`,
        });
      });
  } catch (e) {
    return failMsg("Something went worng in node api");
  }
};

exports.get_Royality_Date = async (req, res) => {
  const { user_id} = req.query;
  
  if (!user_id)
    return res.status(200).json({
      msg: `Everything is required`,
    });

  if (user_id && Number(user_id) <= 0) {
    return res.status(200).json({
      msg: `Please refresh your page`,
    });
  }

   const id = Number(user_id);
   if(typeof id !== 'number')
    return res.status(200).json({
      msg: `Please refresh your page`,
    });

  try {
    const query = `CALL sp_for_reamining_days_to_achive_ro_club(?,@remaining_days,@type_of_club); SELECT @remaining_days,@type_of_club; `
    await queryDb(query,[id]).then((result)=>{
      console.log(result)
      return res.status(200).json({
        msg:"Data found successfully",
        data:{
          date:result?.[1]?.[0]?.["@remaining_days"],
          club:result?.[1]?.[0]?.["@type_of_club"]
        }
      })
    })  
    .catch((e) => {
        return res.status(500).json({
          msg: `Something went wrong api calling`,
        });
      });
  } catch (e) {
    return failMsg("Something went worng in node api");
  }
};
