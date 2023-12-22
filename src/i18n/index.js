import translate from "./translate";

class I18n {
  constructor(servises, lang = "ru") {
    this.lang = lang;
    this.servises = servises;
   // this.listeners = [() => servises.api.setHeader('Accept-Language', this.lang === 'ru' ? 'ru-RU' : 'en-EN')];
    this.listeners = [];
    this.t = this.t.bind(this);
    this.setLang = this.setLang.bind(this);
  }

  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    }
  }

  getLang(){
    return this.lang;
  }

  setLang(newLang) {
    this.lang = newLang;
   // this.t = function(text, number) {return translate(newLang, text, number)};
    this.t = (text, number) => translate(newLang, text, number);
    console.log('setLang', this.lang);
    console.log('listeners ', this.listeners);
    for (const listener of this.listeners) listener();
  }



  // Функция для локализации текстов с замыканием на код языка
  t(text, number) {
    return translate(this.lang, text, number);
  }
}

export default I18n;
