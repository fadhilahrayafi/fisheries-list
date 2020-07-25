export const formatTime = (time) => {
var date = new Date(time * 1000);
var hours = date.getHours();
var minutes = "0" + date.getMinutes();
var seconds = "0" + date.getSeconds();
var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
return formattedTime
}

export const getUUID = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  export const formatMoney = (money) => {
    let result = 'Rp. '
    result += (money).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    return result
  }

  

export const formatDate = (date) => {
  return new Date(date).toLocaleDateString()
}
