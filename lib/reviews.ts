export type Review = {
  name: string;
  when: string;
  rating: number;
  text: string;
};

// Reálne recenzie z Google (Autoškola IKARA). 5 najnovších s textom.
export const reviews: Review[] = [
  { name: "Monika Halahijova", when: "pred rokom", rating: 5, text: "Veľmi veľká spokojnosť s touto autoškolou, ochotný ústretový inštruktor, ktorý naozaj vie veľmi dobre naučiť. Je to profík 😄 určite odporúčam" },
  { name: "Roman Seker", when: "pred rokom", rating: 5, text: "Moja žena tu robila vodičák v roku 97 a jazdí spokojne až doteraz bez nehody, vďaka tejto autoškole." },
  { name: "Xenia Zahorova", when: "pred rokom", rating: 5, text: "Veľmi ústretový inštruktor. Dobre vysvetlí, nie je problém sa dohodnúť na jazdy. Je prísnejší, ale je to pre vaše dobro. Autoškolu odporúčam, maximálna spokojnosť." },
  { name: "Nina Bajčevová", when: "pred rokom", rating: 5, text: "S touto autoškolou som veľmi spokojná. Inštruktor bol skvelý – vždy vtipný a ochotný všetko dôkladne vysvetliť. Nikdy sa nestalo, že by nechal nejaké otázky nezodpovedané. Navyše, celý kurz bol zorganizovaný efektívne, takže sa zbytočne nenaťahoval, nič nebolo podcenené ani odfláknuté. Odporúčam túto autoškolu všetkým, ktorí hľadajú nielen kvalitné vzdelanie, ale aj pohodovú atmosféru." },
  { name: "Filip Richard Frátrik", when: "pred 2 rokmi", rating: 5, text: "Vrelo odporúčam autoškolu IKARA. Profesionálny prístup od pána inštruktora, ktorý dobre naučí. Na autoškolu budem s radosťou spomínať." },
];

export const stars = (rating: number) => "★★★★★".slice(0, rating);
