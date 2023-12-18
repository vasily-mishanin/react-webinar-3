import StoreModule from "../module";

/**
 * Детальная информация о пользователе
 */
class ProfileState extends StoreModule {
  initState() {
    return {
      data: {},
      error: null,
      waiting: false, // признак ожидания загрузки
    };
  }

  /**
   * Загрузка пользователя
   *
   * @return {Promise<void>}
   */
  async load(auth_token) {
    // Сброс текущего профиля пользователя и установка признака ожидания загрузки
    this.setState({
      data: {},
      error: null,
      waiting: true,
    });

    try {
      const response = await fetch("/api/v1/users/self?fields=*", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Accept-Language": "ru-RU",
          "X-Token": auth_token,
        },
      });

      const profile_data = await response.json();

      if (profile_data.error) {
        // Ошибка при загрузке профиля
        this.setState({
          data: {},
          error: profile_data.error,
          waiting: false,
        });
      } else if (profile_data.result) {
        this.setState(
          {
            ...this.getState(),
            data: profile_data.result,
            error: null,
            waiting: false,
          },
          "Загружен профиль пользователя из АПИ"
        );
      }
    } catch (e) {
      // Ошибка при загрузке
      this.setState({
        data: {},
        waiting: false,
        error: e,
      });
    }
  }
}

export default ProfileState;
