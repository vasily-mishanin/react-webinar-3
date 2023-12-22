import { useEffect, useContext, useState, useMemo } from "react";
//import { I18nContext } from "../i18n/context";
import useServices from "./use-services";
import shallowequal from 'shallowequal';



/**
 * Хук возвращает функцию для локализации текстов, код языка и функцию его смены
 *  * @return {I18n}
 */
export default function useTranslate(selectorFunc) {
  //return useContext(I18nContext);
  const i18n = useServices().i18n;
  const [state, setState] = useState(() => selectorFunc(i18n));

  const unsubscribe = useMemo(() => {
    // Подписка и Возврат функции для отписки
    return i18n.subscribe(() => {
      console.log('call SUBSCRIBER with', i18n.lang);
      const newState = selectorFunc(i18n);
      setState(prevState => shallowequal(prevState, newState) ? prevState : newState);
    });
  }, []); // Нет зависимостей - исполнится один раз

 // Отписка от изменения экземпляра сервиса при демонтировании компонента
 useEffect(() => unsubscribe, [unsubscribe]);

  return state;
}
