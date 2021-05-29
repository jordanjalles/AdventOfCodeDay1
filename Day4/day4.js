const fs = require('fs');
const input = fs.readFileSync("input.txt", "utf8").trim();

CheckValidity(input);



function CheckValidity(text){

    var requiredFields = [
        "byr",
        "iyr",
        "eyr",
        "hgt",
        "hcl",
        "ecl",
        "pid"
    ];

    var passports = (text.split("\r\n\r\n"));

    for (var i = 0; i < passports.length; i++){
        passports[i] = passports[i].split(" ");
        for (var j = 0; j < passports[i].length; j++){
            var secondSplit = passports[i][j].split("\r\n");
             if (secondSplit.length > 1){
                 passports[i].splice(j, 1); //this modifies in place "ewwww" - sam
                 passports[i] = passports[i].concat(secondSplit); //this doesn't modify in place
                 j--; //decrement j since we just removed it
             }
         }
    }

    //console.log(passports[0]);

    var validPassports = 0;

    //for each passport
    for (var i = 0; i < passports.length; i++){
        //assume true unless we miss a requirement
        var passportValid = true;
        //for each requirement
        for (var j = 0; j < requiredFields.length; j++){
            //assume false unless we find a match
            var requirementMet = false;
            //look through each passport field for the requirement
            for (var k = 0; k < passports[i].length; k++){
                //flag any matches
                if (passports[i][k].split(":")[0] == requiredFields[j]){
                    requirementMet = true;
                    break;
                }
            }
            //if the flag wasn't found, this whole passport is invalid
            if (requirementMet == false){
                passportValid = false;
                //console.log("passport " + i + " invalid:" + requiredFields[j]+ " not found");
                break;
            }
        }
        if (passportValid) validPassports += 1;
    }

    
   console.log(validPassports);
   

}