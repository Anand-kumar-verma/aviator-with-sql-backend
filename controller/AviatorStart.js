const { queryDb } = require("../helper/adminHelper");
let bet_data = [];
let boolean = false;
exports.aviator_Start_function = async (io) => {
  async function generateAndSendMessage(io, loss_amount, get_counter) {
    let timerInterval;
    let crashInterval;

    let counterboolean = true;
    let total_bet_candidate = 0;

    // await applyBet.deleteMany({})
    const time = Math.floor(100 + Math.random() * (900 - 100));
    console.log(time, "this is time to send to the uer or client");
    io.emit("message", time);
    io.emit("crash", false);
    let fly_time = 0;
    let milliseconds = 90;
    let seconds = 0;

    io.emit("setloder", false);
    io.emit("isFlying", true);

    /////////////////////////////////////////////////////////////////////// start main calculaton for cashs out ///////////////////////////

    ////////////////////////////// interval for timer //////////////////////////////////////////////

    timerInterval = setInterval(async () => {
      if (boolean) {
        clearInterval(timerInterval);
        clearInterval(crashInterval);
        clearInterval(timerInterval);
        clearInterval(crashInterval);
        thisFunctonMustBePerFormAfterCrash(Number(`${1}.${1}`), "no");
        return;
      }
      if (milliseconds === 100) {
        seconds += 1;
        milliseconds = 0;
      }

      io.emit("seconds", `${String(milliseconds).padStart(2, "0")}_${seconds}`);
      // console.log(
      //   `${String(milliseconds).padStart(2, "0")}_${seconds}`,
      //   "hiii"
      // );
      const newTime = fly_time + 1;
      if (newTime >= time) {
        clearInterval(timerInterval);
        clearInterval(crashInterval);
        clearInterval(timerInterval);
        clearInterval(crashInterval);
        thisFunctonMustBePerFormAfterCrash(
          Number(`${seconds}.${milliseconds}`),
          "pre"
        );
        return;
      }

      milliseconds += 1;
      fly_time = newTime;
    }, 100);

    ///////////////////////////////////// thsi is the calculation of total cashout sum
    let bet_sum = 0;
    crashInterval = setInterval(async () => {
      //////////////////////get counter         ////////////////////////////////////////////

      /// calculation for apply all bets summesion////////////////////////////

      ///////////////////////////////
      bet_sum = bet_data?.reduce((a, b) => a + b.amount, 0);
      total_bet_candidate = bet_data?.length;

      const cash_out_sum = bet_data?.reduce((a, b) => a + b?.amountcashed, 0);
      const total_amount_ka_60_percent = bet_sum * (60 / 100); /// 60 percent se upar jayega to crash kra dena hai

      /////////////////// condition for loss amount //////////////////////////

      if (loss_amount !== 0 && bet_sum !== 0) {
        if (get_counter >= 3) {
          clearInterval(timerInterval);
          clearInterval(crashInterval);
          clearInterval(timerInterval);
          clearInterval(crashInterval);
          // this_is_recusive_function_for_remove_all_lossAmount_if_counter_greater_than_3(
          //   bet_sum
          // );
          thisFunctonMustBePerFormAfterCrash(
            Number(`${seconds}.${milliseconds}`),
            "counter_jyada_ho_chuka_hai"
          );
          return;
        } else if (loss_amount <= bet_sum) {
          counterboolean = false;
          clearInterval(timerInterval);
          clearInterval(crashInterval);
          clearInterval(timerInterval);
          clearInterval(crashInterval);
          thisFunctonMustBePerFormAfterCrash(
            Number(`${seconds}.${milliseconds}`),
            "remove_all_loss_and_set_counter_to_zero"
          );
          return;
        } else {
          const percent_60_bet_amount = bet_sum * (100 / 60);
          const find_any_loss_amount_match_with_60_percent =
            await LossTable.aggregate([
              {
                $sort: { lossAmount: -1 }, // Sort by lossAmount in descending order
              },
              {
                $match: { lossAmount: { $lte: percent_60_bet_amount } }, // Match the criteria
              },
              {
                $limit: 1, // Limit the result to the first document
              },
            ]); ///////// yha se vo lossAmount aa jayega jo ki 60% of bet_amount ko veriy kre..
          if (
            find_any_loss_amount_match_with_60_percent?.[0] &&
            find_any_loss_amount_match_with_60_percent?.[0]?.lossAmount >
              bet_sum
          ) {
            clearInterval(timerInterval);
            clearInterval(crashInterval);
            clearInterval(timerInterval);
            clearInterval(crashInterval);

            const remaining_amount =
              find_any_loss_amount_match_with_60_percent?.[0]?.lossAmount -
              bet_sum;

            if (
              remaining_amount > 0 &&
              find_any_loss_amount_match_with_60_percent?.[0]
            ) {
              thisFunctonMustBePerFormAfterCrash(
                Number(`${seconds}.${milliseconds}`),
                "loss_if_loss_jyada_hai_bet_amount_se_aur_60_percent_se_koi_match_bhi_kiya_hai",
                find_any_loss_amount_match_with_60_percent
              );
              return;
            }
          } else {
            /////////////////// means bet_amount jyada hai ////////////////////
            if (find_any_loss_amount_match_with_60_percent?.[0]) {
              clearInterval(timerInterval);
              clearInterval(crashInterval);
              clearInterval(timerInterval);
              clearInterval(crashInterval);

              thisFunctonMustBePerFormAfterCrash(
                Number(`${seconds}.${milliseconds}`),
                "recursive_functoin_for_all_removel_amount"
              );
              return;
            } else {
              if (bet_sum > 0 && counterboolean && cash_out_sum > 0) {
                await SetCounter.findOneAndUpdate(
                  {},
                  { $inc: { counter: 1 } },
                  { new: true, upsert: true }
                );
                counterboolean = false;
              }
            }
          }
        }
      }

      ///////////////////////////////////// thsi is the calculation of total cashout sum

      /////////// conditoin for that if total amount is grater or equal that 500 Rs. creash ////////////////////
      if (total_bet_candidate <= 5 && bet_sum >= 500) {
        clearInterval(timerInterval);
        clearInterval(crashInterval);
        clearInterval(timerInterval);
        clearInterval(crashInterval);
        thisFunctonMustBePerFormAfterCrash(
          Number(`${seconds}.${milliseconds}`)
        );
        return;
      }
      ////////////////////// conndition is that means agar cashout 60% se jyada huaa to crash kra do///////////////
      if (cash_out_sum > total_amount_ka_60_percent) {
        console.log("Function is called now 60 percent se jyada");
        clearInterval(timerInterval);
        clearInterval(crashInterval);
        clearInterval(timerInterval);
        clearInterval(crashInterval);
        counterboolean = false;
        ///////////////// this is the condition that means if cashout is grater than //////////////////////
        if (cash_out_sum > bet_sum) {
          clearInterval(timerInterval);
          clearInterval(crashInterval);
          clearInterval(timerInterval);
          clearInterval(crashInterval);
          thisFunctonMustBePerFormAfterCrash(
            Number(`${seconds}.${milliseconds}`),
            "sixty_percent_se_jyada_ka_crash"
          );
          return;
        } else if (cash_out_sum < bet_sum) {
          clearInterval(timerInterval);
          clearInterval(crashInterval);
          clearInterval(timerInterval);
          clearInterval(crashInterval);
          thisFunctonMustBePerFormAfterCrash(
            Number(`${seconds}.${milliseconds}`),
            "null"
          );
          return;
        }
        ///////////////// this is the condition that means if cashout is grater than //////////////////////
      }
      //////////////////// agar bet lgi hui hai to  second 4 se jyada nhi hone chahiye (+1 krna pdega hmesa q ki ui me +1 karke dikhaya gya hai each and everything)
      if (bet_sum > 0) {
        if (Number(seconds >= 3)) {
          clearInterval(timerInterval);
          clearInterval(crashInterval);
          clearInterval(timerInterval);
          clearInterval(crashInterval);
          thisFunctonMustBePerFormAfterCrash(
            Number(`${seconds}.${milliseconds}`)
          );
          return;
        }
      }
    }, 500);

    ////////////// everything converted into sql data base//////////////
    async function this_is_recusive_function_for_remove_all_lossAmount(
      bet_sum
    ) {
      const percent_60_bet_amount = bet_sum * (100 / 60);
      const query_for_find_record_less_than_equal_to_60_percent = `SELECT * FROM aviator_loss WHERE lossAmount <= ${percent_60_bet_amount} ORDER BY lossAmount DESC LIMIT 1;`;
      const find_any_loss_amount_match_with_60_percent = await queryDb(
        query_for_find_record_less_than_equal_to_60_percent,
        []
      );
      //   await LossTable.aggregate([
      //     {
      //       $sort: { lossAmount: -1 }, // Sort by lossAmount in descending order
      //     },
      //     {
      //       $match: { lossAmount: { $lte: percent_60_bet_amount } }, // Match the criteria
      //     },
      //     {
      //       $limit: 1, // Limit the result to the first document
      //     },
      //   ]);
      // this is the base case..
      if (!find_any_loss_amount_match_with_60_percent) return;
      if (
        find_any_loss_amount_match_with_60_percent?.[0] &&
        find_any_loss_amount_match_with_60_percent?.[0]?.lossAmount > bet_sum
      ) {
        clearInterval(timerInterval);
        clearInterval(crashInterval);
        clearInterval(timerInterval);
        clearInterval(crashInterval);

        const remaining_amount =
          find_any_loss_amount_match_with_60_percent?.[0]?.lossAmount - bet_sum;
        if (
          remaining_amount > 0 &&
          find_any_loss_amount_match_with_60_percent?.[0]
        ) {
          const query_update_record_if_found = `UPDATE aviator_loss SET lossAmount = lossAmount - ${bet_sum} WHERE id = ?`;
          await queryDb(query_update_record_if_found, [
            find_any_loss_amount_match_with_60_percent?.[0]?.id,
          ]);

          // await LossTable.findByIdAndUpdate(
          //   { _id: find_any_loss_amount_match_with_60_percent?.[0]?._id },
          //   {
          //     lossAmount:
          //       find_any_loss_amount_match_with_60_percent?.[0]?.lossAmount -
          //       bet_sum,
          //   }
          // );

          return;
        }
      } else {
        if (find_any_loss_amount_match_with_60_percent?.[0]) {
          const query_for_delete_record = `DELETE FROM aviator_loss WHERE id  = ?;`;
          await queryDb(query_for_delete_record, [
            find_any_loss_amount_match_with_60_percent?.[0].id,
          ]);

          // await LossTable.findByIdAndDelete({
          //   _id: find_any_loss_amount_match_with_60_percent?.[0]._id,
          // });
          const total_value_bet_amount_which_is_grater_than_lossAmount =
            bet_sum -
            find_any_loss_amount_match_with_60_percent?.[0]?.lossAmount;
          if (total_value_bet_amount_which_is_grater_than_lossAmount > 0)
            this_is_recusive_function_for_remove_all_lossAmount(
              total_value_bet_amount_which_is_grater_than_lossAmount
            );
        }
      }
    }

    ////////////////// every thing is converted into sql table //////////////////////////////////////////
    async function this_is_recusive_function_for_remove_all_lossAmount_if_counter_greater_than_3(
      bet_sum
    ) {
      console.log("Anand ji ka function call huaa", bet_sum);

      const query_for_finding_loss_amount = `SELECT * FROM aviator_loss ORDER BY lossAmount DESC LIMIT 1; `;
      const find_any_loss_amount_match_with_60_percent = await queryDb(
        query_for_finding_loss_amount,
        []
      );
      //   await LossTable.aggregate([
      //     {
      //       $sort: { lossAmount: -1 }, // Sort by lossAmount in descending order
      //     },
      //     {
      //       $limit: 1, // Limit the result to the first document
      //     },
      //   ]);

      // this is the base case..
      if (
        !find_any_loss_amount_match_with_60_percent ||
        find_any_loss_amount_match_with_60_percent.length <= 0
      ) {
        const query_for_update_counter = `UPDATE aviator_loss_counter SET counter = 0 WHERE id = 1;`;
        await queryDb(query_for_update_counter, []);
        //   await SetCounter.findOneAndUpdate({}, { counter: 0 });
        return;
      }

      if (
        find_any_loss_amount_match_with_60_percent[0] &&
        find_any_loss_amount_match_with_60_percent[0].lossAmount > bet_sum
      ) {
        const remaining_amount =
          find_any_loss_amount_match_with_60_percent[0].lossAmount - bet_sum;

        if (remaining_amount > 0) {
          clearInterval(timerInterval);
          clearInterval(crashInterval);

          const query_for_update_loss_amount = `UPDATE aviator_loss SET lossAmount = ? WHERE id = ?;`;
          await queryDb(query_for_update_loss_amount, [
            remaining_amount,
            find_any_loss_amount_match_with_60_percent[0].id,
          ]);
          // await LossTable.findByIdAndUpdate(
          //   { _id: find_any_loss_amount_match_with_60_percent[0]._id },
          //   {
          //     lossAmount: remaining_amount,
          //   }
          // );

          return;
        }
      } else {
        if (find_any_loss_amount_match_with_60_percent[0]) {
          const query_for_delete_record = `DELETE FROM aviator_loss WHERE id = ?;`;
          await queryDb(query_for_delete_record, [
            find_any_loss_amount_match_with_60_percent[0].id,
          ]);

          // await LossTable.findByIdAndDelete({
          //   _id: find_any_loss_amount_match_with_60_percent[0]._id,
          // });

          const total_value_bet_amount_which_is_greater_than_lossAmount =
            bet_sum - find_any_loss_amount_match_with_60_percent[0].lossAmount;

          if (total_value_bet_amount_which_is_greater_than_lossAmount > 0) {
            return this_is_recusive_function_for_remove_all_lossAmount_if_counter_greater_than_3(
              total_value_bet_amount_which_is_greater_than_lossAmount
            );
          }
        }
      }

      // Check if there are any remaining documents
      // const remaining_documents = await LossTable.find({}).countDocuments();
      // if (remaining_documents === 0) {
      //   await SetCounter.findOneAndUpdate({}, { counter: 0 });
      // }
      const query_for_count_rows = `SELECT COUNT(*) AS count_row FROM aviator_loss;`;
      const response_count = await queryDb(query_for_count_rows, []);
      if (response_count?.[0]?.count_row === 0) {
        const query_for_update_counter = `UPDATE aviator_loss_counter SET counter = 0 WHERE id = 1;`;
        await queryDb(query_for_update_counter, []);
      }
    }

    async function thisFunctonMustBePerFormAfterCrash(time, msg) {
      clearInterval(timerInterval);
      clearInterval(crashInterval);
      clearInterval(timerInterval);
      clearInterval(crashInterval);
      console.log("thisFunctonMustBePerFormAfterCrash HOOOOOOO crached");
      // const round = await GameRound?.find({});
      io.emit("crash", true);
      io.emit("isFlying", false);
      io.emit("setcolorofdigit", true);
      io.emit("apply_bet_counter", []);
      io.emit("cash_out_counter", []);

      // done in sql
      if (msg === "counter_jyada_ho_chuka_hai") {
        let bet_sum = bet_data?.reduce((a, b) => a + b.amount, 0);
        this_is_recusive_function_for_remove_all_lossAmount_if_counter_greater_than_3(
          bet_sum
        );
      }
      if (
        msg ===
        "loss_if_loss_jyada_hai_bet_amount_se_aur_60_percent_se_koi_match_bhi_kiya_hai"
      ) {
        let bet_sum = bet_data?.reduce((a, b) => a + b.amount, 0);
        const percent_60_bet_amount = bet_sum * (100 / 60);
        const query_for_find_record_less_than_equal_to_60_percent = `SELECT * FROM aviator_loss WHERE lossAmount <= ${percent_60_bet_amount} ORDER BY lossAmount DESC LIMIT 1;`;
        const find_any_loss_amount_match_with_60_percent = await queryDb(
          query_for_find_record_less_than_equal_to_60_percent,
          []
        );
        // await LossTable.aggregate([
        //   {
        //     $sort: { lossAmount: -1 }, // Sort by lossAmount in descending order
        //   },
        //   {
        //     $match: { lossAmount: { $lte: percent_60_bet_amount } }, // Match the criteria
        //   },
        //   {
        //     $limit: 1, // Limit the result to the first document
        //   },
        // ]);

        const query_update_record_if_found = `UPDATE aviator_loss SET lossAmount = lossAmount - ${bet_sum} WHERE id = ?`;
        await queryDb(query_update_record_if_found, [
          find_any_loss_amount_match_with_60_percent?.[0]?.id,
        ]);

        //   await LossTable.findByIdAndUpdate(
        //     { _id: find_any_loss_amount_match_with_60_percent?.[0]?._id },
        //     {
        //       lossAmount:
        //         find_any_loss_amount_match_with_60_percent?.[0]?.lossAmount -
        //         bet_sum,
        //     }
        //   );
      }

      if (msg === "recursive_functoin_for_all_removel_amount") {
        let bet_sum = bet_data?.reduce((a, b) => a + b.amount, 0);
        const percent_60_bet_amount = bet_sum * (100 / 60);
        const query_for_find_record_less_than_equal_to_60_percent = `SELECT * FROM aviator_loss WHERE lossAmount <= ${percent_60_bet_amount} ORDER BY lossAmount DESC LIMIT 1;`;
        const find_any_loss_amount_match_with_60_percent = await queryDb(
          query_for_find_record_less_than_equal_to_60_percent,
          []
        );
        // await LossTable.aggregate([
        //   {
        //     $sort: { lossAmount: -1 }, // Sort by lossAmount in descending order
        //   },
        //   {
        //     $match: { lossAmount: { $lte: percent_60_bet_amount } }, // Match the criteria
        //   },
        //   {
        //     $limit: 1, // Limit the result to the first document
        //   },
        // ]);
        const query_for_delete_record = `DELETE FROM aviator_loss WHERE id  = ?;`;
        await queryDb(query_for_delete_record, [
          find_any_loss_amount_match_with_60_percent?.[0].id,
        ]);
        //   await LossTable.findByIdAndDelete({
        //     _id: find_any_loss_amount_match_with_60_percent?.[0]._id,
        //   });

        const total_value_bet_amount_which_is_grater_than_lossAmount =
          bet_sum - find_any_loss_amount_match_with_60_percent?.[0]?.lossAmount;

        this_is_recusive_function_for_remove_all_lossAmount(
          total_value_bet_amount_which_is_grater_than_lossAmount
        );
      }

      if (msg === "sixty_percent_se_jyada_ka_crash") {
        console.log("sixty_percent_se_jyada_ka_crash");
        const bet_sum = bet_data?.reduce((a, b) => a + b.amount, 0);
        const cash_out_sum = bet_data?.reduce((a, b) => a + b?.amountcashed, 0);

        const query_for_insert_record_in_loss_table = `INSERT INTO aviator_loss(lossAmount) VALUES(${
          cash_out_sum - bet_sum
        })`;
        await queryDb(query_for_insert_record_in_loss_table, []);
        //   const obj = new LossTable({
        //     lossAmount: cash_out_sum - bet_sum,
        //   });
        //   const response = await obj.save();
      }
      if (msg === "remove_all_loss_and_set_counter_to_zero") {
        const query_for_truncate_loss_table = `TRUNCATE TABLE aviator_loss;`;
        await queryDb(query_for_truncate_loss_table, []);
        const query_for_update_counter = `UPDATE aviator_loss_counter SET counter = 0 WHERE id = 1;`;
        await queryDb(query_for_update_counter, []);

        //   await LossTable.deleteMany({});
        //   await SetCounter.findOneAndUpdate({}, { counter: 0 });
      }

      // const obj = new GameHistory({
      //   round: 10000,
      //   multiplier: msg === "pre" ? time : time - 0.01,
      // });
      // const response = await obj.save();
      const query_for_insert_game_history = `INSERT INTO aviator_game_history(round,multiplier) VALUES(?,?);`;
      await queryDb(query_for_insert_game_history, [
        10000,
        msg === "pre" ? time : time - 0.01,
      ]);

      // const saveBetLedgers = async (bet_data) => {
      //   const promises = bet_data.map(async (element) => {
      //     const obj = new ApplyBetLedger({
      //       main_id: element.userid,
      //       userid: element.id,
      //       amount: element.amount,
      //       amountcashed: element.amountcashed,
      //       multiplier: element.multiplier,
      //     });
      //     return obj.save();
      //   });

      //   // Wait for all save operations to complete
      //   await Promise.all(promises);
      // };
      const saveBetLedgers = async (bet_data) => {
        const query = `
                INSERT INTO aviator_bet_place_ledger (userid, amount, amountcashed, multiplier)
                VALUES (?, ?, ?, ?)
              `;

        // Create an array of promises for insert operations
        const promises = bet_data.map(async (element) => {
          const values = [
            element.userid,
            // element.id,
            element.amount,
            element.amountcashed,
            element.multiplier,
          ];
          return queryDb(query, values);
        });

        // Execute all insert operations
        try {
          await Promise.all(promises);
        } catch (error) {
          console.error("Error saving bet ledgers:", error);
        }
      };

      // Example usage:
      saveBetLedgers(bet_data)
        .then(() => {
          console.log("All ApplyBetLedger objects saved successfully");
        })
        .catch((err) => {
          console.error("Error saving ApplyBetLedger objects:", err);
        });

      setTimeout(() => {
        io.emit("setcolorofdigit", false);
        io.emit("setloder", true);
      }, 3000);

      // let loss_amount = await LossTable.aggregate([
      //   {
      //     $group: {
      //       _id: null,
      //       totalAmount: { $sum: "$lossAmount" },
      //     },
      //   },
      // ]).then((result) => {
      //   return result.length > 0 ? result[0].totalAmount : 0;
      // });

      const query_for_get_total_loss_amount = `SELECT SUM(lossAmount) as sum_total FROM aviator_loss;`;
      let loss_amount = await queryDb(query_for_get_total_loss_amount, []);

      //const set_counter = await SetCounter.find({});
      const query_for_get_counter = `SELECT counter FROM aviator_loss_counter WHERE id = 1;`;
      const set_counter = await queryDb(query_for_get_counter, []);
      let get_counter = set_counter?.[0]?.counter || 0;

      const total_bet_sum = bet_data?.reduce((a, b) => a + b.amount, 0);
      const total_crashed_sum = bet_data?.reduce(
        (a, b) => a + b.amountcashed,
        0
      );

      // const admin_wallet = await AdminWallet.find({}).limit(1);
      // await AdminWallet.findByIdAndUpdate(
      //   { _id: admin_wallet?.[0]?._id },
      //   {
      //     wallet:
      //       admin_wallet?.[0]?.wallet +
      //       (Number(total_bet_sum) - Number(total_crashed_sum)),
      //   }
      // );
      const query_for_get_admin_wallet = `UPDATE aviator_admin_wallet SET wallet = wallet + ${
        Number(total_bet_sum) - Number(total_crashed_sum)
      }`;
      await queryDb(query_for_get_admin_wallet, []);

      // bet_data.forEach(async (element) => {
      //   const getuser = await User.findOne({ _id: element.userid });
      //   const response = await User.findByIdAndUpdate(
      //     { _id: getuser._id },
      //     {
      //       wallet:
      //         getuser.wallet +
      //         Number(
      //           element.amountcashed > 0
      //             ? element.amountcashed - element.amount
      //             : -element.amount
      //         ),
      //     }
      //   );
      // });

      // const updateUserWallets = async (bet_data) => {
      //   // Step 1: Group bet_data by userid and calculate the total wallet change for each user
      //   const userWalletChanges = bet_data.reduce((acc, element) => {
      //     const userId = element.userid;
      //     const amountChange = Number(
      //       element.amountcashed > 0
      //         ? element.amountcashed - element.amount
      //         : -element.amount
      //     );

      //     if (!acc[userId]) {
      //       acc[userId] = 0;
      //     }
      //     acc[userId] += amountChange;
      //     return acc;
      //   }, {});

      //   // Step 2: Update each user once with the aggregated wallet change
      //   const updatePromises = Object.keys(userWalletChanges).map(
      //     async (userId) => {
      //       const getuser = await User.findOne({ _id: userId });
      //       if (getuser) {
      //         const newWalletAmount = getuser.wallet + userWalletChanges[userId];
      //         return User.findByIdAndUpdate(
      //           { _id: getuser._id },
      //           { wallet: newWalletAmount },
      //           { new: true }
      //         );
      //       }
      //     }
      //   );

      //   // Step 3: Wait for all updates to complete
      //   await Promise.all(updatePromises);
      // };

      const updateUserWallets = async (bet_data) => {
        // Create a connection to the database
        try {
          // Step 1: Group bet_data by userid and calculate the total wallet change for each user
          const userWalletChanges = bet_data.reduce((acc, element) => {
            const userId = element.userid;
            const amountChange = Number(
              element.amountcashed > 0
                ? element.amountcashed - element.amount
                : -element.amount
            );

            if (!acc[userId]) {
              acc[userId] = 0;
            }
            acc[userId] += amountChange;
            return acc;
          }, {});

          // Step 2: Update each user once with the aggregated wallet change
          const updatePromises = Object.keys(userWalletChanges).map(
            async (userId) => {
              const amountChange = userWalletChanges[userId];
              const query_for_update_wallet = `UPDATE user SET winning_wallet = winning_wallet + ${amountChange}  WHERE id = ?;`;
              return await queryDb(query_for_update_wallet, [userId]);
            }
          );

          // Step 3: Wait for all updates to complete
          await Promise.all(updatePromises);
        } catch (error) {
          console.error("Error updating user wallets:", error);
        }
      };

      // Example usage:
      updateUserWallets(bet_data)
        .then(() => {
          console.log("User wallets updated successfully");
        })
        .catch((err) => {
          console.error("Error updating user wallets:", err);
        });

      setTimeout(() => {
        bet_data = [];
        msg !== "no" && generateAndSendMessage(io, loss_amount, get_counter);
      }, 30000);
    }
  }
  generateAndSendMessage(io, 0, 0);
};

