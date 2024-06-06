const constants = require("../config/constants");
const _ = require("lodash");

// fixx
// exports.sendResponse = (res, statusCode, status, message, data, lang= 'en') => {
//     try{
//         appLanguageList = constants.APP_LANGUAGE;
//         const msg = ((appLanguageList.indexOf(lang) != -1)) ? require(`../lang/${lang}/message`) : require(`../lang/en/message`)

//         let obj = message.split(".");
//         keyName = obj[0];
//         subKey = obj[1];

//         const resMessage = msg[keyName][subKey];

//         res.writeHead(statusCode, {'Content-Type': 'application/json'});
//         res.write(JSON.stringify({
//             "status": status,
//             "message": resMessage,
//             "data": data
//         }));
//         res.end();

//     } catch (err) {
//         throw err
//     }
// }
exports.sendResponse = (
  res,
  statusCode,
  status,
  message,
  data,
  lang = "en"
) => {
  try {
    const appLanguageList = constants.LANG.ENGLISH;
    const messages =
      appLanguageList.indexOf(lang) !== -1
        ? require(`../lang/${lang}/message`)
        : require(`../lang/en/message`);
    let resMessage = message; // Assume message is directly the key
    if (typeof message === "string") {
      const obj = message.split(" ");
      // console.log(obj)
      // console.log(messages[obj[0]])
      // && messages[obj[0]] && messages[obj[0]][obj[1]]
      if (obj.length >= 2) {
        resMessage = message;
      } else {
        console.error(`Message key "${message}" not found in language file.`);
        resMessage = "Unknown error occurred";
      }
    }

    res.writeHead(statusCode, { "Content-Type": "application/json" });
    res.write(
      JSON.stringify({
        status: status,
        message: resMessage,
        data: data,
      })
    );
    res.end();
  } catch (err) {
    console.error("Error in sendResponse:", err);
    throw err;
  }
};
