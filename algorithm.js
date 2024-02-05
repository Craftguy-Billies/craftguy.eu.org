function count_consistency(){
    var threshold = document.getElementById("threshold").value;
    if (threshold.trim() !== "" && !isNaN(Number(threshold.trim()))) {
        t_v = Number(threshold.trim());
        if (!(t_v <= 40 && t_v >= 0)) {
            t_v = 40;
        }
    }
    var arr = []
    for(var i=0;i<5;i++){
        var pts = document.getElementsByClassName("points")[i].value;
        if(pts.trim() !== "" && typeof Number(pts.trim()) === "number"){
            var points = Number(pts.trim());
            if(points >= 0 && points <= 40){
                if(points > t_v){
                    points = t_v;
                }
                arr.push(points / t_v);
            }
            else{
                document.getElementsByClassName("points")[i].style.border = "1px solid red";
            }
        }
    }

    if(arr.length < 2){
        for(var i=0;i<5;i++){
            document.getElementsByClassName("points")[i].style.border = "1px solid red";
        }
        return;
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
            if (current === 0){
                if(index + 1 < days){
                    w_sum += c_array[current] / (index + 2);
                }
            }
            else{
                w_sum += c_array[current] / (index + 1);
            }
            return sum_of_reciprocals(w_sum, days, current, index + 1);
        } else {
            return w_sum / (days - 1);
        }
    }

    document.getElementById("consistency").innerHTML = Math.round(sum * 1000) / 10 + "%";
    if(sum < 0.6){
        document.getElementById("consistency").style.color = "red";
    }
    else{
        document.getElementById("consistency").style.color = "black";
    }
}
