// ************************************************* //
//                                                   //
//  Loop For 99 Bottles Is In write(), getLyrics(),  //
//  And sing() - Jonathan O'Brien                    //
//                                                   //
//  Note: Task was simply a for loop for the lyrics  //
//  but I wanted to have a little bit of fun with    //
//  the project so I added the audio just to do      //
//  something different.                             //
// ************************************************* //

// Hide page 2 on start
document.getElementById('page2').style.display = 'none';


// Mute logic
let sound = true;

let backButton = document.getElementById('back');
backButton.addEventListener('click', function(event){
    document.getElementById('page2').style.display = 'none';
    document.getElementById('page1').style.display = 'block';
})

// Button Events
let textButton = document.getElementById('text');
let singButton = document.getElementById('sing');
textButton.addEventListener('click', write);
singButton.addEventListener('click', getLyrics);

// Simply Write Text To Dom:
function write(){

    // Flip from page 1 to two
    document.getElementById('page1').style.display = 'none';
    document.getElementById('page2').style.display = 'block';

    let text = '';
    for (let i = 99; i > 0; i--) {
        // If more than one we need the plural version (bottles)
        if (i != 1){
            text =  text + `${i} bottles of beer on the wall, ${i} bottles of beer <br><br> Take one down and pass it around, ${i - 1} bottle of beer on the wall <br><br><hr style='width:33%; margin: 0 auto;'><br>`;
        // Else get the single (bottle) and ending.
        }else if (i == 1){
            text = text + `<br>1 bottle of beer on the wall, 1 bottle of beer <br><br> Take one down and pass it around, no more bottles of beer on the wall <br><br><hr style='width:33%; margin: 0 auto;'><br>No more bottles of beer on the wall, no more bottles of beer <br><br> Go to the store and buy some more, 99 bottles of beer on the wall`;
        }
    }
    document.getElementById('text-lyrics').innerHTML = text;
}

// Get Lyrics Without HTML
function getLyrics(){
    let text = [];
    for (let i = 99; i > 0; i--) {
        if (i != 1){
            text.push(`${i} bottles of beer on the wall, ${i} bottles of beer. Take one down and pass it around, ${i - 1} bottles of beer on the wall.`);
        }else if (i == 1){
            text.push(`1 bottle of beer on the wall, 1 bottle of beer. Take one down and pass it around, no more bottles of beer on the wall. No more bottles of beer on the wall, no more bottles of beer. Go to the store and buy some more, 99 bottles of beer on the wall`);
        }
    }
    // Delay Function
    function delay(time) {
        return new Promise(resolve => setTimeout(resolve, time));
    };

    // Speech Synthesis
    function sing(text, sound){

        // In case of mute button
        let soundButton = document.getElementById('sound');
        soundButton.addEventListener('click', function(event){
            sound = false;
        });

        let message = new SpeechSynthesisUtterance(text[0]);
        let voices = window.speechSynthesis.getVoices()
        
        message.voice = voices[3];
        message.pitch = 1.5;
        message.rate = 2;
        
        let lyric = text[0].split('.');
        let htmlLyrics = ''
        for (i=0; i< lyric.length; i++){
            htmlLyrics = htmlLyrics + lyric[i] + '<br><br>';
        }
        document.getElementById('song').innerHTML = htmlLyrics;
        if (sound == true){
            window.speechSynthesis.speak(message);
            message.onend = function(event){
                window.speechSynthesis.cancel();
                sing(text.slice(1), sound);
            }
        }else{
            window.speechSynthesis.cancel();
            delay(7000).then(() => sing(text.slice(1), sound));
        };
    }
    sing(text, sound);
}