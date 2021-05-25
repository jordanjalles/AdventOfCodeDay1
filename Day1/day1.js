
//load ledger from a separate file
document.getElementById('fileInput').addEventListener('change', function selectedFileChanged() {
    console.log(this.files); // will contain information about the file that was selected.
    if (this.files.length === 0) {
        console.log('No file selected.');
        return;
      }
      const reader = new FileReader();
    reader.onload = function fileReadCompleted() {
        // when the reader is done, the content is in reader.result.
        find2020(reader.result);

    };
    reader.readAsText(this.files[0]);
});

function find2020(numbers){

    //convert text to sorted integer array
    var numbers = new Int16Array(numbers.split("\n").map(function(item) {
        return parseInt(item, 10);
    }));
    numbers = numbers.sort();

    //this is where the magic happens
    //start at beginning of list with the small numbers
    for(var i = 0; i<numbers.length; i++){
        num1 = numbers[i];

        //compare starting from the other end of list
        for (var j = numbers.length-1; j>0; j--){
            num2 = numbers[j];

            if (num1+num2 == 2020){
                console.log("success");
                console.log(num1*num2);
                return;
            }

            //save a bit of time 
            if (num1+num2 < 2020){
                break;
            }
        }
    }
}