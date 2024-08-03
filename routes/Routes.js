const express = require("express");
const { getGameHistory, getMyHistory, placeBetTrx, get_Royality_Date } = require("../controller");
const { insertOneMinTrxResultByCron } = require("../controller/OneMinTrx");
const { betPlacedAviator, cashOutFunction, getGameHistoryAviator, getLederData, getWalletByUserId, getMyHistoryByID, getTopRecordsAviator } = require("../controller/AviatorStart");
const router = express.Router();


router.post("/trx_result-node", getGameHistory);
router.post("/trx-my-history-node", getMyHistory);
router.post("/bid-placed-node", placeBetTrx);
router.get("/get-royality-date", get_Royality_Date);
router.get("/insert-trx_result_ovi",insertOneMinTrxResultByCron);

// aviator api's 
router.post("/apply-bet",betPlacedAviator);
router.post("/cash-out",cashOutFunction);
router.get("/get-game-history", getGameHistoryAviator);
router.get("/get-ledger-data", getLederData);
router.post("/get-wallet-amount-by-id", getWalletByUserId);
router.post("/my-history-by-user-id", getMyHistoryByID);
router.get("/get-top-users", getTopRecordsAviator);


module.exports = router;
