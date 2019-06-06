var topics = ["wolf", "lizard", "tiger", "bear"];

var renderButton = (arr) => {
    $("#buttons").empty();
    for(var i = 0; i < arr.length; i++){
        var butt = $("<button>" + arr[i] + "</button>");
        butt.attr("id", i);
        butt.val(arr[i]);
        $("#buttons").append(butt);
    }
}

$("#submit").on("click", (event) => {
    event.preventDefault();
    topics.push($("#search").val());
    $("#search").val("");
    renderButton(topics);
})

renderButton(topics);