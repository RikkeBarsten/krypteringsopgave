function cipher() {
    var key = +document.getElementById("inputKey").value;
    if  (isNaN(key))
        alert("Din nøgle skal være et heltal. Prøv igen.")
    else 
    {
        console.log(key);

        
    
        document.getElementById("demo").innerHTML =
        "Du har valgt nøglen: " + key.toString();

        var plaintext = document.getElementById("plaintext").value;
        
        console.log(plaintext);

        var ciphertext = "";

        for(i = 0; i < plaintext.length; i++)
        {
            
            var index = plaintext.charCodeAt(i);

            //There are only 65.536 values in utf-8, so making sure the 
            //cipher is wrapped if charCode + key exceeds this number:
            ciphertext += String.fromCharCode((index + key) % 65536);
            
        }

        document.getElementById("cipherText").innerHTML =
        "Din krypterede tekst er: " + "<br><br>" + ciphertext + "<br><br>" + "Tip: Kopier den krypterede tekst ind, og brug den samme nøgle med modsat fortegn for at dekryptere.";
    }
}

function frekvens(){
    var text = document.getElementById("frekvenstekst").value;
    var letterCountArray = [];
    var currentLetter = "";
    var letterExists;

    for (i = 0; i < text.length; i++){
        letterExists = false;
        currentLetter = text.charAt(i);
        letterCountArray.forEach( function (letterCount){
                if (letterCount.letter == currentLetter)
                {
                    letterCount.count ++;
                    letterExists = true;
                }
                
                    
         })
         if (!letterExists)
            letterCountArray.push( {"letter": currentLetter, "count": 1});
        }
        console.log(JSON.stringify(letterCountArray));

        (function (data)
        {
           var margin = {top: 20, right: 20, bottom: 30, left: 40},
                        width = 960 - margin.left - margin.right,
                        height = 500 - margin.top - margin.bottom;

            data.sort(function(a, b) { return b.count - a.count; });
            
            var x = d3.scaleBand()
                    .range([0, width])
                    .padding(0.1)
                    .domain(data.map( function (d) {return d.letter;}))
            var y = d3.scaleLinear()
                    .range([height, 0])
                    .domain([0, d3.max(data, function (d){return +d.count;})]);
            
            // append the svg object to the body of the page
            // append a 'group' element to 'svg'
            // moves the 'group' element to the top left margin
            var svg = d3.select("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
            .append("g")
                .attr("transform", 
                    "translate(" + margin.left + "," + margin.top + ")");

            // Append bars
            svg.selectAll(".bar")
                .data(data)
                .enter().append("rect")
                .attr("class", "bar")
                .attr("x", function (d){return x(d.letter);})
                .attr("width", x.bandwidth())
                .attr("y", function (d) {return y(d.count);})
                .attr("height", function (d) { return  height - y(+d.count);});

            // Add x-axis
            // add the x Axis
            svg.append("g")
                .attr("transform", "translate(0," + height + ")")
                .call(d3.axisBottom(x));

              // add the y Axis
            svg.append("g")
                .call(d3.axisLeft(y));


        })(letterCountArray)

}

