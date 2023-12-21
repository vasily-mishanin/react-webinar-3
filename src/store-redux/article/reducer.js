// Начальное состояние
export const initialState = {
  data: {},
  comments:[],
  waiting: false // признак ожидания загрузки
}

// Обработчик действий
function reducer(state = initialState, action) {

  switch (action.type) {
    case "article/load-start":
      return {...state, data: {}, waiting: true};

    case "article/load-success":
      return {...state, data: action.payload.data, comments:action.payload.comments, waiting: false};

    case "article/load-error":
      return {...state, data: {}, waiting: false}; //@todo текст ошибки сохранять?

    case "comment/upload-start":
      return {...state, waiting: true};

    case "comment/upload-success":
      return {...state, comments:[...state.comments, action.payload.newComment], waiting: false};

    case "comment/upload-error":
        return {...state, waiting: false};

    default:
      // Нет изменений
      return state;
  }
}

export default reducer;
