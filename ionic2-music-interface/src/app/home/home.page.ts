import { Component, ViewChild } from '@angular/core';
import { IonRange, Platform } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  @ViewChild('range', { static: false }) range: IonRange;
  songs = [
    {
      title: 'Title 1',
      subtitle: 'Subtitle 1',
      img: 'https://play-lh.googleusercontent.com/mOkjjo5Rzcpk7BsHrsLWnqVadUK1FlLd2-UlQvYkLL4E9A0LpyODNIQinXPfUMjUrbE',
      path: 'https://songs.alrakoba.net/nabsho/aa/agany/56.mp3'
    },
    {
      title: 'Title 2',
      subtitle: 'Subtitle 2',
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkM-C_Kg3MxSycfzTGXrcxsLKA311g9Sd5YQ&usqp=CAU',
      path: 'https://owudactmzzuplxddigud.supabase.co/storage/v1/object/sign/2006/48.mp3?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiIyMDA2LzQ4Lm1wMyIsImlhdCI6MTY1MjM1MTMxMCwiZXhwIjoxOTY3NzExMzEwfQ.eHxEv9uwgYkZ0uXT2dXGC6RdBBpNKPXf_4q3iKdwqm0'
    },
    {
      title: 'Title 3',
      subtitle: 'Subtitle 3',
      img: 'https://www.cnet.com/a/img/resize/74802c1a796baa9ed1b9760199884db036b39dd1/2021/06/21/233d61c4-8184-43a9-bb41-da8791207654/apple-music-iphone-with-headphones-001.jpg?auto=webp&fit=crop&height=630&width=1200',
      path: 'https://firebasestorage.googleapis.com/v0/b/agany-2022-6.appspot.com/o/y2meta.com%20-%20%D9%85%D8%B9%20%D8%A7%D9%84%D8%B7%D9%8A%D9%88%D8%B1%20%D9%84%D9%8A%D9%86%D8%A7%20%D9%82%D8%A7%D8%B3%D9%85%20%D8%A7%D8%BA%D8%A7%D9%86%D9%8A%20%D9%88%D8%A7%D8%BA%D8%A7%D9%86%D9%8A%202022%20(64%20kbps).mp3?alt=media&token=ab02d32d-9ccf-4318-b4ba-171aabb97a97'
    }
  ]

  currentTitle;
  currentSubtitle;
  currentImg;

  progress = 0;
  isPlaying = false;
  isTouched = false;
  currSecsText;
  durationText;

  currentRangeTime;
  maxRangeValue;

  currentSong: HTMLAudioElement;

  upNextImg;
  upNextTitle;
  upNextSubtitle;

  constructor() {}

  playSong(title, subtitle, img, song) {
    if (this.currentSong != null) {
      this.currentSong.pause();
    }

    document.getElementById("fullPlayer").style.bottom = "0px";
    this.currentTitle = title;
    this.currSecsText = subtitle;
    this.currentImg = img;

    this.currentSong = new Audio(song);

    this.currentSong.play().then(() => {
      this.durationText = this.sToTime(this.currentSong.duration);
      this.maxRangeValue = Number(this.currentSong.duration.toFixed(2).toString().substring(0, 5));

      var index = this.songs.findIndex(x => x.title == this.currentTitle);

      if ((index + 1) == this.songs.length) {
        this.upNextImg = this.songs[0].img;
        this.upNextTitle = this.songs[0].title;
        this.upNextSubtitle = this.songs[0].subtitle;
      }
      else {
        this.upNextImg = this.songs[index + 1].img;
        this.upNextTitle = this.songs[index + 1].title;
        this.upNextSubtitle = this.songs[index + 1].subtitle;
      }

      this.isPlaying = true;

    });

    this.currentSong.addEventListener("timeupdate", () => {
      if (!this.isTouched) {
        this.currentRangeTime = Number(this.currentSong.currentTime.toFixed(2).toString().substring(0, 5));
        this.currSecsText = this.sToTime(this.currentSong.currentTime);
        this.progress = (Math.floor(this.currentSong.currentTime) / Math.floor(this.currentSong.duration));

        if (this.currentSong.currentTime == this.currentSong.duration) {
          this.playNext();
        }
      }
    })
  }

  playNext() {
    var index = this.songs.findIndex(x => x.title == this.currentTitle);
    if ((index + 1) == this.songs.length) {
      this.playSong(this.songs[0].title, this.songs[0].subtitle, this.songs[0].img, this.songs.push);
    } else {
      var nextIndex = index + 1;
      this.playSong(this.songs[nextIndex].title, this.songs[nextIndex].subtitle, this.songs[nextIndex].img, this.songs[nextIndex].path);
    }
  }

  playPrev() {
    var index = this.songs.findIndex(x => x.title == this.currentTitle);
    if (index == 0) {
      var lastIndex = this.songs.length - 1;
      this.playSong(this.songs[lastIndex].title, this.songs[lastIndex].subtitle, this.songs[lastIndex].img, this.songs[lastIndex].path);
    } else {
      var prevIndex = index - 1;
      this.playSong(this.songs[prevIndex].title, this.songs[prevIndex].subtitle, this.songs[prevIndex].img, this.songs[prevIndex].path);

    }
  }

  pause() {
    this.currentSong.pause();
    this.isPlaying = false;
  }

  play() {
    this.currentSong.play();
    this.isPlaying = true;
  }

  cancel() {
    document.getElementById("miniPlayer").style.bottom = "-100px";
    this.currentImg = "";
    this.currentTitle = "";
    this.currentSubtitle = "";
    this.progress = 0;
    this.currentSong.pause();
    this.isPlaying = false;
  }

  touchStart() {
    this.isTouched = true;
    this.currentRangeTime = Number(this.range.value);
  }

  touchMove() {
    this.currSecsText = this.sToTime(this.range.value);
  }

  touchEnd() {
    this.isTouched = false;
    this.currentSong.currentTime = Number(this.range.value);
    this.currSecsText = this.sToTime(this.currentSong.currentTime)
    this.currentRangeTime = Number(this.currentSong.currentTime.toFixed(2).toString().substring(0, 5));
    if (this.isPlaying) {
      this.currentSong.play();
    }
  }

  minimize() {
    document.getElementById("fullPlayer").style.bottom = "-1000px";
    document.getElementById("miniPlayer").style.bottom = "0px";
  }

  maximize() {
    document.getElementById("fullPlayer").style.bottom = "0px";
    document.getElementById("miniPlayer").style.bottom = "-100px";
  }

  sToTime(t) {
    return this.padZero(parseInt(String((t / (60)) % 60))) + ":" + this.padZero(parseInt(String((t) % 60)));
  }

  padZero(v) {
    return (v < 10) ? "0" + v : v;
  }
}


/*

    this.videos = this.videos.sort(() => Math.random() - 0.5);
    let listFound = this.videos.filter(v => v.id == this.id);
    listFound.forEach(v => {

     

    })
    
 var res = v.time.replace(':', '');
      var index = this.videos.findIndex(x => x.id == v.id);
      
      var newTime = Number(res);
      newTime = newTime - 70;

      this.stopInterval = setInterval(() => {
        if(newTime>0) {
          newTime--;
        }  
  
        if (newTime==0) {
           this.admobService.showRewardedAd();
          if ((index + 1) == this.videos.length) {
            this.title = this.videos[0].title;
            this.play(this.videos[0].id, this.title);
          }
          else {
            this.title = this.videos[index + 1].title;
            this.play(this.videos[index + 1].id, this.title);
          }
          clearInterval(this.stopInterval);
        } 
      } , 1000);
*/