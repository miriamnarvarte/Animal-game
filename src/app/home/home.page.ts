import { Component } from '@angular/core';

import { ToastController } from '@ionic/angular';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  //index de l'animal chosisi et dont le son sera joue
  animalIndex: number = null;

  animals: Array<{ title: string, image: string, desc: string, file: string, playing: boolean }> = [
    {
      'title': 'Vache',
      'image': 'img/animals/cow-icon.png',
      'desc': 'Meugle',
      'file': '/sounds/cow.mp3',
      'playing': false
    },
    {
      'title': 'Dauphin',
      'image': 'img/animals/dolphin-icon.png',
      'desc': 'Siffle',
      'file': '/sounds/dolphin.mp3',
      'playing': false
    },
    {
      'title': 'Grenouille',
      'image': 'img/animals/frog-icon.png',
      'desc': 'Coasse',
      'file': '/sounds/frog.mp3',
      'playing': false
    },
    {
      'title': 'Oiseau',
      'image': 'img/animals/bird-icon.png',
      'desc': 'Chante',
      'file': '/sounds/bird.mp3',
      'playing': false
    },
    {
      'title': 'Cochon',
      'image': 'img/animals/pig-icon.png',
      'desc': 'Grogne',
      'file': '/sounds/pig.mp3',
      'playing': false
    },
    {
      'title': 'Chien',
      'image': 'img/animals/puppy-icon.png',
      'desc': 'Aboie',
      'file': '/sounds/dog.mp3',
      'playing': false
    },
    {
      'title': 'Chat',
      'image': 'img/animals/black-cat-icon.png',
      'desc': 'Miaule',
      'file': '/sounds/cat.mp3',
      'playing': false
    },
    {
      'title': 'Cheval',
      'image': 'img/animals/horse-icon.png',
      'desc': 'Hennit',
      'file': '/sounds/horse.wav',
      'playing': false
    },
    {
      'title': 'Ane',
      'image': 'img/animals/donkey-icon.png',
      'desc': 'Brait',
      'file': '/sounds/donkey.wav',
      'playing': false
    }
  ];


  audio: HTMLAudioElement = null;

  constructor(private toastCtrl: ToastController){}

  /************** 
   * Choix aléatoire d'un animal au sein du tableau animals
   * uniquement si ce choix n'a pas été déjà fait
  */

  pickAnimal() {
    if (this.animalIndex == null) {
      this.animalIndex = Math.floor(Math.random() * this.animals.length);

    }
  }


  playSound() {
    //attêt du son en cours
    if (this.audio && this.audio.duration != this.audio.currentTime) {
      this.audio.pause();
    }

    //choix de l'animal
    this.pickAnimal();
    //récuperation de l'animal choisi
    let animal = this.animals[this.animalIndex];

    //LECTURE DE SON
    //creation d'un instance de l'objet
    //Stockage de l'instance dans une variable d'objet
    //accesible pour toutes les méthode
    this.audio = new Audio("/assets/" + animal.file);
    //chargement du son en memoire
    this.audio.load();
    //chargement de la lecture du son
    this.audio.play();

  }

  guessAnimal(animalName) {
    if (this.animalIndex == null) {
      this.showToast("vous devez chiquez pour jouer");
    } else if (this.animals[this.animalIndex].title == animalName) {
      this.showToast("gagner");


      //Réinisialitation du jeux
      this.animalIndex = null;
      this.audio = null;

    } else {
      this.showToast("perdu");
    }
  }

   async showToast(text) {
    const toast=await this.toastCtrl.create({
      message: text, duration: 1000, position: 'bottom'
    });
    
    toast.present();

  }
}


