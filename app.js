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
    var referenceText = document.getElementById("frekvenstekst").value;
    var cipherText = document.getElementById("krypteret").value;
    var decipherText;
    
    var letterCountArray_ref = getFrequencyArray(referenceText);
    var letterCountArray_ciph = getFrequencyArray(cipherText);

    letterCountArray_ref.sort(function(a,b) {return b.count - a.count;});
    letterCountArray_ciph.sort(function(a, b) { return b.count - a.count; });

    //Find the most frequent letter in each letterCountArray
    var ref_max = letterCountArray_ref[0].letter;
    var ciph_max = letterCountArray_ciph[0].letter;

    console.log("Ref max: " + ref_max);
    console.log("Ciph max: " + ciph_max);

    var possibleKey = ciph_max.charCodeAt() - ref_max.charCodeAt();
    console.log("Guessed key: " + possibleKey);

    for (i = 0; i < cipherText.length; i++)
        {
            
            var index = cipherText.charCodeAt(i);

            //There are only 65.536 values in utf-8, so making sure the 
            //cipher is wrapped if charCode + key exceeds this number:
            decipherText += String.fromCharCode((index - possibleKey) % 65536);
            
        }
        console.log(decipherText);

   



        (function (data1, data2)
        {
           var margin = {top: 20, right: 20, bottom: 30, left: 40},
                        width = 960 - margin.left - margin.right,
                        height = 500 - margin.top - margin.bottom;

            
            
            var x = d3.scaleBand()
                    .range([0, width])
                    .padding(0.1)
                    .domain(data1.map( function (d) {return d.letter;}));

            var x2 = d3.scaleBand()
                    .range([0, width])
                    .padding(0.1)
                    .domain(data2.map(function (d) { return d.letter;}));

            var y = d3.scaleLinear()
                    .range([height, 0])
                    .domain([0, d3.max(data1, function (d){return +d.count;})]);
            
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
                .data(data1)
                .enter().append("rect")
                .attr("class", "bar1")
                .attr("x", function (d){return x(d.letter);})
                .attr("width", x.bandwidth())
                .attr("y", function (d) {return y(d.count);})
                .attr("height", function (d) { return  height - y(+d.count);});



                // Append second bar
            svg.selectAll(".bar")
                .data(data2)
                .enter().append("rect")
                .attr("class", "bar2")
                .attr("x", function (d){return x2(d.letter);})
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


        })(letterCountArray_ref, letterCountArray_ciph);


        function getFrequencyArray(text) {
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
                return letterCountArray;
            }

}

