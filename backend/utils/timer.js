const timer = ({count, clear, callback}) => {
    let leftTime = count;
    const intervalId = setInterval(() => {
        leftTime = leftTime - 1;

      if (callback) {
        callback(leftTime)
      }

      if (leftTime < 1 || clear) {
          clearInterval(intervalId);
        }

      }, 1000);
      return intervalId
};

module.exports = { timer };
