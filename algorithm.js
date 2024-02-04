function count_consistency(){
    var arr = []
    for(var i=0;i<5;i++){
        var pts = document.getElementsByClassName("points")[i].value;
        if(pts.trim() !== "" && typeof Number(pts.trim()) === "number"){
            var points = Number(pts.trim());
            if(points >= 0 && points <= 40){
                arr.push(points / 40);
            }
        }
    }

    if(arr.length == 0){
        for(var i=0;i<5;i++){
            document.getElementsByClassName("points")[i].style.border = "1px solid red";
        }
    }
    else{
        for(var i=0;i<5;i++){
            document.getElementsByClassName("points")[i].style.border = "1px solid black";
        }
    }

    var c_array = arr.reverse();
    var sum = 0;

    for (var i = 0; i < c_array.length; i++) {
        var weighted_sum = 0;
        sum += sum_of_reciprocals(weighted_sum, c_array.length, i, i);
    }

    function sum_of_reciprocals(w_sum, days, current, index) {
        if (index < days) {
            if (index !== days - 1){
                w_sum += c_array[current] / (index + 1);
            }
            return sum_of_reciprocals(w_sum, days, current, index + 1);
        } else {
            return w_sum / days;
        }
    }

    document.getElementById("consistency").innerHTML = Math.round(sum * 1000) / 10 + "%";
    if(sum < 0.5){
        document.getElementById("consistency").style.color = "red";
    }
    else{
        document.getElementById("consistency").style.color = "black";
    }
}
