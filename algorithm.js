function count_consistency(){
    var arr = []
    for(var i=0;i<5;i++){
        var pts = document.getElementsByClassName("points")[i].value;
        if(pts.trim() !== "" && typeof Number(pts.trim()) === "number"){
            var points = Number(pts.trim());
            if(points % 10 === 0 && points <= 40){
                arr.push(points);
            }
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
            w_sum += c_array[current] / (index + 1);
            return sum_of_reciprocals(w_sum, days, current, index + 1);
        } else {
            return w_sum / days;
        }
    }

    document.getElementById("consistency").innerHTML = sum;
}
