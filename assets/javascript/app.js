$(document).ready(function () {

// array storing strings of music topics
var topics = ["music", "guitars", "bands", "songs", "albums", "rock & roll", "trumpet", "concert", "festival", "drums", "bass"];

    // function that creates the buttons from array of topics.
    function createButtons () {

        $("#buttonGroup").empty();

        for (var i = 0; i < topics.length; i++) {

            var buttons = $("<button>");

            buttons.addClass("music btn-primary");

            buttons.attr("data-name", topics[i]);

            buttons.text(topics[i]);

            $("#buttonGroup").append(buttons);

        }

    }

    createButtons();


///function that calls ajax , creates the different gifs corresponding to which button is clicked and displays them on the page
    $(document).on("click", "button", function () { 


    $("#gifSection").empty();

        var music = $(this).attr("data-name");

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + music + "&limit=10&api_key=Z0sp8cutHyn3uqJ6xsGZneorJAqvpDiF";

        console.log(queryURL);

        $.ajax ({

            url: queryURL,

            method: "GET"

            }).then(function(response) {
   
             var results = response.data;

            for (var i = 0; i < results.length; i++) { 

                var musicDiv = $("<div>");

                var musicRating = $("<p>").text("Rating: " + results[i].rating);

                var musicGIF = $("<img>");

                musicGIF.attr("src", results[i].images.fixed_height_still.url);

                musicGIF.addClass("gifImage");

                musicGIF.attr("data-state", "still");

                musicGIF.attr("data-still", results[i].images.fixed_height_still.ur);

                musicGIF.attr("data-animate", results[i].images.fixed_height.url);
   
                musicDiv.append(musicRating);

                musicDiv.append(musicGIF);

                $("#gifSection").prepend(musicDiv);
            }
        });
    });
    // when the gif is clicked, starts the animation of the gif and stops it once its clicked again.
    $(document).on("click", ".gifImage", function () {


        var state = $(this).attr("data-state");

        if (state === "still") {

            $(this).attr("src", $(this).attr("data-animate"));

            $(this).attr("data-state", "animate");

    }else {

        $(this).attr("src", $(this).attr("data-still"));

        $(this).attr("data-state", "still");
    }
    
    });


// function that adds buttons that user searches, and calls the function to create that button
 $("#addGiph").on("click", function(event) { 

    event.preventDefault();
       
    var music = $("#musicInput").val().trim();

    topics.push(music);

    createButtons();


});
            
               
});