//initialize the Variables
let songIndex =0;
let audioElement = new Audio('songs/00.mp3');
let masterPLay=document.getElementById('masterPlay');
let progressBar = document.getElementById('progressBar');
let gif = document.getElementById('gif');
let mastersongname = document.getElementById('mastersongname');

let songItems = Array.from(document.getElementsByClassName('songitem'));//converting to array from json



let songs = [{
        songname: "Desi Kalakar - Yo Yo Honey Singh",
        filePath: "songs/00.mp3",
        coverPath: "images/cover1.jpg"
    },
    {
        songname: "Love Dose - Yo Yo Honey Singh",
        filePath: "songs/01.mp3",
        coverPath: "images/cover1.jpg"
    },
    {
        songname: "Blue Eyes - Yo Yo Honey Singh",
        filePath: "songs/02.mp3",
        coverPath: "covers/cover3.jpg"
    },
    {
        songname: "Brown Rang - Yo Yo Honey Singh",
        filePath: "songs/03.mp3",
        coverPath: "covers/cover4.jpg"
    },
    {
        songname: "Dheere Dheere - Yo Yo Honey Singh",
        filePath: "songs/04.mp3",
        coverPath: "covers/cover5.jpg"
    },
    {
        songname: "Kuley Kuley - Yo Yo Honey Singh",
        filePath: "songs/05.mp3",
        coverPath: "covers/cover6.jpg"
    }
]

songItems.forEach((element,i)=>{
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songname")[0].innerText = songs[i].songname;
})

// audioElement.play();

//handle play/pause
masterPLay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPLay.classList.remove('fa-circle-play');
        masterPLay.classList.add('fa-circle-pause');
        gif.style.opacity=1;
        //for chanhing of icon in sync with the below bar
        document.getElementById(songIndex).classList.remove('fa-circle-play');
        document.getElementById(songIndex).classList.add('fa-circle-pause');
    }else{
        audioElement.pause();
        masterPLay.classList.remove('fa-circle-pause');
        masterPLay.classList.add('fa-circle-play');
        gif.style.opacity = 0;
        //for chanhing of icon in sync with the below bar
        document.getElementById(songIndex).classList.remove('fa-circle-pause');
        document.getElementById(songIndex).classList.add('fa-circle-play');
    }
})

//listen to events
audioElement.addEventListener('timeupdate',()=>{
       //update Seekbar
      progress =parseInt((audioElement.currentTime/audioElement.duration)*100);//ratio of current playback time to total duration whole multiplacation converting from decimal to 0
      progressBar.value = progress; //this will show the progrees in the range bar.
})

//change by user in progress bar 
progressBar.addEventListener('change',()=>{
    audioElement.currentTime = progressBar.value *audioElement.duration/100;
})

//making play buttons in the list work
const makeallplays= ()=>{
    Array.from(document.getElementsByClassName("songitemplay")).forEach((element)=>{
         element.classList.remove("fa-circle-pause");
         element.classList.add('fa-circle-play');
    })//this code resets the icons to play icon
}

Array.from(document.getElementsByClassName("songitemplay")).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        makeallplays();//this will reset it
        e.target.classList.remove("fa-circle-play");//when element is clicked this two takes place and changes to the pause sign.
        e.target.classList.add("fa-circle-pause");
         mastersongname.innerText = songs[songIndex].songname; //changes song name in the rangebar


        //playing audio in list
         songIndex = parseInt(e.target.id); //converted the id to int and saved in index
        audioElement.src = `songs/0${songIndex}.mp3`; //now we are giving the index in part of the name of the song so it will play i order
        audioElement.currentTime = 0 ;
        audioElement.play();
        gif.style.opacity=1;
        masterPLay.classList.remove('fa-circle-play');
        masterPLay.classList.add('fa-circle-pause');
            
    })
})

//previous and forward button

document.getElementById('next').addEventListener('click', () => {
    // if(songIndex>5){
    //     songIndex = 0;
    // }else{
    //     songIndex +=1;
    // }
    document.getElementById(songIndex).classList.remove('fa-circle-pause');
    document.getElementById(songIndex).classList.add('fa-circle-play');//icon change in song list
    

    songIndex += 1;
    songIndex = songIndex%6;
    audioElement.src = `songs/0${songIndex}.mp3`; //now we are giving the index in part of the name of the song so it will play i order
    mastersongname.innerText = songs[songIndex].songname;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPLay.classList.remove('fa-circle-play');
    masterPLay.classList.add('fa-circle-pause');

    document.getElementById(songIndex).classList.add('fa-circle-pause');
    document.getElementById(songIndex).classList.remove('fa-circle-play');

    
});

//previous
document.getElementById('previous').addEventListener('click', () => {
    
      document.getElementById(songIndex).classList.remove('fa-circle-pause');
      document.getElementById(songIndex).classList.add('fa-circle-play');
    
    if (songIndex <=0) {
        songIndex = 0;
    } else {
        songIndex -= 1;
    }

    audioElement.src = `songs/0${songIndex}.mp3`; //now we are giving the index in part of the name of the song so it will play i order
    mastersongname.innerText = songs[songIndex].songname;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPLay.classList.remove('fa-circle-play');
    masterPLay.classList.add('fa-circle-pause');

     document.getElementById(songIndex).classList.add('fa-circle-pause');
     document.getElementById(songIndex).classList.remove('fa-circle-play');
    
})



///classis a list when you have to access the particular part like fa-circle-play you have to 
//use .classlist in dom.