exports.betPlacedAviator = async (req, res) => {
  try {
    const { userid, id, amount, button_type } = req.body;
    if (!userid || !id || !amount)
      return res.status(403).json({
        msg: "All field is required",
      });
    const new_data = {
      userid: userid,
      id: id,
      amount: amount,
      amountcashed: 0,
      multiplier: 0,
      button_type: button_type,
    };
    bet_data.push(new_data);
    // const user = await User.findOne({ _id: userid });
    // const newamount = await User.findByIdAndUpdate(
    //   { _id: userid },
    //   { wallet: user.wallet - amount }
    // );
    return res.status(200).json({
      msg: "Data save successfully",
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      msg: "Something went wrong in bet placing",
    });
  }
};

exports.cashOutFunction = async (req, res) => {
  try {
    const { userid, id, amount, multiplier, button_type } = req.body;
    if (!userid || !id || !amount || !multiplier || !button_type)
      return res.status(403).json({
        msg: "All field is required",
      });

    // const user = await User.findOne({ _id: userid });
    // const newamount = await User.findByIdAndUpdate(
    //   { _id: userid },
    //   { wallet: user.wallet + amount }
    // );

    bet_data.forEach((item) => {
      if (item.id === id && item.button_type === button_type) {
        item.amountcashed = amount;
        item.multiplier = multiplier;
      }
    });
    ////////////////// revert the final response
    return res.status(200).json({
      msg: "Data save successfully",
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      msg: "Something went wrong in create user query",
    });
  }
};
