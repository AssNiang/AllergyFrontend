import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.css']
})
export class PostItemComponent implements OnInit {
  public profile : String = "../../../assets/images/blank-profile-picture.webp";
  public firstname : String = "Ass";
  public lastname : String = "NIANG";

  public allergyName : String = "Turu Allergie Bi";
  public allergyDescription : String = `La rhinite saisonnière, aussi appelée rhume des foins, est une réaction allergique causée par l’exposition aux pollens. Au Québec, 1 personne sur 5 souffre de la rhinite saisonnière, qui est causée principalement par le pollen de l’herbe à poux.

  La rhinite saisonnière débute habituellement au printemps, lorsque certains arbres pouvant causer des allergies libèrent leur pollen dans l’air. Par la suite, d’autres plantes allergènes libèrent leur pollen tout au long de l’été, et ce, jusqu’à la mi-octobre. Les réactions allergiques causées par les différents pollens se manifestent à peu près aux mêmes périodes chaque année, soit :

      de mars à juin (pollen des arbres et des arbustes);
      de mai à octobre (pollen des graminées, tels que le gazon, le foin, le pâturin et le brome);
      de juillet à octobre (pollen de l’herbe à poux).

  Les changements climatiques allongent la période pendant laquelle les plantes et les arbres produisent du pollen. Par conséquent, la période des allergies risque elle aussi de se prolonger au cours des prochaines années.
  .nl.
  Symptômes

  La rhinite saisonnière cause différents symptômes, qui sont principalement provoqués par l’inhalation du pollen. Les symptômes peuvent prendre les formes suivantes :

      aggravation de l’asthme, si la personne en souffre déjà;
      congestion nasale;
      signes de conjonctivite :
          démangeaisons des yeux;
          écoulement purulent des yeux;
          gonflement des paupières;
          larmoiement;
          rougeur des yeux;
      écoulement nasal clair et abondant;
      éternuements à répétition;
      maux de tête;
      picotements et démangeaisons du nez, de la gorge et des oreilles.

  Les effets secondaires de la rhinite saisonnière affectent aussi la qualité de vie de la personne allergique et de sa famille. Du printemps à l’automne, les activités quotidiennes ou sportives, les loisirs et le rendement au travail ou à l’école peuvent ainsi être perturbés par :

      de la fatigue;
      de l’irritabilité;
      des problèmes de concentration;
      des troubles du sommeil.

  Si vous avez des questions concernant les symptômes de la rhinite saisonnière, communiquez avec Info-Santé 811.`;

  //images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
  public images : String[] = [
    "../../../assets/images/rhume-foins1.jpg",
    "../../../assets/images/rhume-foins2.webp",
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
