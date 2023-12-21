export default {
  /**
   * Загрузка товара
   * @param id
   * @return {Function}
   */
  load: (id) => {
    return async (dispatch, getState, services) => {
      // Сброс текущего товара и установка признака ожидания загрузки
      dispatch({ type: "article/load-start" });
      try {
        const res_article = await services.api.request({
          url: `/api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`,
        });
        //
        const res_comments = await services.api.request({
          url: `/api/v1/comments?fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted),count&limit=*&search[parent]=${id}`,
        });

        // Товар загружен успешно
        dispatch({
          type: "article/load-success",
          payload: {
            data: res_article.data.result,
            comments: res_comments.data.result.items,
          },
        });
      } catch (e) {
        //Ошибка загрузки
        console.log("ERROR", e);
        dispatch({ type: "article/load-error" });
      }
    };
  },

  /**
   * Создание коммента
   * @param comment {object}
   * @return {Function}
   */
  createComment: (comment) => {
    return async (dispatch, getState, services) => {
      // Установка признака ожидания загрузки
      dispatch({ type: "comment/upload-start" });
      try {
        // _id,text,dateCreate,author(_id,profile(name)),parent(_id,_type),isDeleted
        const res_comment = await services.api.request({
          url: `/api/v1/comments?fields=_id,text,dateCreate,author(_id,profile(name)),parent(_id,_type),isDeleted`,
          method: "POST",
          body: JSON.stringify(comment),
        });

        // Комментарий загружен успешно
        dispatch({
          type: "comment/upload-success",
          payload: { newComment: res_comment.data.result },
        });
      } catch (e) {
        //Ошибка загрузки
        console.log("ERROR", e);
        dispatch({ type: "comment/upload-error" });
      }
    };
  },
};
