const fs = require('fs');
const input = fs.readFileSync("input.txt", "utf8").trim();




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
                    //part 1
                    //requirementMet = true;

                    //part 2
                    requirementMet = ValidateFieldValue(passports[i][k].split(":")[0], passports[i][k].split(":")[1]);
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

//part 2
const byrMin = 1920;
const byrMax = 2002;
const iyrMin = 2010;
const iyrMax = 2020;
const eyrMin = 2020;
const eyrMax = 2030;
const heightCmMin = 150;
const heightCmMax = 193;
const heightInMin = 59;
const heightInMax = 76;
const hairColorStart = "#";
const hairColorLength = 7;
const hairColorChars = "0123456789abcdef";
const eclList = ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"];
const pidDigits = 9;

function ValidateFieldValue(field, value){
    if (field == "byr"){
        if  (parseInt(value) >= byrMin && parseInt(value) <= byrMax){
            return true;
        }else{
            console.log("byr invalid");
        }
    }
    if (field == "iyr"){
        if (parseInt(value) >= iyrMin && parseInt(value) <= iyrMax){
            return true;
        }else{
            console.log("iyr invalid");
        }
    }
    if (field == "eyr"){
        if (parseInt(value) >= eyrMin && parseInt(value) <= eyrMax){
            return true;
        }else{
            console.log("eyr invalid");
        }
    }
    if (field == "hgt"){
        if (value.slice(-2) == "cm"){
            if (parseInt(value.slice(0, -2)) >= heightCmMin 
                    && parseInt(value.slice(0, -2)) <= heightCmMax){
                        return true;
                    }else{
                        console.log("hgt invalid");
                    }
        }
        if (value.slice(-2) == "in"){
            if  (parseInt(value.slice(0, -2)) >= heightInMin 
                    && parseInt(value.slice(0, -2)) <= heightInMax){
                        return true;
                    }else{
                        console.log("hgt invalid");
                    }
        }
    }
    if (field == "hcl"){
        if (value[0] == hairColorStart){
            if (value.length == hairColorLength){
                //check if each char is part of the list
                for (var i = 0; i < hairColorLength-1; i++){
                    if (!hairColorChars.includes(value[i+1])){
                        console.log("hcl invalid");
                        return false;
                    }
                }
                return true;
            }
        }
    }
    if (field == "ecl"){
        if (eclList.includes(value)){
            return true;
        }else{
            console.log("ecl invalid");
        }
    }
    if (field == "pid"){
        if (value.length == pidDigits && !isNaN(parseInt(value))){
            return true;
        }else{
            console.log("pid invalid");
        }
    }
    return false;
}


CheckValidity(input);