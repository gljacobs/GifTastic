var topics = ["wolf", "lizard", "tiger", "bear"];

var renderButton = (arr) => {
    $("#buttons").empty();
    for (var i = 0; i < arr.length; i++) {
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
});

renderButton(topics);

$("button").on("click", function () {
    var animal = $(this).val();
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        animal + "&api_key=JMG89CzdvjAg1S68HR88ZX9xfKv2PHsK";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        console.log(response);
        var results = response.data;

        for (var i = 0; i < results.length; i++) {

            var animalDiv = $("<div>");
            var p = $("<p>");
            p.text(results[i].rating);
            var img = $("<img>");

            img.attr("src", results[i].images.fixed_height_still.url);
            img.attr("data-still", results[i].images.fixed_height_still.url);
            img.attr("data-animate", results[i].images.fixed_height.url);
            img.attr("data-state", "still");

            animalDiv.append(p);
            animalDiv.append(img);
            $("#gifs").prepend(animalDiv);

        }
    });
});

$("img").on("click", function () {

    var state = $(this).attr("data-state");
    
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate")
    }
    else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still")
    }
});