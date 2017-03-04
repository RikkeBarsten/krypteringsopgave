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
            ciphertext += String.fromCharCode(index + key);
            
        }

        document.getElementById("cipherText").innerHTML =
        "Din krypterede tekst er: " + "<br>" + ciphertext;
    }
}

