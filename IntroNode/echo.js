function echo(text, times){
  for (var i = 0; i < Number(times); i++) {
      console.log(text);
  }  
};

function average(arr){
    var total = 0;
    arr.forEach(function(score){
        total += score;
    })
    var aver = total/arr.length;
    
    return Math.round(aver);
}

var score = [90,50,40,90,50,55]
console.log(average(score));