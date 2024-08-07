`use strict`

import logger from "./../winston/logger"
import * as database from "./database/database"
import * as serviceSQL from './serviceSQL'
import axios from 'axios';

const executeService = (txnId, jRequest) => {
    var jResponse = {};

    try {
        switch (jRequest.commandName) {
            case "stock.getTickerList":
                jResponse = getTickerList(txnId, jRequest);
                break;
            case "stock.getTickerInfo":
                jResponse = getTickerInfo(txnId, jRequest);
                break;
            case "stock.getStockInfo":
                jResponse = getStockInfo(txnId, jRequest);
                break;
            case "stock.getRealtimeStockInfo":
                jResponse = getRealtimeStockInfo(txnId, jRequest);
                break;
            default:
                break;
        }
    } catch (error) {
        logger.error(error);
    } finally {
        return jResponse;
    }
}

const getStockInfo = async (txnId, jRequest) => {
    var jResponse = {};

    try {
        jResponse.commanaName = jRequest.commandName;
        jResponse.userId = jRequest.userId;

        if (!jRequest.stocksTicker) {
            jResponse.error_code = -2;
            jResponse.error_message = `The [stocksTicker] is a required field. 
            Please set a value.`;
            return jResponse;
        }

        if (!jRequest.multiplier) {
            jResponse.error_code = -2;
            jResponse.error_message = `The [multiplier] is a required field. 
            Please set a value.`;
            return jResponse;
        }

        if (!jRequest.timespan) {
            jResponse.error_code = -2;
            jResponse.error_message = `The [timespan] is a required field. 
            Please set a value.`;
            return jResponse;
        }

        if (!jRequest.from) {
            jResponse.error_code = -2;
            jResponse.error_message = `The [from] is a required field. 
            Please set a value.`;
            return jResponse;
        }

        if (!jRequest.to) {
            jResponse.error_code = -2;
            jResponse.error_message = `The [to] is a required field. 
            Please set a value.`;
            return jResponse;
        }

        if (!jRequest.adjust) {
            jResponse.error_code = -2;
            jResponse.error_message = `The [adjust] is a required field. 
            Please set a value.`;
            return jResponse;
        }

        if (!jRequest.sort) {
            jResponse.error_code = -2;
            jResponse.error_message = `The [sort] is a required field. 
            Please set a value.`;
            return jResponse;
        }

        const apiUrl = `https://api.polygon.io/v2/aggs/ticker/${jRequest.stocksTicker}/range/${jRequest.multiplier}/${jRequest.timespan}/${jRequest.from}/${jRequest.to}?adjusted=${jRequest.adjust}&sort=${jRequest.sort}&apiKey=${process.env.POLYGON_API_KEY}`

        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw Error(response.statusText)
        }

        const data = await response.json();
        jResponse.stockInfo = data.results;
        jResponse.error_code = 0; // exception
        jResponse.error_message = data.status;
    }
    catch (e) {
        logger.error(e);
        jResponse.error_code = -3; // exception
        jResponse.error_message = e.message
    }
    finally {
        return jResponse;
    }
};

const getTickerList = async (txnId, jRequest) => {
    var jResponse = {};

    try {
        jResponse.commanaName = jRequest.commandName;

        var sql = null
        sql = await serviceSQL.getSQL00('select_TB_COR_TICKER_INFO', 1);
        var select_TB_COR_TICKER_INFO_01 = await database.executeSQL(sql,
            [
                jRequest.systemCode
            ]);

        jResponse.tickerList = select_TB_COR_TICKER_INFO_01.rows;

        jResponse.error_code = 0;
        jResponse.error_message = "";
    } catch (e) {
        logger.error(e);
        jResponse.error_code = -1; // exception
        jResponse.error_message = e.message
    } finally {
        return jResponse;
    }
};

const getTickerInfo = async (txnId, jRequest) => {
    var jResponse = {};

    try {
        jResponse.commanaName = jRequest.commandName;

        var sql = null
        sql = await serviceSQL.getSQL00('select_TB_COR_TICKER_INFO', 2);
        var select_TB_COR_TICKER_INFO_02 = await database.executeSQL(sql,
            [
                jRequest.systemCode,
                jRequest.tickerCode,
            ]);

        if (select_TB_COR_TICKER_INFO_02.rowCount === 1) {
            logger.info(`RESULT:\n${JSON.stringify(select_TB_COR_TICKER_INFO_02.rows[0])}\n`);

            jResponse.tickerInfo = {};
            jResponse.tickerInfo.tickerDesc = select_TB_COR_TICKER_INFO_02.rows[0].ticker_desc;
            jResponse.tickerInfo.tickerInfoContent = select_TB_COR_TICKER_INFO_02.rows[0].ticker_info_content;
            jResponse.tickerInfo.tickerNewsContent = select_TB_COR_TICKER_INFO_02.rows[0].ticker_news_content;
        }
        else if (select_TB_COR_TICKER_INFO_02.rowCount <= 0) {
            jResponse.error_code = -1;
            jResponse.error_message = `The ticker info not exist.`;
            return jResponse;
        }

        jResponse.error_code = 0;
        jResponse.error_message = "";
    } catch (e) {
        logger.error(e);
        jResponse.error_code = -1; // exception
        jResponse.error_message = e.message
    } finally {
        return jResponse;
    }
};

const getRealtimeStockInfo = async (txnId, jRequest) => {
    var jResponse = {};

    try {
        jResponse.commanaName = jRequest.commandName;

        if (!jRequest.stocksTicker) {
            jResponse.error_code = -2;
            jResponse.error_message = `The [stocksTicker] is a required field. 
            Please set a value.`;

            return jResponse;
        }

        const FINNHUB_REALTIME_URL = `https://finnhub.io/api/v1/quote?symbol=${jRequest.stocksTicker}&token=${process.env.FINNHUB_API_KEY}`;
        const response = await axios.get(FINNHUB_REALTIME_URL);

        jResponse.stockInfo = { type: 'stockInfo', data: response.data, time: new Date(response.data.t * 1000).toISOString() }
        jResponse.error_code = 0;
        jResponse.error_message = '';
    }
    catch (e) {
        logger.error(e);
        jResponse.error_code = -1; // exception
        jResponse.error_message = e.message
    }
    finally {
        return jResponse;
    }
};

export { executeService };