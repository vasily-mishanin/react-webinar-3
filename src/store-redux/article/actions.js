export default {
  /**
   * Загрузка товара
   * @param id
   * @return {Function}
   */
  load: (id) => {
    return async (dispatch, getState, services) => {
      // Сброс текущего товара и установка признака ожидания загрузки
      dispatch({type: 'article/load-start'});
      try {
        const res_article = await services.api.request({
          url: `/api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`
        });
        //
        const res_comments = await services.api.request({
          url: `/api/v1/comments?fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted),count&limit=*&search[parent]=${id}`
        });

        // Товар загружен успешно
        dispatch({type: 'article/load-success', payload: {data: res_article.data.result, comments:res_comments.data.result.items}});

      } catch (e) {
        //Ошибка загрузки
        console.log('ERROR', e)
        dispatch({type: 'article/load-error'});
      }
    }
  },
}
