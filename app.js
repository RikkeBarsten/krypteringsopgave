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

}

