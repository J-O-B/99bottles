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

// In case of mute button
let soundButton = document.getElementById('sound');
let audioStatus = document.getElementById('state');
soundButton.addEventListener('click', function(event){
    if (sound == true){
        sound = false;
        audioStatus.innerText = 'OFF';
    }else{
        sound = true;
        audioStatus.innerText = 'ON';
    }
});


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
    function sing(text, audio){

        // Speech synthesis initialization
        let message = new SpeechSynthesisUtterance(text[0]);
        let voices = window.speechSynthesis.getVoices()
        
        // Add Multiple Voices
        if (text.length % 3){
            message.voice = voices[5];
            message.pitch = 0.3;
            message.rate = 1.9;
        }else if (text.length % 2){
            message.voice = voices[2];
            message.pitch = 0.1;
            message.rate = 1.9;
        }else{
            message.voice = voices[7];
            message.pitch = 1.7;
            message.rate = 1.9;
        }
        
        // Format lyrics for display to dom.
        let lyric = text[0].split('.');
        let htmlLyrics = ''
        for (i=0; i< lyric.length; i++){
            htmlLyrics = htmlLyrics + lyric[i] + '<br><br>';
        }
        document.getElementById('song').innerHTML = htmlLyrics;

        // Logic for sound & slice one item our of the lyrics array
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