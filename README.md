This website is the only official website of Craftguy.

English website: https://www.craftguy.eu.org/
Chinese website: https://www.craftguy.eu.org/zh/

Subscribe to Craftguy: htttps://www.youtube.com/c/Craftguy?sub_confirmation=1

Thank you for coming here!

Latest Project: Consistency rate
Link: https://www.craftguy.eu.org/consistency.html

<code>
function count_consistency(){
    var threshold = document.getElementById("threshold").value;
    var t_v = 40;
    var l_c = [];
    if (threshold.trim() !== "" && !isNaN(Number(threshold.trim()))) {
        console.log("ran");
        t_v = Number(threshold.trim());
        if (!(t_v <= 40 && t_v >= 0)) {
            t_v = 40;
        }
    }
    console.log(t_v);
    var arr = [];
    for (var i = 0; i < 5; i++) {
    var inputElement = document.getElementsByClassName("points")[i];
    var pts = inputElement.value;
    if (pts.trim() !== "") {
        var points = Number(pts.trim());
        // isNaN function returns false if the value is a number.
        if (!isNaN(points)) {
            if (points < 0 || points > 40) {
                l_c.push(i);
            } else {
                if (points > t_v) {
                    points = t_v;
                }
                arr.push(points / t_v);
                inputElement.style.border = "";
            }
        }
        // Optionally, reset border for non-numeric inputs to visually ignore them without error indication
    } else {
        // Reset border if the field is empty
        inputElement.style.border = ""; // Reset to default or specific styling
    }
    }
    

    if(arr.length < 2){
        for(var i=0;i<5;i++){
            document.getElementsByClassName("points")[i].style.border = "1px solid red";
        }
        document.getElementById("warning").style.display = "block";
        return;
    }
    else{
        for(var i=0;i<5;i++){
            document.getElementsByClassName("points")[i].style.border = "1px solid black";
        }
        document.getElementById("warning").style.display = "none";
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

    if (l_c.length > 0){
        for (var i = 0;i < l_c.length;i ++){
            document.getElementsByClassName("points")[l_c[i]].style.border = "1px solid red";
        }
        l_c = [];
    }
}
</code>
